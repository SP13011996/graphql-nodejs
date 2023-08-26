public interface ILoggedInUserService
{
    public Guid createUser(User userRequest);

    public List<User> GetUser();
}     