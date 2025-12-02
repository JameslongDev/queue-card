using Microsoft.AspNetCore.Mvc;
using QueueBackend.Services;

namespace QueueBackend.Controllers
{
    [ApiController]
    [Route("api/queue")]
    public class QueueController : ControllerBase
    {
        private readonly QueueService _queueService;

        public QueueController(QueueService queueService)
        {
            _queueService = queueService;
        }

        [HttpGet("load")]
        public async Task<IActionResult> loadQueueData()
        {
            var result = await _queueService.loadData();
            return Ok(new { queue = result.Queue, time = result.Time });
        }

        [HttpGet("next")]
        public async Task<IActionResult> GetNextQueue()
        {
            var result = await _queueService.GetNextQueueAsync();
            return Ok(new { queue = result.Queue, time = result.Time });
        }

        [HttpPost("reset")]
        public async Task<IActionResult> ResetQueue()
        {
            await _queueService.ResetQueueAsync();
            return Ok(new { message = "Queue reset to A0" });
        }
    }
}
