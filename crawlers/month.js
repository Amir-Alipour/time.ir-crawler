const cheerio = require("cheerio");

module.exports = function (html) {
    let current = [];
    let events = [];

    const $ = cheerio.load(html);

    let jalaliMotnh = $(".dates").find(".jalali.selectMonth").text();
    let jalaliYear = $(".dates").find(".jalali.selectYear").text();

    current.push({
        title: "jalali",
        month: jalaliMotnh,
        year: jalaliYear,
    });

    $(".eventsCurrentMonthWrapper")
        .find("> ul")
        .find("li")
        .each((i, data) => {
            let isHoliday = $(data).hasClass("eventHoliday");
            let date = $(data).find("> span").first().text();
            let event = $(data).clone().children().remove().end().text().trim();

            events.push({
                date,
                event,
                isHoliday,
            });
        });

    return {
        current,
        events
    };
};
