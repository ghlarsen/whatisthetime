---
timezone: "IRST"
slug: "irst"
title: "IRST Time Now: Iran Standard Time (UTC+3:30)"
description: "Iran Standard Time (IRST) is UTC+3:30, one of a small group of half-hour offsets in active use. Iran observes Iran Daylight Time (IRDT, UTC+4:30) in summer, making it the only country in the world to use a half-hour offset with a full daylight saving shift."
iana: ["Asia/Tehran"]
utcOffset: "+03:30"
dstVariant: "IRDT"
dstOffset: "+04:30"
countries: ["Iran"]
lastUpdated: "2026-03-24"
---

Iran Standard Time is UTC+3:30. Not UTC+3, not UTC+4 -- exactly halfway between them, on the 52.5-degree meridian that passes through Tehran. Iran is one of the few countries in the world using a 30-minute offset, and it adds a further distinction: it also observes daylight saving time, shifting to Iran Daylight Time (IRDT, UTC+4:30) in summer. The result is one of the more unusual timezone situations on earth -- a country that is perpetually off the hour in both standard and summer configurations.

## Why 3:30

Tehran sits at approximately 51.5 degrees East longitude. The natural solar noon corresponding to UTC+3:30 occurs at the 52.5-degree meridian, within a few kilometers of Tehran. The offset is geographically honest: Iran is choosing the time that best matches its actual solar position.

Iran formalized this offset in the late 19th and early 20th century as the country began coordinating with international time standards. The choice to use a half-hour rather than rounding to UTC+3 (one hour behind solar noon) or UTC+4 (half an hour ahead) reflects the kind of geographic precision that the railway and telegraph era demanded.

## The Persian calendar layer

Iran does not use the Gregorian calendar for official and civil purposes. The Solar Hijri calendar (also called the Persian or Shamsi calendar) is the official calendar of Iran. The calendar is solar (unlike the Islamic lunar Hijri calendar used for religious purposes in much of the Arab world), with 12 months of 30 or 31 days.

The Solar Hijri year begins at the exact astronomical moment of the vernal equinox -- the precise moment when the sun crosses the celestial equator heading north. This moment, called Nowruz ("New Year"), shifts slightly each year in Gregorian calendar terms, falling on March 20 or 21.

The Iranian New Year celebration, Nowruz, is one of the oldest continuously observed festivals in the world, predating Islam by thousands of years. The Persian year 1404 began in March 2025. Official Iranian documents, newspapers, and government communications use this calendar, while international correspondence uses Gregorian.

This creates a dual calendar system overlaid on a half-hour timezone with DST -- Iran manages three independent time/date coordinate systems simultaneously.

## IRDT and the summer shift

Iran observes daylight saving time from the first day of Farvardin (approximately March 21-22) to the first day of Mehr (approximately September 21-22). These are the Persian calendar's New Year and autumnal equinox, not the last Sunday in March and October that European countries use.

The DST transition timing based on the Persian calendar means that Iran's clock changes don't align with European or American DST changes. In spring, there is a brief period when Iran is shifting to IRDT (UTC+4:30) while European countries are also shifting, and the offset relationship between Tehran and European capitals passes through intermediate states.

IRDT at UTC+4:30 is shared, for part of the year, with Afghanistan (AFT, UTC+4:30 year-round). For a few months in summer, calling Tehran and calling Kabul puts you at the same offset.

## Tehran's economic position

Tehran is Iran's capital and economic center, home to roughly 15 million people in the metropolitan area. Iran's economy has operated under international sanctions for extended periods, limiting its integration with global financial markets, but the domestic economy is one of the larger in the Middle East.

Iran's oil and gas exports, primarily through the National Iranian Oil Company, flow via the Persian Gulf terminals. The country has significant reserves of both oil and natural gas, and the scheduling of tanker movements, pipeline operations, and contract negotiations happens on IRST.

The Tehran Stock Exchange operates on an Iranian-calendar business week (Sunday through Thursday), which means it is closed on the same days that European and American markets are open and vice versa. Trading happens in Iranian Rial on a schedule that is already off-axis from international finance by both the half-hour timezone and the different weekend.

## The craftsmen's time

Iran is home to one of the world's great craft traditions: Persian carpet weaving, miniature painting, turquoise working, saffron cultivation. The rug markets of Isfahan and Tabriz, the copper bazaars of Tehran, and the pottery workshops of Nishapur have operated for centuries on schedules tied to workshop light, prayer times, and seasonal festivals rather than to international financial clocks.

Saffron cultivation in the Khorasan region is one of the most time-sensitive agricultural operations in the world. The crocus flowers bloom for just two to three weeks in October, opening at dawn and needing to be harvested within hours. Iranian saffron growers wake before dawn during the harvest, working on IRST + the rhythms of the flower itself.

## The 4:30 AM call to prayer

Fajr (dawn prayer) in Tehran at the summer solstice occurs around 4:30 AM IRST. For observant Muslims, this is the starting point of the day regardless of what the business clock says. Iran's time system -- IRST base, IRDT in summer, Persian calendar for the schedule, prayer times for the daily rhythm -- layers multiple temporal coordinate systems on top of each other.

Most Iranians navigate all of these simultaneously without difficulty. The competence required to manage several parallel time systems is embedded in the culture in the way that bilingualism is in other contexts -- not as a burden but as a normal feature of daily life.

## For developers

IANA identifier: `Asia/Tehran`

IRST (UTC+3:30) in winter; IRDT (UTC+4:30) in summer. Transition dates follow the Persian calendar, meaning they shift slightly in Gregorian terms from year to year.

When calculating offsets to/from Tehran:
- London (UTC+0): 3.5 hours behind Tehran in winter, 4.5 hours behind in summer
- Dubai (UTC+4): 0.5 hours ahead of Tehran in winter, same time in summer (IRDT = GST)
- New York (UTC-5): 8.5 hours behind in winter, 9.5 in summer

The half-hour arithmetic requires care. UTC+3:30 expressed in minutes is UTC + 210 minutes.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [National Iranian Oil Company](https://nioc.ir/en)
- [Tehran Stock Exchange](https://en.tse.ir/)
- [Iranian Calendar FAQ](https://www.iranchamber.com/calendar/articles/calendar_systems.php)
