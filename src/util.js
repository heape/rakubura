const http = require('http'),
    https = require('https'),
    iconv = require('iconv-lite'),
    zlib = require('zlib');

const sleep = ms => new Promise((r, j) => setTimeout(r, ms));
const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const str2doc = str => {
    let parser = new DOMParser();
    return parser.parseFromString(str, "text/html");
};
const str2xml = str => {
    let parser = new DOMParser();
    return parser.parseFromString(str, "application/xml");
};
const toInt = str => {
    return parseInt(str, 10);
};

function createCookieStore() {
    let ck = {
        init: function(c) {
            this.c = c;
        },
        getAll: function() {
            return this.c;
        },
        get: function(key) {
            return ((this.c + ';').match('\\b' + key + '=([^;]*)') || [])[1];
        },
        set: function(key, value) {
            if (value === 'deleted') {
                let v = ((this.c + ';').match('\\b' + key + '=([^;]*)') || [])[1];
                let str = this.c.substr(this.c.indexOf(key + '=' + v) + (key.length + 1 + v.length), 1);
                if (str === ';')
                    this.c = this.c.replace(key + '=' + v + '; ', '');
                else if (str === '')
                    this.c = this.c.replace(key + '=' + v, '');

                return;
            }

            this.c = this.c.replace(key + '=' + ((this.c + ';').match('\\b' + key + '=([^;]*)') || [])[1], key + '=' + value);
        },
        add: function(key, value) {
            if (value === 'deleted') {
                return;
            }

            let ps = '; ';
            if (this.c.length === 0)
                ps = '';
            this.c += ps + key + '=' + value;
        },
    };

    return ck;
}

function updateCookieStore(ck, cookie, res) {
    try {
        if (res.headers.hasOwnProperty('set-cookie')) {
            let c = res.headers['set-cookie'];
            ck.init(cookie);
            for (let i = 0; i < c.length; i++) {
                let base = c[i].substring(0, c[i].indexOf(';'))
                let key = base.substring(0, base.indexOf('='));
                let value = base.substring(base.indexOf('=') + 1);

                if (ck.get(key) === undefined) {
                    ck.add(key, value);
                } else if (ck.get(key) !== undefined && ck.get(key) !== value) {
                    ck.set(key, value);
                }

                cookie = ck.getAll();
            }
        } else {
          ck.init(cookie);
        }
    } catch (ex) {

    }

    return ck;
}

function createBoundary() {
  let multipartChars = "-_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let length = 30 + Math.floor( Math.random() * 10 );
  let boundary = "---------------------------";
  for (let i=0;i < length; i++) {
      boundary += multipartChars.charAt( Math.floor( Math.random() * multipartChars.length ) );
  }
  return boundary;
}

