﻿namespace ActivityLogger.BusinessLogic.DataTransferObjects
{
    public class TimeLogForCreationInfo
    {
        public int TaskID { get; set; }
        public int UserID { get; set; }
        public int Project { get; set; }
        public int Activity { get; set; }
    }
}