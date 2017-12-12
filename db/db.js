// @flow
import Datastore from 'nedb-promise';
import client from 'cheerio-httpcli';
const { URL } = require('url');

import type {SCP} from '../schema/schematyped';

export async function initDB() {
    const db = new Datastore();

    await listSeries(db, 'http://ja.scp-wiki.net/scp-series-jp');
    await listSeries(db, 'http://ja.scp-wiki.net/scp-series-jp-2');

    return db;
}

//「scp-数字-xxxx」に一致する正規表現
const SCPreg = /scp-\d+-?.*/;

async function listSeries(db, path) {
    const res = await client.fetch(path);
    const $ = res.$;
    let collections = [];

    const url = new URL(path);

    //リストを全て見る
    $('li').each(function (idx) {
        const $a = $(this).children('a');

        if ($a.attr('class') !== 'newpage') {
            const id = $a.attr('href').slice(1);
            //「scp-数字-xxxx」に一致するならば
            if (SCPreg.test(id)) {
                const title = $(this).text().split(' - ')[1];
                const collection = {
                    ID: id,
                    name: $a.text(),
                    title: title,
                    source:`${url.origin}/${id}`
                };
                collections.push(collection);
            }
        }
        return true;
    });

    await db.insert(collections);
}

