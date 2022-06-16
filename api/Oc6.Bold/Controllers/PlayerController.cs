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
        private readonly PlayerService playerService;

        public PlayerController(PlayerService playerService)
        {
            this.playerService = playerService;
        }

        [HttpGet("{id}")]
        public async Task<PlayerDto> Get([FromRoute] int id) =>
            await playerService.GetByIdAsync(id);

        [HttpGet]
        public async Task<IEnumerable<PlayerDto>> Get() =>
            await playerService.GetAsync();

        [HttpGet("me")]
        public async Task<PlayerDto> Me() =>
            await playerService.GetOrCreateSelf(
                User.Claims
                    .Where(x => x.Type.Contains("nameidentifier"))
                    .Select(x => x.Value)
                    .SingleOrDefault(),
                User.Claims
                    .Where(x => x.Type.Contains("email"))
                    .Select(x => x.Value)
                    .Single());

        [HttpPost]
        [AdminPolicyAuthorize]
        public async Task<PlayerDto> Post([FromBody] PlayerDto dto) =>
            await playerService.Create(dto.Email, dto.Auth0UserId);

        [HttpPut]
        public async Task<PlayerDto> Put([FromBody] PlayerDto dto) =>
            await playerService.Update(dto.Id, dto.Name);

        [HttpDelete("{id}")]
        public async Task Delete([FromRoute] int id) =>
            await playerService.Delete(id);
    }
}