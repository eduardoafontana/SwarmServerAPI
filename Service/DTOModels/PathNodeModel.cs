using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarmServerAPI.AppCore.Service.DTOModels
{
    public class PathNodeModel
    {
        public Guid Id { get; set; }
        public string Hash { get; set; }
        public string Namespace { get; set; }
        public string Type { get; set; }
        public string Method { get; set; }
        public string Parent { get; set; }
        public Guid Parent_Id { get; set; }
        public string Origin { get; set; }
        public string ReturnType { get; set; }
        public List<PathNodeParameterModel> Parameters { get; set; } = new List<PathNodeParameterModel>();
        public DateTime Created { get; set; }
        public CodeMetricModel MethodCodeMetric { get; set; }
    }
}
