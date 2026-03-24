---
timezone: "SAST"
slug: "sast"
title: "SAST Time Now: South Africa Standard Time (UTC+2)"
description: "South Africa Standard Time (SAST) is UTC+2. Used across South Africa, Lesotho, and Eswatini. No daylight saving time. Home to Johannesburg, Cape Town, and Durban."
iana: ["Africa/Johannesburg"]
utcOffset: "+02:00"
countries: ["South Africa", "Lesotho", "Eswatini"]
lastUpdated: "2026-03-24"
---

South Africa Standard Time is UTC+2. The country runs on one clock year-round, with no daylight saving time, anchoring the southern tip of Africa to a consistent offset shared with Eastern European countries and the eastern Mediterranean.

**Key facts about SAST**
- Full name: South Africa Standard Time
- UTC offset: UTC+2
- DST: no
- IANA identifiers: Africa/Johannesburg
- Countries: South Africa, Lesotho, Eswatini

SAST covers South Africa, the landlocked kingdom of Lesotho (which is entirely surrounded by South Africa), and the small kingdom of Eswatini (formerly Swaziland). The timezone is geographically sensible: South Africa's center sits close to the 25th meridian East, which corresponds to UTC+1:40, making UTC+2 a reasonable rounding.

## The railway and the clock

South Africa, like many countries, standardized its time through the demands of railway operation. The Cape Colony and Natal Colony adopted Cape Standard Time in the 1890s, set at 90 minutes ahead of Greenwich (UTC+1:30). The Transvaal and Orange Free State used different local times.

After the Second Boer War and the formation of the Union of South Africa in 1910, time standardization was one of the administrative tasks of unification. The country consolidated at UTC+2 in 1903, ahead of formal union. The decision moved clocks forward from the previous Cape time and aligned the country with the 30th meridian East, running through the eastern part of the country.

## No daylight saving

South Africa has not observed daylight saving time since 1944. The Southern Hemisphere receives its longest days in December and January. Since South Africa straddles a wide latitude range, from about 22 degrees south in Limpopo to 34 degrees south at Cape Point, the variation in day length across the country is significant.

The government has discussed reintroducing DST periodically. A 2008 proposal to save energy was studied but not implemented. The arguments against it were familiar: disruption to agricultural and mining shift schedules, which represent a significant portion of the South African economy, and limited evidence that the energy savings would be substantial.

South Africa's position in the Southern Hemisphere means the DST debates run counter to Northern Hemisphere intuitions. Longer summer evenings in December and January, not June and July.

## Johannesburg, Cape Town, and the South African economy

South Africa is the most industrialized economy in sub-Saharan Africa, and the SAST timezone carries its financial weight.

Johannesburg is the country's largest city and financial capital. The Johannesburg Stock Exchange (JSE) is the largest stock exchange on the African continent and one of the twenty largest in the world. Trading on the JSE runs in SAST, and its hours overlap partially with European markets (London opens at 10am SAST in winter) and barely with American markets.

- Johannesburg -- 6 million people in the metropolitan area, financial center, gold mining heritage
- Cape Town -- legislative capital, tourism hub, major port on the Atlantic coast
- Durban -- major port on the Indian Ocean coast, significant Indian community
- Pretoria -- executive capital, government administrative center
- Port Elizabeth (now Gqeberha) -- eastern Cape port city

## South Africa and African timekeeping

The continent of Africa uses an unusually compact set of timezones relative to its size. The bulk of central and southern Africa runs on UTC+2, making South Africa part of a large uninterrupted band of UTC+2 that extends from South Africa north through Mozambique, Zimbabwe, Zambia, the DRC, and on toward Cairo.

This relative simplicity reflects both the geographic breadth of the continent's inhabited zones and, in some cases, the legacy of colonial administrative boundaries that prioritized internal consistency over solar alignment.

[West Africa Time (WAT) at UTC+1](/timezones/wat) covers the continent's western coast. East Africa Time at UTC+3 covers Kenya, Ethiopia, and the eastern region. South Africa sits at UTC+2 between them.

## The timezone in context

SAST at UTC+2 means:

- 1 hour ahead of Central European Time (CET)
- 2 hours ahead of London (GMT/UTC+0) in winter, 1 hour ahead in summer when UK observes BST
- 7 hours ahead of New York Eastern Standard Time in winter
- 1 hour behind Turkey and Moscow (both at UTC+3)

The practical implication is that South African business runs on a schedule that overlaps reasonably well with European business hours. Johannesburg is 1 hour ahead of London in winter, close enough that same-day communication is easy and real-time calls are unremarkable. With Asia, the gap is larger: Johannesburg is 6 hours behind Singapore (SGT, UTC+8).

## For developers

- IANA identifier: `Africa/Johannesburg`
- UTC offset: `+02:00`, fixed year-round (no DST)
- JavaScript: `new Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg' })`
- Python: `import pytz; pytz.timezone('Africa/Johannesburg')`

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- South African Bureau of Standards (SABS).
- [All timezones](/timezones)
