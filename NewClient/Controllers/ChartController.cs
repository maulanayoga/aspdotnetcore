using Microsoft.AspNetCore.Mvc;

namespace NewClient.Controllers
{
    public class ChartController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
