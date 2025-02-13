using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using stock_server.Services;
using StockDB.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StockContext>(
options =>
{
	options.UseMySql(builder.Configuration.GetConnectionString("StockDB"),
	ServerVersion.Parse("8.0.33-mysql"));
});

builder.Services.AddScoped<AdminServices>();

builder.Services.AddMvc(option => option.EnableEndpointRouting = false)
	.AddNewtonsoftJson(opt=>opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAnyOrigin", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAnyOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
