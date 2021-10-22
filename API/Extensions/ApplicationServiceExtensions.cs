using System;
using Application.Activities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistance;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(options =>
                       {
                           options.UseSqlite(config.GetConnectionString("DefaultConnection"));
                       });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Reactivities API", Version = "v1" });
            });
            services.AddCors(opt => opt.AddPolicy("CorsPolicy", option =>
            {
                option.AllowAnyMethod().AllowAnyHeader().WithOrigins(new String[] { "http://localhost:3001", "http://localhost:3000" });

            }));

            services.AddMediatR(typeof(List.Handler).Assembly);

            services.AddAutoMapper(typeof(Application.Core.MappingProfiles).Assembly);

            return services;
        }
    }
}