namespace SwarmServerAPI.AppCode.Repository
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class SwarmData : DbContext
    {
        public SwarmData()
            : base(Environment.GetEnvironmentVariable("SQLAZURECONNSTR_defaultConnection"))
        {
        }

        public virtual DbSet<PharoSession> PharoSessions { get; set; }
        public virtual DbSet<Session> Sessions { get; set; }
        public virtual DbSet<Breakpoint> Breakpoints { get; set; }
        public virtual DbSet<CodeMetric> CodeMetrics { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<PathNode> PathNodes { get; set; }
        public virtual DbSet<PathNodeParameter> PathNodeParameters { get; set; }
        public virtual DbSet<CodeFile> CodeFiles { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            
        }
    }
}
