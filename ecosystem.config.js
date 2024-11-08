module.exports = {
  apps : [{
    name   : "finaflor-api",
    script : "set NODE_ENV=production && node --import=tsx --env-file=.env ./dist/server.js"
  }]
}
