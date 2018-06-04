namespace SwarmServerAPI.AppCode.Repository
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CodeFile
    {
        [Key]
        public Guid Id { get; set; }
        public string Path { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public Session Session { get; set; }
    }
}
