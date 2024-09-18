const cheerio = require("cheerio");

module.exports = function (html) {
    let quote = {};

    const $ = cheerio.load(html);

    quote.text = $(".randomQuote").find(".quoteText").text();
    quote.auth = $(".randomQuote").find(".quoteAuthor").text();
    quote.auth_link = $(".randomQuote").find(".quoteAuthor").attr("href");
    // -----------

    return quote;
};
