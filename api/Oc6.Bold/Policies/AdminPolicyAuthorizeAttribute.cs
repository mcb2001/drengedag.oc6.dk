using Microsoft.AspNetCore.Authorization;

namespace Oc6.Bold.Policies
{
    public class AdminPolicyAuthorizeAttribute : AuthorizeAttribute
    {
        public AdminPolicyAuthorizeAttribute()
            : base(policy: AdminPolicy.Policy)
        {

        }
    }
}
