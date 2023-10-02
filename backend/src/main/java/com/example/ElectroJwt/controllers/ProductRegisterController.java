package com.example.ElectroJwt.controllers;

import com.example.ElectroJwt.dtos.*;
import com.example.ElectroJwt.models.Product;
import com.example.ElectroJwt.models.ProduitSuiviPrice;
import com.example.ElectroJwt.models.Rates;
import com.example.ElectroJwt.models.User;
import com.example.ElectroJwt.repositories.ProductRepository;
import com.example.ElectroJwt.repositories.RatesRepository;
import com.example.ElectroJwt.repositories.SuivrePrixRepository;
import com.example.ElectroJwt.repositories.UserRepository;
import com.example.ElectroJwt.services.AuthService;
import com.example.ElectroJwt.services.CloudinaryService.FileUpload;
import com.example.ElectroJwt.services.CloudinaryService.FileUploadImpl;
import com.example.ElectroJwt.services.ProductServices.ProductServices;
import com.example.ElectroJwt.services.ProductServices.ProductServicesImpl;
import com.example.ElectroJwt.services.UserServices.UserServiceImpl;
import com.example.ElectroJwt.utils.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

//import javax.management.Query;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@CrossOrigin(origins = "*")
@RestController
public class ProductRegisterController {


    @Autowired
    private ProductServicesImpl productServicesImpl;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private FileUploadImpl fileUploadImpl;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserRepository userrepo;
    @Autowired
    private  UserServiceImpl userServiceImpl;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private SuivrePrixRepository sprepo;
    @Autowired
    private RatesRepository raterepo;

