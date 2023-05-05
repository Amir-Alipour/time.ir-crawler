const cheerio = require("cheerio");

module.exports = function (html) {
    let events = [];

    const $ = cheerio.load(html);

    $(".panel.panel-body").each((i, data) => {
        let jalali = $(data).find(".dates").find(".jalali").text().split(" ");

        let month_title = $(data)
            .find(".eventsCurrentMonthWrapper")
            .find("span")
            .first()
            .text()
            .trim();
        let month_events = [];

        $(data)
            .find(".eventsCurrentMonthWrapper")
            .find("> ul")
            .find("li")
            .each((i, data) => {
                let isHoliday = $(data).hasClass("eventHoliday");
                let date = $(data).find("> span").first().text();
                let event = $(data)
                    .clone()
                    .children()
                    .remove()
                    .end()
                    .text()
                    .trim();

                month_events.push({
                    date,
                    event,
                    isHoliday,
                });
            });

        events.push({
            month_name: jalali.at(0),
            year_name: jalali.at(-1),
            month_title,
            events: month_events,
        });
    });

    return events;
};
