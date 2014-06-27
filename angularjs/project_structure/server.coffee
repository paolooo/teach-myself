'use strict'

connect = require 'connect'
http = require 'http'
https = require 'https'
_ = require 'lodash'
url = require 'url'
fs = require 'fs'
qs = require 'qs'
mime = require 'mimetype'

switch process.argv[2]
  when 'fxos' then dir = '/platforms/firefoxos/www'
  when 'tizen' then dir = '/platforms/tizen'
  when 'android' then dir = '/platforms/android/assets/www'
  else dir = '/www'

pkg = require __dirname + '/package.json'

createRequest = (req, res, options, post_data='') ->
  body = ''

  _headers = _.clone req.headers
  delete _headers['host']

  # options
  options = _.extend options,
    method: req.method
    headers: _headers

  protocol = if options.protocol is 'https:' then https else http
  request = protocol.request options, (response) ->
    # handle redirection
    if response.statusCode > 300 and response.statusCode < 400 and response.headers.location
      _url = url.parse(response.headers.location)
      options.host = _url.host
      options.path = _url.path
      createRequest req, res, options
    else
      res.writeHead response.statusCode, response.headers if req.method isnt 'POST' and req.method isnt 'PUT'
      # on data
      response.on 'data', (chunk) ->
        body += chunk
        res.write chunk, 'binary' if req.method isnt 'POST' and req.method isnt 'PUT'
      # on end
      response.on 'end', ->
        if req.method is 'POST' or req.method is 'PUT'
          res.writeHead response.statusCode, response.headers
          res.end body
        else
          res.end()
      # on error
      response.on 'error', (e) ->
        console.log 'error 1', e
        res.writeHead 503
        res.end "<h1>503 #{e.message}</h1>"

  request.write post_data if req.method is 'POST' or req.method is 'PUT'

  request.on 'error', (e) ->
    console.log 'error 2', e
    res.writeHead 503
    res.end "<h1>503 #{e.message}</h1>"

  request.end()


app = connect()
  .use(connect.favicon())
  .use(connect.logger())
  .use(connect.static(__dirname + dir))
  .use(connect.directory(__dirname + dir))
  .use(connect.cookieParser())
  .use(connect.session(
    secret: pkg.config.server.secret
  ))
  .use (req, res) ->
    # error
    on404 = ->
      res.writeHead 404
      res.end "<h1>404 Not Found</h1>\n"

    onResEnd = ->
      mimeType = mime.lookup req._parsedUrl.pathname
      res.writeHead 200, {'Content-Type': mimeType}

    # detect browser
    if dir is '/www'
      ua = req.headers['user-agent']
      if /firefox/i.test ua
        browser = 'firefox'
        platform = 'firefoxos'
      else if /chrome/i.test ua
        browser = 'chrome'
        platform = 'android'
        # platform = 'tizen'
      else if /safari/i.test ua
        browser = 'safari'
        platform = 'ios'
      else if /msie/i.test ua
        browser = 'msie'
        platform = 'windows'
      else
        browser = 'unknown'
        platform = 'unknown'

    # mini route
    switch req._parsedUrl.pathname
      when '/proxy'
        _url = url.parse req._parsedUrl.query
        data = ''

        req.on 'data', (chunk) ->
          data += chunk

        req.on 'end', ->
          if req.method is 'POST' or req.method is 'PUT'
            post_data = JSON.parse data
            post_data = qs.stringify post_data
            createRequest req, res, _url, post_data

        if req.method is 'GET' or req.method is 'DELETE' or req.method is 'HEAD' or req.method is 'JSONP'
          createRequest req, res, _url

      else
        if dir is '/www'
          if /^\/cordova|plugins.*\.js|wgt|p12/g.exec req._parsedUrl.pathname
            path = "platforms/#{platform}"
            switch platform
              when 'firefoxos'
                path += "/www#{req._parsedUrl.pathname}"
              when 'android'
                path += "/assets/www#{req._parsedUrl.pathname}"
              when 'tizen'
                path += "#{req._parsedUrl.pathname}"

            if /\.wgt$/g.exec req._parsedUrl.pathname
              path = "platforms/tizen#{req._parsedUrl.pathname}"

            fs.exists path, (exists) ->
              if exists
                fileStream = fs.createReadStream path
                fileStream.pipe res
                onResEnd()
              else
                on404()
          else
            on404()

http.createServer(app).listen pkg.config.server.port

