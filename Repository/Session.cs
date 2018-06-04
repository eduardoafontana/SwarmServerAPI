namespace SwarmServerAPI.AppCode.Repository
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Session
    {
        [Key]
        public Guid Id { get; set; }
        public string Description { get; set; }
        public DateTime Started { get; set; }
        public DateTime? Finished { get; set; }

        public virtual ICollection<Breakpoint> Breakpoints { get; set; }
        public ICollection<CodeFile> CodeFiles { get; set; }
        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<PathNode> PathNodes { get; set; }

        public string DeveloperName { get; set; }
        public string TaskName { get; set; }
        public string TaskAction { get; set; }
        public string TaskDescription { get; set; }
        public DateTime? TaskCreated { get; set; }
        public TimeSpan TaskTotalSessionTime { get; set; }
        public string ProjectName { get; set; }
    }
}
