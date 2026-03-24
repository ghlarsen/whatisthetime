---
timezone: "JST"
slug: "jst"
title: "JST Time Now: Japan Standard Time (UTC+9)"
description: "Japan Standard Time (JST) is UTC+9. No daylight saving time. Used across the entire Japanese archipelago since 1888."
iana: ["Asia/Tokyo"]
utcOffset: "+09:00"
countries: ["Japan"]
lastUpdated: "2026-03-24"
---

Japan Standard Time is UTC+9. One timezone, one offset, no exceptions. A country of 125 million people stretching across 3,000 kilometers of ocean shares a single clock, and has done so without interruption since 1888.

That consistency is not an accident. It is a considered choice, and it says something about how Japan thinks about time.

## The Meiji clock

Japan adopted standard time on January 1, 1888, during the Meiji period, a moment of rapid modernization when the government was remaking the country's infrastructure in decades rather than generations.

The driving force was the railway. Japan opened its first line between Tokyo and Yokohama in 1872. Within years, the network was expanding fast, and a railroad cannot function without synchronized time. When every station sets its clock by local solar noon, timetables collapse.

The government anchored JST to the 135th meridian East, running through Akashi in Hyogo Prefecture, exactly 9 hours ahead of Greenwich. Akashi still marks this with pride. The city houses the Akashi Municipal Planetarium directly on the meridian line and calls itself "the town of time." A yellow line painted across the grounds marks the exact position of UTC+9. Tourists photograph it.

## No daylight saving, and the reason why

Japan did experiment with daylight saving time. The American occupation government imposed it from 1948 to 1951, using the name "summer time" (the Japanese borrowed the English words: サマータイム). It did not go well.

Workers and unions objected. The complaint was not the time change itself but the assumption embedded in it: longer evening daylight meant bosses expected longer working hours. The clock moved forward, and productivity expectations moved with it. When the occupation ended and the Diet regained legislative authority, it abolished summer time almost immediately.

The idea has resurfaced occasionally. In 2008, politicians floated it ahead of Tokyo's 2020 Olympics bid as an energy-saving measure. In 2018, ahead of the actual Olympics, the proposal came up again, this time framed around reducing heat exhaustion risk for athletes and spectators. The discussion went nowhere both times. Public surveys consistently find that fewer than a third of Japanese respondents support reintroduction.

The stance is firm: one offset, year-round, no adjustments.

## The shinkansen standard

What JST means in practice is visible most clearly in Japan's rail system. Shinkansen bullet trains average a delay of 54 seconds per year, across the entire network, across all services. That number is not a boast. It is the outcome of treating scheduled time as a contract.

When a Tsukuba Express train departed 20 seconds early in November 2017, the railway company issued a formal public apology. Not for a late departure. For leaving the platform before the scheduled time, causing passengers to miss a train they had correctly arrived to catch.

This is the infrastructure that JST runs inside. Clocks matter here in a way they do not everywhere else.

Haruki Murakami's novels note clock times with unusual specificity. Characters in *Norwegian Wood* observe the exact hour. *The Wind-Up Bird Chronicle* is obsessed with time in ways that are structural, not decorative. Makoto Shinkai's film *5 Centimeters Per Second* uses a train delay, measured in minutes, as the emotional core of its first act. The gap between scheduled and actual becomes the gap between two people.

## Cities on JST

Every city in Japan runs on JST. The major ones:

- [Tokyo](/cities/tokyo) -- the world's most populous metropolitan area, financial and cultural center
- Osaka -- commercial hub of the Kansai region
- Nagoya -- manufacturing and automotive industry center
- Sapporo -- largest city of Hokkaido, Japan's northern island
- Fukuoka -- gateway to Kyushu, close to Korea and China in distance, aligned with Tokyo in time

Okinawa presents the most dramatic illustration of JST's reach. It sits roughly at the latitude of the Bahamas, subtropical and warm, more than 1,500 kilometers from Tokyo. In summer, sunrise comes before 6am and sunset before 7:30pm. Solar noon falls well before the clock says noon. The island runs an hour and a half "fast" relative to the sun. Nobody adjusts. The clock says what the clock says.

## For developers

JST appears in systems and codebases wherever Japanese users are involved. A few reliable patterns:

- IANA identifier: `Asia/Tokyo` (there is no `Asia/Osaka` or `Asia/Sapporo` in the current IANA database -- those existed in older systems but were consolidated because Japan has never had internal differences)
- UTC offset: `+09:00`, fixed year-round
- JavaScript: `new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo' })`
- Python: `import pytz; pytz.timezone('Asia/Tokyo')`
- Never use `JST` as an IANA identifier. It is widely understood as an abbreviation but is not a valid IANA timezone name.

JST shares its UTC+9 offset with [Korea Standard Time (KST)](/timezones/kst), though the two systems are politically and historically distinct.

## The Tokyo-London gap

JST sits 9 hours ahead of UTC, which places it 9 hours ahead of London in winter and 8 hours ahead when the UK observes BST. Against New York Eastern Time, the gap is 14 hours in winter, 13 in summer. Against California Pacific Time, 17 hours in winter, 16 in summer.

This makes scheduling between Japan and the American west coast genuinely difficult. The overlap of business hours is thin, often only achievable with someone starting very early or finishing very late. The gap is wide enough that "today" in Tokyo is routinely "yesterday" in San Francisco.

For a long time, Japan being on one consistent clock has made at least the arithmetic simple. The offset is always +09:00. No adjusting for season. No checking whether it is currently daylight saving time in Japan. It is not. It never is.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [National Institute of Information and Communications Technology (NICT)](https://jjy.nict.go.jp/index-e.html)
- [Akashi Municipal Planetarium](https://www.am12.jp/english/)
- [JR Central Punctuality Records](https://global.jr-central.co.jp/en/company/ir/annualreport/)
- [Japan](/countries/japan) country page
- [All timezones](/timezones)
