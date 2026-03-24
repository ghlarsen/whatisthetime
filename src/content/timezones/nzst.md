---
timezone: "NZST"
slug: "nzst"
title: "NZST Time Now: New Zealand Standard Time (UTC+12)"
description: "New Zealand Standard Time (NZST) is UTC+12. New Zealand observes NZDT (UTC+13) during daylight saving. One of the first inhabited places to see each new day."
iana: ["Pacific/Auckland"]
utcOffset: "+12:00"
dstVariant: "NZDT"
dstOffset: "+13:00"
countries: ["New Zealand"]
lastUpdated: "2026-03-24"
---

New Zealand Standard Time is UTC+12. In summer, when New Zealand observes daylight saving time, the country moves to NZDT at UTC+13, placing it among the furthest-forward timezones on Earth and among the first inhabited places on the planet to enter each new day.

**Key facts about NZST**
- Full name: New Zealand Standard Time
- UTC offset: UTC+12
- DST: yes, NZDT (UTC+13) from late September to early April
- IANA identifiers: Pacific/Auckland
- Countries: New Zealand

That position at the edge of the calendar has cultural and commercial implications. On New Year's Eve, Auckland's fireworks are among the first broadcast globally. When December 31 becomes January 1 for New Zealand, it still December 31 in the United States, Europe, and much of Asia.

## Geography and the international date line

New Zealand sits in the southwestern Pacific Ocean, roughly 2,000 kilometers east of Australia and 10,000 kilometers from the west coast of the United States. Its position close to the International Date Line, on the western side of it, means it is ahead of most of the world in calendar terms.

This creates a specific kind of timezone experience. New Zealanders are routinely described as being "ahead" -- they see tomorrow before their international contacts. For business, this means that a meeting at 9am Monday in Auckland is Sunday afternoon in London, Sunday morning in New York, and still Saturday evening in Los Angeles.

## Setting New Zealand's clock

New Zealand adopted standard time in 1868, making it one of the earlier countries to do so. The astronomer George Hudson proposed New Zealand's initial standard, which used a local observatory as the reference. The country moved to UTC+12 as international coordination standardized.

New Zealand has observed daylight saving time for most of the twentieth century and continues to do so. The switch runs on the Southern Hemisphere schedule, opposite to the Northern Hemisphere: clocks go forward in September or October (beginning of southern spring) and back in April (beginning of southern autumn). During NZDT, New Zealand is at UTC+13.

The dates are set by regulation. In 2026, daylight saving ends on the first Sunday of April (April 5) and begins again on the last Sunday of September (September 27).

## Cities on NZST

New Zealand observes a single timezone for the main islands, with one exception.

- [Auckland](/cities/auckland) -- largest city, economic hub, approximately 1.7 million people in the urban area
- Wellington -- capital city, center of government and film industry
- Christchurch -- largest city on the South Island, rebuilt substantially after the 2011 earthquake
- Hamilton -- inland North Island city
- Tauranga -- Bay of Plenty port city

The Chatham Islands, lying roughly 800 kilometers east of Christchurch, observe Chatham Standard Time at UTC+12:45 (and Chatham Daylight Time at UTC+13:45). This 45-minute offset from the main islands is one of the more unusual timezone arrangements in the Pacific.

## The film industry connection

Wellington is the headquarters of Weta Workshop and WetaFX, the visual effects and production companies responsible for *The Lord of the Rings* trilogy and much of Peter Jackson's subsequent work. New Zealand's film industry punches significantly above its weight for a country of 5 million people.

The timezone creates particular challenges for international production work. When Wellington is finishing a work day, Los Angeles is waking up 17 or 18 hours behind. Remote collaboration requires very early starts on one end or very late finishes on the other. New Zealand's film professionals have become fluent in cross-timezone scheduling in ways that smaller local film industries rarely need to be.

## New Zealand and the new day

At UTC+13 during daylight saving, New Zealand is ahead of UTC by 13 hours and ahead of the west coast of the United States by 21 hours. On New Year's Eve, Auckland's celebration happens while most of the world is still in December.

This quirk attracted significant media attention around the Y2K transition in 2000. New Zealand was among the first developed countries to enter the new millennium, and its uneventful rollover provided some reassurance to the rest of the world that digital systems were handling the date change correctly. New Zealand became an inadvertent early test case for the global Y2K readiness effort.

## For developers

- IANA identifier: `Pacific/Auckland`
- Standard offset: `+12:00` (NZST), approximately late April to late September
- Daylight offset: `+13:00` (NZDT), approximately late September to early April
- DST follows Southern Hemisphere schedule: opposite of Northern Hemisphere
- JavaScript: `new Intl.DateTimeFormat('en-NZ', { timeZone: 'Pacific/Auckland' })`
- Python: `import pytz; pytz.timezone('Pacific/Auckland')`
- Note: New Zealand summer is December through February. DST is active during those months, and the offset is UTC+13, not UTC+12.

[Fiji Time](/timezones/fjt) also observes UTC+12 in its standard period. [JST](/timezones/jst) and [KST](/timezones/kst) sit at UTC+9, three hours behind NZST.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [Land Information New Zealand (LINZ)](https://www.linz.govt.nz/)
- [MetService New Zealand](https://www.metservice.com)
- [All timezones](/timezones)
