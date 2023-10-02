import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionUserComponent } from './connexion-user/connexion-user.component';
import { RegistrationUserComponent } from './registration-user/registration-user.component';
import { ConnexionAdminComponent } from './connexion-admin/connexion-admin.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './DashboardVue/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmedPasswordComponent } from './confirmed-password/confirmed-password.component';
import { GerervendeurComponent } from './DashboardVue/GererVendeurComponents/gerervendeur/gerervendeur.component';
import { GererComponent } from './DashboardVue/GererProduitComponents/ManageProduct/gerer.component';
import { AjouterComponent } from './DashboardVue/GererProduitComponents/AddProduct/ajouter.component';
import { ModifierComponent } from './DashboardVue/GererProduitComponents/UpdateProduct/modifier.component';
import { ConsulterComponent } from './DashboardVue/GererProduitComponents/CheckProducts/consulter.component';
import { ParametrecompteComponent } from './DashboardVue/settingsVendeurAdmin/parametrecompte/parametrecompte.component';
import { ParametreconsommateurComponent } from './DashboardVue/ConsumerComponents/parametreconsommateur/parametreconsommateur.component';
import { ParametreboutiqueComponent } from './DashboardVue/settingsVendeurAdmin/parametreboutique/parametreboutique.component';
import { MaSelectionComponent } from './DashboardVue/ConsumerComponents/ma-selection/ma-selection.component';
import { HeaderComponent } from './HomeVue/header/header.component';
import { BannerComponent } from './HomeVue/HomeSection/banner/banner.component';
import { FooterComponent } from './HomeVue/HomeSection/footer/footer.component';
import { CommentComponent } from './HomeVue/HomeSection/commentaire/comment.component';
import { Section3Component } from './HomeVue/HomeSection/section3/section3.component';
import { BestSellingComponent } from './HomeVue/HomeSection/best-selling/best-selling.component';
import { HomeComponent } from './HomeVue/HomeSection/home/home.component';
import { FilterComponent } from './FilterPage/Filter/filter/filter.component';
import { ProductredirectpageComponent } from './FilterPage/RedirectFilterpageComponents/productredirectpage/productredirectpage.component';
import { SuivrePrixComponent } from './DashboardVue/ConsumerComponents/suivre-prix/suivre-prix.component';

const routes: Routes = [
  { path: 'ConnexionUser', component: ConnexionUserComponent },
  { path: 'ConnexionUser/:sender', component: ConnexionUserComponent },
  { path: 'RegistrationUser', component: RegistrationUserComponent },
  { path: 'ConnexionAdmin', component: ConnexionAdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'reset', component: ConfirmedPasswordComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'banner', component: BannerComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'commentaire', component: CommentComponent },
  { path: 'section', component: Section3Component },
  { path: 'bestselling', component: BestSellingComponent },
  { path: '', component: HomeComponent },
  { path: 'filter', component: FilterComponent },
  /* { path: '', redirectTo: 'filter', pathMatch: 'full' },*/
  { path: 'produit/:id', component: ProductredirectpageComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      //gerer vendeur un seul component btbi3to
      { path: 'gerervendeur', component: GerervendeurComponent },
      { path: 'modifier/:id', component: ModifierComponent },
      {
        path: 'gererProduct',
        component: GererComponent,
        children: [
          { path: 'ajouter', component: AjouterComponent },

          { path: 'consulter', component: ConsulterComponent },
        ],
      },
      /*{ path: 'modifier/:id', component: ModifierComponent },
      { path: 'consulter', component: ConsulterComponent },
      { path: 'ajouter', component: AjouterComponent },*/
      { path: 'parametre', component: ParametrecompteComponent },
      {
        path: 'parametreconsommateur/:email',
        component: ParametreconsommateurComponent,
      },
      { path: 'parametre-boutique', component: ParametreboutiqueComponent },
      { path: 'ma-selection', component: MaSelectionComponent },
      { path: 'mes-notifications', component: SuivrePrixComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
