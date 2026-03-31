var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache");

var server = builder.AddProject<Projects.AspireAngularDeploy_Server>("server")
    .WithReference(cache).WaitFor(cache)
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var webfrontend = builder.AddJavaScriptApp("webfrontend", "../frontend", "start")
    .WithReference(server).WaitFor(server)
    .WithHttpEndpoint(env: "PORT", port: 4200, isProxied: false)
    .WithExternalHttpEndpoints();

server.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();
