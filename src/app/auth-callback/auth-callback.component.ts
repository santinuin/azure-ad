import {Component, OnInit} from '@angular/core';
import {MsalService} from "@azure/msal-angular";
import {AuthenticationResult} from "@azure/msal-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  constructor(private authService: MsalService, private router: Router) { }

  ngOnInit(): void {
    this.authService.instance.handleRedirectPromise().then((res: AuthenticationResult | null) => {
      if (res !== null && res.account !== null) {
        this.authService.instance.setActiveAccount(res.account);
        this.router.navigate(['/']); // Redirige a la página principal u otra página después de la autenticación
      }
    }).catch(console.error);
  }
}
