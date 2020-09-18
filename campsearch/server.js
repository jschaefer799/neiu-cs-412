const http = require('http')
const fs = require('fs')
const path = require('path')


let app = http.createServer((request, response) => {
    console.log('Request starting...', request.url)

    let filePath = '.' + request.url
    if (filePath === './')
        filePath = './public/views/index.html'

    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, function (error, content) {
            if (error) {
                response.writeHead(500)
                response.end()
            } else {
                let contentType = ''
                if (path.extname(filePath) === '.html')
                    contentType = 'text/html'
                else if (path.extname(filePath) === '.jpg') {
                    contentType = 'image/jpeg'
                } else if (path.extname(filePath) === '.css') {
                    contentType = 'text/css'
                } else if (path.extname(filePath) === '.js') {
                    contentType = 'text/javascript'
                }
                response.writeHead(200, {'Content-Type': contentType})
                response.end(content, 'utf-8')
            }
        })
    } else {
        response.writeHead(404)
        response.end()
    }

})

app.listen(3000)

console.log('Server is running at 127.0.0.1:3000/ or http://localhost:3000')