const cheerio = require("cheerio");

module.exports = function (html) {
    let dates = [];

    const $ = cheerio.load(html);

    let names = ["خورشیدی", "میلادی", "قمری"];

    names.map((name) => {
        const selector = `div:contains("تاریخ ${name}")`

        let title = $(selector)
            .find("> p:nth-child(1)")
            .text();
        let title_date = $(selector)
            .find("> p:nth-child(2)")
            .text();
        let title_date_text = $(selector)
            .find("> p:nth-child(3)")
            .text();
        // ------------------------

        dates.push({
            title: title.trim(),
            date: title_date.trim(),
            date_text: title_date_text.trim(),
        });
    });
    // -----------

    return dates;
};
