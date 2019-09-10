using System;
using System.Collections.Generic;

namespace SwarmServerAPI.AppCore.Service.DTOModels
{
    public class PharoSessionModel
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public DateTime Started { get; set; }
        public DateTime? Finished { get; set; }
    }
}