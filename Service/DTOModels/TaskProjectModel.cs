using System;
using System.Collections.Generic;

namespace SwarmServerAPI.AppCore.Service.DTOModels
{
    public class TaskProjectModel
    {
        public class TaskProject
        {
            public string taskName { get; set; }
            public string projectName { get; set; }
        }

        public List<TaskProject> list { get; set; } = new List<TaskProject>();
    }
}