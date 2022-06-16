using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Dtos
{
    public record TeamDto(int Id, IEnumerable<PlayerDto> Players);
}
