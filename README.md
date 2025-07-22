# time.ir-scraper

## crawling data from time.ir (https://time-ir.vercel.app)

- date (shamsi - gregorian - hijri) (https://time-ir.vercel.app/date)
- diff (date diff) (https://time-ir.vercel.app/diff?year={}&month={}&day={})
- month (iranian events) (https://time-ir.vercel.app/month)
- year (iranian events) (https://time-ir.vercel.app/year)
- quote (random persian quote from random book) (https://time-ir.vercel.app/quote)

## Api Table

| Route   |      description      |  data |
|----------|:-------------:|------:|
| / |  home | - |
| /date |     the current date   | title <br/> date <br/> date_text |
| /diff |     the difference of the date from now   | diff |
| /month |  the current month and it events   | current_month <br/> current_month_iranian_events |
| /year |  the current year and it months with events  | month_name <br/> year_name <br/> month_title <br/> events |
| /quote |  random quote (persian)   | text <br/> auth <br/> auth_link |