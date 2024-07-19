import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MsalGuard, MsalRedirectComponent} from '@azure/msal-angular';
/*import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';*/

const routes: Routes = [
  { path: 'auth-callback', component: MsalRedirectComponent },
/*  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [MsalGuard] }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
