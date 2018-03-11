using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarmServerAPI.AppCore.Service.DTOModels
{
    public class BreakpointModel
    {
        public Guid Id { get; set; }
        public string BreakpointKind { get; set; }
        public string Namespace { get; set; }
        public string Type { get; set; }
        public int LineNumber { get; set; }
        public string LineOfCode { get; set; }
        public string Origin { get; set; }
        public DateTime Created { get; set; }
    }
}
