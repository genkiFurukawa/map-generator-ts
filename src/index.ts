import { calcTileCoordinate } from './utils';
import * as sharp from 'sharp';
// import fetch from 'node-fetch';
// import * as fs from 'fs';

const downloadFile = async (x: number, y: number, z: number, callback: Function) => {
    // const url = `https://cyberjapandata.gsi.go.jp/xyz/airphoto/${z}/${x}/${y}.png`;
    const url = `https://cyberjapandata.gsi.go.jp/xyz/ort/${z}/${x}/${y}.jpg`;
    console.log(`curl -o ${z}_${x}_${y}.jpg ${url}`);
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
        // downloadFile(x, y, zoomLevel, () => { console.log('done') });
        // console.log(`${zoomLevel}, ${y}, ${x}, ${number}`);
        number++;
    }
}

const totalNumber = (maxX - minX + 1) * (maxY - minY + 1);
console.log(`totalNumber: ${totalNumber}`);

console.log(`${process.cwd()}`);

// 無地の画像領域を確保して、画像を配置していく
const createMap = async ( minX: number, maxX: number, minY: number, maxY: number, zoomLevel: number ) => {
    console.log(`start`);
    // 無地の画像を生成
    console.log(`${(maxX - minX + 1) * 256}, ${(maxY - minY + 1) * 256}`)
    let img = await sharp({
        create: {
            width: (maxX - minX + 1) * 256,
            height: (maxY - minY + 1) * 256,
            channels: 4,
            background: { r: 255, g: 255, b:255, alpha: 0 }
        }
    });

    // 画像を埋め込む
    // img.composite()を繰り返すことで画像を合成したかったが、1枚しかくっつけることができなかったのでリストを作ってまとめて加工した
    const compositeList: sharp.OverlayOptions[] = [];
    for (let x = minX; x < (maxX + 1); x++) {
        for (let y = minY; y < (maxY + 1); y++) {
            // console.log(`${(x - minX)}, ${(y - minY)}`);
            console.log(`${(x - minX)}, ${(y - minY)}, ${(x - minX) * 256}, ${(y - minY) * 256}, ${zoomLevel}_${x}_${y}.jpg`);
            compositeList.push(
                {
                    input: `${process.cwd()}/tile_images/${zoomLevel}_${x}_${y}.jpg`,
                    top: (y - minY) * 256,
                    left: (x - minX) * 256
                }
            );
        }
    }
    await img.composite(compositeList);

    await img.toFile('sample.png');
    console.log(`done`);
};

createMap(minX, maxX, minY, maxY, zoomLevel).then();
