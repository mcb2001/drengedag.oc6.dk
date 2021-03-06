using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Oc6.Bold.Data;
using Oc6.Bold.Dtos;
using Oc6.Bold.Policies;
using Oc6.Bold.Services;
using Oc6.Bold.Validation;

namespace Oc6.Bold
{
    public class Program
    {
        private const string Auth0SectionKey = "Auth0";

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            ConfigureServices(builder.Services, builder.Configuration);

            WebApplication app = builder.Build();

            ConfigureApp(app);

            app.Run();
        }

        private static IServiceCollection ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers()
                .AddFluentValidation(options => options.RegisterValidatorsFromAssembly(typeof(Program).Assembly));

            services.AddEndpointsApiExplorer();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Oc6 Drengedag", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Bearer token auth",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                      new OpenApiSecurityScheme
                      {
                        Reference = new OpenApiReference
                          {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                          },
                          Scheme = "oauth2",
                          Name = "Bearer",
                          In = ParameterLocation.Header,

                        },
                        new List<string>()
                      }
                    });
            });

            string authority = configuration.GetSection(Auth0SectionKey)["Authority"];
            string audience = configuration.GetSection(Auth0SectionKey)["Audience"];

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = authority;
                options.Audience = audience;
            });

            services.AddAdminPolicyAuthorization();

            services.AddLogging(config => config.AddConsole());

            services.AddDbContext<BoldContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString(nameof(BoldContext)), config =>
                    config.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)));

            services.AddScoped<GameService>();
            services.AddScoped<NameService>();
            services.AddScoped<PlayerService>();
            services.AddScoped<UserService>();

            return services;
        }

        private static void ConfigureApp(WebApplication app)
        {
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseFileServer();

            app.UseCors(options =>
            {
                options.AllowAnyHeader();
                options.AllowAnyMethod();
                options.AllowAnyOrigin();
            });

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();
        }
    }
}