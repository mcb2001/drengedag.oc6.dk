using Microsoft.EntityFrameworkCore;
using Oc6.Bold.Data;
using Oc6.Bold.Data.Models;
using Oc6.Bold.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Services
{
    public class PlayerService
    {
        public static readonly Expression<Func<Player, PlayerDto>> ToDto = p =>
            new PlayerDto(p.Id, p.Name, p.Email, p.Auth0UserId,
                    p.TeamPlayers.Sum(x => x.Team.Points),
                    p.TeamPlayers.Where(x => x.Team.Points == 1).Count());

        private readonly BoldContext context;
        private readonly NameService nameService;

        public PlayerService(BoldContext context, NameService nameService)
        {
            this.context = context;
            this.nameService = nameService;
        }

        public async Task<PlayerDto> GetByIdAsync(int id) =>
            await context.Players
                .AsNoTracking()
                .Where(x => x.Id == id)
                .Select(ToDto)
                .SingleAsync();

        public async Task<List<PlayerDto>> GetAsync() =>
            await context.Players
                .AsNoTracking()
                .Select(ToDto)
                .ToListAsync();

        public async Task<PlayerDto> GetOrCreateSelf(string? auth0Id, string email)
        {
            if (await context.Players
                .AsNoTracking()
                .Include(x => x.TeamPlayers)
                .ThenInclude(x => x.Team)
                .ThenInclude(x => x.Game)
                .Where(x => x.Auth0UserId == auth0Id)
                .Select(x=>x.Id)
                .SingleOrDefaultAsync() is int playerId)
            {
                return await GetByIdAsync(playerId);
            }

            if (await context.Players
                .AsNoTracking()
                .Include(x => x.TeamPlayers)
                .ThenInclude(x => x.Team)
                .ThenInclude(x => x.Game)
                .Where(x => x.Email == email)
                .SingleOrDefaultAsync() is Player playerWithMatchingEmail)
            {
                //store the Id as we now have it
                playerWithMatchingEmail.Auth0UserId = auth0Id;
                await context.SaveChangesAsync();

                return await GetByIdAsync(playerWithMatchingEmail.Id);
            }

            return await Create(email, auth0Id);
        }

        public async Task<PlayerDto> Create(string email, string? auth0UserId)
        {
            List<string> names = await context.Players
                .AsNoTracking()
                .Select(x => x.Name)
                .ToListAsync();

            bool found = false;

            string name = string.Empty;

            for (int i = 0; i < 100; ++i)
            {
                name = nameService.GetName();

                if (!names.Any(x =>
                    string.Compare(x, name, StringComparison.OrdinalIgnoreCase) == 0))
                {
                    found = true;
                    break;
                }
            }

            if (!found)
            {
                throw new Exception();
            }

            Player player = new()
            {
                Id = default,
                Name = name,
                Email = email,
                Auth0UserId = auth0UserId,
            };

            context.Players.Add(player);

            await context.SaveChangesAsync();

            return await GetByIdAsync(player.Id);
        }

        public async Task<PlayerDto> Update(int id, string name)
        {
            Player player = await context.Players
                .Include(x => x.TeamPlayers)
                .ThenInclude(x => x.Team)
                .ThenInclude(x => x.Game)
                .Where(x => x.Id == id)
                .SingleAsync();

            player.Name = name;

            await context.SaveChangesAsync();

            return await GetByIdAsync(id);
        }

        public async Task Delete(int id)
        {
            if (await context.Players.FindAsync(id) is Player player)
            {
                context.Players.Remove(player);

                await context.SaveChangesAsync();
            }
        }
    }
}
