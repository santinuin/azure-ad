import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import {MsalModule, MsalService, MsalBroadcastService, MsalRedirectComponent, MSAL_INSTANCE} from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

function MSALInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: 'dba4713e-bd90-46ab-b400-97d8404dcb68', // Reemplaza con tu Client ID
      authority: 'https://login.microsoftonline.com/40523114-33e9-4755-8a7d-ba5679e55c52', // Reemplaza con tu Tenant ID
      redirectUri: 'http://localhost:8080/api/rest/v1/auth/login', // Reemplaza con la URL de tu aplicación
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
    },
  });
}

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    MsalModule.forRoot(MSALInstanceFactory(), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    })
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
    MsalBroadcastService,
    {
      provide: APP_INITIALIZER,
      useFactory: (msalService: MsalService) => () => msalService.instance.initialize(),
      deps: [MsalService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
