const request = require("request-promise");

module.exports = async function (url, crawler) {
    try {
        let data;
        await request(`https://www.time.ir${url}`, async (error, response, html) => {
            if (!error && response.statusCode == 200) {
                data = crawler(html)
            }
        });
        return data;
    } catch (error) {
        return error;
    }
};