function request(args, charset) {
    return new Promise((resolve, reject) => {
        let chunks = [];
        let URL_ = new URL(args.url);

        if (URL_.protocol === 'http:') {
            let options = {};
            
            args.headers = Object.assign({'Host': URL_.hostname, 'Connection': 'close'}, args.headers);
            if (args.proxy === undefined || args.proxy === '') {
                options = {
                    method: args.method,
                    host: URL_.hostname,
                    port: URL_.protocol === 'https:' ? 443 : 80,
                    path: URL_.pathname + URL_.search,
                    headers: args.headers,
                    encoding: null,
                };
            } else {
                let parr = args.proxy.split(':');
                let host = null,
                    port = null,
                    username = null,
                    password = null;

                if (parr.length === 2) {
                    host = parr[0];
                    port = parr[1];

                } else if (parr.length === 4) {
                    username = parr[2];
                    password = parr[3];

                    let auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
                    args.headers['Proxy-Authorization'] = auth;
                } else {
                    // error
                    resolve('invalid proxy params');
                }

                args.headers['Host'] = URL_.hostname;
                options = {
                    method: args.method,
                    host: host,
                    port: port,
                    path: URL_.href,
                    headers: args.headers,
                    encoding: null,
                };
            }

            let req = http.request(options, (res) => {
                //res.setEncoding('utf8');
                let zres;
                if (res.headers['content-encoding'] === 'gzip') {
                    let gzip = zlib.createGunzip();
                    res.pipe(gzip);
                    zres = gzip;
                } else {
                    zres = res;
                }

                zres.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                zres.on('end', () => {
                    let body = null;
                    let charset = undefined;
                    if (res.headers.hasOwnProperty('content-type')) {
                        let content_type = res.headers['content-type'].toLocaleLowerCase();
                        if (content_type.includes('charset=utf-8')) {
                            body = Buffer.concat(chunks).toString();
                        } else if (content_type.includes('charset=')) {
                            charset = content_type.substr(content_type.lastIndexOf('charset=') + 'charset='.length);
                            body = iconv.decode(Buffer.concat(chunks).toString(), charset);
                        } else {
                            body = Buffer.concat(chunks).toString();
                        }
                    } else {
                        if (charset !== undefined && charset === 'shift_jis') {
                            body = iconv.decode(Buffer.concat(chunks).toString(), 'shift_jis');
                        } else if (charset !== undefined && charset === 'euc-jp') {
                            body = iconv.decode(Buffer.concat(chunks).toString(), 'euc-jp');
                        } else if (charset === undefined) {
                            body = Buffer.concat(chunks).toString();
                        } else {
                            body = Buffer.concat(chunks).toString();
                        }
                    }
                    resolve({
                        headers: res.headers,
                        body: body
                    });

                });
            });
            req.on('error', (e) => {
                console.log('problem with request: ' + e.message);
                resolve({
                    headers: {},
                    body: null,
                    error: e.message
                });
            });
            req.write(args.data);
            req.end();
        } else if (URL_.protocol === 'https:') {
            args.headers = Object.assign({'Host': URL_.hostname, 'Connection': 'close'}, args.headers);
            if (args.proxy === undefined || args.proxy === '') {
                let contentType = args.headers['Content-Type'];
                if(contentType !== undefined && contentType === 'multipart/form-data') {
                  const postData = new URLSearchParams(args.data);
                  let data = '';
                  // console.log(args.data.keys());

                  let boundary = createBoundary();
                  args.headers['Content-Type'] = 'multipart/form-data; boundary=' + boundary;

                  postData.forEach((v, k) => {
                    data += '--' + boundary + '\r\n' + 'Content-Disposition: form-data; name="' + k + '"' + '\r\n\r\n' + v + '\r\n';
                  });
                  
                  args.data = data;
                  args.headers['Content-Length'] = args.data.length;
                }
                let req = https.request({
                    method: args.method,
                    host: URL_.hostname,
                    port: URL_.protocol === 'https:' ? 443 : 80,
                    path: URL_.pathname + URL_.search,
                    headers: args.headers,
                    rejectUnauthorized: false,
                    ciphers: 'HIGH:!ADH',
                    ecdhCurve: 'auto',
                    encoding: null,
                }, (res) => {
                    //res.setEncoding('utf8');
                    let zres;
                    if (res.headers['content-encoding'] === 'gzip') {
                        let gzip = zlib.createGunzip();
                        res.pipe(gzip);
                        zres = gzip;
                    } else {
                        zres = res;
                    }

                    zres.on('data', (chunk) => {
                        chunks.push(chunk);
                    });
                    zres.on('end', () => {
                        let body = null;
                        let charset = undefined;
                        if (res.headers.hasOwnProperty('content-type')) {
                            let content_type = res.headers['content-type'].toLocaleLowerCase();
                            if (content_type.includes('charset=utf-8')) {
                                body = Buffer.concat(chunks).toString();
                            } else if (content_type.includes('charset=')) {
                                charset = content_type.substr(content_type.lastIndexOf('charset=') + 'charset='.length);
                                body = iconv.decode(Buffer.concat(chunks).toString(), charset);
                            } else {
                                body = Buffer.concat(chunks).toString();
                            }
                        } else {
                            if (charset !== undefined && charset === 'shift_jis') {
                                body = iconv.decode(Buffer.concat(chunks).toString(), 'shift_jis');
                            } else if (charset !== undefined && charset === 'euc-jp') {
                                body = iconv.decode(Buffer.concat(chunks).toString(), 'euc-jp');
                            } else if (charset === undefined) {
                                body = Buffer.concat(chunks).toString();
                            } else {
                                body = Buffer.concat(chunks).toString();
                            }
                        }
                        resolve({
                            headers: res.headers,
                            body: body
                        });
                    });
                });
                req.on('error', (e) => {
                    console.log('problem with request: ' + e.message);
                    resolve({
                        headers: {},
                        body: null,
                        error: e.message
                    });
                });

                req.write(args.data);
                req.end();
            } else {
                let parr = args.proxy.split(':');
                let host = null,
                    port = null,
                    username = null,
                    password = null;

                let headers = {};

                if (parr.length === 2) {
                    host = parr[0];
                    port = parr[1];

                } else if (parr.length === 4) {
                    username = parr[2];
                    password = parr[3];

                    let auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
                    headers['Proxy-Authorization'] = auth;
                } else {
                    // error
                    resolve('invalid proxy params');
                }

                headers['Host'] = URL_.hostname;
                headers['Proxy-Connection'] = 'Keep-Alive';

                let options = {
                    method: 'CONNECT',
                    host: host,
                    port: port,
                    path: URL_.hostname + ':' + (URL_.protocol === 'https:' ? 443 : 80),
                    headers: headers
                };

                let req_p = http.request(options).on('connect', (_res, socket) => {
                    //res.setEncoding('utf8');
                    let req = https.request({
                        method: args.method,
                        host: URL_.hostname,
                        port: URL_.protocol === 'https:' ? 443 : 80,
                        path: URL_.pathname + URL_.search,
                        headers: args.headers,
                        socket: socket, // using a tunnel
                        rejectUnauthorized: false,
                        agent: false, // cannot use a default agent
                        ciphers: 'HIGH:!ADH',
                        ecdhCurve: 'auto',
                        encoding: null,
                    }, (res) => {
                        let zres;
                        if (res.headers['content-encoding'] === 'gzip') {
                            let gzip = zlib.createGunzip();
                            res.pipe(gzip);
                            zres = gzip;
                        } else {
                            zres = res;
                        }

                        zres.on('data', (chunk) => {
                            chunks.push(chunk);
                        });
                        zres.on('end', () => {
                            let body = null;
                            let charset = undefined;
                            if (res.headers.hasOwnProperty('content-type')) {
                                let content_type = res.headers['content-type'].toLocaleLowerCase();
                                if (content_type.includes('charset=utf-8')) {
                                    body = Buffer.concat(chunks);
                                } else if (content_type.includes('charset=')) {
                                    charset = content_type.substr(content_type.lastIndexOf('charset=') + 'charset='.length);
                                    body = iconv.decode(Buffer.concat(chunks), charset);
                                } else {
                                    body = Buffer.concat(chunks);
                                }
                            } else {
                                if (charset !== undefined && charset === 'shift_jis') {
                                    body = iconv.decode(Buffer.concat(chunks), 'shift_jis');
                                } else if (charset !== undefined && charset === 'euc-jp') {
                                    body = iconv.decode(Buffer.concat(chunks), 'euc-jp');
                                } else if (charset === undefined) {
                                    body = Buffer.concat(chunks);
                                } else {
                                    body = Buffer.concat(chunks);
                                }
                            }

                            resolve({
                                headers: res.headers,
                                body: body
                            });
                        });
                    });

                    req.on('error', (e) => {
                        resolve({
                            headers: {},
                            body: null,
                            error: e.message
                        });
                        return;
                    });
                    req.write(args.data);
                    req.end();
                }).end();

                req_p.on('error', (e) => {
                    console.log(e.message);
                    resolve({
                        headers: {},
                        body: null,
                        error: e.message
                    });
                    return;

                    /* the proxy server is not working(unable to connect) */
                    // socket hang up
                    // read ECONNRESET
                });
            }
        }
    });
}


module.exports = {
    sleep: sleep,
    randRange: randRange,
    str2doc: str2doc,
    str2xml: str2xml,
    toInt: toInt,
    createCookieStore: createCookieStore,
    updateCookieStore: updateCookieStore,
    request: request,
}
