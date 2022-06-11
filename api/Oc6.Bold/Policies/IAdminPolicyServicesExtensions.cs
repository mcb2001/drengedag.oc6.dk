namespace Oc6.Bold.Policies
{
    public static class IServicesAdminPolicyExtensions
    {
        public static IServiceCollection AddAdminPolicyAuthorization(this IServiceCollection services) =>
                services.AddAuthorization(options =>
                    options.AddPolicy(AdminPolicy.Policy, policy =>
                        policy.RequireClaim("permissions", "admin:all")));
    }
}
