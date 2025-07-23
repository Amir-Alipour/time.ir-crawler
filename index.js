const express = require("express");
const app = express();
const port = 3000;

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

app.get("/diff", async (req, res) => {
    if (!req.query.year || !req.query.month || !req.query.day) {
        res.sendStatus(400);
    } else {
        const result = await diff(
            req.query.year,
            req.query.month,
            req.query.day
        );
        res.send({ text: result });
    }
});

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
                route: "/quote",
                description: "random quote (persian)",
                url: `https://${baseURL}/quote`,
            },
        ],
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
