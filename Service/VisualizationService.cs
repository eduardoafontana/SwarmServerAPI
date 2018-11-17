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

        public List<User> GetView3dData()
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

            List<User> users = new List<User>();

            using (SwarmData context = new SwarmData())
            {
                //Create basic structure date to selectors.
                users = context.Sessions.Include("CodeFiles")
                    .Where(s => s.CodeFiles.Count() > 0)
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

                //For each task created, create de full structure to view3d.
                foreach (var user in users)
                {
                    foreach (var project in user.projects)
                    {
                        foreach (var task in project.tasks)
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
                                .Select(c => new { pathOnly = System.IO.Path.GetDirectoryName(c.Path) })
                                .Distinct()
                                .Select((po, i) => new Group { groupId = i })
                                .ToList();

                            task.sessions = context.Sessions.Include("CodeFiles").Include("Breakpoints").Include("Events")
                                .Where(s => sessions.Contains(s.Id))
                                .OrderBy(s => s.Started)
                                .AsEnumerable()
                                .Select(s => new Session {
                                    name = String.Format("{0:yyyy-MM-ddTHH:mm:ssZ}", s.Started) + "  " + s.Description,
                                    files = s.CodeFiles
                                        .OrderBy(c => c.Created)
                                        .AsEnumerable()
                                        .Select((c, i) => new File {
                                            fileId = i.ToString(),
                                            fileName = System.IO.Path.GetFileName(c.Path),
                                            groupId = 0,
                                            groupIndex = i,
                                            lines = Regex.Matches(Base64StringZip.UnZipString(c.Content), Environment.NewLine, RegexOptions.Multiline).Count,
                                            breakpoints = s.Breakpoints
                                                .Where(b => b.CodeFilePath == c.Path)
                                                .Select(b => new Breakpoint {
                                                    line = b.LineNumber ?? 0
                                                }).ToList(),
                                            events = s.Events
                                                .Where(e => e.CodeFilePath == c.Path)
                                                .Select(e => new Event
                                                {
                                                    line = e.LineNumber ?? 0
                                                }).ToList(),
                                        })
                                        .ToList()
                                }).ToList();
                        }
                    }
                }
            }

            return users;
        }
    }
}
