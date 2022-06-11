using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Oc6.Bold.Data;
using Oc6.Bold.Models;
using System.Linq.Expressions;

namespace Oc6.Bold.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly ILogger<PlayerController> logger;
        private readonly BoldContext dbContext;

        private static readonly Expression<Func<Player, PlayerDto>> AsDto = p => new(p.Id, p.Name, p.Email, p.Auth0UserId);
        private static readonly Func<Player, PlayerDto> ToDto = AsDto.Compile();

        public PlayerController(ILogger<PlayerController> logger, BoldContext dbContext)
        {
            this.logger = logger;
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IEnumerable<PlayerDto>> Get()
        {
            return await dbContext.Players
                .AsNoTracking()
                .Select(AsDto)
                .ToListAsync();
        }

        [HttpPost]
        [ProducesDefaultResponseType(typeof(PlayerDto))]
        public async Task<PlayerDto> Post([FromBody] PlayerDto dto)
        {
            Player player = new()
            {
                Id = default,
                Name = dto.Name,
                Email = dto.Email,
            };

            dbContext.Players.Add(player);

            await dbContext.SaveChangesAsync();

            return ToDto(player);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task Delete([FromRoute] int id)
        {
            if (await dbContext.Players.FindAsync(id) is Player player)
            {
                dbContext.Players.Remove(player);

                await dbContext.SaveChangesAsync();
            }
        }
    }
}