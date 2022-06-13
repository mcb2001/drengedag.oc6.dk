using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Oc6.Bold.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Data.Config
{
    public class TeamConfiguration : AbstractConfigurations<Team>
    {
        public override void Configure(EntityTypeBuilder<Team> builder)
        {
            SetDefaults(builder);

            builder.HasOne(x => x.Game)
                .WithMany(x => x.Teams)
                .HasForeignKey(x => x.GameId);
        }
    }
}
