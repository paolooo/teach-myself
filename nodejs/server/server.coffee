'use strict'

connect = require 'connect'
http = require 'http'
https = require 'https'
_ = require 'lodash'
url = require 'url'
fs = require 'fs'
qs = require 'qs'
mime = require 'mimetype'
pkg = require __dirname + '/package.json'

createRequest = (req, res, options, post_data='') ->
  body = ''
  _headers = _.clone req.headers
  delete _headers['host']
  options = _.extend options,
    method: req.method
    headers: _headers
  protocol = if options.protocol is 'https:' then https else http

  request = protocol.request options, (response) ->
    if response.statusCode > 300 and response.statusCode < 400 and response.headers.location
      _url = url.parse(response.headers.location)
      options.host = _url.host
      options.path = _url.path
      createRequest req, res, options
    else
      res.writeHead response.statusCode, response.headers if req.method isnt 'POST' and req.method isnt 'PUT'
      response.on 'data', (chunk) ->
        body += chunk
        res.write chunk, 'binary' if req.method isnt 'POST' and req.method isnt 'PUT'
      response.on 'end', ->
        if req.method is 'POST' or req.method is 'PUT'
          res.writeHead response.statusCode, response.headers
          res.end body
        else
          res.end()
      response.on 'error', (e) ->
        res.writeHead 503
        res.end "<h1>503 #{e.message}</h1>"

  request.write post_data if req.method is 'POST' or req.method is 'PUT'
  request.on 'error', (e) ->
    res.writeHead 503
    res.end "<h1>503 #{e.message}</h1>"
  request.end()

app = connect()
  .use connect.favicon()
  .use connect.logger()
  .use connect.static "#{__dirname}/#{pkg.app.public}"
  .use connect.directory "#{__dirname}/#{pkg.app.public}"
  .use connect.cookieParser()
  .use (req, res) ->
    on404 = ->
      res.writeHead 404
      res.end "<h1>404 Not Found</h1>\n"

    onResEnd = ->
      mimeType = mime.lookup req._parsedUrl.pathname
      res.writeHead 200, {'Content-Type': mimeType}

    # mini route
    switch req._parsedUrl.pathname
      when '/proxy'
        _url = url.parse req._parsedUrl.query
        data = ''
        req.on 'data', (chunk) -> data += chunk
        req.on 'end', ->
          if req.method is 'POST' or req.method is 'PUT'
            post_data = JSON.parse data
            post_data = qs.stringify post_data
            createRequest req, res, _url, post_data

        createRequest req, res, _url if req.method is 'GET' or req.method is 'DELETE' or req.method is 'HEAD' or req.method is 'JSONP'
      else
        fs.exists path, (exists) ->
          if exists
            fileStream = fs.createReadStream path
            fileStream.pipe res
            onResEnd()
          else
            on404()

http.createServer(app).listen pkg.config.server.port
