using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwarmServerAPI.AppCode.Repository;

namespace SwarmServerAPI.AppCore.Domain
{
    public class NodeColor
    {
        private static readonly List<string> ColorMap = new List<string>()
            { "004BE5" , "0349E1" , "0748DD" , "0B47DA" , "0F46D6" , "1345D2" , "1644CF" , "1A43CB" , "1E42C7" , "2241C4"
            , "2640C0" , "293FBD" , "2D3EB9" , "313DB5" , "353CB2" , "393BAE" , "3C39AA" , "4038A7" , "4437A3" , "48369F"
            , "4C359C" , "503498" , "533395" , "573291" , "5B318D" , "5F308A" , "632F86" , "662E82" , "6A2D7F" , "6E2C7B"
            , "722B77" , "762A74" , "792870" , "7D276D" , "812669" , "852565" , "892462" , "8C235E" , "90225A" , "942157"
            , "982053" , "9C1F4F" , "A01E4C" , "A31D48" , "A71C45" , "AB1B41" , "AF1A3D" , "B3193A" , "B61736" , "BA1632"
            , "BE152F" , "C2142B" , "C61327" , "C91224" , "CD1120" , "D1101D" , "D50F19" , "D90E15" , "DC0D12" , "E00C0E"
            , "E40B0A", "E80A07", "EC0903", "F00800" };

        private int MaxQuantity { get; set; }
        private List<Breakpoint> BreakpointList { get; set; }

        public NodeColor(List<Breakpoint> bCollection)
        {
            BreakpointList = bCollection;

            var groupTypes = bCollection.GroupBy(b => b.Type).Select(b => new { Quantity = b.Count() });

            if (groupTypes.Count() != 0)
                MaxQuantity = groupTypes.Max(x => x.Quantity);
        }

        public string GetColor(string nodeType)
        {
            int quantityBreakpoint = BreakpointList.Where(b => b.Type == nodeType).Count();

            if (quantityBreakpoint == 0)
                return ColorMap.First();

            if (quantityBreakpoint == MaxQuantity)
                return ColorMap.Last();

            int intermediateValue = Convert.ToInt32((ColorMap.Count() * quantityBreakpoint) / MaxQuantity);

            if (intermediateValue >= ColorMap.Count())
                return ColorMap.Last();

            return ColorMap[intermediateValue];
        }
    }
}
