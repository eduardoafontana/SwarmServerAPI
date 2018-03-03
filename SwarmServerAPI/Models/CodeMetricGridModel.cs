using System;

namespace SwarmServerAPI.UI.SwarmServerAPI.Controllers
{
    public class CodeMetricGridModel
    {
        public string SessionIdentifier { get; set; }
        public string TaskName { get; set; }
        public string TaskProject { get; set; }
        public string Hash { get; set; }
        public string MaintainabilityIndex { get; set; }
        public string CyclomaticComplexity { get; set; }
        public string ClassCoupling { get; set; }
        public string LineOfCode { get; set; }
    }
}