﻿using Microsoft.EntityFrameworkCore;
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
            SetDefaults(builder);

            builder.HasIndex(x => x.Auth0UserId)
                .IsUnique();
            builder.Property(x => x.Auth0UserId)
                .IsRequired(false);

            builder.Property(x => x.Name)
                .IsRequired(true);

            builder.HasIndex(x => x.Email)
                .IsUnique();
            builder.Property(x => x.Email)
                .IsRequired(true);
        }
    }
}
