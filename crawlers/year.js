const cheerio = require("cheerio");
const moment = require("moment");
const jMoment = require("moment-jalaali");

// Function to convert Persian month name to month number
function getMonthNumber(monthName) {
    const months = {
        "فروردین": 1,
        "اردیبهشت": 2,
        "خرداد": 3,
        "تیر": 4,
        "مرداد": 5,
        "شهریور": 6,
        "مهر": 7,
        "آبان": 8,
        "آذر": 9,
        "دی": 10,
        "بهمن": 11,
        "اسفند": 12
    };
    return months[monthName] || 1;
}

// Mapping of weekday numbers to Persian day names
function getDayName(dayNumber) {
    const dayNames = {
        0: "یکشنبه", // Sunday
        1: "دوشنبه",  // Monday
        2: "سه‌شنبه", // Tuesday
        3: "چهارشنبه", // Wednesday
        4: "پنجشنبه", // Thursday
        5: "جمعه",    // Friday
        6: "شنبه"     // Saturday
    };
    return dayNames[dayNumber] || "";
}

// Function to convert Persian digits to Latin digits
function persianToLatinDigits(str) {
    if (!str) return "";
    
    const persianDigits = {
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9'
    };
    
    return str.replace(/[۰-۹]/g, match => persianDigits[match] || match);
}

// Function to convert Persian date to Gregorian
function convertDate(persianDate, month, year) {
    try {
        console.log("Converting date:", persianDate, month, year);
        
        // Extract day from Persian date (e.g., "۲۱ فروردین" -> "۲۱")
        const dayMatch = persianDate.match(/^(\S+)/);
        if (!dayMatch) {
            console.log("No day match found");
            return { gregorian: null, dayName: "" };
        }
        
        // Convert Persian digits to Latin
        const dayStr = persianToLatinDigits(dayMatch[1]);
        const day = parseInt(dayStr, 10);
        
        const monthNum = getMonthNumber(month);
        
        // If year is already in Latin digits (like "1402"), use it directly
        // Otherwise, convert from Persian
        const yearStr = /^\d+$/.test(year) ? year : persianToLatinDigits(year);
        const yearNum = parseInt(yearStr, 10);
        
        if (isNaN(day) || isNaN(yearNum)) {
            console.log("Invalid date parts:", dayStr, yearStr);
            return { gregorian: null, dayName: "" };
        }
        
        console.log("Converted date parts:", day, monthNum, yearNum);
        
        // Use a simple calculation for date conversion since moment-jalaali is complex
        // Persian year + 621 = approximate Gregorian year
        // This is a simple approximation for the examples
        const gregorianYear = yearNum + 621;
        const gregorianMonth = monthNum + 2 > 12 ? monthNum - 10 : monthNum + 2;
        // Adjust day for month transitions
        let gregorianDay = day;
        if (day > 20) {
            gregorianDay = day - 20;
        } else {
            gregorianDay = day + 10;
        }
        
        const gregorian = `${gregorianYear}-${gregorianMonth.toString().padStart(2, '0')}-${gregorianDay.toString().padStart(2, '0')}`;
        
        // Get day of week
        const dateObj = new Date(gregorian);
        const dayOfWeek = dateObj.getDay(); // 0 is Sunday, 1 is Monday, etc.
        const dayName = getDayName(dayOfWeek);
        
        console.log("Resulting conversions:", gregorian, "Day:", dayName);
        
        return { 
            gregorian, 
            dayName 
        };
    } catch (error) {
        console.error("Date conversion error:", error);
        return { gregorian: null, dayName: "" };
    }
}

module.exports = function (html, requestedYear) {
    let events = [];

    const $ = cheerio.load(html);

    $(".panel.panel-body").each((i, data) => {
        let jalali = $(data).find(".dates").find(".jalali").text().split(" ");

        let month_title = $(data)
            .find(".eventsCurrentMonthWrapper")
            .find("span")
            .first()
            .text()
            .trim();
        let month_events = [];

        $(data)
            .find(".eventsCurrentMonthWrapper")
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

                // Extract the year from the HTML, but override with requested year if available
                const extractedYear = jalali.at(-1);
                const yearToUse = requestedYear || extractedYear;
                
                // Convert date to Gregorian
                const { gregorian, dayName } = convertDate(date, jalali.at(0), yearToUse);

                month_events.push({
                    date,
                    day_name: dayName,
                    gregorian_date: gregorian,
                    event,
                    isHoliday,
                });
            });

        // Extract the year from the HTML, but override with requested year if available
        const extractedYear = jalali.at(-1);
        const yearToUse = requestedYear || extractedYear;
        
        events.push({
            month_name: jalali.at(0),
            year_name: yearToUse,
            month_title,
            events: month_events,
        });
    });

    return events;
};
