'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var _this = this;

        var server, _, db;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return app.prepare();

                    case 2:
                        server = new _koa2.default();
                        _ = new _koaRouter2.default();
                        _context3.next = 6;
                        return (0, _db.initDB)();

                    case 6:
                        db = _context3.sent;


                        // GraphQLサーバ開始
                        _.post('/graphql', (0, _koaBodyparser2.default)(), (0, _apolloServerKoa.graphqlKoa)({ schema: _schema2.default, context: {
                                db: db,
                                app: "ho"
                            } }));

                        // IDEを設置
                        _.get('/graphiql', (0, _apolloServerKoa.graphiqlKoa)({ endpointURL: '/graphql' }));

                        //残りの全てのgetをNextにとばす
                        _.get('*', function () {
                            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
                                return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _context.next = 2;
                                                return handle(ctx.req, ctx.res);

                                            case 2:
                                                ctx.respond = false;

                                            case 3:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this);
                            }));

                            return function (_x) {
                                return _ref2.apply(this, arguments);
                            };
                        }());

                        //ミドルウェア登録
                        server.use(function () {
                            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
                                return _regenerator2.default.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                ctx.res.statusCode = 200;
                                                _context2.next = 3;
                                                return next();

                                            case 3:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, _this);
                            }));

                            return function (_x2, _x3) {
                                return _ref3.apply(this, arguments);
                            };
                        }());

                        server.use(_.routes());

                        //80ポートで開始
                        server.listen(port, function (err) {
                            if (err) throw err;
                            console.log(port + '\u756A\u30DD\u30FC\u30C8\u3067\u958B\u59CB');
                        });

                    case 13:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function main() {
        return _ref.apply(this, arguments);
    };
}();

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _next = require('next');

var _next2 = _interopRequireDefault(_next);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _apolloServerKoa = require('apollo-server-koa');

var _schema = require('./schema/schema');

var _schema2 = _interopRequireDefault(_schema);

var _db = require('./db/db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-register');


var port = parseInt(process.env.PORT, 10) || 3000;
var dev = process.env.NODE_ENV !== 'production'; //bool
var app = (0, _next2.default)({ dev: dev }); // next({dev:dev/*:bool*/})
var handle = app.getRequestHandler();

main();
