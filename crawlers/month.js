const cheerio = require("cheerio");

module.exports = function (html) {
    let current = {};
    let events = [];

    const $ = cheerio.load(html);

    let jalaliMonth = $('div[class*="CalendarDetailItem_root__jalali"]').find('> p:nth-child(1)').text();
    let jalaliYear = $('div[class*="CalendarDetailItem_root__jalali"]').find('> p:nth-child(2)').text();

    current = {
        title: "jalali",
        month: jalaliMonth,
        year: jalaliYear,
    };

    $('div[class*="EventList_root__events__container"]')
        .find('div[class*="EventListItem"]')
        .each((_, data) => {
            let isHoliday = $(data).find('span[class*="holiday"]').length > 0;
            let date = $(data).find('span[class*="date"]').text()
            let event = $(data).find('span[class*="event"]').text()

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
