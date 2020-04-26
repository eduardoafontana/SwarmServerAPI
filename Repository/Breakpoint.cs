namespace SwarmServerAPI.AppCode.Repository
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Web.Script.Serialization;

    public partial class Breakpoint
    {
        [Key]
        public Guid Id { get; set; }
        public string BreakpointKind { get; set; }
        public string Namespace { get; set; }
        public string Type { get; set; }
        public string CodeFilePath { get; set; }
        public int? LineNumber { get; set; }
        public string LineOfCode { get; set; }
        public string Origin { get; set; }
        public DateTime Created { get; set; }
        public string ObjectId { get; set; }

        [ScriptIgnore]
        public Session Session { get; set; }
    }
}
