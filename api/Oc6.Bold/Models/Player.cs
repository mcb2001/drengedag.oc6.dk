﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Models
{
#pragma warning disable CS8618 // Non-nullable
    public class Player
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string? Auth0UserId { get; set; }

        public List<Team> Teams { get; set; }
    }
#pragma warning restore CS8618 // Non-nullable
}
