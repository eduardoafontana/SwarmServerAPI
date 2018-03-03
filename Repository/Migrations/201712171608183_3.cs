namespace SwarmServerAPI.AppCore.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _3 : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.Table");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Table",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Chave = c.String(unicode: false),
                        Valor = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
    }
}
