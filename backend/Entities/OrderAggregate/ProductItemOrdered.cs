using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace backend.Entities.OrderAggregate
{
    public class ProductItemOrdered
    {
        [Key]
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
    }
}