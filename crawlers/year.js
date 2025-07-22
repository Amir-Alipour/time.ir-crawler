const cheerio = require("cheerio");
module.exports = function (html) {
    let months = [];

    const $ = cheerio.load(html);

    $('div[class*="EventList_root__events__container"]').each((_, data) => {
        let title = $(data)
            .find('span[class*="date"]')
            .first()
            .text()
            .split(" ")[1];
        let month_events = [];

        $(data)
            .find('div[class*="EventListItem"]')
            .each((_, data) => {
                let isHoliday =
                    $(data).find('span[class*="holiday"]').length > 0;
                let date = $(data).find('span[class*="date"]').text();
                let event = $(data).find('span[class*="event"]').text();

                month_events.push({
                    date,
                    event,
                    isHoliday,
                });
            });

        months.push({
            month_name: title,
            events: month_events,
        });
    });

    return months;
};
