namespace SwarmServerAPI.AppCode.Repository
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CodeMetric
    {
        [Key]
        public Guid Id { get; set; }
        public string Hash { get; set; }
        public string MaintainabilityIndex { get; set; }
        public string CyclomaticComplexity { get; set; }
        public string ClassCoupling { get; set; }
        public string LineOfCode { get; set; }

        public Guid PathNode_Id { get; set; }
        public PathNode PathNode { get; set; }
    }
}
