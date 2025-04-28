const request = require("request-promise");

module.exports = async function (url, crawler, formData = null, returnRawHtml = false) {
    try {
        let data;
        
        let options = {
            uri: `https://www.time.ir${url}`,
            method: formData ? 'POST' : 'GET',
            form: formData
        };
        
        const html = await request(options);
        
        if (returnRawHtml) {
            return html;
        }
        
        data = crawler(html);
        return data;
    } catch (error) {
        return error;
    }
};
