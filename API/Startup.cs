using API.Errors;
using API.Extensions;
using API.Helpers;
using API.Middleware;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StackExchange.Redis;
using System.Linq;

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
            services.AddIdentityServices(_config);
            services.AddSwaggerDocumentation();
            services.AddSingleton<IConnectionMultiplexer>(
                c =>
                {
                    var configuration = ConfigurationOptions.Parse(_config
                        .GetConnectionString("Redis"), true);
                    return ConnectionMultiplexer.Connect(configuration);
                });
            services.AddDbContext<AppIdentityDbContext>(x =>
            {

                x.UseSqlServer(_config.GetConnectionString("IdentityConnection"));

            });
           
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

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState.Where(e => e.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value.Errors)
                    .Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = errors
                    };
                    return new BadRequestObjectResult(errorResponse);

                };


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

            app.UseCors(options =>
           options.WithOrigins("https://localhost:4200")  // 4200 is front end rout
         .AllowAnyHeader()
         .AllowAnyMethod());

            app.UseRouting();
            app.UseStaticFiles();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
