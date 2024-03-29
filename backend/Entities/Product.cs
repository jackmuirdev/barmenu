namespace backend.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public long Price { get; set; }
    public string Image { get; set; }
    public string Category  { get; set; }
    public string Brand { get; set; }
    public int QuantityInStock { get; set; }
    public string PublicId { get; set; }
}
