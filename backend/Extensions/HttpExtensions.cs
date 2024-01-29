using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http; 
using backend.RequestHelpers;
using System.Text.Json;

namespace backend.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, MetaData metadata)
        {
            var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

            response.Headers.Add("Pagination", JsonSerializer.Serialize(metadata, options));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
    }
}