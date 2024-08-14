const cheerio = require("cheerio");

module.exports = function (html) {
  const $ = cheerio.load(html);
  let diff = $(`.intervalWrapper`).find("span").text();
  return { diff: `فاصله زمانی (سن) :‌${diff}`.trim() };
};
