using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarmServerAPI.AppCore.Service.DTOModels
{
    public class CodeMetricModel
    {
        public Guid Id { get; set; }
        public string Hash { get; set; }
        public string MaintainabilityIndex { get; set; }
        public string CyclomaticComplexity { get; set; }
        public string ClassCoupling { get; set; }
        public string LineOfCode { get; set; }
    }
}
