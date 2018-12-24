namespace SwarmServerAPI.AppCore.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _4 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PathNodes", "Event_Id", c => c.Guid(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PathNodes", "Event_Id");
        }
    }
}
