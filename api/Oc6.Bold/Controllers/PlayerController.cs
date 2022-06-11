using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Oc6.Bold.Data;
using Oc6.Bold.Middleware;
using Oc6.Bold.Models;

namespace Oc6.Bold.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly ILogger<PlayerController> logger;
        private readonly BoldContext context;
        private readonly UserContext userContext;

        public PlayerController(ILogger<PlayerController> logger, BoldContext context, UserContext userContext)
        {
            this.logger = logger;
            this.context = context;
            this.userContext = userContext;
        }

        [HttpGet]
        public async Task<IEnumerable<Player>> Get()
        {
            return await context.Players
                .AsNoTracking()
                .ToListAsync();
        }

        [HttpPost]
        [ProducesDefaultResponseType(typeof(Player))]
        public async Task<Player> Post()
        {
            return await Task.FromResult<Player>(new());
        }
    }
}