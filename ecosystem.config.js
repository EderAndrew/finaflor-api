module.exports = {
  port: process.env.PORT,
  apps : [{
    name   : "app1",
    script : "./dist/server.js"
  }]
}
