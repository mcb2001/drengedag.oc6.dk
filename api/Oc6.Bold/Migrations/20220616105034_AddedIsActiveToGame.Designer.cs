// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Oc6.Bold.Data;

#nullable disable

namespace Oc6.Bold.Migrations
{
    [DbContext(typeof(BoldContext))]
    [Migration("20220616105034_AddedIsActiveToGame")]
    partial class AddedIsActiveToGame
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Oc6.Bold.Data.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("Oc6.Bold.Data.Models.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Auth0UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Auth0UserId")
                        .IsUnique()
                        .HasFilter("[Auth0UserId] IS NOT NULL");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Players");
                });

            modelBuilder.Entity("Oc6.Bold.Data.Models.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("GameId")
                        .HasColumnType("int");

                    b.Property<int>("Points")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("Oc6.Bold.Data.Models.TeamPlayer", b =>
                {
                    b.Property<int>("PlayerId")
                        .HasColumnType("int");

                    b.Property<int>("TeamId")
                        .HasColumnType("int");

                    b.HasKey("PlayerId", "TeamId");

                    b.HasIndex("TeamId");

                    b.ToTable("TeamPlayers");
                });

            modelBuilder.Entity("Oc6.Bold.Data.Models.Team", b =>
                {
                    b.HasOne("Oc6.Bold.Data.Models.Game", "Game")
                        .WithMany("Teams")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Game");
                });

            modelBuilder.Entity("Oc6.Bold.Data.Models.TeamPlayer", b =>
                {
                    b.HasOne("Oc6.Bold.Data.Models.Player", "Player")
                        .WithMany("TeamPlayers")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Oc6.Bold.Data.Models.Team", "Team")
                        .WithMany("TeamPlayers")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Player");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("Oc6.Bold.Data.Models.Game", b =>
                {
                    b.Navigation("Teams");
                });

            modelBuilder.Entity("Oc6.Bold.Data.Models.Player", b =>
                {
                    b.Navigation("TeamPlayers");
                });

            modelBuilder.Entity("Oc6.Bold.Data.Models.Team", b =>
                {
                    b.Navigation("TeamPlayers");
                });
#pragma warning restore 612, 618
        }
    }
}
