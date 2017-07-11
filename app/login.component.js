"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const login_service_1 = require('./services/login.service');
const autorization_model_1 = require('./models/autorization.model');
let LoginComponent = class LoginComponent {
    constructor(loginService) {
        this.loginService = loginService;
        this.user = new autorization_model_1.LoginingForm();
        this.changedID = new core_1.EventEmitter();
        this.isNotError = true;
    }
    LogIn() {
        this.loginService.Get(this.user.Login, this.user.Password).subscribe(user => {
            this.user = user;
            this.isNotError = true;
            this.changedID.emit(user.ID);
        }, error => {
            console.log(error);
            this.isNotError = false;
        });
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], LoginComponent.prototype, "changedID", void 0);
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `],
        templateUrl: './app/html/login.component.html'
    }), 
    __metadata('design:paramtypes', [login_service_1.LoginService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map