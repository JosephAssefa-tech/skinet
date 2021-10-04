using API.Extensions;
using API.Helpers;
using API.Middleware;
using Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration configuration)
        {
            _config = configuration;
        }

       // public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddApplicationServices();
            services.AddSwaggerDocumentation();
           
            services.AddControllers();
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                 {
                     policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:44397/");

                 });
            });
        
            services.AddDbContext<StoreContext>(options =>
            {
                options.UseSqlServer(_config.GetConnectionString("DefaultConnection"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                   
               }

            app.UseMiddleware<ExceptionMiddleware>();
            app.UseSwaggerDocumentation();

            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseStaticFiles();

            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
