public class Query
{    
    public List<User> GetUser([Service] ILoggedInUserService _loggedInUserService){
        return _loggedInUserService.GetUser();
    }
}