package com.example.ElectroJwt.controllers;


import com.example.ElectroJwt.dtos.SellerDTO;
import com.example.ElectroJwt.models.Sellers;
import com.example.ElectroJwt.models.User;
import com.example.ElectroJwt.repositories.SellerRepository;
import com.example.ElectroJwt.repositories.UserRepository;
import com.example.ElectroJwt.services.AuthServiceImpl;
import com.example.ElectroJwt.services.UserServices.UserServiceImpl;
import com.example.ElectroJwt.utils.JwtUtils;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired private AuthServiceImpl authServiceImpl;
    private final UserServiceImpl userServiceImpl;

    //ghaya modifications
    @Autowired
    private  final UserRepository userrepo;

    @Autowired
    private SellerRepository sellerrepo;

    @Autowired
    private JwtUtils jwtUtils;

    //end ghaya modifications
    @Autowired
    public UserController(UserServiceImpl userServiceImpl, UserRepository userrepo) {
        this.userServiceImpl = userServiceImpl;
        //ghaya modifications
        this.userrepo = userrepo;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userServiceImpl.getAllUsers();
    }

    @GetMapping("/user")
    public User getUserByEmail(@RequestParam String email) {
        return authServiceImpl.findUserByEmail(email);
    }

    @GetMapping("/sellerDataSet")

    //Generate DTO Response for user Seller data
    public boolean sellerDataSet( @RequestParam String token ) {
        if( authServiceImpl.findUserByEmail(jwtUtils.extractUsername(token)).getSellerData()==null)
        {
            return false;
        }else{
            return true;

        }
        //if(jwtUtils.extractRole(token)==1 && authServiceImpl.findUserByEmail(jwtUtils.extractUsername(token)).getSellerData()!=null){
        //}

    }

    @DeleteMapping("/deleteByEmail")
    public ResponseEntity<String> deleteUserByEmail(@RequestParam String email) {
        try {
            userServiceImpl.deleteUserByEmail(email);
            return ResponseEntity.ok("User deleted successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/UpdateUser/{email}")
    public ResponseEntity<String> updateUser(@PathVariable String email, @RequestBody User updatedUser) {
        boolean updated = userServiceImpl.updateUserByEmail(email, updatedUser);

        if (updated) {
            return ResponseEntity.ok("User updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update-email")
    public ResponseEntity<User> updateUserEmail(
            @RequestParam String email,
            @RequestParam String newEmail) {
        User updatedUser = userServiceImpl.updateUserEmail(email, newEmail);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/update/UsernamePhone")
    public ResponseEntity<String> updateUserInfo(@RequestParam String email,
                                                 @RequestParam String newUsername,
                                                 @RequestParam String newPhoneNumber) {
        if (userServiceImpl.updateUserInformation(email, newUsername, newPhoneNumber)) {
            return ResponseEntity.ok("User information updated successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestParam String email, @RequestParam String newPassword) {
        boolean passwordUpdated = userServiceImpl.updatePassword(email, newPassword);
        if (passwordUpdated) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    //User Vendeur data GHaya Updates
    @PostMapping("/Vendeur-Info")
    public boolean SetVendeurData( @RequestParam("token") String token, @RequestParam("localistion") String localistion , @RequestParam("nomcom") String nomcom , @RequestParam("url") String url){
        if (userServiceImpl.findUserById(jwtUtils.extractId(token)) != null && userServiceImpl.findUserById(jwtUtils.extractId(token)).getSellerData() == null && jwtUtils.extractRole(token)==1) {
            User user = userServiceImpl.findUserById(jwtUtils.extractId(token));
            Sellers sellerdata = new Sellers();
            sellerdata.setLocalisation(localistion);
            sellerdata.setSiteUrl(url);
            sellerdata.setNomcommerciale(nomcom);
            sellerrepo.save(sellerdata);
            user.setSellerData(sellerdata);
            userrepo.save(user);
            return  true;
        }
        else {
            return false;
        }

    }
    @GetMapping("/GetSellerData")
    public Sellers GetSellerData(@RequestParam("token") String token){
        User user = userServiceImpl.findUserById(jwtUtils.extractId(token));
        Sellers sellerdata = user.getSellerData();
        return sellerdata;
    }
    @PostMapping("/Update-Vendeur-Info")
    public String updateVendeurData( @RequestParam("token") String token, @RequestParam("localistion") String localistion , @RequestParam("nomcom") String nomcom , @RequestParam("url") String url){
        //if (userServiceImpl.findUserById(jwtUtils.extractId(token)) != null && userServiceImpl.findUserById(jwtUtils.extractId(token)).getSellerData() != null && jwtUtils.extractRole(token)==1) {
            //User user = userServiceImpl.findUserById(jwtUtils.extractId(token));
            //Sellers sellerdata = user.getSellerData();
            //sellerdata.setSiteUrl(url);
            //sellerdata.setNomcommerciale(nomcom);
            //sellerrepo.save(sellerdata);
            //user.setSellerData(sellerdata);
            //userrepo.save(user);
            return  "i am working";
        //}
        //else {
          //  return "not working ";
        //}

    }
    @PostMapping("/UpdateSeller")
    public  boolean  amworking(@RequestParam("token") String token ,@RequestParam("localistion") String localistion , @RequestParam("nomcom") String nomcom , @RequestParam("url") String url ){
        if (userServiceImpl.findUserById(jwtUtils.extractId(token)) != null && userServiceImpl.findUserById(jwtUtils.extractId(token)).getSellerData() != null && jwtUtils.extractRole(token)==1) {
            User user = userServiceImpl.findUserById(jwtUtils.extractId(token));
            Sellers sellerdata = user.getSellerData();
            if(url!=null){
                sellerdata.setSiteUrl(url);
            }
            if(nomcom!=null){
                sellerdata.setNomcommerciale(nomcom);
            }
            if(localistion!=null){
                sellerdata.setLocalisation(localistion);
            }

            sellerrepo.save(sellerdata);
            user.setSellerData(sellerdata);
            userrepo.save(user);
            return true ;
            //ResponseEntity.ok().body("Seller updated successfully")
        }else{
            return false;
            //ResponseEntity.badRequest().body("Seller not updated, check your data")
        }

        //return token;
    }


}




