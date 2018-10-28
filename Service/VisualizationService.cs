using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarmServerAPI.AppCore.Service
{
    public class VisualizationService
    {
        public class Breakpoint
        {
            public int line { get; set; }
            public string data { get; set; }
        }

        public class Event
        {
            public int line { get; set; }
            public string data { get; set; }
        }

        public class File
        {
            public string fileId { get; set; }
            public string fileName { get; set; }
            public int groupId { get; set; }
            public int groupIndex { get; set; }
            public int lines { get; set; }
            public List<Breakpoint> breakpoints { get; set; } = new List<Breakpoint>();
            public List<Event> events { get; set; } = new List<Event>();
            public List<Node> nodes { get; set; } = new List<Node>();
        }

        public class Node
        {
            public string fileId { get; set; }
            public int line { get; set; }
        }

        public class Session
        {
            public string name { get; set; }
            public List<File> files { get; set; } = new List<File>();
            public List<Node> pathnodes { get; set; } = new List<Node>();
        }

        public class Group
        {
            public int groupId { get; set; }
            public int maxIndexWidthQuantity { get; set; }
        }

        public class Project
        {
            public string name { get; set; }
            public List<Session> sessions { get; set; } = new List<Session>();
            public List<Group> groups { get; set; } = new List<Group>();
        }

        public class User
        {
            public string name { get; set; }
            public List<Project> projects { get; set; } = new List<Project>();
        }

        public List<User> GetView3dData()
        {
            List<User> users = new List<User>();


            //users.Add(new User()
            //{

            //}).Add(new User()
            //{
            //    name = "User ABC"
            //});

            return users;
        }
    }
}
