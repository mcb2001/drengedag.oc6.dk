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
        private readonly GameService gameService;

        public GameController(GameService gameService)
        {
            this.gameService = gameService;
        }

        [HttpGet("{id}")]
        [ProducesDefaultResponseType(typeof(PlayerDto))]
        public async Task<GameDto> Get([FromRoute] int id) =>
            await gameService.GetByIdAsync(id);

        [HttpGet]
        public async Task<IEnumerable<GameDto>> Get() =>
            await gameService.GetAsync();

        [HttpPost]
        [AdminPolicyAuthorize]
        public async Task<GameDto> Post([FromBody] NewGameRequest request) =>
            await gameService.CreateAsync(request.Name, request.TeamCount, request.ParticipantIds);

        [HttpPut("finish")]
        public async Task<GameDto> FinishGame([FromBody] FinishGameRequest request) =>
            await gameService.FinishGameAsync(request.GameId, request.TeamIds);
    }
}
