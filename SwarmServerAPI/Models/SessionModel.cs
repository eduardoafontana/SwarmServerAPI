using System;
using System.Collections.Generic;

namespace SwarmServerAPI.UI.SwarmServerAPI.Models
{
    public class SessionModel
    {
        public Guid Identifier { get; set; }
        public string Label { get; set; }
        public string Description { get; set; }
        public string Purpose { get; set; }
        public DateTime Started { get; set; }
        public DateTime? Finished { get; set; }

        public List<BreakpointModel> Breakpoints { get; set; } = new List<BreakpointModel>();
        public List<EventModel> Events { get; set; } = new List<EventModel>();
        public List<PathNodeModel> PathNodes { get; set; } = new List<PathNodeModel>();
        public TaskModel Task { get; set; }
        public DeveloperModel Developer { get; set; }
    }
}