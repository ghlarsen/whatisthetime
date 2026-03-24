---
timezone: "AFT"
slug: "aft"
title: "AFT Time Now: Afghanistan Time (UTC+4:30)"
description: "Afghanistan Time (AFT) is UTC+4:30, one of a small number of half-hour timezone offsets in active use. Afghanistan observes no daylight saving time and uses a single timezone across the entire country."
iana: ["Asia/Kabul"]
utcOffset: "+04:30"
countries: ["Afghanistan"]
lastUpdated: "2026-03-24"
---

Afghanistan Time is UTC+4:30. No daylight saving, no regional divisions, one clock for a country the size of Texas. The half-hour offset puts Afghanistan between its neighbors -- Iran to the west on UTC+3:30 and Pakistan to the east on UTC+5 -- in a neat progression of half-hour steps that reflects something of the geography.

## Why 4:30

The 4:30 offset is not arbitrary. Afghanistan sits geographically between the UTC+4 zone (used by its neighbors to the north, including Turkmenistan and the UAE) and the UTC+5 zone (Pakistan). The 67.5-degree meridian, which corresponds to solar noon at UTC+4:30, runs through central Afghanistan roughly through Kandahar and north toward Kabul.

Using UTC+4:30 means Kabul's solar noon falls close to 12:00 PM on the clock, the natural correspondence that defined timekeeping before international coordination formalized things in the 19th century. Afghanistan formalized this offset in 1945.

## The half-hour offset neighborhood

Afghanistan is part of a cluster of South and Central Asian countries that use 30-minute offsets. The lineup from west to east:
- Iran: UTC+3:30 (standard), UTC+4:30 (daylight)
- Afghanistan: UTC+4:30 (year-round)
- India and Sri Lanka: UTC+5:30
- Nepal: UTC+5:45

This means crossing from Iran into Afghanistan doesn't just cross a border, it shifts the clock by exactly one hour. Crossing from Afghanistan into Pakistan (UTC+5) requires another half-hour adjustment. Travelers through this region collect fractional time changes.

Nepal, for context, is the only country in the world using a 45-minute offset. The logic is similar: Kathmandu sits close to the 82.5-degree meridian, halfway between UTC+5 and UTC+6, and Nepal chose the geographically honest offset rather than rounding to a neighbor's time.

## No daylight saving time

Afghanistan has never observed daylight saving time in the modern era. The country's latitude ranges from about 29 to 38 degrees North, which puts Kabul at roughly the same latitude as Islamabad, Tehran, and Madrid. At these latitudes, the argument for DST has some geographic validity -- summer evenings do get meaningfully longer -- but Afghanistan never pursued it.

The practical reasons are straightforward: much of Afghanistan's economy and daily life historically operated outside electric-grid infrastructure, particularly in rural and mountain communities where the economic rationale for evening daylight (shopping, entertainment, commercial activity) applies less directly. The consistency of a fixed clock is more valuable than optimization for summer evenings.

## Kabul and the business day

Kabul at UTC+4:30 shares a workday window with Dubai (UTC+4), Islamabad (UTC+5), and Tehran (UTC+3:30 in winter). This places it within the commercial and diplomatic sphere of its immediate neighborhood in terms of time, even when politics makes coordination difficult.

The overlap with European business hours is narrow. London (UTC+0 in winter) is 4.5 hours behind, which means a morning meeting in London falls in the early afternoon in Kabul. With New York (UTC-5), there is effectively no overlap during standard business hours.

## The IANA identifier

Afghanistan's single IANA timezone entry is `Asia/Kabul`. There is no secondary identifier because Afghanistan has never had internal timezone divisions.

In programming contexts:
- Python: `pytz.timezone('Asia/Kabul')`
- JavaScript: `new Intl.DateTimeFormat('en', { timeZone: 'Asia/Kabul' })`
- The offset is consistently +04:30 with no DST transitions

## Time in the Hindu Kush

Afghanistan's mountain geography creates practical timekeeping realities that the official timezone doesn't fully capture. In remote valleys of the Hindu Kush, daily life is organized around prayer times (which follow solar events: dawn, sunrise, noon, afternoon, sunset, and night) more than clock time. The call to prayer from a mosque provides the primary daily time signal in communities far from infrastructure.

This is not unique to Afghanistan -- it reflects traditional Islamic timekeeping that predates standard timezone systems by centuries. The interplay between official clock time and prayer-time organization shapes the Afghan day in ways that matter for understanding when meetings happen, when shops open, and when the day begins.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [United Nations Country Data: Afghanistan](https://data.un.org/en/iso/af.html)
- [timeanddate.com: Afghanistan](https://www.timeanddate.com/time/country/afghanistan)
