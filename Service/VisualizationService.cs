using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using SwarmServerAPI.AppCode.Repository;

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
            public string filePath { get; set; }
            public int sessionId { get; set; }
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
            public int sessionId { get; set; }
            public string name { get; set; }
            public List<File> files { get; set; } = new List<File>();
            public List<Node> pathnodes { get; set; } = new List<Node>();
        }

        public class Group
        {
            public int groupId { get; set; }
            public string path { get; set; }
            public int maxIndexWidthQuantity { get; set; }
        }

        public class Project
        {
            public string name { get; set; }
            public List<Task> tasks { get; set; } = new List<Task>();
        }

        public class User
        {
            public string name { get; set; }
            public List<Project> projects { get; set; } = new List<Project>();
        }

        public class Task
        {
            public string name { get; set; }
            public List<Session> sessions { get; set; } = new List<Session>();
            public List<Group> groups { get; set; } = new List<Group>();
        }

        public List<User> GetView3dDataFilter()
        {
            //TODO: data for test, not loaded
            List<User> users1 = new List<User>{new User()
            {
                name = "User ABC",
                projects = new List<Project>
                {
                    new Project()
                    {
                        name = "Project one ABC",
                        tasks = new List<Task> {
                            new Task() {
                        name = "Task Day 17-10 presentation",
                        sessions = new List<Session>(){
                            new Session(){
                                files = new List<File>(){
                                    new File()
                                    {
                                        fileId = "1",
                                        fileName = "file11.cs",
                                        groupId = 1,
                                        groupIndex = 0,
                                        lines = 10,
                                        breakpoints = new List<Breakpoint>(){
                                            new Breakpoint()
                                            {
                                                line = 5,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>(){
                                            new Event()
                                            {
                                                line = 7,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 5
                                            }
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "2",
                                        fileName = "file2.cs",
                                        groupId = 1,
                                        groupIndex = 1,
                                        lines = 20,
                                        breakpoints = new List<Breakpoint>(){
                                            new Breakpoint()
                                            {
                                                line = 10,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>(){
                                            new Event()
                                            {
                                                line = 12,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 10
                                            }
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "3",
                                        fileName = "file3.cs",
                                        groupId = 1,
                                        groupIndex = 2,
                                        lines = 30,
                                        breakpoints = new List<Breakpoint>(){
                                            new Breakpoint()
                                            {
                                                line = 15,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>(){
                                            new Event()
                                            {
                                                line = 17,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 15
                                            }
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "4",
                                        fileName = "file4.cs",
                                        groupId = 2,
                                        groupIndex = 0,
                                        lines = 40,
                                        breakpoints = new List<Breakpoint>(){
                                            new Breakpoint()
                                            {
                                                line = 20,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>(){
                                            new Event()
                                            {
                                                line = 22,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 20
                                            }
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "5",
                                        fileName = "file5.cs",
                                        groupId = 2,
                                        groupIndex = 1,
                                        lines = 50,
                                        breakpoints = new List<Breakpoint>(){
                                            new Breakpoint()
                                            {
                                                line = 25,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>(){
                                            new Event()
                                            {
                                                line = 27,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 25
                                            }
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "6",
                                        fileName = "file6.cs",
                                        groupId = 3,
                                        groupIndex = 0,
                                        lines = 60,
                                        breakpoints = new List<Breakpoint>(){
                                            new Breakpoint()
                                            {
                                                line = 30,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>(){
                                            new Event()
                                            {
                                                line = 32,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 30
                                            }
                                        },
                                    },
                                },
                                pathnodes = new List<Node>(){
                                    new Node(){ fileId = "1", line = 5},
                                    new Node(){ fileId = "2", line = 10},
                                    new Node(){ fileId = "3", line = 15},
                                    new Node(){ fileId = "4", line = 20},
                                    new Node(){ fileId = "5", line = 25},
                                    new Node(){ fileId = "6", line = 30},
                                }
                            },
                            new Session(){
                                files = new List<File>(){
                                    new File()
                                    {
                                        fileId = "10",
                                        fileName = "file1.cs",
                                        groupId = 1,
                                        groupIndex = 0,
                                        lines = 10,
                                        breakpoints = new List<Breakpoint>(){
                                            new Breakpoint()
                                            {
                                                line = 5,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>(){
                                            new Event()
                                            {
                                                line = 7,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 5
                                            }
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "20",
                                        fileName = "file2.cs",
                                        groupId = 1,
                                        groupIndex = 1,
                                        lines = 20,
                                        breakpoints = new List<Breakpoint>(){
                                            new Breakpoint()
                                            {
                                                line = 10,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>(){
                                            new Event()
                                            {
                                                line = 12,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 10
                                            }
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "50",
                                        fileName = "file5.cs",
                                        groupId = 2,
                                        groupIndex = 1,
                                        lines = 50,
                                        breakpoints = new List<Breakpoint>(){
                                            new Breakpoint()
                                            {
                                                line = 25,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>(){
                                            new Event()
                                            {
                                                line = 27,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 25
                                            }
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "60",
                                        fileName = "file6.cs",
                                        groupId = 3,
                                        groupIndex = 0,
                                        lines = 60,
                                        breakpoints = new List<Breakpoint>(){
                                            new Breakpoint()
                                            {
                                                line = 30,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>(){
                                            new Event()
                                            {
                                                line = 32,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 30
                                            }
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "70",
                                        fileName = "file8.cs",
                                        groupId = 3,
                                        groupIndex = 2,
                                        lines = 70,
                                        breakpoints = new List<Breakpoint>(){
                                            new Breakpoint()
                                            {
                                                line = 35,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>(){
                                            new Event()
                                            {
                                                line = 37,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 35
                                            }
                                        },
                                    },
                                },
                                pathnodes = new List<Node>(){
                                    new Node(){ fileId = "10", line = 5},
                                    new Node(){ fileId = "20", line = 10},
                                    new Node(){ fileId = "50", line = 25},
                                    new Node(){ fileId = "60", line = 30},
                                    new Node(){ fileId = "70", line = 35},
                                }
                            },
                            new Session(){
                                files = new List<File>(){
                                    new File()
                                    {
                                        fileId = "100",
                                        fileName = "file1.cs",
                                        groupId = 1,
                                        groupIndex = 0,
                                        lines = 10,
                                        breakpoints = new List<Breakpoint>()
                                        {
                                            new Breakpoint()
                                            {
                                                line = 5,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>()
                                        {
                                            new Event()
                                            {
                                                line = 7,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>()
                                        {
                                            new Node()
                                            {
                                                line = 5
                                            }
                                        }
                                    }
                                },
                                pathnodes = new List<Node>(){}
                            },
                            new Session(){
                                files = new List<File>(){
                                    new File() {
                                        fileId = "5001",
                                        fileName = "file5.cs",
                                        groupId = 2,
                                        groupIndex = 1,
                                        lines = 50,
                                        breakpoints = new List<Breakpoint>()
                                        {
                                            new Breakpoint()
                                            {
                                                line = 25,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>()
                                        {
                                            new Event()
                                            {
                                                line = 27,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>()
                                        {
                                            new Node()
                                            {
                                                line = 25
                                            }
                                        }
                                    },
                                    new File() {
                                        fileId = "6001",
                                        fileName = "file7.cs",
                                        groupId = 3,
                                        groupIndex = 1,
                                        lines = 60,
                                        breakpoints = new List<Breakpoint>()
                                        {
                                            new Breakpoint()
                                            {
                                                line = 30,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>()
                                        {
                                            new Event()
                                            {
                                                line = 32,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>()
                                        {
                                            new Node()
                                            {
                                                line = 30
                                            }
                                        }
                                    },
                                    new File() {
                                        fileId = "7001",
                                        fileName = "file8.cs",
                                        groupId = 2,
                                        groupIndex = 2,
                                        lines = 70,
                                        breakpoints = new List<Breakpoint>()
                                        {
                                            new Breakpoint()
                                            {
                                                line = 35,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>()
                                        {
                                            new Event()
                                            {
                                                line = 37,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>()
                                        {
                                            new Node()
                                            {
                                                line = 35
                                            }
                                        }
                                    }
                                },
                                pathnodes = new List<Node>(){
                                    new Node(){ fileId = "5001", line = 25},
                                    new Node(){ fileId = "6001", line = 30},
                                    new Node(){ fileId = "7001", line = 35},
                                }
                            },
                            new Session(){
                                files = new List<File>(){
                                    new File() {
                                        fileId = "1000",
                                        fileName = "file1.cs",
                                        groupId = 1,
                                        groupIndex = 0,
                                        lines = 10,
                                        breakpoints = new List<Breakpoint>()
                                        {
                                            new Breakpoint()
                                            {
                                                line = 5,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>()
                                        {
                                            new Event()
                                            {
                                                line = 7,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>()
                                        {
                                            new Node()
                                            {
                                                line = 5
                                            }
                                        }
                                    },
                                    new File() {
                                        fileId = "2000",
                                        fileName = "file2.cs",
                                        groupId = 1,
                                        groupIndex = 1,
                                        lines = 20,
                                        breakpoints = new List<Breakpoint>()
                                        {
                                            new Breakpoint()
                                            {
                                                line = 10,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>()
                                        {
                                            new Event()
                                            {
                                                line = 12,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>()
                                        {
                                            new Node()
                                            {
                                                line = 10
                                            }
                                        }
                                    },
                                    new File() {
                                        fileId = "4000",
                                        fileName = "file4.cs",
                                        groupId = 2,
                                        groupIndex = 0,
                                        lines = 40,
                                        breakpoints = new List<Breakpoint>()
                                        {
                                            new Breakpoint()
                                            {
                                                line = 20,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>()
                                        {
                                            new Event()
                                            {
                                                line = 22,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>()
                                        {
                                            new Node()
                                            {
                                                line = 20
                                            }
                                        }
                                    },
                                    new File() {
                                        fileId = "5000",
                                        fileName = "file5.cs",
                                        groupId = 2,
                                        groupIndex = 1,
                                        lines = 50,
                                        breakpoints = new List<Breakpoint>()
                                        {
                                            new Breakpoint()
                                            {
                                                line = 25,
                                                data = "dados html"
                                            }
                                        },
                                        events = new List<Event>()
                                        {
                                            new Event()
                                            {
                                                line = 27,
                                                data = "dados html"
                                            }
                                        },
                                        nodes = new List<Node>()
                                        {
                                            new Node()
                                            {
                                                line = 25
                                            }
                                        }
                                    },
                                },
                                pathnodes = new List<Node>(){
                                    new Node(){ fileId = "1000", line = 5},
                                    new Node(){ fileId = "2000", line = 10},
                                    new Node(){ fileId = "4000", line = 20},
                                    new Node(){ fileId = "5000", line = 25},
                                }
                            }
                        },
                        groups = new List<Group>(){
                            new Group()
                            {
                                groupId = 1,
                                maxIndexWidthQuantity = 2
                            },
                            new Group()
                            {
                                groupId = 2,
                                maxIndexWidthQuantity = 1
                            },
                            new Group()
                            {
                                groupId = 3,
                                maxIndexWidthQuantity = 2
                            }
                        }
                    },
                    new Task() {
                        name = "Task Day 17-10 presentation 2",
                        sessions = new List<Session>(){
                            new Session()
                            {
                                files = new List<File>(){
                                    new File()
                                    {
                                        fileId = "1",
                                        groupId = 1,
                                        groupIndex = 0,
                                        lines = 308,
                                        breakpoints = new List<Breakpoint>(){
                                        },
                                        events = new List<Event>(){
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 35
                                            },
                                            new Node()
                                            {
                                                line = 36
                                            }
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "2",
                                        groupId = 2,
                                        groupIndex = 0,
                                        lines = 201,
                                        breakpoints = new List<Breakpoint>(){
                                        },
                                        events = new List<Event>(){
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 137
                                            },
                                            new Node()
                                            {
                                                line = 135
                                            },
                                            new Node()
                                            {
                                                line = 133
                                            },
                                            new Node()
                                            {
                                                line = 128
                                            },
                                            new Node()
                                            {
                                                line = 122
                                            },
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "3",
                                        groupId = 2,
                                        groupIndex = 1,
                                        lines = 275,
                                        breakpoints = new List<Breakpoint>(){
                                        },
                                        events = new List<Event>(){
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 215
                                            },
                                            new Node()
                                            {
                                                line = 47
                                            },
                                            new Node()
                                            {
                                                line = 216
                                            },
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "4",
                                        groupId = 2,
                                        groupIndex = 2,
                                        lines = 268,
                                        breakpoints = new List<Breakpoint>(){
                                        },
                                        events = new List<Event>(){
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 210
                                            },
                                            new Node()
                                            {
                                                line = 152
                                            },
                                            new Node()
                                            {
                                                line = 120
                                            },
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "5",
                                        groupId = 3,
                                        groupIndex = 0,
                                        lines = 509,
                                        breakpoints = new List<Breakpoint>(){
                                        },
                                        events = new List<Event>(){
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 205
                                            },
                                            new Node()
                                            {
                                                line = 206
                                            },
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "6",
                                        groupId = 4,
                                        groupIndex = 0,
                                        lines = 150,
                                        breakpoints = new List<Breakpoint>(){
                                        },
                                        events = new List<Event>(){
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 103
                                            },
                                            new Node()
                                            {
                                                line = 104
                                            },
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "7",
                                        groupId = 4,
                                        groupIndex = 1,
                                        lines = 150,
                                        breakpoints = new List<Breakpoint>(){
                                        },
                                        events = new List<Event>(){
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 103
                                            },
                                            new Node()
                                            {
                                                line = 104
                                            },
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "8",
                                        groupId = 4,
                                        groupIndex = 2,
                                        lines = 150,
                                        breakpoints = new List<Breakpoint>(){
                                        },
                                        events = new List<Event>(){
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 103
                                            },
                                            new Node()
                                            {
                                                line = 104
                                            },
                                        },
                                    },
                                    new File()
                                    {
                                        fileId = "9",
                                        groupId = 5,
                                        groupIndex = 0,
                                        lines = 340,
                                        breakpoints = new List<Breakpoint>(){
                                        },
                                        events = new List<Event>(){
                                        },
                                        nodes = new List<Node>(){
                                            new Node()
                                            {
                                                line = 110
                                            },
                                            new Node()
                                            {
                                                line = 115
                                            },
                                        },
                                    },
                                },
                                pathnodes = new List<Node>()
                                {
                                    new Node()
                                    {
                                        fileId = "1",
                                        line = 35
                                    },
                                    new Node()
                                    {
                                        fileId = "2",
                                        line = 137
                                    },
                                    new Node()
                                    {
                                        fileId = "2",
                                        line = 133
                                    },
                                    new Node()
                                    {
                                        fileId = "2",
                                        line = 125
                                    },
                                    new Node()
                                    {
                                        fileId = "2",
                                        line = 135
                                    },
                                    new Node()
                                    {
                                        fileId = "2",
                                        line = 128
                                    },
                                    new Node()
                                    {
                                        fileId = "3",
                                        line = 47
                                    },
                                    new Node()
                                    {
                                        fileId = "3",
                                        line = 215
                                    },
                                    new Node()
                                    {
                                        fileId = "4",
                                        line = 210
                                    },
                                    new Node()
                                    {
                                        fileId = "4",
                                        line = 152
                                    },
                                    new Node()
                                    {
                                        fileId = "5",
                                        line = 205
                                    },
                                    new Node()
                                    {
                                        fileId = "6",
                                        line = 103
                                    },
                                    new Node()
                                    {
                                        fileId = "7",
                                        line = 103
                                    },
                                    new Node()
                                    {
                                        fileId = "8",
                                        line = 103
                                    },
                                    new Node()
                                    {
                                        fileId = "9",
                                        line = 110
                                    },
                                    new Node()
                                    {
                                        fileId = "9",
                                        line = 115
                                    },
                                    new Node()
                                    {
                                        fileId = "8",
                                        line = 104
                                    },
                                    new Node()
                                    {
                                        fileId = "7",
                                        line = 104
                                    },
                                    new Node()
                                    {
                                        fileId = "6",
                                        line = 104
                                    },
                                    new Node()
                                    {
                                        fileId = "5",
                                        line = 206
                                    },
                                    new Node()
                                    {
                                        fileId = "4",
                                        line = 120
                                    },
                                    new Node()
                                    {
                                        fileId = "3",
                                        line = 116
                                    },
                                    new Node()
                                    {
                                        fileId = "2",
                                        line = 122
                                    },
                                    new Node()
                                    {
                                        fileId = "1",
                                        line = 36
                                    },
                                }
                            }
                        },
                        groups = new List<Group>(){
                            new Group()
                            {
                                groupId = 1,
                                maxIndexWidthQuantity = 0
                            },
                            new Group()
                            {
                                groupId = 2,
                                maxIndexWidthQuantity = 2
                            },
                            new Group()
                            {
                                groupId = 3,
                                maxIndexWidthQuantity = 0
                            },
                            new Group()
                            {
                                groupId = 4,
                                maxIndexWidthQuantity = 2
                            },
                            new Group()
                            {
                                groupId = 5,
                                maxIndexWidthQuantity = 0
                            },
                        }
                    },
                    new Task() {
                        name = "Task 1 ABC",//incompleto, parei aqui
                        sessions = new List<Session>(){
                            new Session()
                            {
                                files = new List<File>(){},
                                pathnodes = new List<Node>(){}
                            },
                            new Session()
                            {
                                files = new List<File>(){},
                                pathnodes = new List<Node>(){}
                            },
                            new Session()
                            {
                                files = new List<File>(){},
                                pathnodes = new List<Node>(){}
                            },
                            new Session()
                            {
                                files = new List<File>(){},
                                pathnodes = new List<Node>(){}
                            },
                        },
                        groups = new List<Group>(){
                            new Group()
                            {
                                groupId = 0,
                                maxIndexWidthQuantity = 2
                            },
                            new Group()
                            {
                                groupId = 1,
                                maxIndexWidthQuantity = 3
                            },
                            new Group()
                            {
                                groupId = 2,
                                maxIndexWidthQuantity = 16
                            },
                            new Group()
                            {
                                groupId = 3,
                                maxIndexWidthQuantity = 0
                            },
                        }
                    }
                }
                    }
                }
            },
            new User()
            {
                name = "User XYZ",
                projects = new List<Project>
                {
                    new Project
                    {
                        name = "Project one XYZ",
                        tasks = new List<Task> {
                        new Task() {
                        name = "Task 1 XYZ",
                        sessions = new List<Session>{
                            new Session()
                            {
                                files = new List<File>(){
                                    new File()
                                    {
                                        groupId = 0,
                                        groupIndex = 0,
                                        lines = 300,
                                        breakpoints = new List<Breakpoint>(){},
                                        events = new List<Event>(){},
                                        nodes = new List<Node>(){}
                                    }
                                },
                                pathnodes = new List<Node>(){}
                            }
                        },
                        groups = new List<Group>(){}
                    },
                }
                    }
                }
            },
            new User()
            {
                name = "User OKS",
                projects = new List<Project>
                {
                    new Project
                    {
                        name = "Project one OKS",
                    tasks = new List<Task> {
                    new Task() {
                        name = "Task 1 OKS",
                        sessions = new List<Session>{
                            new Session()
                            {
                                files = new List<File>(){
                                    new File()
                                    {
                                        groupId = 0,
                                        groupIndex = 0,
                                        lines = 120,
                                        breakpoints = new List<Breakpoint>(){},
                                        events = new List<Event>(){},
                                        nodes = new List<Node>(){}
                                    }
                                },
                                pathnodes = new List<Node>(){}
                            }
                        },
                        groups = new List<Group>(){}
                    },
                    new Task() {
                        name = "Task 2 OKS",
                        sessions = new List<Session>() {
                            new Session(){
                                files = new List<File>() {
                                    new File()
                                    {
                                        groupId = 0,
                                        groupIndex = 0,
                                        lines = 1,
                                        breakpoints = new List<Breakpoint>(){},
                                        events = new List<Event>(){},
                                        nodes = new List<Node>(){}
                                    },
                                    new File()
                                    {
                                        groupId = 0,
                                        groupIndex = 1,
                                        lines = 10,
                                        breakpoints = new List<Breakpoint>(){},
                                        events = new List<Event>(){},
                                        nodes = new List<Node>(){}
                                    },
                                    new File()
                                    {
                                        groupId = 0,
                                        groupIndex = 2,
                                        lines = 1,
                                        breakpoints = new List<Breakpoint>(){},
                                        events = new List<Event>(){},
                                        nodes = new List<Node>(){}
                                    },
                                    new File()
                                    {
                                        groupId = 0,
                                        groupIndex = 3,
                                        lines = 120,
                                        breakpoints = new List<Breakpoint>(){},
                                        events = new List<Event>(){
                                            new Event()
                                            {
                                                line = 100,
                                                data = "<h4>título 100</h4><p>100 </p><p>event</p>"
                                            },
                                            new Event()
                                            {
                                                line = 20,
                                                data = "<h4>título 20</h4><p>20 </p><p>event</p>"
                                            },
                                            new Event()
                                            {
                                                line = 50,
                                                data = "<h4>título 50</h4><p>50 </p><p>event</p>"
                                            }
                                        },
                                        nodes = new List<Node>(){}
                                    }
                                },
                                pathnodes = new List<Node>(){}
                            }
                        },
                        groups = new List<Group>{ new Group() { groupId = 0, maxIndexWidthQuantity = 3 } }
                    },
                }
                    }
                }
            } };
            //--

            List<User> users = LoadFilter();

            LoadView(users.FirstOrDefault());

            return users;
        }

        public List<User> GetView3dData(string user, string project, string task)
        {
            List<User> users = LoadFilter(user, project, task);

            LoadView(users.FirstOrDefault());

            return users;
        }

        public List<User> LoadFilter()
        {
            return LoadFilter(String.Empty, String.Empty, String.Empty);
        }

        public List<User> LoadFilter(string developerName, string projectName, string taskName)
        {
            List<User> users = new List<User>();

            using (SwarmData context = new SwarmData())
            {
                users = context.Sessions.Include("CodeFiles")
                    .Where(s => s.CodeFiles.Count() > 0)
                    .Where(s => developerName == String.Empty || (developerName != String.Empty && s.DeveloperName == developerName))
                    .GroupBy(s => s.DeveloperName)
                    .Select(s => s.FirstOrDefault())
                    .Where(s => s.DeveloperName != null && s.DeveloperName.Trim() != string.Empty)
                    .OrderBy(s => s.DeveloperName)
                    .Select(s => new User
                    {
                        name = s.DeveloperName,
                        projects = context.Sessions
                            .Where(s1 => s1.CodeFiles.Count() > 0)
                            .Where(s1 => s1.DeveloperName == s.DeveloperName)
                            .Where(s1 => projectName == String.Empty || (projectName != String.Empty && s1.ProjectName == projectName))
                            .GroupBy(s1 => s1.ProjectName)
                            .Select(s1 => s1.FirstOrDefault())
                            .Where(s1 => s1.ProjectName != null && s1.ProjectName.Trim() != string.Empty)
                            .OrderBy(s1 => s1.ProjectName)
                            .Select(s1 => new Project
                            {
                                name = s1.ProjectName,
                                tasks = context.Sessions
                                    .Where(s2 => s2.CodeFiles.Count() > 0)
                                    .Where(s2 => s2.DeveloperName == s1.DeveloperName && s2.ProjectName == s1.ProjectName)
                                    .Where(s2 => taskName == String.Empty || (taskName != String.Empty && s2.TaskName == taskName))
                                    .GroupBy(s2 => s2.TaskName)
                                    .Select(s2 => s2.FirstOrDefault())
                                    .Where(s2 => s2.TaskName != null && s2.TaskName.Trim() != string.Empty)
                                    .OrderBy(s2 => s2.TaskName)
                                    .Select(s2 => new Task
                                    {
                                        name = s2.TaskName,
                                    }).ToList()
                            }).ToList()
                    }).ToList();
            }

            return users;
        }

        private void LoadView(User user)
        {
            if (user == null)
                return;

            Project project = user.projects.FirstOrDefault();

            if (project == null)
                return;

            Task task = project.tasks.FirstOrDefault();

            if (task == null)
                return;

            using (SwarmData context = new SwarmData())
            {
                var sessions = context.Sessions
                .Where(s => s.TaskName == task.name &&
                    s.ProjectName == project.name &&
                    s.DeveloperName == user.name)
                .OrderBy(s => s.Started)
                .Select(s => s.Id)
                .ToList();

                task.groups = context.CodeFiles
                    .Where(c => sessions.Contains(c.Session.Id))
                    .OrderBy(c => c.Created)
                    .AsEnumerable()
                    .Select(c => new { pathOnly = System.IO.Path.GetDirectoryName(c.Path).ToLower() })
                    .Distinct()
                    .Select((po, i) => new Group { groupId = i, maxIndexWidthQuantity = 0, path = po.pathOnly })
                    .ToList();

                task.sessions = getSessions(context.Sessions
                        .Include("CodeFiles")
                        .Include("Breakpoints")
                        .Include("Events")
                        .Include("PathNodes")
                        .Where(s => sessions.Contains(s.Id))
                        .OrderBy(s => s.Started).ToList(),
                    task.groups);
            }
        }

        private List<Session> getSessions(List<AppCode.Repository.Session> listSession, List<Group> generatedGroups)
        {
            List<Session> sessions = new List<Session>();

            for (int i = 0; i < listSession.Count; i++)
            {
                AppCode.Repository.Session s = listSession[i];

                Session session = new Session();

                session.sessionId = i;
                session.name = String.Format("{0:yyyy-MM-ddTHH:mm:ssZ}", s.Started) + "  " + s.Description;
                session.files = getFiles(i, s, s.CodeFiles.OrderBy(c => c.Created).ToList(), sessions.SelectMany(p => p.files).ToList(), generatedGroups);
                session.pathnodes = getValidPathNodes(s, session.files);

                sessions.Add(session);
            }

            return sessions;
        }

        private List<File> getFiles(int sessionId, AppCode.Repository.Session s, List<CodeFile> listCodeFiles, List<File> generetedFiles, List<Group> generatedGroups)
        {
            List<File> files = new List<File>();

            for (int i = 0; i < listCodeFiles.Count; i++)
            {
                CodeFile c = listCodeFiles[i];

                File file = new File();
                file.fileId = i.ToString();
                file.fileName = System.IO.Path.GetFileName(c.Path);
                file.filePath = c.Path;
                file.sessionId = sessionId;
                file.lines = Regex.Matches(Base64StringZip.UnZipString(c.Content), Environment.NewLine, RegexOptions.Multiline).Count;

                file.breakpoints = s.Breakpoints
                                    .Where(b => b.CodeFilePath.ToLower() == c.Path.ToLower())
                                    .Select(b => new Breakpoint
                                    {
                                        line = b.LineNumber ?? 0
                                    }).ToList();

                file.events = s.Events
                                .Where(e => e.CodeFilePath.ToLower() == c.Path.ToLower())
                                .Select(e => new Event
                                {
                                    line = e.LineNumber ?? 0
                                }).ToList();

                File alreadyExistFile = generetedFiles
                    .Where(f => f.filePath.ToLower() == c.Path.ToLower())
                    .FirstOrDefault();

                if (alreadyExistFile != null)
                {
                    file.groupId = alreadyExistFile.groupId;
                    file.groupIndex = alreadyExistFile.groupIndex;
                }
                else
                {
                    Group group = generatedGroups
                        .Where(g => g.path.ToLower() == System.IO.Path.GetDirectoryName(c.Path).ToLower())
                        .FirstOrDefault();

                    if (group == null)
                        continue;

                    file.groupId = group.groupId;

                    int total = generetedFiles
                        .Where(f => f.groupId == file.groupId)
                        .GroupBy(f => f.sessionId)
                        .Select(gouped => new { total = gouped.Count() })
                        .OrderByDescending(o => o.total)
                        .Select(o => o.total)
                        .FirstOrDefault();

                    file.groupIndex = total;

                    if (file.groupIndex > group.maxIndexWidthQuantity)
                        group.maxIndexWidthQuantity = file.groupIndex;
                }

                files.Add(file);
                generetedFiles.Add(file);
            }

            return files;
        }

        private List<Node> getValidPathNodes(AppCode.Repository.Session s, List<File> generetedFilesSession)
        {
            List<Node> nodes = new List<Node>();

            List<PathNode> pathNodes = s.PathNodes.OrderBy(pn => pn.Created).ToList();
            List<AppCode.Repository.Event> events = s.Events.OrderBy(pn => pn.Created).ToList();
            List<CodeFile> codeFiles = s.CodeFiles.OrderBy(pn => pn.Created).ToList();

            int startEvent = 0;
            foreach (var item in pathNodes)
            {
                AppCode.Repository.Event eventFounded = null;

                for (int i = startEvent; i < events.Count; i++)
                {
                    if (events[i].Namespace.ToLower() == item.Namespace.ToLower() &&
                       events[i].Type.ToLower() == item.Type.ToLower() &&
                       events[i].Method.ToLower() == item.Method.ToLower())
                    {
                        eventFounded = events[i];

                        startEvent = ++i;
                        break;
                    }
                }

                if (eventFounded == null)
                    continue;

                //TODO: remove later
                //int? fileId = codeFiles
                //    .Select((cf, i) => new { index = i, path = cf.Path })
                //    .Where(o => o.path.ToLower() == eventFounded.CodeFilePath.ToLower())
                //    .Select(o => o.index).FirstOrDefault();

                string fileId = generetedFilesSession
                    .Where(gf => gf.filePath.ToLower() == eventFounded.CodeFilePath.ToLower())
                    .Select(gf => gf.fileId).FirstOrDefault();

                if (String.IsNullOrWhiteSpace(fileId))
                    continue;

                nodes.Add(new Node
                {
                    fileId = fileId,
                    line = eventFounded.LineNumber ?? 0
                });
            }

            return nodes;
        }
    }
}
