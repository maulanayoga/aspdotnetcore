using Microsoft.AspNetCore.Mvc;

namespace NewClient.Controllers
{
    public class TestCors : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
