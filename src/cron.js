const http = require('http');

const ENV_API_FONTS_GOOGLE = 'AIzaSyDRxNu76HRyoORtNKa0jilZobvr2i3JIfQ';
const URL_GOOGLE = `https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${ENV_FONTS_GOOGLE}`;
const USED_CATEGORIES = ['serif', 'sans-serif', 'display'];

const filter = (prop) => (arr) => arr.includes(prop); 
const latinFilter = filter('latin');

const parseGoogle = (res) => {
    res.items
        .filter((font) =>
            USED_CATEGORIES.some(font.category) &&
            latinFilter(font.subsets)(font)
        )
        .forEach((font) => {
            const {
                category,
                family,
                subsets,
                variants,
                version,
                lastModified
            } = font;

            // write to db
        });
};

http.get(google, parseGoogle);
