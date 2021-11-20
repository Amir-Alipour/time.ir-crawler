const express = require("express");
const app = express();
const port = 3001;
const request = require("request-promise");
const cheerio = require("cheerio");

app.use(express.static("public"));

// GET TODAY AND CURRENT MONTH DETAILS AND RANDOM QOUTE
app.get("/date", async (req, res) => {
  let pusher = [];
  let qoute = {};
  let events = [];

  await request("https://www.time.ir/", async (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      let names = ["shamsi", "gregorian", "hijri"];

      names.map((name) => {
        let mode = $(`.today-${name}`).first().find(".title").text();
        let mode_date = $(`.today-${name}`).first().find(".numeral").text();
        let mode_date_text = $(`.today-${name}`).first().find(".date").text();

        pusher.push({
          mode: mode,
          date: mode_date,
          date_text: mode_date_text,
        });
      });
      // -----------

      qoute.text = $(".randomQuote").find(".quoteText").text();
      qoute.auth = $(".randomQuote").find(".quoteAuthor").text();
      qoute.auth_link = $(".randomQuote").find(".quoteAuthor").attr("href");
      // -----------

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
    }
  });

  res.send({
    dates: pusher,
    qoute,
    event_current_month: events,
  });
});
// --------------------
// || ========================================== ||

// GET CURRENT YEAR EVENTS
app.get("/year", async (req, res) => {
  let events = [];

  await request(
    "https://www.time.ir/fa/eventyear-%D8%AA%D9%82%D9%88%DB%8C%D9%85-%D8%B3%D8%A7%D9%84%DB%8C%D8%A7%D9%86%D9%87",
    async (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $(".eventsCurrentMonthWrapper").each((i, data) => {
          let month_name = $(data).find("span").first().text().trim();
          let month_events = [];

          $(data)
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
            month_name,
            events: month_events,
          });
        });
      }
    }
  );

  res.send({
    year_events: events,
  });
});
// --------------------
// || ========================================== ||

// GET LIST OF BOOKS AND RANDOM QOUTE
app.get("/book", async (req, res) => {
  let books = [];
  let qoute = {};

  await request(`http://localhost:${port}/date`, (err, response) => {
    qoute = JSON.parse(response.body).qoute;
  });

  await request(
    "https://www.time.ir/fa/booklist-%d9%81%d9%87%d8%b1%d8%b3%d8%aa-%da%a9%d8%aa%d8%a7%d8%a8%d9%87%d8%a7%db%8c-%d9%85%d8%b9%d8%b1%d9%81%db%8c-%d8%b4%d8%af%d9%87-%d8%af%d8%b1-%d8%aa%d8%a7%db%8c%d9%85",
    async (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $(".panel").each((i, data) => {
          if (i !== 0) {
            let title = $(data).find(".box-title").text();
            let thumnail = $(data).find(".content img").attr("src");
            let description = $(data).find(".content").text();

            books.push({
              title,
              thumnail,
              description,
            });
          }
        });
      }
    }
  );

  res.send({
    qoute,
    books,
  });
});
// --------------------
// || ========================================== ||

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
