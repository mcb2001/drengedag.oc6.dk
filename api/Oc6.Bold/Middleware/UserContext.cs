using Oc6.Bold.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Middleware
{
    public class UserContext
    {
        public Auth0User CurrentUser { get; set; }
    }
}
