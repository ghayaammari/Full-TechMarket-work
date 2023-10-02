package com.example.ElectroJwt.controllers;


import com.example.ElectroJwt.dtos.AuthenticationRequest;
import com.example.ElectroJwt.dtos.AuthenticationResponse;
import com.example.ElectroJwt.dtos.AuthenticationResponseNewVersion;
import com.example.ElectroJwt.repositories.UserRepository;
import com.example.ElectroJwt.services.jwt.UserDetailsServiceImpl;
import com.example.ElectroJwt.utils.JwtUtils;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;


    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    //ena zedtha
    @Autowired
    private UserRepository userrepo;

    @Autowired
    private JwtUtils jwtUtils;
    @PostMapping("/authenticate")
    //el return ken  AuthenticationResponse AuthenticationResponseNewVersion
    public  AuthenticationResponseNewVersion createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws BadCredentialsException, DisabledException, UsernameNotFoundException, IOException, java.io.IOException {
            try {
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),authenticationRequest.getPassword()));
            }catch (BadCredentialsException e){
                throw new BadCredentialsException("Incorrect Username or password");
            }catch (DisabledException disabledException){
                response.sendError(HttpServletResponse.SC_NOT_FOUND , "User Is Not Created Yet ");
                return null;
            }
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail()) ;
            //userrepo.findFirstByEmail(authenticationRequest.getEmail()).
            final String jwt = jwtUtils.generateToken(userDetails.getUsername());

            //                                                               NameUser     EmailUser      RoleUser

            //String x =  Integer.toString(userrepo.findFirstByEmail(authenticationRequest.getEmail()).getRole());
            final String jwtnewversion = jwtUtils.generateTokenNewVersion(  userrepo.findFirstByEmail(authenticationRequest.getEmail()).getName() , userDetails.getUsername() , userrepo.findFirstByEmail(authenticationRequest.getEmail()).getRole() ,  userrepo.findFirstByEmail(authenticationRequest.getEmail()).getId());
            //userDetails.ge
            //userDetailsService.
            //return new AuthenticationResponse(jwt);
            //return new AuthenticationResponse(jwtnewversion);
            return new AuthenticationResponseNewVersion(jwtnewversion, jwtUtils.extractRole(jwtnewversion), jwtUtils.extractName(jwtnewversion),jwtUtils.extractUsername(jwtnewversion));
            //return "web token :" + jwtnewversion +"role : "+jwtUtils.extractRole(jwtnewversion) +"user name : " + jwtUtils.extractName(jwtnewversion);
            //GHAYA MODIFICATIONS
            //N7EB wa9telli na3mel authentication Ken howa vendeur ne5o data mte3o
            // lkoll data lkoll mte3 el user ya3ni
            // n7eb keno consumer


    }


}
