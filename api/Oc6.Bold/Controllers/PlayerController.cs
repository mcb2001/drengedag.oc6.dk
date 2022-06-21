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
    [Route("api/[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly PlayerService playerService;
        private readonly UserService userService;

        public PlayerController(PlayerService playerService, UserService userService)
        {
            this.playerService = playerService;
            this.userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<PlayerDto> Get([FromRoute] int id) =>
            await playerService.GetByIdAsync(id);

        [HttpGet]
        public async Task<IEnumerable<PlayerDto>> Get() =>
            await playerService.GetAsync();

        [HttpGet("self")]
        public async Task<PlayerDto> Self() =>
            await playerService.GetOrCreateSelf();

        [HttpPut("self")]
        public async Task<PlayerDto> Self([FromBody] PlayerDto player) =>
            await playerService.UpdateSelf(player.Name);

        [HttpPost]
        [AdminPolicyAuthorize]
        public async Task<PlayerDto> Post([FromBody] PlayerDto dto) =>
            await playerService.Create(dto.Email);

        [HttpPut]
        public async Task<PlayerDto> Put([FromBody] PlayerDto dto) =>
            await playerService.Update(dto.Id, dto.Name);

        [HttpDelete("{id}")]
        [ProducesDefaultResponseType(typeof(void))]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var userId = await userService.GetCurrentUserIdAsync();

            if (userId == id)
            {
                return BadRequest();
            }

            await playerService.Delete(id);

            return Ok();
        }
    }
}