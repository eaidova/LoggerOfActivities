﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ActivityLogger.BusinessLogic.Services.Contracts;
using ActivityLogger.BusinessLogic.DataTransferObjects;
namespace ActivityLogger.Controllers
{
    public class TimeLogsController : ApiController
    {
        IWorkWithLogsService timeLogService;
        public TimeLogsController(IWorkWithLogsService service)
        {
            timeLogService = service;
        }
        [HttpGet]
        public IHttpActionResult GetUsersLogs(int id)
        {
            Logger.Log.Info(string.Concat("Controller: timeLogs  - list of tasks of user ", id.ToString(), " is recieved"));
            return Ok(timeLogService.ShowLogsList(id));
        }
       /* ITimeLogsRepository repository;
        public TimeLogsController(ITimeLogsRepository rep)
        {
            repository = rep;
        }
        [HttpPost]
        public void Post([FromBody]TimeLog ourLog)
        {
            repository.Create(ourLog);
        }
        [HttpGet]
        public IEnumerable<TimeLog> Get()
        {
            return repository.GetTimeLogs();
        }
        [HttpGet]
        public IEnumerable<TimeLog> Get(int idUser, int status)
        {
            return repository.GetUserLogsWithStatus(idUser, status);
        }
        [HttpGet]
        public TimeLog Get(int id)
        {
            return repository.Get(id);
        }
        [HttpGet]
        public IEnumerable<TimeLog> GetUsersLogs(int id)
        {
            return repository.GetUserTimeLogs(id);
        }
        [HttpPut]
        public void Put([FromBody]TimeLog ourLog)
        {
            repository.Update(ourLog);
        }
        [HttpDelete]
        public void Delete(int id)
        {
            repository.Delete(id);
        }*/

    }
}