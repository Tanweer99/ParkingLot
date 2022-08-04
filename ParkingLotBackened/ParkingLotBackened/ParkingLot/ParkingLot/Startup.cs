using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ParkingLot.Shared.AutoMapper;
using ParkingLot.Shared.Interface.BLL;
using ParkingLot.Shared.Interface.DAL;
using ParkingLot.Shared.Model;
using ParkingLotBLL;
using ParkingLotDLL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingLot
{
    public class Startup
    {
        private MapperConfiguration _mapperConfiguration { get; set; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _mapperConfiguration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
          

            

            services.Configure<ParkingLotDatabaseSettings>(
                Configuration.GetSection(nameof(ParkingLotDatabaseSettings)));
            services.AddSingleton<IParkingLotDatabaseSettings>(provider =>
                provider.GetRequiredService<IOptions<ParkingLotDatabaseSettings>>().Value);

            //add automapper
            services.AddSingleton<IMapper>(sp => _mapperConfiguration.CreateMapper());

            // JWT Implementation

            var key = Encoding.UTF8.GetBytes(Configuration["ApplicationSettings:JWT_Secret"].ToString());

            services.AddAuthentication(au =>
            {
                au.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                au.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                au.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(Jwt =>
            {
                Jwt.RequireHttpsMetadata = false;
                Jwt.SaveToken = false;
                Jwt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                   ClockSkew= TimeSpan.Zero
                };
            });

            services.AddSingleton<IBookSlotRepo, BookSlotRepo>();
            services.AddSingleton<IBookSlotBLL, BookSlotBLL>();
            services.AddSingleton<ISlotRepo, SlotRepo>();
            services.AddSingleton<ISlotBLL, SlotBLL>();
            services.AddSingleton<IAuthenticationRepo, AuthenticationRepo>();
            services.AddSingleton<IAuthenticationBLL, AuthenticationBLL>();

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ParkingLot", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ParkingLot v1"));
            }

            app.UseCors(builder =>
                builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
