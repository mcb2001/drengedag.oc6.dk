using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Data.Models
{
#pragma warning disable CS8618 // Non-nullable
    public class TeamPlayer
    {
        public int PlayerId { get; set; }
        public Player Player { get; set; }

        public int TeamId { get; set; }
        public Team Team { get; set; }
    }
#pragma warning restore CS8618 // Non-nullable
}
