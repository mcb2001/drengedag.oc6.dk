using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Oc6.Bold.Data;
using Oc6.Bold.Models;
using Oc6.Bold.Policies;
using Oc6.Bold.Services;
using System.Linq.Expressions;

namespace Oc6.Bold.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly BoldContext dbContext;
        private static readonly Expression<Func<Team, TeamDto>> AsDto = p => new(p.Id, p.Game, p.Players.Select(x => x.Id));
        private static readonly Func<Team, TeamDto> ToDto = AsDto.Compile();

        public TeamController(BoldContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("{id}")]
        [ProducesDefaultResponseType(typeof(PlayerDto))]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            if (await dbContext.Teams
                .AsNoTracking()
                .SingleOrDefaultAsync(p => p.Id == id) is Team team)
            {
                return Ok(team);
            }

            return NotFound();
        }

        [HttpGet]
        public async Task<IEnumerable<TeamDto>> Get()
        {
            return await dbContext.Teams
                .AsNoTracking()
                .Select(AsDto)
                .ToListAsync();
        }

        [HttpPost]
        [AdminPolicyAuthorize]
        public async Task<TeamDto> Post([FromBody] TeamDto dto)
        {
            var players = await dbContext.Players
                .Where(x => dto.Players.Contains(x.Id))
                .ToListAsync();

            Team team = new Team
            {
                Game = dto.Game,
                Players = players,
            };

            dbContext.Teams.Add(team);

            await dbContext.SaveChangesAsync();

            return ToDto(team);
        }

        [HttpPut]
        [AdminPolicyAuthorize]
        [ProducesDefaultResponseType(typeof(PlayerDto))]
        public async Task<IActionResult> Put([FromBody] TeamDto dto)
        {
            if (await dbContext.Teams.FindAsync(dto.Id) is Team team)
            {
                team.Game = dto.Game;

                await dbContext.SaveChangesAsync();

                return Ok(ToDto(team));
            }

            return NotFound();
        }

        [HttpDelete("{id}")]
        [AdminPolicyAuthorize]
        public async Task Delete([FromRoute] int id)
        {
            if (await dbContext.Players.FindAsync(id) is Player player)
            {
                dbContext.Players.Remove(player);

                await dbContext.SaveChangesAsync();
            }
        }

        [HttpPatch("{teamId}/player/{playerId}")]
        [AdminPolicyAuthorize]
        public async Task<IActionResult> AddPlayer([FromRoute] int teamId, [FromRoute] int playerId)
        {
            if (await dbContext.Teams
                .Include(x => x.Players)
                .Where(x => x.Id == teamId)
                .SingleOrDefaultAsync() is not Team team)
            {
                return NotFound("team");
            }

            if (await dbContext.Players.FindAsync(playerId) is not Player player)
            {
                return NotFound("player");
            }

            if (!team.Players.Any(x => x.Id == player.Id))
            {
                team.Players.Add(player);

                await dbContext.SaveChangesAsync();
            }

            return Ok(ToDto(team));
        }

        [HttpDelete("{teamId}/player/{playerId}")]
        [AdminPolicyAuthorize]
        public async Task<IActionResult> RemovePlayer([FromRoute] int teamId, [FromRoute] int playerId)
        {
            if (await dbContext.Teams
                .Include(x => x.Players)
                .Where(x => x.Id == teamId)
                .SingleOrDefaultAsync() is not Team team)
            {
                return NotFound("team");
            }

            if (await dbContext.Players.FindAsync(playerId) is not Player player)
            {
                return NotFound("player");
            }

            if (team.Players.Any(x => x.Id == player.Id))
            {
                team.Players.Remove(player);

                await dbContext.SaveChangesAsync();
            }

            return Ok(ToDto(team));
        }
    }
}