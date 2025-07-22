const moment = require("moment-jalaali");

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

module.exports = function (jYear, jMonth, jDay) {
    const inputDate = moment(`${jYear}/${jMonth}/${jDay}`, "jYYYY/jM/jD");
    const now = moment();

    if (!inputDate.isValid()) {
        return "تاریخ وارد شده معتبر نیست";
    }

    const isFuture = inputDate.isAfter(now);
    const from = isFuture ? now : inputDate;
    const to = isFuture ? inputDate : now;

    const years = to.diff(from, "years");
    from.add(years, "years");

    const months = to.diff(from, "months");
    from.add(months, "months");

    const days = to.diff(from, "days");

    const parts = [];
    if (years) parts.push(`${years} سال`);
    if (months) parts.push(`${months} ماه`);
    if (days) parts.push(`${days} روز`);

    const resultText = parts.length ? parts.join(" و ") : "امروز";

    return isFuture ? `${resultText} مانده` : `${resultText} گذشته`;
};
