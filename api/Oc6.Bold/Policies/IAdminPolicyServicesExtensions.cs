using System.Security.Claims;

namespace Oc6.Bold.Policies
{
    public static class IServicesAdminPolicyExtensions
    {
        private const string ClaimType = "permissions";
        private const string ClaimValue = "admin:all";

        public static IServiceCollection AddAdminPolicyAuthorization(this IServiceCollection services) =>
                services.AddAuthorization(options =>
                    options.AddPolicy(AdminPolicy.Policy, policy =>
                        policy.RequireClaim(ClaimType, ClaimValue)));

        public static bool IsAdmin(this ClaimsPrincipal user) =>
            user.HasClaim(ClaimType, ClaimValue);
    }
}
