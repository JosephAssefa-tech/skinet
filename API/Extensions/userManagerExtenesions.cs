using Core.Entities.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class UserManagerExtenesions 
    {

        //public static async Task<AppUser> FindByEmailWithAddressAsync(this UserManager<AppUser> input 
        //    , ClaimsPrincipal user)
        //{
        //    var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?
        //        .Value;

        //    return await input.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
        //}
    }
}
