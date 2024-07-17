import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
/*import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';*/

const routes: Routes = [
/*  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [MsalGuard] }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
