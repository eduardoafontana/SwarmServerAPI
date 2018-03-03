namespace SwarmServerAPI.AppCode.Domain
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Breakpoint
    {
        public int Id { get; set; }
        public string BreakpointKind { get; set; }
        public string Namespace { get; set; }
        public string Type { get; set; }
        public int? LineNumber { get; set; }
        public string LineOfCode { get; set; }
        public string Origin { get; set; }
        public DateTime Created { get; set; }
    }
}
