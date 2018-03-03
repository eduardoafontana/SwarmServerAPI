using System;

namespace SwarmServerAPI.AppCore.Service.DTOModels
{
    public class TaskModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Action { get; set; }
        public DateTime Created { get; set; }

        public ProjectModel Project { get; set; }
    }
}
