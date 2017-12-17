using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarmServerAPI.Models
{
    public class CodeMetricModel
    {
        public string Hash { get; set; }
        public string MaintainabilityIndex { get; set; }
        public string CyclomaticComplexity { get; set; }
        public string ClassCoupling { get; set; }
        public string LineOfCode { get; set; }
    }
}
