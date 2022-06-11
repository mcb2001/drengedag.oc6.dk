using Oc6.Bold.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Middleware
{
    public class IdentityLoader
    {
        private readonly RequestDelegate next;

        public IdentityLoader(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var user = httpContext.User;

            if (httpContext.RequestServices.GetService<UserContext>() is UserContext userContext)
            {
                string? email = user
                    .Claims
                    .Where(x => x.Type == "https://oc6.dk/email")
                    .Select(x => x.Value)
                    .FirstOrDefault();

                var id = user
                    .Claims
                    .Where(x => x.Type.Contains("nameidentifier", StringComparison.OrdinalIgnoreCase))
                    .Select(x => x.Value)
                    .FirstOrDefault();

                if (email != null)
                {
                    if (id != null)
                    {
                        userContext.CurrentUser = new Auth0User(id, email);
                    }
                }
            }

            await next(httpContext);
        }
    }
}
