"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importImagesUrls = void 0;
function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
        images[item.replace("./", "")] = r(item);
    });
    return images;
}
function importImagesUrls() {
    const imagesObject = importAll(require.context("../images", false, /\.(png|jpe?g|svg|jpg)$/));
    return Object.values(imagesObject);
}
exports.importImagesUrls = importImagesUrls;
