const cheerio = require("cheerio");

module.exports = function (html) {
    let quote = {};

    const $ = cheerio.load(html);

    const parent = $('div[class*="BrainyQuoteContext"]');

    quote.text = parent.find('> div[class*="textContainer"]').text();
    quote.auth = parent.find('div[class*="BrainyQuoteAuthor"]').text();
    quote.auth_link = parent
        .find('div[class*="BrainyQuoteAuthor"]')
        .find("> a")
        .attr("href");
    // -----------

    return quote;
};
