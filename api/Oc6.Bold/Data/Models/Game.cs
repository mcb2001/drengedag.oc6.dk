using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Data.Models
{
#pragma warning disable CS8618 // Non-nullable
    public class Game : DbModelObject
    {
        public string Name { get; set; }

        public List<Team> Teams { get; set; }
    }
#pragma warning restore CS8618 // Non-nullable
}
