using System;
using System.Collections.Generic;

namespace SwarmServerAPI.UI.SwarmServerAPI.Models
{
    public class ElementModel
    {
        public List<Element> ElementCollection { get; set; } = new List<Element>();

        public class Element
        {
            public Data data { get; set; }
        }

        public class Data
        {
            public string id { get; set; }
            public string source { get; set; }
            public string target { get; set; }
            public string parent_id { get; set; }
        }
    }
}