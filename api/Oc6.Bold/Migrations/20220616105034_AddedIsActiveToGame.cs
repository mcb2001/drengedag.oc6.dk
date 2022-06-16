using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Oc6.Bold.Migrations
{
    public partial class AddedIsActiveToGame : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Games",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Games");
        }
    }
}
