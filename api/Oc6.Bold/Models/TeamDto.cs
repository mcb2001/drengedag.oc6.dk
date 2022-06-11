using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Models
{
    public record TeamDto(int Id, string Game, IEnumerable<int> Players);
}
