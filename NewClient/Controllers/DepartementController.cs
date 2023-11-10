using Microsoft.AspNetCore.Mvc;

namespace NewClient.Controllers
{
    public class DepartementController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
