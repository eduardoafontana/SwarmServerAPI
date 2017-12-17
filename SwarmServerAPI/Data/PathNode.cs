namespace SwarmServerAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class PathNode
    {
        public int Id { get; set; }
        public string Hash { get; set; }
        public string Namespace { get; set; }
        public string Type { get; set; }
        public string Method { get; set; }
        public string Parent { get; set; }
        public string Origin { get; set; }
        public string ReturnType { get; set; }
        public virtual ICollection<PathNodeParameter> Parameters { get; set; }
        public DateTime Created { get; set; }
        public CodeMetric MethodCodeMetric { get; set; }
    }
}
