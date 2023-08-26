public class Book
{
    private  readonly int someproperty;

    public Book()
    {
        someproperty=100;
    }
    public string Title { get; set; }

    public Author Author { get; set; }
}

public class Author
{
    public string Name { get; set; }
}
