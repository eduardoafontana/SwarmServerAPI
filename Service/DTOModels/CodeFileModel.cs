using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarmServerAPI.AppCore.Service.DTOModels
{
    public class CodeFileModel
    {
        public Guid Id { get; set; }
        public string Path { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
    }
}
