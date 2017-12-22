using System;

namespace SwarmServerAPI.Models
{
    public class SessionGridModel
    {
        public Guid Identifier { get; set; }
        public string TaskName { get; set; }
        public string DeveloperName { get; set; }
        public DateTime Started { get; set; }
        public DateTime? Finished { get; set; }
    }
}