using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Data.Models
{
#pragma warning disable CS8618 // Non-nullable
    public class Team
    {
        public int Id { get; set; }

        public int GameId { get; set; }
        public Game Game { get; set; }

        public int Points { get; set; }

        public List<TeamPlayer> TeamPlayers { get; set; }
    }
#pragma warning restore CS8618 // Non-nullable
}