    @PostMapping("register/product")
    public ResponseEntity<Product> createProduct(
            @RequestParam("name") String name,
            @RequestParam("price") float price,
            @RequestParam("category") String category,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image,
            @RequestParam("urls") String urls
    ) {
        try {
            String imageUrl = fileUploadImpl.uploadFile(image);

            Product product = new Product();
            product.setName(name);
            product.setPrice(price);
            product.setCategory(category);
            product.setDescription(description);
            product.setImageUrl(imageUrl);
            product.setUrls(urls);

            Product createdProduct = productRepository.save(product);
            return ResponseEntity.ok(createdProduct);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //new add product ghaya
    @PostMapping("/addProduct")
    public boolean addProduct    (@RequestParam("token")  String token,@RequestParam("name")  String name,@RequestParam("price")  float price,@RequestParam("category")  String category,@RequestParam("description")  String description, @RequestParam("image") MultipartFile image,@RequestParam("url")  String url, @RequestParam("nomfournisseur") String nomfournisseur , @RequestParam("marque") String marque )
    {   //Integer role =jwtUtils.extractRole(token);

        if(jwtUtils.extractRole(token)==1 ){
            if(userServiceImpl.findUserById(jwtUtils.extractId(token)).getSellerData()!=null){
                try {
                    String imageUrl = fileUploadImpl.uploadFile(image);
                    Product product = new Product();
                    product.setName(name);
                    product.setPrice(price);
                    product.setCategory(category);
                    product.setDescription(description);
                    product.setImageUrl(imageUrl);
                    product.setUrls(url);
                    product.setDisponibilite(true);
                    product.setMarque(marque);
                    product.setProductOwnerId(jwtUtils.extractId(token));
                    product.setNomFournisseur(userServiceImpl.findUserById(jwtUtils.extractId(token)).getSellerData().getNomcommerciale());
                    Product createdProduct = productRepository.save(product);
                    //createdProduct
                    if(createdProduct!=null){
                        return true;
                    }
                    else {
                        return false;
                    }
                    //return "we are setting the data here is the id of user : "+jwtUtils.extractId(token)+"nom commerciale vendeur : "+userServiceImpl.findUserById(jwtUtils.extractId(token)).getSellerData().getNomcommerciale();

                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
                //return "the seller data is not set seccessfully ";
            }
            else {
                return false;
            }
            //return "you are vendeur ";
        }
        else if (jwtUtils.extractRole(token)==2) {

            try {
                String imageUrl = fileUploadImpl.uploadFile(image);
                Product product = new Product();
                product.setName(name);
                product.setPrice(price);
                product.setCategory(category);
                product.setDescription(description);
                product.setImageUrl(imageUrl);
                product.setUrls(url);
                product.setProductOwnerId(jwtUtils.extractId(token));
                product.setNomFournisseur(nomfournisseur);
                product.setMarque(marque);
                Product createdProduct = productRepository.save(product);
                //createdProduct
                if(createdProduct!=null){
                    return true;
                }
                else {
                    return false;
                }
                //return "we are setting the data here is the id of user : "+jwtUtils.extractId(token)+"nom commerciale vendeur : "+userServiceImpl.findUserById(jwtUtils.extractId(token)).getSellerData().getNomcommerciale();

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }else {
            return false;
        }


    }
    @GetMapping("/FindUserProducts")
    public GetAdminVendeurProductResponse GetAllTheUserProducts( @RequestParam("token") String token ){

        GetAdminVendeurProductResponse response = new GetAdminVendeurProductResponse();

        List<Product> products = mongoTemplate.find(
                Query.query(Criteria.where("productOwnerId").is(jwtUtils.extractId(token))),
                Product.class
        );
        if(products.isEmpty() == true){
            response.setHaveproducts(false);
            return response;

        }else {
            response.setHaveproducts(true);
            response.setProducts(products);
            return response;
        }

    }
//List<Product>
    // productRepository.
    //        //Query query = new Query();
    //        //query.addCreteria
    //        //List<Product> products = mongoTemplate.find()
    //               // mongoTemplate.find(
    //               // Query.query(Criteria.where("productOwnerId").is(productOwnerId)),
    //               // Product.class
    //        //);
    //        //userServiceImpl.findUserById(jwtUtils.extractId(token))
    //        //userrepo.findById(jwtUtils.extractId(token)).

    @GetMapping(value = {"/getProducts"})
    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();
        // Convert the List<Product> to List<ProductDTO> if needed
        return products;
    }


    @GetMapping(value = {"/getProductById/{id}"})
    public Optional<Product> getProductById(@PathVariable String id) {
        Optional<Product> product = productRepository.findById(id);
        // Convert the List<Product> to List<ProductDTO> if needed
        //
        //...
        return product;
    }

    @DeleteMapping(value = "/delete/{productId}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> deleteProduct(@PathVariable String productId) {
        boolean deleted = productServicesImpl.deleteProductById(productId);
        if (deleted) {
            // Return a plain text response with a success message
            String response = "Product deleted successfully";
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to update a product by ID

    @PutMapping("/UpdateProducts/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Product> UpdateProduct(
            @PathVariable("id") String Id,
            @RequestParam("name") String name,
            @RequestParam("price") float price,
            @RequestParam("category") String category,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image,
            @RequestParam("urls") String urls
    ) {
        try {
            String imageUrl = fileUploadImpl.uploadFile(image);

            Optional<Product> optionalProduct = productRepository.findById(Id);
            if (optionalProduct.isEmpty()) {
                return ResponseEntity.notFound().build(); // Return 404 if the product is not found.
            }
            Product product = optionalProduct.get();
            product.setName(name);
            product.setPrice(price);
            product.setCategory(category);
            product.setDescription(description);
            product.setImageUrl(imageUrl);
            product.setUrls(urls);

            Product createdProduct = productRepository.save(product);
            System.out.println(createdProduct);
            return ResponseEntity.ok(createdProduct);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    //GHAYA MODIFICATIONS
    //fel ajout mte3 el product el adminn wel vendeur lezem y3adiw el tokens de connexion bech ynajmo y'ajoutiw el produit
    //w kif y'ajoutiw el produit w yet3adda el token kif ne5o token nverifi est ce que howa mte3 user conneccted welle w ba3d
    //ken l9ito mawjoud nchouf elli bech yzid e produit vendeur walla admin
    //ken admin
    @PostMapping("/regiterUserProduct")
    public  ResponseEntity<?> UserAddsHisProduct(@RequestParam String theToken ,@RequestBody String namep){
        //the request body n7ebb fih el token wel product data

        return  new ResponseEntity<>("I am working bro ",HttpStatus.BAD_REQUEST);
    }
    //bech na3mel link lel ajout product mte3 el admin wa7do
    // w link ajout product vendeur wa7do



    //link select product vendeur wa7do
    // w link select product admin wa7do

    @PostMapping("/AddMaSelection")
    public AddMaSelectionResponse  AddMaselection(@RequestParam("token") String token, @RequestParam("IdProduct") String IdProduct) {
        User user = userServiceImpl.findUserById(jwtUtils.extractId(token));
        AddMaSelectionResponse response= new AddMaSelectionResponse();
        List<String> maSelection = user.getMaSelction();
        if(jwtUtils.extractRole(token)==0 ){
            if(maSelection== null){
                List<String> newselection = new ArrayList<String>() ;
                newselection.add(IdProduct);
                user.setMaSelction(newselection);
                response.setProductAdded(true);
                response.setProductExiste(false);
                userrepo.save(user);
                response.setYoucantadd(false);
            }
            else {
                if(maSelection.contains(IdProduct)){
                    response.setProductAdded(false);
                    response.setProductExiste(true);
                    response.setYoucantadd(true);

                }
                else{
                    maSelection.add(IdProduct);
                    user.setMaSelction(maSelection);
                    //user.getMaSelction()
                    response.setProductExiste(false);
                    response.setProductAdded(true);
                    response.setYoucantadd(false);
                    userrepo.save(user);
                }
            }

        }else {
            response.setYoucantadd(true);
        }

        response.setUser(userServiceImpl.findUserById(jwtUtils.extractId(token)));
        return response;
    }

    @GetMapping("/GetMaSelection")
    //returns GetMaselectionListResponse
    public GetMaselectionListResponse getMaSelection(@RequestParam("token") String token){
        User user = userServiceImpl.findUserById(jwtUtils.extractId(token));
        GetMaselectionListResponse response = new GetMaselectionListResponse();
        List<String> maSelection = user.getMaSelction();
        if(jwtUtils.extractRole(token)==0){

            response.setCantHaveProducts(false);
            if(maSelection.isEmpty()){
                response.setListeVide(true);
                return response;

            }
            else {
                List<Product> thProducstData = new ArrayList<>();


                for(String productId : maSelection){
                    Product newp = productRepository.findById(productId).orElse(null);
                    //List<String> newselection = new ArrayList<String>() ;
                    thProducstData.add(newp);
                    //newselection.add(IdProduct);
                    //user.setMaSelction(newselection);
                }
                response.setListProduct(thProducstData);
                return response;

            }
        }
        else {
            //
            response.setListeVide(true);
            response.setCantHaveProducts(true);
            return response;

        }
        //return response;

    }
    @GetMapping("/getMaSelectionIds")
    public GetMaselectionIdsResponse getMaSelectionIds(@RequestParam("token") String token){
        List<String> maSelection = userServiceImpl.findUserById(jwtUtils.extractId(token)).getMaSelction();
        GetMaselectionIdsResponse respone = new GetMaselectionIdsResponse();
        if(maSelection.isEmpty()){
            respone.setExistP(false);
        }else{
            respone.setExistP(true);
            respone.setIdslist(maSelection);
        }
        return respone;
    }
    @DeleteMapping("/MaSelectionDeletePr")
    public boolean MaSelectionDeletePr(@RequestParam("token") String token, @RequestParam("IdProduct") String IdProduct){
        User user = userServiceImpl.findUserById(jwtUtils.extractId(token));
        //GetMaselectionListResponse response = new GetMaselectionListResponse();
        boolean response = false;
        List<String> maSelection = user.getMaSelction();
        if(maSelection != null && maSelection.contains(IdProduct)){
            maSelection.remove(IdProduct);
            user.setMaSelction(maSelection);
            userrepo.save(user);
            if(!maSelection.contains(IdProduct)){
                response = true;
            }else{
                response=false;
            }
        }
        
        return response;

    }
    @PostMapping("/AddsuivrePrix")
    public AddSuivrePrixResponse AddsuivrePrix(@RequestParam("token") String token, @RequestParam("IdProduct") String IdProduct ,@RequestParam("priceA") float priceA){
        //GetMaselectionListResponse response = new GetMaselectionListResponse();
        AddSuivrePrixResponse response =new AddSuivrePrixResponse();
        String id =jwtUtils.extractId(token);
        User user = userServiceImpl.findUserById(id);
        if(jwtUtils.extractRole(token)==0){
            response.setCantAdd(false);
            List<ProduitSuiviPrice> products = mongoTemplate.find(
                    Query.query(
                            new Criteria()
                                    .andOperator(
                                            Criteria.where("productid").is(IdProduct),
                                            Criteria.where("UserId").is(id) // Vérifie que le produit est en stock
                                    )
                    ),
                    ProduitSuiviPrice.class
            );


            if (products.isEmpty()) {
                ProduitSuiviPrice psp = new ProduitSuiviPrice();
                //psp.setId(UUID.randomUUID().toString()); // Génère un identifiant unique
                psp.setUserId(id);
                psp.setProductid(IdProduct);
                psp.setPriceAttendu(priceA);
                //sprepo.save(psp);
                sprepo.save(psp);
                //sprepo.delete(psp);
                response.setProductExist(false);
                response.setAdded(true);
                //got to addProduct w tab3o

            }else {
                response.setProductExist(true);
                response.setAdded(false);

            }

        }
        else {
            response.setCantAdd(true);
        }
        return  response;
    }
    @GetMapping("/GetUserSuivrePrix")
    public  GetUserSuivrePrixResponse GetUserSuivrePrix(@RequestParam("token") String token){
        String id =  jwtUtils.extractId(token);
        GetUserSuivrePrixResponse response = new GetUserSuivrePrixResponse();
        if(jwtUtils.extractRole(token)==0){
            response.setCanthahveproducts(false);
            List<ProduitSuiviPrice> productsp = mongoTemplate.find(
                    Query.query(Criteria.where("UserId").is(id)),
                    ProduitSuiviPrice.class
            );

            if (!productsp.isEmpty()) {
                response.setHaveproducts(true);
                List<SuivrePrixGetProduct> thProducstData = new ArrayList<>();

                for(ProduitSuiviPrice pd : productsp){
                    Product newp= new Product();
                    SuivrePrixGetProduct newd = new SuivrePrixGetProduct();
                    newp = productRepository.findById(pd.getProductid()).orElse(null);
                    if(newp!=null){
                        newd.setPrixAttendu(pd.getPriceAttendu());
                        newd.setProduct(newp);
                        thProducstData.add(newd);
                    }


                }
                response.setListProduct(thProducstData);
            }else {
                response.setHaveproducts(false);
            }


        }else {
            response.setCanthahveproducts(true);
        }
        return response;
    }
    //ena lehne

    @GetMapping("/getSuivrePrixIds")
    public List<String> getSuivrePrixIds(@RequestParam("token") String token){
        String id =  jwtUtils.extractId(token);
        GetUserSuivrePrixResponse response = new GetUserSuivrePrixResponse();
        response.setCanthahveproducts(false);
        List<ProduitSuiviPrice> productsp = mongoTemplate.find(
                Query.query(Criteria.where("UserId").is(id)),
                ProduitSuiviPrice.class
        );
        List<String> thProducstsIds= new ArrayList<>();
        if (!productsp.isEmpty()) {

            for(ProduitSuiviPrice pd : productsp){
                thProducstsIds.add(pd.getProductid());
            }
        }
        return thProducstsIds;
    }
    @GetMapping("GetUserSuivrePrixPrices")

    public List<SuivrePrixAttenduPrixActuelleResponse> GetUserSuivrePrixPrices(@RequestParam("token") String token){
        String id =  jwtUtils.extractId(token);
        List<SuivrePrixAttenduPrixActuelleResponse> response =new ArrayList<>();
        if(jwtUtils.extractRole(token)==0){
            List<ProduitSuiviPrice> productsp = mongoTemplate.find(
                    Query.query(Criteria.where("UserId").is(id)),
                    ProduitSuiviPrice.class
            );

            if (!productsp.isEmpty()) {


                for(ProduitSuiviPrice pd : productsp){
                    Product newp= new Product();
                    SuivrePrixAttenduPrixActuelleResponse newsp= new SuivrePrixAttenduPrixActuelleResponse();
                    newp = productRepository.findById(pd.getProductid()).orElse(null);
                    if(newp!=null){
                        newsp.setPrixactuelle(newp.getPrice());
                        newsp.setPrixattendue(pd.getPriceAttendu());
                        response.add(newsp);
                    }
                }
            }

        }
        return response;

    }



    @DeleteMapping("/DelteUserSuivrePrix")
    public  DelteUserSuivrePrixResponse DelteUserSuivrePrix(@RequestParam("token") String token, @RequestParam("IdProduct") String IdProduct ){
        //GetMaselectionListResponse response = new GetMaselectionListResponse();
        DelteUserSuivrePrixResponse response =new DelteUserSuivrePrixResponse();
        String id =jwtUtils.extractId(token);
        //User user = userServiceImpl.findUserById(id);
        if(jwtUtils.extractRole(token)==0){
            response.setCantdelte(false);
            List<ProduitSuiviPrice> products = mongoTemplate.find(
                    Query.query(
                            new Criteria()
                                    .andOperator(
                                            Criteria.where("productid").is(IdProduct),
                                            Criteria.where("UserId").is(id) // Vérifie que le produit est en stock
                                    )
                    ),
                    ProduitSuiviPrice.class
            );
            //nbadelha b is empty
            //it was products != null and i turned it to .isempty
            if (!products.isEmpty()) {

                for(ProduitSuiviPrice pd : products){
                    sprepo.delete(pd);
                }
                response.setExist(true);
                response.setDelted(true);

            }else {
                response.setExist(false);
                response.setDelted(false);

            }

        }
        else {
            response.setCantdelte(true);
        }
        return  response;
    }
    @PutMapping("/UpdateUserSuivrePrix")
    public  UpdateSuivrePrixRresponse UpdateUserSuivrePrix(@RequestParam("token") String token, @RequestParam("IdProduct") String IdProduct , @RequestParam("priceA") float priceA ){
        //GetMaselectionListResponse response = new GetMaselectionListResponse();
        UpdateSuivrePrixRresponse response =new UpdateSuivrePrixRresponse();
        String id =jwtUtils.extractId(token);
        //User user = userServiceImpl.findUserById(id);
        if(jwtUtils.extractRole(token)==0){
            response.setCantupdate(false);
            List<ProduitSuiviPrice> products = mongoTemplate.find(
                    Query.query(
                            new Criteria()
                                    .andOperator(
                                            Criteria.where("productid").is(IdProduct),
                                            Criteria.where("UserId").is(id) // Vérifie que le produit est en stock
                                    )
                    ),
                    ProduitSuiviPrice.class
            );
            // nbadelha b is empty
            //it was products != null i terned it to .isempty
            if (!products.isEmpty()) {

                for(ProduitSuiviPrice pd : products){
                    pd.setPriceAttendu(priceA);
                    sprepo.save(pd);
                }
                response.setExist(true);
                response.setUpdated(true);

            }else {
                response.setExist(false);
                response.setUpdated(false);

            }

        }
        else {
            response.setCantupdate(true);
        }
        return  response;
    }

    @PostMapping("/add")
    public ProduitSuiviPrice add(){
        ProduitSuiviPrice x = new ProduitSuiviPrice();
        x.setId("1111");
        x.setProductid("zaaa");
        x.setPriceAttendu(124);
        sprepo.save(x);
        return sprepo.save(x);
    }

    @PostMapping("/ProductAddRate")
    public  ProductAddRateResponse ProductAddRate(@RequestParam("token") String token, @RequestParam("IdProduct") String IdProduct , @RequestParam("note") Integer note , @RequestParam(value = "title" , required = false) String title , @RequestParam(value = "comment" , required = false) String comment ){

        String id = jwtUtils.extractId(token);
        ProductAddRateResponse response = new ProductAddRateResponse();
        if(jwtUtils.extractRole(token)==0){
             response.setCantRate(false);
             Product product =productRepository.findById(IdProduct).orElse(null);
             List<Integer> productRates=product.getRates();
            List<Rates> rates = mongoTemplate.find(
                    Query.query(
                            new Criteria()
                                    .andOperator(
                                            Criteria.where("idProduct").is(IdProduct),
                                            Criteria.where("idUser").is(id) // Vérifie que le produit est en stock
                                    )
                    ),
                    Rates.class
            );
            //rates.isEmpty();

            if (rates.isEmpty() ){
                if(productRates!=null){
                    productRates.add(note);
                    product.setRates(productRates);
                }else {
                    List<Integer> pnewrates = new ArrayList<>();
                    pnewrates.add(note);
                    product.setRates(pnewrates);
                }
                response.setRateGivenbefore(false);
                Rates newr = new Rates();
                newr.setComment(comment);
                newr.setTitle(title);
                newr.setIdProduct(IdProduct);
                newr.setIdUser(id);
                newr.setRate(note);
                productRepository.save(product);
                raterepo.save(newr);
                response.setRateadded(true);

            }else {
                response.setRateGivenbefore(true);
                response.setRateadded(false);
            }

        }else {
            response.setCantRate(true);
        }

        return response;

    }
    @GetMapping("/GetAllProductsWR")
    public void  GetAllProductsWR(){
        List<Product> allProducts = productRepository.findAll();
        for(Product pr : allProducts){
            //if()
        }

        List<Rates> productsRates = mongoTemplate.find(
                Query.query(Criteria.where("idProduct").is("id")),
                Rates.class
        );

    }

    @GetMapping("/Produitsimilaire")
    public List<Product> Produitsimilaire(@RequestParam("categorie") String categorie, @RequestParam("marque") String  marque){
        return productServicesImpl.ProduitSimilaire(categorie,marque);
    }
    @GetMapping("/SearchProductWithKey")
    public List<Product> SearchProductWithKey(@RequestParam("name") String name){
        return productServicesImpl.ProductWithsameName(name);
    }


    @GetMapping("TestProductESM")
    public TestProdcutESM TestProductESM( @RequestParam("token") String token ,@RequestParam("idP") String idP ){
        TestProdcutESM response = new  TestProdcutESM();
        User user = userServiceImpl.findUserById(jwtUtils.extractId(token));
        List<String> maSelection = user.getMaSelction();

        List<ProduitSuiviPrice> products = mongoTemplate.find(
                Query.query(
                        new Criteria()
                                .andOperator(
                                        Criteria.where("productid").is(idP),
                                        Criteria.where("UserId").is(jwtUtils.extractId(token)) // Vérifie que le produit est en stock
                                )
                ),
                ProduitSuiviPrice.class
        );
        if(!products.isEmpty()){
            response.setPESuivrePrix(true);
        }

        if(maSelection.contains(idP)){
            response.setPEmaselction(true);
        }
        return  response ;
    }

}
