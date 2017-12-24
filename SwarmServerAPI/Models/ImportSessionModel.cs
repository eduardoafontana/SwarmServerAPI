using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace SwarmServerAPI.Models
{
    public enum ImportSessionStatus
    {
        Pending,
        Imported,
        Updated,
        Fail
    }

    public class ImportSessionItemModel
    {
        public string FileName { get; set; }
        public Stream FileStream { get; set; }
        public ImportSessionStatus Status { get; set; }
        public string StatusName { get; set; }
        public string Message { get; set; }
    }

    public class ImportSessionModel
    {
        [Required(ErrorMessage = "Please select file.")]
        [Display(Name = "Browse File")]
        public HttpPostedFileBase[] Files { get; set; }

        public List<ImportSessionItemModel> FilesToUpload { get; set; } = new List<ImportSessionItemModel>();
    }
}
