const https = require("https");
const fs = require("fs");

const ENV_API_FONTS_GOOGLE = "AIzaSyDRxNu76HRyoORtNKa0jilZobvr2i3JIfQ";
const URL_GOOGLE = `https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${ENV_API_FONTS_GOOGLE}`;
const USED_CATEGORIES = ["serif", "sans-serif", "display"];
const USED_SUBSETS = ["latin"];
const isEqual = a => b => a === b;

const mockContent = {
    header:
        "Fyre Fest’s organizer has been arrested and charged with wire fraud",
    body:
        "Acting United States Attorney Joon H. Kim alleges that William McFarland allegedly provided “at least one investor an altered stock ownership statement, in an effort to make it appear that McFarland would personally guarantee the investment.” The office also says that he misrepresented the company’s finances, saying that the company earned millions of dollars in revenue from booking artists between July 2016 and April 2017. Kim says this in reality, “Fyre Media earned less than $60,000 in revenue from approximately 60 artist bookings.” McFarland is charged with a single count of wire fraud. If convicted, he faces up to 20 years in prison.",
    slug: "Entertainment",
    author: "@johnfingas",
    URI: "https://google.com/",
    source: "Engadget"
};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

const gg = fn => i => {
    const res = fn();
    if (res === i) {
        return gg(fn, i);
    }
    return res;
};

const parseGoogle = res => {
    let body = "";

    res.on("data", chunk => (body += chunk));
    res.on("end", () => {
        let parsed = JSON.parse(body);

        parsed = parsed.items
            .filter(
                font =>
                    USED_CATEGORIES.some(isEqual(font.category)) &&
                    USED_SUBSETS.some(s => font.subsets.includes(s))
            )
            .map((font, i, arr) => {
                // const getSecondaryFont = gg(
                //     getRandomInt.bind(null, 0, arr.length)
                // );
                // const secIndex = getSecondaryFont(i);
                const secIndex = getRandomInt(0, arr.length);

                const mockPair = {
                    primary: {
                        family: font.family,
                        URI: "https://yandex.ru/"
                    },
                    secondary: {
                        family: arr[secIndex].family,
                        URI: "https://yandex.ru/"
                    }
                };

                return Object.assign(
                    {},
                    { pair: mockPair },
                    { content: mockContent }
                );
            });
        fs.writeFile("parsed-google.json", JSON.stringify(parsed), "utf-8");
    });
};

https.get(URL_GOOGLE, parseGoogle);
