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
    public class GameConfiguration : AbstractConfigurations<Game>
    {
        public override void Configure(EntityTypeBuilder<Game> builder)
        {
            SetDefaults(builder);

            builder.Property(x => x.Name)
                .IsRequired();
        }
    }
}
