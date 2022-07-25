using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Dtos
{
    public record TeamCreateRequest(int TeamCount, List<int> PlayerIds);
}
