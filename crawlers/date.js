const cheerio = require("cheerio");

module.exports = function (html) {
    let dates = [];

    const $ = cheerio.load(html);

    let names = ["shamsi", "gregorian", "hijri"];

    names.map((name) => {
        let title = $(`.today-${name}`).first().find(".title").text();
        let title_date = $(`.today-${name}`).first().find(".numeral").text();
        let title_date_text = $(`.today-${name}`).first().find(".date").text();
        // ------------------------

        dates.push({
            title: title,
            date: title_date,
            date_text: title_date_text,
        });
    });
    // -----------

    return dates;
};