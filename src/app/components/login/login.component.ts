import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginSuccess: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  // translate
  bntStyle: string = '';
  lang: string = '';
  arabicButton: any;
  englishButton: any;

  constructor(private authService: AuthService, private router: Router,private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.englishButton = true;
  }

  onLogin() {
    if (this.username === 'admin' && this.password === 'admin') {
        this.isAdmin = true;
        this.loginSuccess = true;

        // Simulate loading for 1 seconds (replace with your actual loading logic)
        setTimeout(() => {
          this.authService.login(this.username,this.password);
        }, 1000);
      
    } else if(this.username === 'user' && this.password === 'user') {
        this.isUser = true;
        this.loginSuccess = true;

        // Simulate loading for 1 seconds (replace with your actual loading logic)
        setTimeout(() => {
          this.authService.login(this.username,this.password);
        }, 1000);
    }
}

// Toggle language
useLanguage(event:any) {
  this.translate.use(event.target.value);
}
}
