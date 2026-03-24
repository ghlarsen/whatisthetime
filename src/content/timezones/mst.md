---
timezone: "MST"
slug: "mst"
title: "MST Time Now: Mountain Standard Time (UTC-7)"
description: "Mountain Standard Time (MST) is UTC-7. Used across the US Mountain region including Colorado, Utah, New Mexico, and parts of Arizona. Transitions to MDT (UTC-6) in summer, except most of Arizona."
iana: ["America/Denver", "America/Phoenix", "America/Boise"]
utcOffset: "-07:00"
dstVariant: "MDT"
dstOffset: "-06:00"
countries: ["United States", "Canada"]
lastUpdated: "2026-03-24"
---

Mountain Standard Time is UTC-7. It covers the Rocky Mountain states of the American interior, a region of high elevation, ski resorts, national parks, and some of the most dramatic geography in North America.

In summer, most of the Mountain zone shifts to Mountain Daylight Time (MDT) at UTC-6. But Arizona, one of the largest states in the region, mostly does not. This creates a genuine curiosity: for part of the year, Denver and Phoenix are in the same timezone, and for the rest, they are not.

## The Mountain zone in American timekeeping

The United States standardized its time zones on November 18, 1883, the day the railroads imposed order on a country where every city still ran on local solar time. That date is sometimes called "The Day of Two Noons" -- cities reset their clocks at noon, which meant some places experienced noon twice as they caught up or fell back to their new standard time.

The railroads divided the country into four zones: Eastern, Central, Mountain, and Pacific. These names have survived unchanged for over 140 years, though the legal authority over them has shifted from the railroad associations to the federal government, formalized through the Standard Time Act of 1918 and the Uniform Time Act of 1966.

Mountain Time covers the states that sit in and around the Rocky Mountains. The zone runs roughly along the 105th meridian West, though the actual boundaries follow state lines and are irregular.

## States in the Mountain zone

The Mountain Standard Time zone includes, in whole or part:

- Colorado -- Denver is the major hub, the region's largest city
- Utah -- Salt Lake City, home to a major technology industry cluster
- New Mexico -- Albuquerque, Santa Fe
- Wyoming -- Cheyenne, Yellowstone National Park
- Montana -- Billings, Missoula
- Idaho -- most of the state (the northern panhandle is in Pacific Time)
- Nevada -- most observes Pacific Time, but a rural eastern strip observes Mountain Time
- Arizona -- observes Mountain Standard Time year-round, but does not shift to MDT

Parts of Canada also observe Mountain Time, including most of Alberta (Calgary, Edmonton) and a portion of British Columbia.

## The Arizona exception

Arizona's relationship with daylight saving is the most interesting anomaly in the Mountain zone.

Most of Arizona does not observe daylight saving time. The state legislature voted in 1968 to opt out permanently. The reasoning was straightforward: Arizona summers are intensely hot, and extending daylight into evening hours means extending the hottest part of the day. The state decided it wanted earlier sunsets, not later ones.

The result is that Arizona runs on MSK (UTC-7) year-round. In winter, when the rest of the Mountain zone is also on UTC-7, Arizona is in sync with Colorado and Utah. In summer, when those states shift to MDT (UTC-6), Arizona falls a hour behind. For that period, Phoenix is on the same clock as Los Angeles rather than Denver.

Within Arizona, there is a further exception. The Navajo Nation, which spans northeastern Arizona into New Mexico and Utah, does observe daylight saving time as a sovereign government decision. This creates a patchwork: drive through northeastern Arizona and you cross into and out of DST as you enter and leave the Navajo Nation. The Hopi Reservation, which is entirely surrounded by the Navajo Nation, does not observe DST. Concentric rings of different clock times, nested inside each other.

## Denver and the Mountain economy

Denver is the Mountain zone's primary city and functions as the region's economic and logistical hub. It sits at the geographic center of the continental United States and is a major hub for Union Pacific rail freight, Interstate 70, and Denver International Airport, which is one of the ten busiest airports in the world.

Colorado's Front Range -- Denver, Boulder, Colorado Springs -- has developed a significant technology sector, often described as an extension of Silicon Valley with lower costs of living and proximity to outdoor recreation. The timezone alignment with the west coast (2 hours behind the east coast, 1 hour ahead of the west coast) makes it functional for teams that need to span both.

Utah's Salt Lake City has also developed a notable technology industry, sometimes called "Silicon Slopes." The Church of Jesus Christ of Latter-day Saints has headquartered major enterprises there, and the state's political and economic climate attracted technology companies in the 2010s. Qualtrics, Domo, and others were founded there.

## For developers

- IANA identifiers: `America/Denver` (DST-observing), `America/Phoenix` (no DST)
- Standard offset: `+0: -07:00` (MST)
- Summer offset: `-06:00` (MDT), does not apply to `America/Phoenix`
- DST transition: Second Sunday in March (spring forward) to first Sunday in November (fall back)
- JavaScript: `new Intl.DateTimeFormat('en-US', { timeZone: 'America/Denver' })`
- Python: `import pytz; pytz.timezone('America/Denver')`

When working with Arizona, always use `America/Phoenix`. Never assume Mountain Time in Arizona will follow DST. The consequences of getting this wrong are real: a meeting scheduled for "2pm Mountain" in June means 2pm in Denver and 1pm in Phoenix, relative to UTC.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [National Institute of Standards and Technology (NIST)](https://www.nist.gov/pml/time-and-frequency-division/time-realization/standard-time-zones)
- Bartky, Ian R. *One Time Fits All: The Campaigns for Global Uniformity*. Stanford University Press, 2007.
- [All timezones](/timezones)
