using Microsoft.EntityFrameworkCore;
using Oc6.Bold.Models;
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


        public BoldContext(DbContextOptions<BoldContext> options)

            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


        }
    }
#pragma warning restore CS8618 // Non-nullable
}
