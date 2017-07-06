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
const time_log_service_1 = require('./services/time-log.service');
const user_service_1 = require('./services/user.service');
const user_model_1 = require('./models/user.model');
const timer_1 = require('./models/timer');
let TableComponent = class TableComponent {
    constructor(userService, timeLogService) {
        this.userService = userService;
        this.timeLogService = timeLogService;
        this.user = new user_model_1.User();
        this.logined = false;
        this.timeLogs = [];
        this.timer = new timer_1.Timer();
    }
    GetTimeLogs() {
        this.timeLogService.GetData(this.user.ID).subscribe(logs => {
            this.timeLogs = logs;
            if (this.timeLogs[0].Status == 1) {
                this.timeLogs[0].SpendingTime = new Date(50 * 60);
                this.timer.SetStartTime(this.timeLogs[0].SpendingTime);
                this.timer.Start();
            }
        }, error => {
            console.log(error);
        });
    }
    OnChanged(id) {
        this.user.ID = id;
        console.log(id);
        this.logined = true;
        this.userService.Get(this.user.ID).subscribe(user => {
            this.user = user;
            this.GetTimeLogs();
        }, error => {
            console.log(error);
        });
    }
    Exit() {
        this.user.Name = "";
        this.logined = false;
    }
    Start(timeLog) {
        this.timeLogService.SetStatus(timeLog.TaskID, 1);
        this.GetTimeLogs();
    }
    Stop(timeLog) {
        this.timeLogService.SetStatus(timeLog.TaskID, 2);
        this.GetTimeLogs();
    }
    Pause(timeLog) {
        this.timeLogService.SetStatus(timeLog.TaskID, 3);
        this.GetTimeLogs();
    }
};
TableComponent = __decorate([
    core_1.Component({
        selector: 'table-logs',
        template: `<div class="userPanel" *ngIf="logined"> Сотрудник: {{user.Name}}        
                    <button class="btn btn-default" (click)="Exit()">Выйти</button>
               <table class="table table-striped">
                   <thead>
                       <tr>
                          <th>Проект</th>
                          <th>Позиция</th>
                          <th>Время начала</th>
                          <th>Потраченное время</th>
                          <th>Время завершения</th>
                          <th></th>
                          <th></th>
                          <th></th>
                      </tr>
					  </thead>
					  <tr *ngFor="let timeLog of timeLogs">
					  <td> {{timeLog.Project.Name}} </td>
					  <td> {{timeLog.Activity.Position}} </td>
					  <td >{{timeLog.StartWorkTime | date:"dd/MM/yyyy hh:mm"}} </td>
					  <td *ngIf="timeLog.Status!=1">	{{timeLog.SpendingTime | emptyDate }} </td>
                      <td *ngIf="timeLog.Status==1">   {{timer.time | numberDate }} </td>
					  <td>  {{timeLog.EndWorkTime | emptyDate }} </td>
					  <td> <button class="btn btn-default" [disabled]=" timeLog.Status == 1 || timeLog.Status == 3" (click)="Start(timeLog)">Start</button></td>
					  <td> <button class="btn btn-default" [disabled]=" timeLog.Status == 2 || timeLog.Status == 3" (click)="Pause(timeLog)">Pause</button></td>
					  <td> <button class="btn btn-default" [disabled]=" timeLog.Status == 3" (click)="Stop(timeLog)">Stop</button></td>
					  </tr>
               </table> 
			   </div> <login *ngIf="!logined" (changedID)="OnChanged($event)"> </login>`
    }), 
    __metadata('design:paramtypes', [user_service_1.UserService, time_log_service_1.TimeLogService])
], TableComponent);
exports.TableComponent = TableComponent;
//# sourceMappingURL=table.component.js.map