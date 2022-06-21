using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Util
{
    public static class ClaimsPrincipalExtensions
    {
        private const string NameClaimKey = "nameidentifier";
        private const string EmailClaimKey = "email";

        public static string? NameFromClaims(this ClaimsPrincipal user) =>
            user.Claims
                .Where(x => x.Type.Contains(NameClaimKey))
                .Select(x => x.Value)
                .SingleOrDefault();

        public static string EmailFromClaims(this ClaimsPrincipal user) =>
            user.Claims
                .Where(x => x.Type.Contains(EmailClaimKey))
                .Select(x => x.Value)
                .Single();
    }
}
