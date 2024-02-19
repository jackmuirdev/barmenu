using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Entities;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class RegisterDto : LoginDto
    {
        public string Email { get; set; }
    }
}
