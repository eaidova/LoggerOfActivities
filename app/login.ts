import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginService} from './services/login.service';
export class LoginingForm {
    @Input() ID: number;
    @Input() Login: string;
    @Input() Password: string;
    
}
@Component({
    selector: 'login',
      styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `],
    template: `<div> 
                    <div class="form-group">
                        <label>Логин</label>
                        <input class="form-control" name="Login" [(ngModel)]="user.Login" #Login="ngModel" required />
                    </div>
                    <div class="form-group">
                        <label>Пароль</label>
                        <input class="form-control" name="Password" [(ngModel)]="user.Password" #Password="ngModel" required />
                    </div>
                    <div class="form-group">
                        <button [disabled]=" Login.invalid || Password.invalid "
                                class="btn btn-default" (click)="LogIn()">Войти</button>
                    </div>
              </div>`
})
export class LoginComponent {
    constructor(private _loginService: LoginService) { }
    user: LoginingForm = new LoginingForm();
    //@Output() logined = new EventEmitter<boolean>();
    @Output() changedID = new EventEmitter<number>();
    isNotError: boolean = true;
    public LogIn()
    {
        this._loginService.get('api/autorization', this.user.Login, this.user.Password).subscribe(user => 
		{
			this.user = user; 
			this.isNotError = true;  
			this.changedID.emit(user.ID); 
		},
		error => 
		{
            console.log(error);
            this.isNotError = false;
        });
    }
    }