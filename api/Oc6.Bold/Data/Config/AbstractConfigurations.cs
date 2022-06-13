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
    public abstract class AbstractConfigurations<TEntity> : IEntityTypeConfiguration<TEntity>
        where TEntity : class
    {
        public abstract void Configure(EntityTypeBuilder<TEntity> builder);

        protected void SetDefaults<TObjectModel>(EntityTypeBuilder<TObjectModel> builder)
            where TObjectModel : DbModelObject
        {
            builder.HasKey(x => x.Id);
        }
    }
}
