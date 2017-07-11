﻿import { Component, Input, OnInit} from '@angular/core';
import { TimeLogService } from './services/time-log.service'
import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { TimeLog } from './models/time-log.model';
import { Activity } from './models/activity.model';
import { Project } from './models/project.model';
import { Timer } from './models/timer'
import {ActivityService } from './services/activity.service';
import { ProjectService } from './services/project.service';
import { TimeLogInfoForCreating } from './models/time-log-create.model';
@Component(
    {
    selector: 'table-logs',
    templateUrl: './app/html/table.component.html'
    

    })
export class TableComponent implements OnInit
{
	constructor(private userService: UserService, private timeLogService: TimeLogService, private projectService: ProjectService, private activityService: ActivityService) { }
    user: User = new User();
	logined: boolean = false;
    timeLogs: TimeLog[] = [];
    projects: Project[] = [];
    activities: Activity[] = [];
    emptpyBlock: any;
    timer: Timer = new Timer();
    newLog: TimeLogInfoForCreating = new TimeLogInfoForCreating();
    GetTimeLogs() {
        this.timeLogService.GetData(this.user.ID).subscribe(logs => {
            this.timeLogs = logs;
            if (this.timeLogs[0].Status == 1) {
                this.timer.startTime =this.timeLogs[0].SpendingTime;
                this.timer.Start();
            }
        },
            error => {
                console.log(error);
            });
       
    }
    OnChanged(id)
    {
        this.user.ID = <number>id;
        console.log(id);
		this.logined = true;
        this.userService.Get( this.user.ID).subscribe(user => {
            this.user = user;
           this.GetTimeLogs();
		},
		error => 
		{
            console.log(error);
        });
    } 
   
	Exit(){
		this.user.Name = "";
        this.logined = false;
    }
    Start(timeLog: TimeLog)
    {
        this.timeLogService.SetStatus(timeLog.TaskID, 1).subscribe((response) => { console.log(response); }); 
        this.GetTimeLogs();
    }
    Stop(timeLog: TimeLog) {
        this.timeLogService.SetStatus(timeLog.TaskID, 3).subscribe((response) => { console.log(response); }); 
        this.GetTimeLogs();
    }
    Pause(timeLog: TimeLog) {
        this.timeLogService.SetStatus(timeLog.TaskID, 2).subscribe((response) => { console.log(response); });
        this.GetTimeLogs();
    }
    ngOnInit()
    {
        this.activityService.Get().subscribe(data => this.activities = data, error => console.log(error));
        this.projectService.Get().subscribe(data => this.projects = data, error => console.log(error));
    }
    onSelectProject(project: Project)
    {
        this.newLog.ProjectID = project.ID;
    }
    onSelectActivity(activity: Activity)
    {
        this.newLog.ActivityID = activity.ID;
    }
    OnCloseModal(ok: boolean)
    {
        if (ok == true)
        {
            this.newLog.UserID = this.user.ID;
            this.timeLogService.CreateTimeLog(this.newLog).subscribe((response) => { console.log(response); });
            this.GetTimeLogs();
        }
    }
}