namespace SwarmServerAPI.AppCode.Repository
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Web.Script.Serialization;

    public partial class Event
    {
        [Key]
        public Guid Id { get; set; }
        public string EventKind { get; set; }
        public string Detail { get; set; }
        public string Namespace { get; set; }
        public string Type { get; set; }
        public string TypeFullPath { get; set; }
        public string Method { get; set; }
        public string MethodKey { get; set; }
        public string MethodSignature { get; set; }
        public int? CharStart { get; set; }
        public int? CharEnd { get; set; }
        public string CodeFilePath { get; set; }
        public int? LineNumber { get; set; }
        public string LineOfCode { get; set; }
        public DateTime Created { get; set; }
        public string ObjectId { get; set; }
        public string VariableName { get; set; }
        public string VariableValue { get; set; }

        [ScriptIgnore]
        public Session Session { get; set; }
    }
}
