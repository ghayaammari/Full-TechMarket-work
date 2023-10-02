package com.example.ElectroJwt.utils;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtils {
    private static final String SECRET = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
    //Extarct user name no9sed beha el email  5aterha version amine
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }


    public <T> T extractClaim(String token , Function<Claims,T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public String generateToken(String username){
        Map<String,Object> claims = new HashMap<>();
        return createToken(claims,username);
    }

    private String createToken(Map<String, Object> claims, String username) {
        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*24))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }



    private Key getSignKey() {
        byte[] keyByte = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyByte);
    }

    // Start Ghaya modifications
    //n7eb ngeni el token bel username wel email wel role
    public  String generateTokenNewVersion(String NameUser , String EmailUser , Integer RoleUser , String id){
        Map<String,Object> claims = new HashMap<>();
        claims.put("name",NameUser);
        claims.put("role",RoleUser);
        claims.put("id",id);
        return createTokenNewVersion(claims,EmailUser);
    }

    private String createTokenNewVersion(Map<String , Object> claims , String email ){
        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*24))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();

    }
    //public Date extratctRole(String token ){ return  extractClaim(token, Claims::getExpiration); }
    public String extractName(String token) {
        return extractClaimNewVersion(token, claims -> claims.get("name", String.class));
    }

    public Integer extractRole(String token) {
        return extractClaimNewVersion(token, claims -> claims.get("role", Integer.class));
    }
    public String extractId(String token){
        return extractClaimNewVersion(token , claims -> claims.get("id",String.class));
    }

    private <T> T extractClaimNewVersion(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    //end modification ghaya
    //Start Modification GHaya CreateTokenV2

        //private String CreateTokneV2(){

        //}

}
