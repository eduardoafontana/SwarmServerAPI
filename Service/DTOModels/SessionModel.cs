using System;
using System.Collections.Generic;

namespace SwarmServerAPI.AppCore.Service.DTOModels
{
    public class SessionModel
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public DateTime Started { get; set; }
        public DateTime? Finished { get; set; }

        public List<BreakpointModel> Breakpoints { get; set; } = new List<BreakpointModel>();
        public List<EventModel> Events { get; set; } = new List<EventModel>();
        public List<PathNodeModel> PathNodes { get; set; } = new List<PathNodeModel>();

        public string DeveloperName { get; set; }
        public string TaskName { get; set; }
        public string TaskAction { get; set; }
        public string TaskDescription { get; set; }
        public DateTime TaskCreated { get; set; }
        public string ProjectName { get; set; }
    }
}