namespace SwarmServerAPI.AppCode.Repository
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class PharoSession
    {
        [Key]
        public Guid Id { get; set; }
        public string Description { get; set; }
        public DateTime Started { get; set; }
        public DateTime? Finished { get; set; }
    }
}
