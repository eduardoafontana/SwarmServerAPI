using System;

namespace SwarmServerAPI.AppCore.Service.DTOModels
{
    public class PathNodeParameterModel
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
