﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using SwarmServerAPI.AppCode.Repository;

namespace SwarmServerAPI.AppCore.Service
{
    public class VisualizationService
    {
        public class Breakpoint
        {
            public int line { get; set; }
            public int positionIndex { get; set; }
            public string data { get; set; }
        }

        public class Event
        {
            public int line { get; set; }
            public string data { get; set; }
            public int positionIndex { get; set; }
            public string eventId { get; set; }
        }

        public class File
        {
            public string originalId { get; set; }
            public string fileId { get; set; }
            public string fileName { get; set; }
            public string filePath { get; set; }
            public int sessionId { get; set; }
            public int groupId { get; set; }
            public int groupIndex { get; set; }
            public int lines { get; set; }

            public int nodePoints { get; set; }
            public int nodeSpaceBefore { get; set; }
            public int nodeSpaceAfter { get; set; }

            public List<Breakpoint> breakpoints { get; set; } = new List<Breakpoint>();
            public List<Event> events { get; set; } = new List<Event>();
            public List<Node> nodes { get; set; } = new List<Node>();
        }

        public class Node
        {
            public string fileId { get; set; }
            public int line { get; set; }
            public string eventId { get; set; }
            public bool evaluated { get; set; }
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

        public string GetView3dSourceCode(string originalId)
        {
            string sourceCode = "Something wrong on process source code search.";

            if (String.IsNullOrWhiteSpace(originalId))
                return sourceCode + " Original Id is null or empty.";

            using (SwarmData context = new SwarmData())
            {
                sourceCode = context.CodeFiles.Where(c => c.Id.ToString() == originalId).Select(c => c.Content).FirstOrDefault();

                if (String.IsNullOrWhiteSpace(sourceCode))
                    return "No source code found.";

                sourceCode = Base64StringZip.UnZipString(sourceCode);
            }

            return sourceCode;
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
                    //.Where(s => s.DeveloperName.ToLower() == "MarcosN.B")
                    //.Where(s => s.DeveloperName.ToLower() == "Eduardo A. F.")
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
                            //.Where(s1 => s1.ProjectName.ToLower() == "SIRA.sln")
                            //.Where(s1 => s1.ProjectName.ToLower() == "ConsoleApp1.sln")
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
                                    //.Where(s2 => s2.TaskName.ToLower() == "simple example 6 - breakpoint bug fixed")
                                    //.Where(s2 => s2.TaskName.ToLower() == "Teste Reload")
                                    //.Where(s2 => s2.TaskName.ToLower() == "Teste PN Event_Id")
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
                session.files = getFiles(i, s, s.CodeFiles
                    .GroupBy(c => c.Path.ToLower())
                    .Select(c => c.FirstOrDefault())
                    .OrderBy(c => c.Created)
                    .ToList(), sessions.SelectMany(p => p.files).ToList(), generatedGroups);
                session.pathnodes = getValidPathNodes(s, session.files);

                foreach (var node in session.pathnodes)
                {
                    File file = session.files.Where(f => f.fileId == node.fileId).First();
                    file.nodePoints++;

                    node.evaluated = true;

                    foreach (var fileItem in session.files.Where(f => f.fileId != file.fileId))
                    {
                        if (fileItem.nodePoints == 0)
                        {
                            fileItem.nodeSpaceBefore++;
                            continue;
                        }

                        int remainNodes = session.pathnodes.Where(n => fileItem.fileId == n.fileId && n.evaluated == false).Count();

                        if (remainNodes > 0)
                            fileItem.nodeSpaceAfter++;
                    }
                }

                foreach (var itemFile in session.files)
                {
                    foreach (var itemEvent in itemFile.events)
                    {
                        itemEvent.positionIndex = session.pathnodes
                            .Select((pn, index) => new { index = index, eventId = pn.eventId })
                            .Where(pn => pn.eventId == itemEvent.eventId)
                            .Select(pn => pn.index)
                            .FirstOrDefault();
                    }

                    foreach (var itemBreakpoint in itemFile.breakpoints)
                    {
                        itemBreakpoint.positionIndex = itemFile.events
                            .Where(e => e.line == itemBreakpoint.line)
                            .Select(e => e.positionIndex)
                            .FirstOrDefault();
                    }
                }

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
                file.originalId = c.Id.ToString();
                file.fileId = i.ToString();
                file.fileName = System.IO.Path.GetFileName(c.Path);
                file.filePath = c.Path;
                file.sessionId = sessionId;
                file.lines = Regex.Matches(Base64StringZip.UnZipString(c.Content), Environment.NewLine, RegexOptions.Multiline).Count;

                file.events = s.Events
                                .Where(e => e.CodeFilePath.ToLower() == c.Path.ToLower())
                                .Where(e => e.EventKind == "StepInto" || e.EventKind == "StepOver" || e.EventKind == "BreakpointHitted")
                                .OrderBy(e => e.Created)
                                .Select(e => new Event
                                {
                                    line = e.LineNumber ?? 0,
                                    eventId = e.Id.ToString(),
                                    data = new JavaScriptSerializer().Serialize(e)
                                })
                                .ToList();

                file.breakpoints = s.Breakpoints
                                    .Where(b => b.CodeFilePath.ToLower() == c.Path.ToLower())
                                    .Select(b => new Breakpoint
                                    {
                                        line = b.LineNumber ?? 0,
                                        data = new JavaScriptSerializer().Serialize(b)
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

            List<PathNode> pathNodes = s.PathNodes.Where(pn => pn.Origin != "Trace").OrderBy(pn => pn.Created).ToList();

            foreach (var item in pathNodes)
            {
                AppCode.Repository.Event eventFounded = s.Events.Where(e => e.Id == item.Event_Id).FirstOrDefault();

                if (eventFounded == null)
                    continue;

                string fileId = generetedFilesSession
                    .Where(gf => gf.filePath.ToLower() == eventFounded.CodeFilePath.ToLower())
                    .Select(gf => gf.fileId).FirstOrDefault();

                if (String.IsNullOrWhiteSpace(fileId))
                    continue;

                nodes.Add(new Node
                {
                    fileId = fileId,
                    line = eventFounded.LineNumber ?? 0,
                    eventId = item.Event_Id.ToString(),
                    evaluated = false
                });
            }

            return nodes;
        }
    }
}
