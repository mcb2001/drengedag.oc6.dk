using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Data.Models
{
#pragma warning disable CS8618 // Non-nullable
    public class Player
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public bool IsAdmin { get; set; }

        public string? Auth0UserId { get; set; }

        public int Points { get; set; }
    }
#pragma warning restore CS8618 // Non-nullable
}
