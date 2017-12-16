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

        public virtual DbSet<Table> Tables { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Table>()
                .Property(e => e.Chave)
                .IsUnicode(false);

            modelBuilder.Entity<Table>()
                .Property(e => e.Valor)
                .IsUnicode(false);
        }
    }
}
