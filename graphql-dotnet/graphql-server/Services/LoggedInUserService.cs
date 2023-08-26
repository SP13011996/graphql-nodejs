public class LoggedInUserService : ILoggedInUserService
{
    private readonly DBContext _dBContext;

    public LoggedInUserService(DBContext dBContext)
    {
        _dBContext=dBContext;
    }
    public Guid createUser(User userRequest){

        _dBContext.Add(userRequest);
        _dBContext.SaveChanges();
        return userRequest.Id;
    }

    public List<User> GetUser(){
        
        var user = _dBContext.users.ToList();        
        return user;
    }
}