namespace SwarmServerAPI.AppCore.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _5 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tasks", "TotalSessionTime", c => c.Time(nullable: false, precision: 7));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tasks", "TotalSessionTime");
        }
    }
}
