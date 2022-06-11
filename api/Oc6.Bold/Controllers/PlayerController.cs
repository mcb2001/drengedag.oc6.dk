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
    public class PlayerController : ControllerBase
    {
        private readonly BoldContext dbContext;
        private readonly NameService nameService;

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
                .Where(p => p.Id == id)
                .Select(p => new PlayerDto(p.Id, p.Name, p.Email, p.Auth0UserId))
                .SingleOrDefaultAsync() is PlayerDto player)
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
                .Select(p => new PlayerDto(p.Id, p.Name, p.Email, p.Auth0UserId))
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
                return Ok(new PlayerDto(playerWithMatchingAuth0Id.Id, playerWithMatchingAuth0Id.Name, playerWithMatchingAuth0Id.Email, playerWithMatchingAuth0Id.Auth0UserId));
            }

            if (await dbContext.Players
                .Where(x => x.Email == email)
                .SingleOrDefaultAsync() is Player playerWithEmailAndNotAuth0Id)
            {
                //store the Id as we now have it
                playerWithEmailAndNotAuth0Id.Auth0UserId = auth0Id;
                await dbContext.SaveChangesAsync();

                return Ok(new PlayerDto(playerWithEmailAndNotAuth0Id.Id, playerWithEmailAndNotAuth0Id.Name, playerWithEmailAndNotAuth0Id.Email, playerWithEmailAndNotAuth0Id.Auth0UserId));
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

            return new(player.Id, player.Name, player.Email, player.Auth0UserId);
        }

        [HttpPut]
        [ProducesDefaultResponseType(typeof(PlayerDto))]
        public async Task<IActionResult> Put([FromBody] PlayerDto dto)
        {
            if (await dbContext.Players.FindAsync(dto.Id) is Player player)
            {
                player.Name = dto.Name;

                await dbContext.SaveChangesAsync();

                return Ok(new PlayerDto(player.Id, player.Name, player.Email, player.Auth0UserId));
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