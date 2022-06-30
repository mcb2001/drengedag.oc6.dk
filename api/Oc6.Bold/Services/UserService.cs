using Microsoft.EntityFrameworkCore;
using Oc6.Bold.Data;
using Oc6.Bold.Data.Models;
using Oc6.Bold.Dtos;
using Oc6.Bold.Policies;
using Oc6.Bold.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Services
{
    public class UserService
    {
        private const string NameClaimKey = "nameidentifier";
        private const string EmailClaimKey = "email";

        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly BoldContext dbContext;
        private readonly NameService nameService;
        private int? currentUserId;

        public UserService(IHttpContextAccessor httpContextAccessor, BoldContext dbContext, NameService nameService)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = dbContext;
            this.nameService = nameService;
            currentUserId = null;
        }

        public async Task<int> GetCurrentUserIdAsync()
        {
            if (!currentUserId.HasValue)
            {
                currentUserId = await LoadCurrentUserIdAsync();
            }

            return currentUserId.Value;
        }

        public static string? Auth0FromClaims(ClaimsPrincipal user) =>
            user.Claims
                .Where(x => x.Type.Contains(NameClaimKey))
                .Select(x => x.Value)
                .SingleOrDefault();

        public static string EmailFromClaims(ClaimsPrincipal user) =>
            user.Claims
                .Where(x => x.Type.Contains(EmailClaimKey))
                .Select(x => x.Value)
                .Single();

        private async Task<int> LoadCurrentUserIdAsync()
        {
            if (this.httpContextAccessor.HttpContext is not HttpContext httpContext)
            {
                throw new ArgumentException("Invalid user");
            }

            string email = EmailFromClaims(httpContext.User);
            string? auth0Id = Auth0FromClaims(httpContext.User);
            bool isAdmin = httpContext.User.IsAdmin();

            if (await dbContext.Players
                .AsNoTracking()
                .Where(x => x.Auth0UserId == auth0Id)
                .Select(x => x.Id)
                .SingleOrDefaultAsync() is int playerId && playerId != 0)
            {
                return playerId;
            }

            if (await dbContext.Players
                .Where(x => x.Email == email)
                .SingleOrDefaultAsync() is Player playerWithMatchingEmail)
            {
                //store the Id as we now have it
                playerWithMatchingEmail.Auth0UserId = auth0Id;
                await dbContext.SaveChangesAsync();

                return playerWithMatchingEmail.Id;
            }

            string name = await nameService.GetUniqueNameAsync();

            Player player = new()
            {
                Id = default,
                Name = name,
                Email = email,
                Auth0UserId = null,
                IsAdmin = isAdmin,
            };

            dbContext.Players.Add(player);

            await dbContext.SaveChangesAsync();

            return player.Id;
        }
    }
}
