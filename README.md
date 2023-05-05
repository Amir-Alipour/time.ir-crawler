# time.ir-scraper

## crawling data from time.ir (https://time-ir-crawler.vercel.app)

- date (shamsi - gregorian - hijri) (https://time-ir-crawler.vercel.app/date)
- month (iranian events) (https://time-ir-crawler.vercel.app/month)
- year (iranian events) (https://time-ir-crawler.vercel.app/year)
- qoute (random persian qoute from random book) (https://time-ir-crawler.vercel.app/qoute)
- books (time.ir book suggestion) (https://time-ir-crawler.vercel.app/books)

## Api Table

| Route   |      description      |  data |
|----------|:-------------:|------:|
| / |  home | - |
| /date |     the current date   | title <br/> date <br/> date_text |
| /month |  the current month and it events   | current_month <br/> current_month_iranian_events |
| /year |  the current year and it months with events  | month_name <br/> year_name <br/> month_title <br/> events |
| /qoute |  rondom qoute (persian)   | text <br/> auth <br/> auth_link |
| /books |  time.ir book suggestion   | title <br/> thumnail <br/> description |
