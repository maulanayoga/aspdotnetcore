using Microsoft.AspNetCore.Mvc;

namespace NewClient.Controllers
{
    public class EmployeeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
