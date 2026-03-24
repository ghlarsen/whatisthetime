---
timezone: "NPT"
slug: "npt"
title: "NPT Time Now: Nepal Time (UTC+5:45)"
description: "Nepal Time (NPT) is UTC+5:45. The only major timezone with a 45-minute offset from UTC. Used across all of Nepal, year-round, with no daylight saving time."
iana: ["Asia/Kathmandu"]
utcOffset: "+05:45"
countries: ["Nepal"]
lastUpdated: "2026-03-24"
---

Nepal Time is UTC+5:45. It is the only widely-used timezone in the world with a 45-minute offset from UTC, which makes it immediately notable to anyone working across international time. No daylight saving. No internal variation. Nepal runs on a single clock, 15 minutes ahead of India and 15 minutes behind Bangladesh.

The specificity of that 45-minute mark is not arbitrary. It is solar.

## Why 5 hours and 45 minutes

Nepal's geographic center sits close to the 85th meridian East. Solar time at 85 degrees East is approximately UTC+5:40. Rounding to the nearest quarter-hour gives UTC+5:45, which Nepal adopted in 1986. Before that, Nepal was observed at UTC+5:30, the same offset as India.

The 1986 change was a deliberate assertion of national identity. Nepal is a sovereign country between two giants, India to the south and China to the north, and setting a clock that is not India's and not China's was a way of marking that. UTC+5:45 is uniquely Nepal's. No other country shares it.

The 15-minute offset from India has practical friction. Scheduling across the Nepal-India border requires arithmetic that most people manage by keeping a mental note that Kathmandu is a quarter-hour fast. For travelers arriving from Delhi or Mumbai, the adjustment is small but real.

## Quarter-hour timezones

Nepal Time belongs to a very small group of quarter-hour offset timezones:

- UTC+5:45: Nepal Time (NPT) -- the only one at 45 minutes
- UTC+5:30: India Standard Time (IST) -- half-hour
- UTC+6:30: Myanmar Time (MMT) -- half-hour
- UTC+9:30: Australian Central Standard Time (ACST) -- half-hour

Of these, NPT is the most unusual. The 45-minute mark is the rarest increment in global timekeeping.

## The Himalayas and Kathmandu

Nepal is home to eight of the ten highest mountains in the world, including Everest at 8,849 meters. The country's topography, stretching from the flat Terai plains in the south at about 60 meters elevation to the top of the world in the north, means that NPT covers an extraordinary range of altitude and climate within a country roughly the size of Tennessee.

Kathmandu sits in a valley at about 1,400 meters and functions as the country's cultural, economic, and political center. It is where the timezone officially resides in the IANA database.

- Kathmandu -- capital and largest city, in the central hills
- Pokhara -- Nepal's second city, gateway to the Annapurna trekking circuit
- Biratnagar -- major city in the eastern Terai, close to the Indian border
- Birgunj -- southern border city, primary transit point with India

## Mount Everest and timezone

Everest sits on the Nepal-China border. Base Camp on the Nepali south side operates on NPT. The north side, in Tibet, operates on China Standard Time (CST, UTC+8). The two base camps, less than 20 kilometers apart, are separated by a 2-hour-and-15-minute time gap.

Expedition teams working the mountain generally operate on Kathmandu time, or on their own internal schedule dictated by weather windows and acclimatization rhythms. The summit itself belongs to both countries, and no clock rules there.

## Religion and time

Nepal is the world's only country to have been officially a Hindu kingdom, a status that ended with the republic's establishment in 2008. The country's festival calendar is lunar, and major religious dates are set by the Vikram Samvat calendar, which runs approximately 56 years and 8 months ahead of the Gregorian calendar. As of 2026, Nepal is in the Bikram Samvat year 2082.

This dual calendar system means that Nepali society operates on two time frameworks simultaneously: the Gregorian clock for international coordination and the Bikram Samvat calendar for religious and cultural events. Dashain and Tihar, the country's two most important festivals, fall on different Gregorian dates each year depending on the lunar calculation.

## For developers

- IANA identifier: `Asia/Kathmandu`
- UTC offset: `+05:45`, fixed year-round
- JavaScript: `new Intl.DateTimeFormat('ne-NP', { timeZone: 'Asia/Kathmandu' })`
- Python: `import pytz; pytz.timezone('Asia/Kathmandu')`
- Watch for the 45-minute offset: standard hourly arithmetic does not apply. Conversion from NPT to UTC requires subtracting 5 hours and 45 minutes, not a round number.

The nearest timezones: [IST (India) at UTC+5:30](/timezones/ist), [PKT (Pakistan) at UTC+5](/timezones/pkt), [BST-BD (Bangladesh) at UTC+6](/timezones/bst-bd).

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- Nepal Rastra Bank, official timekeeping documentation.
- Shrestha, Nanda R. *Nepal and Bangladesh: A Global Studies Handbook*. ABC-CLIO, 2002.
- [All timezones](/timezones)
