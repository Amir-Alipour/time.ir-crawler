// =============== Crawlers ================
const getDate = require("./crawlers/date");
const getMonth = require("./crawlers/month");
const getYear = require("./crawlers/year");
const getQuote = require("./crawlers/quote");
// =========================================

const URLs = {
    date: "/today",
    month: "/",
    year: "/event-year",
    quote: "/",
};

exports.ROUTES = [
    {
        route: "/date",
        crawler: getDate,
        crawler_url: URLs.date,
        response: (data) => {
            return {
                dates: data,
            };
        },
    },
    {
        route: "/month",
        crawler: getMonth,
        crawler_url: URLs.month,
        response: (data) => {
            return {
                current_month: data.current,
                current_month_iranian_events: data.events,
            };
        },
    },
    {
        route: "/year",
        crawler: getYear,
        crawler_url: URLs.year,
        response: (data) => {
            return {
                current_year_iranian_events: data,
            };
        },
    },
    {
        route: "/quote",
        crawler: getQuote,
        crawler_url: URLs.quote,
        response: (data) => {
            return {
                quote: data,
            };
        },
    },
];
