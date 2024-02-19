using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entities
{
    public class Address
    {
        public string FullName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string County { get; set; }
        public string Postcode { get; set; }
        public string Country { get; set; }
    }
}