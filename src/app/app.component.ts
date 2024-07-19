import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Azure AD Integration';
  accessToken: string | null = null;

  constructor(private authService: MsalService) { }

  async ngOnInit(): Promise<void> {
    await this.authService.instance.initialize();

    this.authService.instance.handleRedirectPromise().then((res: AuthenticationResult | null) => {
      if (res !== null && res.account !== null) {
        this.authService.instance.setActiveAccount(res.account);

        //Asignar Token y setearlo en el sessionStorage
        this.accessToken = res.accessToken;
        this.setTokenInSessionStorage(res.accessToken);
      }
    }).catch(console.error);
  }

  setTokenInSessionStorage(token: string | null) {
    if(token) {
      sessionStorage.setItem('accessToken', token);
    }
  }

  login() {
    this.authService.loginRedirect();
  }

  logout() {
    this.authService.logoutRedirect();
  }

  isLoggedIn(): boolean {
    return this.authService.instance.getAllAccounts().length > 0;
  }

  getToken() {
    console.log( 'Token:', this.accessToken)
    return this.accessToken;
  }
}
