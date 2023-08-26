using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{
    private ILoggedInUserService _loggedInUserService;
    public TodoController(ILoggedInUserService loggedInUserService)
    {
        _loggedInUserService = loggedInUserService;
    }

    [HttpPost("AddUser")]
    public IActionResult AddUser(User user)
    {
        _loggedInUserService.createUser(user);
        return Ok(user.Id);
    }

    [HttpGet]
    public IActionResult Get()
    {        
        return Ok(_loggedInUserService.GetUser());
    }
}