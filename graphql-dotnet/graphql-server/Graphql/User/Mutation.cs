public class Mutation
{    
    public Guid AddUser([Service] ILoggedInUserService _loggedInUserService,User user)
    {
        _loggedInUserService.createUser(user);
        return user.Id;
    }
}
