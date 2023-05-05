# time.ir-scraper

## crawling data from time.ir

- date (shamsi - gregorian - hijri)
- month (iranian events)
- year (iranian events)
- qoute (random persian qoute from random book)
- books (time.ir book suggestion)

## Api Table

| Route   |      description      |  data |
|----------|:-------------:|------:|
| / |  home | - |
| /date |     the current date   | title <br/> date <br/> date_text |
| /month |  the current month and it events   | current_month <br/> current_month_iranian_events |
| /year |  the current year and it months with events  | month_name <br/> year_name <br/> month_title <br/> events |
| /qoute |  rondom qoute (persian)   | text <br/> auth <br/> auth_link |
| /books |  time.ir book suggestion   | title <br/> thumnail <br/> description |