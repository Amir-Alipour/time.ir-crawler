const cheerio = require("cheerio");

module.exports = function (html) {
    let books = [];

    const $ = cheerio.load(html);

    $(".panel").each((i, data) => {
        if (i !== 0) {
            let title = $(data).find(".box-title").text();

            let thumnail = $(data).find(".content img").attr("data-src");
            if (thumnail !== undefined && !thumnail?.includes("time.ir")) {
                thumnail = "https://www.time.ir" + thumnail;
            }

            let description = $(data).find(".content").text();

            books.push({
                title,
                have_thumnail: thumnail ? true : false,
                thumnail,
                description,
            });
        }
    });

    return books;
};
