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
  username: string = '';
  password: string = '';


  constructor(private authService: MsalService) { }

  ngOnInit(): void {
    this.authService.instance.handleRedirectPromise().then((res) => {
      if (res !== null && res.account !== null) {
        this.authService.instance.setActiveAccount(res.account);
      }
    });
  }

  login() {
    this.authService.loginRedirect();
  }

  logout() {
    this.authService.logoutRedirect();
  }
}
