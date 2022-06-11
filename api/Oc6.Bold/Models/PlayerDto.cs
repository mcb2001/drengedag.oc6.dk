using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Models
{
    public record PlayerDto(int Id, string Name, string Email, string Auth0UserId) : IPlayer;
}
