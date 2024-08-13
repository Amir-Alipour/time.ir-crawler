const express = require("express");
const app = express();
const port = 3001;

const crawler = require("./crawlers/crawler");
const { ROUTES } = require("./ROUTES");
const diff = require("./crawlers/diff");

app.use(express.static("public"));

// --------------- crawlers Routes ------------------
for (let index = 0; index < ROUTES.length; index++) {
    const route = ROUTES[index];

    app.get(route.route, async (_, res) => {
        crawler(route.crawler_url, route.crawler).then((data) => {
            res.send(route.response(data));
        });
    });
}
// --------------- --------------- ------------------

app.post("/diff", async (req, res) => {
    if(!req.query.year && !req.query.month && !req.query.day){
        res.sendStatus(400)
    } else {
        const result = await crawler(`/?convertyear=${req.query.year}&convertmonth=${req.query.month}&convertday=${req.query.day}`, diff)
        res.send(result)
    }
})

app.get("/", (req, res) => {
    const baseURL = req.get("host");

    res.send({
        message: "server is running",
        github: "https://github.com/Amir-Alipour/time.ir-crawler",
        routes: [
            {
                route: "/",
                description: "home",
            },
            {
                route: "/date",
                description: "the current date",
                url: `https://${baseURL}/date`,
            },
            {
                route: "/diff?year={}&month={}&day={}",
                description: "get difference of the date from now",
                url: `https://${baseURL}/diff`,
            },
            {
                route: "/month",
                description: "the current month and it events",
                url: `https://${baseURL}/month`,
            },
            {
                route: "/year",
                description: "the current year and it months with events",
                url: `https://${baseURL}/year`,
            },
            {
                route: "/qoute",
                description: "rondom qoute (persian)",
                url: `https://${baseURL}/qoute`,
            },
            {
                route: "/books",
                description: "time.ir book suggestion",
                url: `https://${baseURL}/books`,
            },
        ],
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
