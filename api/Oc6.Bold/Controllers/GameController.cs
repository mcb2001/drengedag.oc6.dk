using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Oc6.Bold.Data;
using Oc6.Bold.Dtos;
using Oc6.Bold.Data.Models;
using Oc6.Bold.Policies;
using Oc6.Bold.Services;
using System.Linq.Expressions;
using Oc6.Bold.Util;

namespace Oc6.Bold.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {
        private readonly BoldContext dbContext;

        public GameController(BoldContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("{id}")]
        [ProducesDefaultResponseType(typeof(PlayerDto))]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            if (await dbContext.Games
                .AsNoTracking()
                .Where(g => g.Id == id)
                .Select(g => new GameDto(g.Id, g.Name,
                    g.Teams.Select(t =>
                        new TeamDto(t.TeamPlayers.Select(tp =>
                            new PlayerDto(tp.Player.Id, tp.Player.Name, tp.Player.Email, tp.Player.Auth0UserId))))))
                .SingleOrDefaultAsync() is GameDto game)
            {
                return Ok(game);
            }

            return NotFound();
        }

        [HttpGet]
        public async Task<IEnumerable<GameDto>> Get()
        {
            return await dbContext.Games
                .AsNoTracking()
                .Select(g => new GameDto(g.Id, g.Name,
                    g.Teams.Select(t =>
                        new TeamDto(t.TeamPlayers.Select(tp =>
                            new PlayerDto(tp.Player.Id, tp.Player.Name, tp.Player.Email, tp.Player.Auth0UserId))))))
                .ToListAsync();
        }

        [HttpPost]
        [AdminPolicyAuthorize]
        public async Task<GameDto> Post([FromBody] NewGameRequest request)
        {
            var participants = request.participantIds;

            participants.Shuffle();

            List<List<int>> teams = Enumerable.Range(0, request.TeamCount)
                .Select(_ => new List<int>())
                .ToList();

            int team = 0;

            foreach (var participant in participants)
            {
                teams[team].Add(participant);
                team = (team + 1) % request.TeamCount;
            }

            Game game = new Game
            {
                Name = request.Name,
                Teams = teams.Select(team => new Team
                {
                    Points = 0,
                    TeamPlayers = team.Select(playerId => new TeamPlayer
                    {
                        PlayerId = playerId,
                    }).ToList(),
                }).ToList()
            };

            dbContext.Games.Add(game);

            await dbContext.SaveChangesAsync();

            return await dbContext.Games
                .AsNoTracking()
                .Where(g => g.Id == game.Id)
                .Select(g =>
                    new GameDto(g.Id, g.Name, g.Teams.Select(team =>
                      new TeamDto(team.TeamPlayers.Select(teamPlayer =>
                          new PlayerDto(teamPlayer.Player.Id, teamPlayer.Player.Name, teamPlayer.Player.Email, teamPlayer.Player.Auth0UserId))))))
                .SingleAsync();
        }
    }
}
