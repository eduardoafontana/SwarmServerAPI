using System;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class TaskGridModel
    {
        public string ProjectName { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Action { get; set; }
        public DateTime? Created { get; set; }
        public TimeSpan TotalSessionTime { get; set; }
    }
}