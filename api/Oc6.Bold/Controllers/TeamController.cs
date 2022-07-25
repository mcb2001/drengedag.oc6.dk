using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Oc6.Bold.Dtos;
using Oc6.Bold.Services;
using Oc6.Bold.Util;

namespace Oc6.Bold.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : ControllerBase
    {
        private const string TeamsCacheKey = nameof(TeamsCacheKey);
        private readonly IMemoryCache memoryCache;
        private readonly PlayerService playerService;

        public TeamController(IMemoryCache memoryCache, PlayerService playerService)
        {
            this.memoryCache = memoryCache;
            this.playerService = playerService;
        }

        [HttpPost]
        [ProducesDefaultResponseType(typeof(List<List<int>>))]
        public async Task<IActionResult> Post([FromBody] TeamCreateRequest request)
        {
            if (!await playerService.Exists(request.PlayerIds))
            {
                return NotFound("Ukendt id");
            }

            //Shuffle players to ensure random assignment on a team
            request.PlayerIds.Shuffle();

            List<List<int>> teams = Enumerable.Range(0, request.TeamCount)
                .Select(x => new List<int>())
                .ToList();

            for (int i = 0; i < request.PlayerIds.Count; ++i)
            {
                teams[i % request.TeamCount].Add(request.PlayerIds[i]);
            }

            //Shuffle team to randomize who is team 1 (in case of un-even number of players distrubuted on teams)
            teams.Shuffle();

            memoryCache.Set<List<List<int>>>(TeamsCacheKey, teams);

            return Get();
        }

        [HttpGet]
        [ProducesDefaultResponseType(typeof(List<List<int>>))]
        public IActionResult Get()
        {
            if (memoryCache.Get<List<List<int>>>(TeamsCacheKey) is not List<List<int>> teams)
            {
                return NotFound();
            }

            return Ok(teams);
        }
    }
}