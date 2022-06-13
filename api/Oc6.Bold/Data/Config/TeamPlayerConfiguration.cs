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
    public class TeamPlayerConfiguration : AbstractConfigurations<TeamPlayer>
    {
        public override void Configure(EntityTypeBuilder<TeamPlayer> builder)
        {
            builder.HasKey(x => new { x.PlayerId, x.TeamId });

            builder.HasOne(x => x.Player)
                .WithMany(x => x.TeamPlayers)
                .HasForeignKey(x => x.PlayerId);

            builder.HasOne(x => x.Team)
                .WithMany(x => x.TeamPlayers)
                .HasForeignKey(x => x.TeamId);
        }
    }
}
