namespace SwarmServerAPI
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

        public virtual DbSet<Session> Sessions { get; set; }
        public virtual DbSet<Breakpoint> Breakpoints { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

        }
    }
}
