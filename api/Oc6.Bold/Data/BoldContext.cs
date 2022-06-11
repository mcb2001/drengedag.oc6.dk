using Microsoft.EntityFrameworkCore;
using Oc6.Bold.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Data
{
#pragma warning disable CS8618 // Non-nullable
    public class BoldContext : DbContext
    {
        public DbSet<Player> Players { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamPlayer> TeamPlayers { get; set; }
        public DbSet<Game> Games { get; set; }

        public BoldContext(DbContextOptions<BoldContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(BoldContext).Assembly);
        }
    }
#pragma warning restore CS8618 // Non-nullable
}
