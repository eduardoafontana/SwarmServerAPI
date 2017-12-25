﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using SwarmServerAPI.Models;

namespace SwarmServerAPI.Controllers
{
    public sealed class Singleton
    {
        private static volatile Singleton instance;
        private static object syncRoot = new Object();

        public List<ImportSessionItemModel> ImportSessionList { get; set; } = new List<ImportSessionItemModel>();

        private Singleton() { }

        public static Singleton Instance
        {
            get
            {
                if (instance != null)
                    return instance;

                lock (syncRoot)
                {
                    if (instance == null)
                        instance = new Singleton();
                }

                return instance;
            }
        }

        public async System.Threading.Tasks.Task ProcessImporting()
        {
            await System.Threading.Tasks.Task.Run(() =>
            {
                lock (ImportSessionList)
                {
                    while (ImportSessionList.Any(p => p.Status == ImportSessionStatus.Pending))
                    {
                        ImportSessionItemModel item = ImportSessionList.FirstOrDefault(p => p.Status == ImportSessionStatus.Pending);

                        if (item == null)
                            continue;

                        Thread.Sleep(10000);

                        item.Status = ImportSessionStatus.Imported;
                    }
                }
            });
        }
    }

    public class ImportSessionFilesController : ApiController
    {
        public void ImportFiles(List<ImportSessionItemModel> importSessionList)
        {
            Singleton.Instance.ImportSessionList.AddRange(importSessionList);

            Singleton.Instance.ProcessImporting();
        }

        public ImportSessionItemModel Get(string fileName)
        {
            ImportSessionItemModel importSessionItemModel = Singleton.Instance.ImportSessionList.FirstOrDefault(p => p.FileName.Equals(fileName));

            if (importSessionItemModel == null)
                return new ImportSessionItemModel
                {
                    FileName = fileName,
                    Message = "Problem on processing. Not found.",
                    Status = ImportSessionStatus.Fail,
                    StatusName = ImportSessionStatus.Fail.ToString(),
                    FileStream = null
                };

            if (importSessionItemModel.Status != ImportSessionStatus.Pending)
                Singleton.Instance.ImportSessionList.Remove(importSessionItemModel);

            return new ImportSessionItemModel
            {
                FileName = importSessionItemModel.FileName,
                Message = importSessionItemModel.Message,
                Status = importSessionItemModel.Status,
                StatusName = importSessionItemModel.Status.ToString(),
                FileStream = null
            };
        }
    }
}
