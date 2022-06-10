using Microsoft.AspNetCore.Authentication.JwtBearer;

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
            services.AddControllers();

            services.AddEndpointsApiExplorer();

            services.AddSwaggerGen();

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

            return services;
        }

        private static void ConfigureApp(WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseAuthentication();

            app.MapControllers();
        }
    }
}