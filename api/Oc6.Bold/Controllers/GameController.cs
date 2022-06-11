using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Oc6.Bold.Data;
using Oc6.Bold.Dtos;
using Oc6.Bold.Data.Models;
using Oc6.Bold.Policies;
using Oc6.Bold.Services;
using System.Linq.Expressions;

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
                    g.Teams.Select(t => new TeamDto(t.TeamPlayers.Select(tp => new PlayerDto(tp.Player.Id, tp.Player.Name, tp.Player.Email, tp.Player.Auth0UserId))))))
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
                    g.Teams.Select(t => new TeamDto(t.TeamPlayers.Select(tp => new PlayerDto(tp.Player.Id, tp.Player.Name, tp.Player.Email, tp.Player.Auth0UserId))))))
                .ToListAsync();
        }

        [HttpPost]
        [AdminPolicyAuthorize]
        public async Task<GameDto> Post([FromBody] NewGameRequest request)
        {
            return await Task.FromException<GameDto>(new NotImplementedException());
        }
    }
}