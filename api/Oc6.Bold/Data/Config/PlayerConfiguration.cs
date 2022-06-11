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
    public class PlayerConfiguration : AbstractConfigurations<Player>
    {
        public override void Configure(EntityTypeBuilder<Player> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.Auth0UserId)
                .IsUnique();
            builder.Property(x => x.Auth0UserId)
                .HasMaxLength(DataDefaults.MaxStringLength)
                .IsRequired(false);

            builder.Property(x => x.Name)
                .HasMaxLength(DataDefaults.MaxStringLength)
                .IsRequired(true);

            builder.HasIndex(x => x.Email)
                .IsUnique();
            builder.Property(x => x.Email)
                .HasMaxLength(DataDefaults.MaxStringLength)
                .IsRequired(true);
        }
    }
}
