﻿import { Component, Input, OnInit} from '@angular/core';
import { TimeLogService } from './services/time-log.service'
import { UserService } from './services/user.service';
import { PagerService } from './services/pager.service';
import { User } from './models/user.model';
import { TimeLog } from './models/time-log.model';
import { Activity } from './models/activity.model';
import { Project } from './models/project.model';
import { Timer } from './models/timer'
import {ActivityService } from './services/activity.service';
import { ProjectService } from './services/project.service';
import { TimeLogInfoForCreating } from './models/time-log-create.model';
import { Ng2TableModule } from 'ng2-table/ng2-table';
@Component(
    {
    selector: 'table-logs',
    templateUrl: './app/html/table.component.html'
    

    })
export class TableComponent implements OnInit
{
    constructor(private userService: UserService, private timeLogService: TimeLogService, private projectService: ProjectService, private activityService: ActivityService, private pagerService: PagerService) { }
    user: User = new User();
	logined: boolean = false;
    timeLogs: TimeLog[] = [];
    projects: Project[] = [];
    activities: Activity[] = [];
    emptpyBlock: any;
    timer: Timer = new Timer();
    newLog: TimeLogInfoForCreating = new TimeLogInfoForCreating();
    pager: any = {};
    pagedItems: TimeLog[];
    GetTimeLogs() {
        this.timeLogService.GetData(this.user.ID).subscribe(logs => {
            this.timeLogs = logs;
            if (this.timeLogs[0].Status == 1) {
                this.timer.startTime =this.timeLogs[0].SpendingTime;
                this.timer.Start();
            }
            // get pager object from service
            this.pager = this.pagerService.getPager(this.timeLogs.length, this.pager.currentPage);

            // get current page of items
            this.pagedItems = this.timeLogs.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.timeLogs.length, page);

        // get current page of items
        this.pagedItems = this.timeLogs.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}