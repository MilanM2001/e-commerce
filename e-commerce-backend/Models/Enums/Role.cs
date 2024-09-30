using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace e_commerce_backend.Models.Enums
{
    public enum Role
    {
        [EnumMember(Value = "Admin")]
        Admin,

        [EnumMember(Value = "User")]
        User,
    }
}
