const express = require("express");
const app = express();
const port = 3001;

// =============== Crawlers ================
const crawler = require("./crawlers/crawler");
const getDate = require("./crawlers/date");
const getMonth = require("./crawlers/month");
const getYear = require("./crawlers/year");
const getQoute = require("./crawlers/qoute");
const getBooks = require("./crawlers/books");
// =========================================

app.use(express.static("public"));

// GET TODAY
app.get("/date", async (req, res) => {
    crawler(URLs.date, getDate).then((data) => {
        res.send({
            dates: data,
        });
    });
});
// --------------------

// GET CURRENT MONTH DETAILS
app.get("/month", async (req, res) => {
    crawler(URLs.month, getMonth).then((data) => {
        res.send({
            current_month: data.current,
            current_month_iranian_events: data.events,
        });
    });
});
// --------------------

// GET CURRENT YEAR EVENTS
app.get("/year", async (req, res) => {
    crawler(URLs.year, getYear).then((data) => {
        res.send({
            current_year_iranian_events: data,
        });
    });
});
// --------------------

// GET random qoute
app.get("/qoute", async (req, res) => {
    crawler(URLs.qoute, getQoute).then((data) => {
        res.send({
            qoute: data,
        });
    });
});
// --------------------

// GET LIST OF BOOKS
app.get("/books", async (req, res) => {
    crawler(URLs.books, getBooks).then((data) => {
        res.send({
            books: data,
        });
    });
});
// --------------------

app.get("/", (req, res) => {
    res.send("server is running");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const URLs = {
    date: "/",
    month: "/",
    year: "/fa/eventyear-%D8%AA%D9%82%D9%88%DB%8C%D9%85-%D8%B3%D8%A7%D9%84%DB%8C%D8%A7%D9%86%D9%87",
    qoute: "/",
    books: "/fa/booklist-%d9%81%d9%87%d8%b1%d8%b3%d8%aa-%da%a9%d8%aa%d8%a7%d8%a8%d9%87%d8%a7%db%8c-%d9%85%d8%b9%d8%b1%d9%81%db%8c-%d8%b4%d8%af%d9%87-%d8%af%d8%b1-%d8%aa%d8%a7%db%8c%d9%85",
};
