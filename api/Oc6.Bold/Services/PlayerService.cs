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
            new PlayerDto(p.Id, p.Name, p.Email, p.Auth0UserId, p.IsAdmin,
                    p.TeamPlayers.Sum(x => x.Team.Points),
                    p.TeamPlayers.Where(x => x.Team.Points == 1).Count());

        private readonly BoldContext context;
        private readonly NameService nameService;
        private readonly UserService userService;

        public PlayerService(BoldContext context, NameService nameService, UserService userService)
        {
            this.context = context;
            this.nameService = nameService;
            this.userService = userService;
        }

        public async Task<PlayerDto> UpdateSelf(string name)
        {
            int userId = await userService.GetCurrentUserIdAsync();

            if (userId > 0)
            {
                var player = await context.Players
                    .SingleAsync(x => x.Id == userId);

                player.Name = name;

                await context.SaveChangesAsync();

                return await GetByIdAsync(userId);
            }

            throw new ArgumentException("Invalid state");
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

        public async Task<PlayerDto> GetOrCreateSelf()
        {
            int userId = await userService.GetCurrentUserIdAsync();

            return await GetByIdAsync(userId);
        }

        public async Task<PlayerDto> Create(string email)
        {
            string name = await nameService.GetUniqueNameAsync();

            Player player = new()
            {
                Id = default,
                Name = name,
                Email = email,
                Auth0UserId = "",
                IsAdmin = false,
            };

            context.Players.Add(player);

            await context.SaveChangesAsync();

            return await GetByIdAsync(player.Id);
        }

        public async Task<PlayerDto> Update(int id, string name)
        {
            Player player = await context.Players
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
