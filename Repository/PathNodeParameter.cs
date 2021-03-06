namespace SwarmServerAPI.AppCode.Repository
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class PathNodeParameter
    {
        [Key]
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public PathNode PathNode { get; set; }
    }
}
