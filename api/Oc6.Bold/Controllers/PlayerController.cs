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
    public class PlayerController : ControllerBase
    {
        private readonly BoldContext dbContext;
        private readonly NameService nameService;
        private static readonly Expression<Func<Player, PlayerDto>> AsDto = p => new(p.Id, p.Name, p.Email, p.Auth0UserId);
        private static readonly Func<Player, PlayerDto> ToDto = AsDto.Compile();

        public PlayerController(BoldContext dbContext, NameService nameService)
        {
            this.dbContext = dbContext;
            this.nameService = nameService;
        }

        [HttpGet("{id}")]
        [ProducesDefaultResponseType(typeof(PlayerDto))]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            if (await dbContext.Players
                .AsNoTracking()
                .SingleOrDefaultAsync(p => p.Id == id) is Player player)
            {
                return Ok(player);
            }

            return NotFound();
        }

        [HttpGet]
        public async Task<IEnumerable<PlayerDto>> Get()
        {
            return await dbContext.Players
                .AsNoTracking()
                .Select(AsDto)
                .ToListAsync();
        }

        [HttpGet("me")]
        [ProducesDefaultResponseType(typeof(PlayerDto))]
        public async Task<IActionResult> Me()
        {
            if (User.Claims
                .Where(x => x.Type.Contains("nameidentifier"))
                .Select(x => x.Value)
                .SingleOrDefault() is not String auth0Id)
            {
                return BadRequest();
            }

            if (User.Claims
                .Where(x => x.Type.Contains("email"))
                .Select(x => x.Value)
                .SingleOrDefault() is not String email)
            {
                return BadRequest();
            }

            if (await dbContext.Players
                .Where(x => x.Auth0UserId == auth0Id)
                .SingleOrDefaultAsync() is Player playerWithMatchingAuth0Id)
            {
                return Ok(ToDto(playerWithMatchingAuth0Id));
            }

            if (await dbContext.Players
                .Where(x => x.Email == email)
                .SingleOrDefaultAsync() is Player playerWithEmailAndNotAuth0Id)
            {
                //store the Id as we now have it
                playerWithEmailAndNotAuth0Id.Auth0UserId = auth0Id;
                await dbContext.SaveChangesAsync();

                return Ok(ToDto(playerWithEmailAndNotAuth0Id));
            }

            return Ok(await Post(new(
                Id: default,
                Name: String.Empty,
                Email: email,
                Auth0UserId: auth0Id)));
        }

        [HttpPost]
        [AdminPolicyAuthorize]
        public async Task<PlayerDto> Post([FromBody] PlayerDto dto)
        {
            List<string> names = await dbContext.Players
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
                Email = dto.Email,
                Auth0UserId = dto.Auth0UserId,
            };

            dbContext.Players.Add(player);

            await dbContext.SaveChangesAsync();

            return ToDto(player);
        }

        [HttpPut]
        [ProducesDefaultResponseType(typeof(PlayerDto))]
        public async Task<IActionResult> Put([FromBody] PlayerDto dto)
        {
            if (await dbContext.Players.FindAsync(dto.Id) is Player player)
            {
                player.Name = dto.Name;

                await dbContext.SaveChangesAsync();

                return Ok(ToDto(player));
            }

            return NotFound();
        }

        [HttpDelete("{id}")]
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