using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Margarita",
                    Description = "Classic cocktail with tequila, triple sec, and lime juice.",
                    Price = 900,
                    Image = "/images/Cocktails/margarita.webp",
                    Brand = "Studio 6",
                    Category = "Cocktails",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sex on the Beach",
                    Description = "Vodka-based cocktail with peach schnapps, cranberry juice, and orange juice.",
                    Price = 900,
                    Image = "/images/Cocktails/Sex-on-the-Beach.webp",
                    Brand = "Studio 6",
                    Category = "Cocktails",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Pornstar Martini",
                    Description = "Vodka-based cocktail with passion fruit liqueur and vanilla syrup.",
                    Price = 900,
                    Image = "/images/Cocktails/pornstar_martini.webp",
                    Brand = "Studio 6",
                    Category = "Cocktails",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Blue Lagoon",
                    Description = "Vodka-based cocktail with blue curaçao and lemonade.",
                    Price = 900,
                    Image = "/images/Cocktails/blue-lagoon.jpeg",
                    Brand = "Studio 6",
                    Category = "Cocktails",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Mojito",
                    Description = "Rum-based cocktail with mint, lime, sugar, and soda water.",
                    Price = 900,
                    Image = "/images/Cocktails/mojito.jpeg",
                    Brand = "Studio 6",
                    Category = "Cocktails",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Piña Colada",
                    Description = "Rum-based cocktail with coconut cream and pineapple juice.",
                    Price = 900,
                    Image = "/images/Cocktails/pina-colada.jpeg",
                    Brand = "Studio 6",
                    Category = "Cocktails",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Strawberry Daiquiri",
                    Description = "Rum-based cocktail with strawberries, lime, and sugar.",
                    Price = 900,
                    Image = "/images/Cocktails/Strawberry-Daiquiri.webp",
                    Brand = "Studio 6",
                    Category = "Cocktails",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Woo Woo",
                    Description = "Vodka-based cocktail with peach schnapps and cranberry juice.",
                    Price = 900,
                    Image = "/images/Cocktails/woo-woo.jpeg",
                    Brand = "Studio 6",
                    Category = "Cocktails",
                    QuantityInStock = 100
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}
