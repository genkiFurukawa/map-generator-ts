// http://hosohashi.blog59.fc2.com/blog-entry-5.html
// https://www.trail-note.net/tech/coordinate/

export interface TileCoordinate {
    x: number,
    y: number
}

export interface PixelCoordinate {
    x: number,
    y: number,
}

export interface Coordinate {
    lat: number,
    lng: number
}

const L = 85.05112878;

/**
 * 緯度経度とズームレベルからピクセル座標を計算する
 * 
 * @param coordinate 
 * @param zoomLevel ズームレベル
 */
export const calcPixelCoordinate = (coordinate: Coordinate , zoomLevel: number): PixelCoordinate => {
    const x = Math.floor((2 ** (zoomLevel + 7)) * (coordinate.lng / 180 + 1));
    const y = Math.floor((2 ** (zoomLevel + 7) / Math.PI) * (-1 * Math.atanh(Math.sin(Math.PI * coordinate.lat / 180)) + Math.atanh(Math.sin(Math.PI * L / 180))));
    return {x: x, y: y };
}

/**
 * 緯度経度とズームレベルからタイル座標を計算する
 * 
 * @param coordinate 
 * @param zoomLevel ズームレベル
 */
 export const calcTileCoordinate = (coordinate: Coordinate , zoomLevel: number): TileCoordinate => {
    const pixelX = Math.floor((2 ** (zoomLevel + 7)) * (coordinate.lng / 180 + 1));
    const pixelY = Math.floor((2 ** (zoomLevel + 7) / Math.PI) * (-1 * Math.atanh(Math.sin(Math.PI * coordinate.lat / 180)) + Math.atanh(Math.sin(Math.PI * L / 180))));

    const tileX = Math.floor(pixelX / 256);
    const tileY = Math.floor(pixelY / 256);

    return {x: tileX, y: tileY };
 }