const hapiServer = require('./server/server.js')
const port = 1337
const server = hapiServer.newServer(port)

server.start(err => {
  if (err) throw err
  console.log(`Server is running at port: ${port}`)
  console.log(`Node version in use:  ${process.version}`)
})
