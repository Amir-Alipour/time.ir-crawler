const cheerio = require("cheerio");

module.exports = function (html) {
    let qoute = {};

    const $ = cheerio.load(html);

    qoute.text = $(".randomQuote").find(".quoteText").text();
    qoute.auth = $(".randomQuote").find(".quoteAuthor").text();
    qoute.auth_link = $(".randomQuote").find(".quoteAuthor").attr("href");
    // -----------

    return qoute;
};
