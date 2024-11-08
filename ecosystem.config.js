module.exports = {
  apps : [{
    name   : "finaflor-api",
    script : "prisma generate && tsc && set NODE_ENV=production && node --import=tsx --env-file=.env ./dist/server.js"
  }]
}
