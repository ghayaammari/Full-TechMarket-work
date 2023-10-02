import { UserLogin } from './../../classes/UserLogin';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../../classes/User';
import { LoginResponse } from '../../classes/LoginResponse';
import { authenticationResponse } from 'src/app/classes new/authenticationResponse';
import { sellerdatagetted } from 'src/app/classes/sellerdatagetted';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:6002';
  authentificationURL = 'http://localhost:6002/authenticate';
  forgotUrl = 'http://localhost:6002/forgotPassword';
  apigetUsersUrl = 'http://localhost:6002/api/users';
  getUserByEmailUrl = 'http://localhost:6002/api/user';
  deleteUserUrl = 'http://localhost:6002/api/deleteByEmail';
  SellerDataIsSetUrl='http://localhost:6002/api/sellerDataSet'
  token = localStorage.getItem('Token')
  name=localStorage.getItem('userName')
  role=localStorage.getItem('role')
  constructor(private httpClient: HttpClient) {}

  //Post Methode to Send CreatedUser To MongoDB
  addUser(user?: User): Observable<Object> {
    return this.httpClient.post<Object>(`${this.baseUrl}/register`, user);
  }

  getAllUsers(): Observable<User[]> {
    // Get the token from localStorage using the provided token name
    const token = localStorage.getItem('Token');

    // Set up the headers with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Assuming your API uses Bearer token authentication
    });
    return this.httpClient.get<User[]>(this.apigetUsersUrl, { headers });
  }

  getUserByEmail(email: string): Observable<any> {
    // Get the token from localStorage using the provided token name
    const token = localStorage.getItem('Token');

    // Set up the headers with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Assuming your API uses Bearer token authentication
    });
    const url = `${this.getUserByEmailUrl}?email=${email}`;
    return this.httpClient.get<any>(url, { headers });
  }
  SellerDataIsSet():Observable <boolean>{
    const tokenl=localStorage.getItem('Token')
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokenl}`, 
      // Assuming your API uses Bearer token authentication
    });
    const url = `${this.SellerDataIsSetUrl}?token=${tokenl}`
    return this.httpClient.get<boolean>(url ,{ headers })
    // return false 
  }

  //Post Methode to Login
  //LoginResponse
  Login(userLogin?: UserLogin): Observable<authenticationResponse> {
    return this.httpClient
      .post<authenticationResponse>(`${this.baseUrl}/authenticate`, userLogin)
      .pipe(
        tap((response) => {
          console.log(response);
          
        })
      );
  }
  // login2(userLogin?: UserLogin): Observable<authenticationResponse> {
  //   return this.httpClient
  //     .post<authenticationResponse>(`{this.authentificationURL}`, userLogin)
  //     .pipe(
  //       tap((response) => {
  //         console.log(response);
  //         const token = response.jwt.toString();
  //         localStorage.setItem('token', token);
  //         localStorage.setItem('name', response.name.toString());
  //         localStorage.setItem('role', response.role.toString());
  //       })
  //     );
  // }

  //Get Method to pubilsh secret message
  hello(): Observable<Object> {
    // Retrieve the token from wherever it is stored (e.g., local storage, session storage)
    const token = localStorage.getItem('Token');

    // Create the headers object and set the Authorization header with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Make the GET request with the headers
    return this.httpClient.get<Object>(`${this.baseUrl}/api/hello`, {
      headers,
    });
  }

  ForgotPassword(adress?: any): Observable<string> {
    const url = `${this.forgotUrl}/${adress}`;
    console.log(url);
    alert('An email verification link will be sent to you');
    return this.httpClient.get<string>(`${this.forgotUrl}/${adress}`);
  }

  deleteUserByEmail(email: string): Observable<any> {
    const url = `${this.deleteUserUrl}/deleteByEmail`;
    return this.httpClient.delete(this.deleteUserUrl, { params: { email } });
  }

  updateUser(email: string, updatedUser: any): Observable<any> {
    const url = `${this.baseUrl}/api/UpdateUser/${email}`;
    return this.httpClient.put(url, updatedUser);
  }

  updateUserEmail(email: string, newEmail: string): Observable<User> {
    const url = `${this.baseUrl}/api/update-email?email=${email}&newEmail=${newEmail}`;
    return this.httpClient.put<User>(url, null); // Sending null as request body
  }

  updateUserInfo(
    email: string,
    newUsername: string,
    newPhoneNumber: string
  ): Observable<any> {
    const url = `http://localhost:6002/api/update/UsernamePhone`;

    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    });

    const body = new HttpParams()
      .set('email', email)
      .set('newUsername', newUsername)
      .set('newPhoneNumber', newPhoneNumber);

    return this.httpClient.post(url, body.toString(), { headers });
  }

  updatePassword(email: string, newUserPasword: string): Observable<any> {
    const url = `http://localhost:6002/api/updatePassword`;

    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    });

    const body = new HttpParams()
      .set('email', email)
      .set('newPassword', newUserPasword);

    return this.httpClient.post(url, body.toString(), { headers });
  }


  GetVendeurData( token : any ): Observable<sellerdatagetted> {
    const url = `http://localhost:6002/api/GetSellerData`;    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const params = { token: token };

    return this.httpClient.get<sellerdatagetted>(url, {headers , params});
  }


  AddVendeurData(token: any, localisation: string, nomcom: string, url: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const params = new HttpParams()
      .set('token', token)
      .set('localistion', localisation)
      .set('nomcom', nomcom)
      .set('url', url);

    const urls = `${this.baseUrl}/api/Vendeur-Info`; // URL complète de l'endpoint

    return this.httpClient.post<any>(urls, null, { headers, params });
  }

  updateSeller(token: any, localistion: string, nomcom: string, url: string): Observable<any> {
    // const formData = new FormData();

    const params = new HttpParams()
      .set('token', token)
      .set('localistion', localistion)
      .set('nomcom', nomcom)
      .set('url', url);
    // formData.append('token', token);

    // // if (localistion) {
    //   formData.append('localistion', localistion);
    // // }

    // // if (nomcom) {
    //   formData.append('nomcom', nomcom);
    // // }

    // // if (url) {
    //   formData.append('url', url);
    // }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const urls = "http://localhost:6002/api/UpdateSeller";
    return this.httpClient.post<any>(urls, null, { headers, params });
  }

// new 
  

}
