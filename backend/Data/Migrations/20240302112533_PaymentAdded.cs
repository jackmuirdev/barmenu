using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class PaymentAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_ProductItemOrdered_ItemOrderedProductId",
                table: "OrderItem");

            migrationBuilder.DropTable(
                name: "ProductItemOrdered");

            migrationBuilder.DropIndex(
                name: "IX_OrderItem_ItemOrderedProductId",
                table: "OrderItem");

            migrationBuilder.RenameColumn(
                name: "ItemOrderedProductId",
                table: "OrderItem",
                newName: "ItemOrdered_ProductId");

            migrationBuilder.AddColumn<string>(
                name: "ItemOrdered_Image",
                table: "OrderItem",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemOrdered_Name",
                table: "OrderItem",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemOrdered_Image",
                table: "OrderItem");

            migrationBuilder.DropColumn(
                name: "ItemOrdered_Name",
                table: "OrderItem");

            migrationBuilder.RenameColumn(
                name: "ItemOrdered_ProductId",
                table: "OrderItem",
                newName: "ItemOrderedProductId");

            migrationBuilder.CreateTable(
                name: "ProductItemOrdered",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Image = table.Column<string>(type: "TEXT", nullable: true),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductItemOrdered", x => x.ProductId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_ItemOrderedProductId",
                table: "OrderItem",
                column: "ItemOrderedProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_ProductItemOrdered_ItemOrderedProductId",
                table: "OrderItem",
                column: "ItemOrderedProductId",
                principalTable: "ProductItemOrdered",
                principalColumn: "ProductId");
        }
    }
}
