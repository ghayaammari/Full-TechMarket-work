import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as e from 'cors';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/Services/UserService/user.service';
import { sellerdata } from 'src/app/classes/sellerDatatoregister';
import { sellerdatagetted } from 'src/app/classes/sellerdatagetted';
import { window } from 'rxjs';

@Component({
  selector: 'app-parametreboutique',
  templateUrl: './parametreboutique.component.html',
  styleUrls: ['./parametreboutique.component.css'],
})
export class ParametreboutiqueComponent implements OnInit {
  boutique = new sellerdata();
  theDataLoaded!: boolean;
  the_sellerdata!: sellerdatagetted;
  the_sellerdata_toregister!: any;
  token = localStorage.getItem('Token');

  nomcom = '';
  url = '';
  local = '';
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.userService.SellerDataIsSet().subscribe(
      (result) => {
        console.log('Seller Data is set:', result);
        if (result) {
          this.theDataLoaded = true;
          console.log('the data is set = ' + result);
          const token = localStorage.getItem('Token');
          this.userService.GetVendeurData(token).subscribe((result) => {
            console.log(result);
            this.the_sellerdata = result;
            this.nomcom = this.the_sellerdata.nomcommerciale;
            this.url = this.the_sellerdata.siteUrl;
            this.local = this.the_sellerdata.localisation;
          });
        } else {
          this.theDataLoaded = false;
        }
      },
      (error) => {
        alert('Some thing wrong happend try later !');

      }
    );

    this.theDataLoaded = true;
  }

  modifierParametres() {
    if (this.theDataLoaded) {
      const token = localStorage.getItem('Token');
      console.log('iam under data loaded =' + this.theDataLoaded);

      this.userService
        .updateSeller(token, this.local, this.nomcom, this.url)
        .subscribe(
          (response) => {
            console.log(response);
            if(response){
              alert("data uppdated successfully !!")
              this.route.navigate(['/dashboard/parametre-boutique'])
            }
            
            
          }
        );
      // }

    } else {
      const token = localStorage.getItem('Token');
      this.userService.AddVendeurData(token, this.local, this.nomcom, this.url).subscribe((response) => {
            console.log(response); 
          },
          (error) => {
            console.error('An error occurred:', error);
          }
        );
    }
  }
}
