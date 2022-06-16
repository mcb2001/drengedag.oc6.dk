using Microsoft.EntityFrameworkCore;
using Oc6.Bold.Data;
using Oc6.Bold.Data.Models;
using Oc6.Bold.Dtos;
using Oc6.Bold.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Oc6.Bold.Services
{
    public class GameService
    {
        public static readonly Expression<Func<Game, GameDto>> ToDto = g =>
            new GameDto(g.Id, g.Name, g.IsActive, g.Teams.Select(t =>
                new TeamDto(t.Id, t.TeamPlayers.Select(tp =>
                    new PlayerDto(tp.Player.Id, tp.Player.Name, tp.Player.Email, tp.Player.Auth0UserId,
                        tp.Player.TeamPlayers.Sum(x => x.Team.Points),
                        tp.Player.TeamPlayers.Where(x => x.Team.Points == 1).Count())))));

        private readonly BoldContext context;

        public GameService(BoldContext context)
        {
            this.context = context;
        }

        public async Task<GameDto> GetByIdAsync(int id) => await context.Games
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(ToDto)
            .SingleAsync();

        public async Task<List<GameDto>> GetAsync() => await context.Games
            .AsNoTracking()
            .Select(ToDto)
            .ToListAsync();

        public async Task<GameDto> CreateAsync(string name, int teamCount, List<int> participantIds)
        {
            participantIds.Shuffle();

            List<List<int>> teams = Enumerable.Range(0, teamCount)
                .Select(_ => new List<int>())
                .ToList();

            int team = 0;

            foreach (var participant in participantIds)
            {
                teams[team].Add(participant);
                team = (team + 1) % teamCount;
            }

            Game game = new()
            {
                Name = name,
                Teams = teams.Select(team => new Team
                {
                    Points = 0,
                    TeamPlayers = team.Select(playerId => new TeamPlayer
                    {
                        PlayerId = playerId,
                    }).ToList(),
                }).ToList(),
                IsActive = true
            };

            context.Games.Add(game);

            await context.SaveChangesAsync();

            return await GetByIdAsync(game.Id);
        }

        public async Task<GameDto> FinishGameAsync(int gameId, List<int> teamIds)
        {
            var game = await context.Games
                .Include(x => x.Teams)
                .Where(x => x.Id == gameId)
                .SingleAsync();

            game.IsActive = false;

            for (int i = 0; i < teamIds.Count; ++i)
            {
                var team = game.Teams
                    .Where(x => x.Id == teamIds[i])
                    .Single();

                team.Points += (i + 1); //1 for a win, 2 for second, 3 for third...
            }

            await context.SaveChangesAsync();

            return await GetByIdAsync(game.Id);
        }
    }
}
