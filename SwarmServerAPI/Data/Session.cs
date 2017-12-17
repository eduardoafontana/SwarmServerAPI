namespace SwarmServerAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Session
    {
        [Key]
        public Guid Identifier { get; set; }
        public string Label { get; set; }
        public string Description { get; set; }
        public string Purpose { get; set; }
        public DateTime Started { get; set; }
        public DateTime? Finished { get; set; }

        public virtual ICollection<Breakpoint> Breakpoints { get; set; }
    }
}
