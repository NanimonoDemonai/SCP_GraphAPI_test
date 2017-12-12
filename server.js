require("babel-register");
import Koa from 'koa';
import next from 'next';
import Router from 'koa-router';
import koaBody from 'koa-bodyparser';
import {graphqlKoa, graphiqlKoa} from 'apollo-server-koa';
import schema from './schema/schema';
import {initDB} from './db/db';



const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production'; //bool
const app = next({dev}); // next({dev:dev/*:bool*/})
const handle = app.getRequestHandler();

main();

async function main() {
    await app.prepare();

    const server = new Koa();
    const _ = new Router();

    const db = await initDB();

    // GraphQLサーバ開始
    _.post('/graphql', koaBody(), graphqlKoa({schema,context: {
        db,
        app:"ho"
    }}));

    // IDEを設置
    _.get('/graphiql', graphiqlKoa({endpointURL: '/graphql'}));

    //残りの全てのgetをNextにとばす
    _.get('*', async ctx => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
    });

    //ミドルウェア登録
    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200;
        await next();
    });

    server.use(_.routes());

    //80ポートで開始
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`${port}番ポートで開始`);

    })
}

