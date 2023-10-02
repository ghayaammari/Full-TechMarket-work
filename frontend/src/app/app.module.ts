import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionUserComponent } from './connexion-user/connexion-user.component';
import { RegistrationUserComponent } from './registration-user/registration-user.component';
import { ConnexionAdminComponent } from './connexion-admin/connexion-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './DashboardVue/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmedPasswordComponent } from './confirmed-password/confirmed-password.component';
import { ParametreboutiqueComponent } from './DashboardVue/settingsVendeurAdmin/parametreboutique/parametreboutique.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { GererComponent } from './DashboardVue/GererProduitComponents/ManageProduct/gerer.component';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AjouterComponent } from './DashboardVue/GererProduitComponents/AddProduct/ajouter.component';
import { ConsulterComponent } from './DashboardVue/GererProduitComponents/CheckProducts/consulter.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModifierComponent } from './DashboardVue/GererProduitComponents/UpdateProduct/modifier.component';
import { CommonModule } from '@angular/common';
import { GerervendeurComponent } from './DashboardVue/GererVendeurComponents/gerervendeur/gerervendeur.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './HomeVue/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { BannerComponent } from './HomeVue/HomeSection/banner/banner.component';
import { CommentComponent } from './HomeVue/HomeSection/commentaire/comment.component';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Section3Component } from './HomeVue/HomeSection/section3/section3.component';
import { BestSellingComponent } from './HomeVue/HomeSection/best-selling/best-selling.component';
import { HomeComponent } from './HomeVue/HomeSection/home/home.component';
import { FooterComponent } from './HomeVue/HomeSection/footer/footer.component';
import { ProductBoxComponent } from './FilterPage/Filter/product-box/product-box.component';
import { AlertFormComponent } from './FilterPage/Filter/alert-form/alert-form.component';
import { FilterComponent } from './FilterPage/Filter/filter/filter.component';
import { CardProduitsimilaireComponent } from './FilterPage/RedirectFilterpageComponents/card-produitsimilaire/card-produitsimilaire.component';
import { PopupAvisComponent } from './FilterPage/RedirectFilterpageComponents/popup-avis/popup-avis.component';
import { ProductredirectpageComponent } from './FilterPage/RedirectFilterpageComponents/productredirectpage/productredirectpage.component';
import{MaSelectionComponent} from './DashboardVue/ConsumerComponents/ma-selection/ma-selection.component'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';

import { ParametreconsommateurComponent } from './DashboardVue/ConsumerComponents/parametreconsommateur/parametreconsommateur.component';
import { ParametrecompteComponent } from './DashboardVue/settingsVendeurAdmin/parametrecompte/parametrecompte.component';
import { SuivrePrixComponent } from './DashboardVue/ConsumerComponents/suivre-prix/suivre-prix.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionUserComponent,
    RegistrationUserComponent,
    ConnexionAdminComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ConfirmedPasswordComponent,
    GererComponent,
    AjouterComponent,
    ConsulterComponent,
    ModifierComponent,
    GerervendeurComponent,
    HeaderComponent,
    BannerComponent,
    CommentComponent,
    Section3Component,
    BestSellingComponent,
    HomeComponent,
    FooterComponent,
    ProductBoxComponent,
    AlertFormComponent,
    FilterComponent,
    CardProduitsimilaireComponent,
    PopupAvisComponent,
    ProductredirectpageComponent,
    ParametreconsommateurComponent,
    ParametrecompteComponent,
    ParametreboutiqueComponent,
    MaSelectionComponent,
    SuivrePrixComponent
    ],
  imports: [
    NgbAlertModule,
    NgbPaginationModule,
    MatMenuModule,
    CarouselModule,
    NgbCarouselModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    CommonModule,
    CarouselModule,
    MatGridListModule,
    MatExpansionModule,
    MatTreeModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule

  ],
  providers: [],
  bootstrap: [AppComponent]
  // ,HeaderComponent,HomeComponent
})
export class AppModule { }
