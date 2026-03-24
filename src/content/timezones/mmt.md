---
timezone: "MMT"
slug: "mmt"
title: "MMT Time Now: Myanmar Time (UTC+6:30)"
description: "Myanmar Time (MMT) is UTC+6:30. One of only a handful of timezones with a 30-minute offset. Used across all of Myanmar, year-round, with no daylight saving time."
iana: ["Asia/Rangoon", "Asia/Yangon"]
utcOffset: "+06:30"
countries: ["Myanmar"]
lastUpdated: "2026-03-24"
---

Myanmar Time is UTC+6:30. That half-hour matters. In a world where most timezones sit on clean hourly boundaries, Myanmar's 30-minute offset places it firmly among a small group of exceptions, alongside Nepal, India, and Iran, where the mathematics of solar time resisted the convenience of round numbers.

No daylight saving. No internal regional variation. Myanmar runs on one clock.

## Why 6:30

The logic behind UTC+6:30 is geometric. Myanmar sits between UTC+6 (Bangladesh, to the west) and UTC+7 (Thailand, to the east). Its geographic center aligns most closely with the 97th or 98th meridian East, which corresponds to roughly UTC+6:28. Rounding to UTC+6:30 gave Myanmar a solar time that was more accurate than either UTC+6 or UTC+7 would have been.

The British colonial administration set the offset during the period when Burma was part of British India, and the half-hour was retained after independence in 1948. Independent Burma, and later Myanmar, kept it. The government has never seriously proposed changing to a whole-hour offset.

This places Myanmar 30 minutes ahead of Bangladesh and 30 minutes behind Thailand. The half-hour boundary with neighboring countries creates scheduling friction that Burmese businesses operating regionally learn to account for.

## Colonial timekeeping and independence

Burma was incorporated into British India in stages across the nineteenth century, with the final annexation in 1885. Under British administration, the clock was set by the colonial infrastructure, adjusted for local solar conditions.

When Burma separated from British India in 1937 as a distinct colony, and then gained independence in 1948, the government retained the UTC+6:30 offset. It fit. The alternative, shifting to an hourly boundary to simplify international coordination, would have meant accepting a more significant mismatch with local solar noon.

## Yangon and the cities

Myanmar uses a single timezone nationwide.

- Yangon (formerly Rangoon) -- largest city and commercial capital, in the south near the Irrawaddy delta
- Naypyidaw -- purpose-built administrative capital, moved from Yangon in 2006
- Mandalay -- second city, in the central dry zone, cultural and historical center
- Bago -- former royal capital
- Mawlamyine -- southeastern Mon State capital, near the Thai border

## The two IANA entries

Myanmar has an unusual situation in the IANA timezone database: two entries that refer to the same offset. `Asia/Rangoon` is the older entry, using the colonial-era British name for Yangon. `Asia/Yangon` was added in 2016 to reflect the name change. Both resolve to UTC+6:30. In modern systems, `Asia/Yangon` is preferred, but `Asia/Rangoon` remains available for backward compatibility.

For developers:
- IANA identifiers: `Asia/Yangon` (preferred) or `Asia/Rangoon` (legacy)
- UTC offset: `+06:30`, fixed year-round
- JavaScript: `new Intl.DateTimeFormat('my-MM', { timeZone: 'Asia/Yangon' })`
- Python: `import pytz; pytz.timezone('Asia/Yangon')`

## Half-hour timezones worldwide

Myanmar Time belongs to a small club of offset-by-half-hour timezones:

- UTC+5:30: India Standard Time (IST)
- UTC+5:45: Nepal Time (NPT)
- UTC+6:30: Myanmar Time (MMT)
- UTC+9:30: Australian Central Standard Time (ACST)

Each of these reflects a decision to prioritize solar alignment over hourly round numbers. [Nepal Time at UTC+5:45](/timezones/npt) goes a step further, using a 15-minute increment that makes it the only major timezone with a 45-minute offset.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- Eade, J.C. *The Calendrical Systems of Mainland South-East Asia*. Brill, 1995.
- [All timezones](/timezones)
