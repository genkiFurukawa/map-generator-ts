import { calcTileCoordinate } from './utils';
// import fetch from 'node-fetch';
// import * as fs from 'fs';

const downloadFile = async (x: number, y: number, z: number, callback: Function) => {
    // const url = `https://cyberjapandata.gsi.go.jp/xyz/airphoto/${z}/${x}/${y}.png`;
    const url = `https://cyberjapandata.gsi.go.jp/xyz/ort/${z}/${x}/${y}.jpg`;
    console.log(`curl -oL ${z}_${y}_${x}.png ${url}`);
};

// 鍋割山
// 35.44560728066694, 139.13684000868105
// 35.44144673207105, 139.14505829677404
// const bottom = 35.44144673207105;
// const top = 35.44560728066694;
// const left = 139.13684000868105;
// const right = 139.14505829677404;

// 35.75621375767344, 140.2267393761772
// 35.740511743214284, 140.24713616224628
const bottom = 35.740511743214284;
const top = 35.75621375767344;
const left = 140.2267393761772;
const right = 140.24713616224628;

const zoomLevel = 16;
const tileCoordinate01 = calcTileCoordinate({ lat: top, lng: left }, zoomLevel);
const tileCoordinate02 = calcTileCoordinate({ lat: bottom, lng: right }, zoomLevel);

const minX = tileCoordinate01.x;
const maxX = tileCoordinate02.x;

const minY = tileCoordinate01.y;
const maxY = tileCoordinate02.y;

// xyでナンバリングしていく
// 画像をダウンロードして、くっつけて保存する
let number = 1;
for (let x = minX; x < (maxX + 1); x++) {
    for (let y = minY; y < (maxY + 1); y++) {
        downloadFile(x, y, zoomLevel, () => { console.log('done') });
        number++;
    }
}
console.log(`number: ${number}`);


