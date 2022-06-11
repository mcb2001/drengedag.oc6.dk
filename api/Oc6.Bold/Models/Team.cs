using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Models
{
#pragma warning disable CS8618 // Non-nullable
    public class Team
    {
        public int Id { get; set; }

        public string Game { get; set; }

        public List<Player> Players { get; set; }
    }
#pragma warning restore CS8618 // Non-nullable
}
