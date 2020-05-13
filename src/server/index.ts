import * as http from 'http'

http
  .createServer((req, res) => {
    res.end('hello mig!')
  })
  .listen(3000, () => {
    console.log('Server is running in http://localhost:3000')
  })
