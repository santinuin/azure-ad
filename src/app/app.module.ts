import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MsalModule, MsalService, MsalGuard, MsalBroadcastService, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: 'YOUR_CLIENT_ID', // Sustituye por tu Client ID
        authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Sustituye por tu Tenant ID
        redirectUri: 'http://localhost:4200' // URL de tu aplicación Angular
      },
      cache: {
        cacheLocation: 'localStorage',
        /*storeAuthStateInCookie: isIE,*/ // set to true for IE 11
      }
    }), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    }),
    FormsModule
  ],
  providers: [MsalService, MsalGuard, MsalBroadcastService],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
