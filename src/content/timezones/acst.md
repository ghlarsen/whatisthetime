---
timezone: "ACST"
slug: "acst"
title: "ACST Time Now: Australian Central Standard Time (UTC+9:30)"
description: "Australian Central Standard Time (ACST) is UTC+9:30, one of the rare half-hour offsets on the globe. Used in South Australia and the Northern Territory, shifting to ACDT (UTC+10:30) in summer for SA only."
iana: ["Australia/Adelaide", "Australia/Darwin"]
utcOffset: "+09:30"
dstVariant: "ACDT"
dstOffset: "+10:30"
countries: ["Australia"]
lastUpdated: "2026-03-24"
---

Most of the world divides time into neat hourly chunks. Australia did not get that memo. Australian Central Standard Time sits at UTC+9:30, a half-hour offset that puts Adelaide and Darwin squarely between the timezones their neighbors use. It is one of a small handful of 30-minute offsets in active use anywhere on earth, and it has a history worth knowing.

## The geography that makes this necessary

Australia is wide. Genuinely, absurdly wide. The continent spans more than 4,000 kilometers from east to west, which means roughly three hours of solar time separate Perth from Sydney. When the colonial governments started syncing their clocks in the 1890s, they faced a practical problem: the middle of the country was too far east for Western time and too far west for Eastern time.

The solution was a compromise offset. South Australia and the Northern Territory adopted a time centered on 142.5 degrees East, exactly halfway between the 135-degree meridian used by the west and the 150-degree meridian used by the east. The result: UTC+9:30.

## Adelaide and Darwin: same clock, different relationship with it

Both cities run on ACST, but they use it differently.

South Australia observes daylight saving time. From the first Sunday in October to the first Sunday in April, Adelaide and the rest of SA shift to Australian Central Daylight Time (ACDT), UTC+10:30. This puts South Australia a full two hours ahead of Western Australia in summer, which drives logistics planners quietly mad.

The Northern Territory does not observe daylight saving. Darwin stays on ACST year-round. The NT government's official position is that DST provides no benefit in the tropics, where sunrise and sunset times vary little across the year. Darwin at midsummer sees sunrise around 6:20 AM and sunset around 7:00 PM regardless of what the clock says.

This creates a genuinely unusual situation: two territories sharing a timezone that diverge by a full hour for half the year.

## The odd offset in daily life

Adelaide residents have grown accustomed to being 30 minutes off from Sydney. Business calls across the border require mental arithmetic that involves fractions. Television schedules list programs differently in the TV guides. Live broadcasts from the eastern states arrive at times like 7:30 PM rather than on the hour.

The half-hour offset also appears in international scheduling. When a videoconference is arranged between London and Adelaide, the offset calculation involves 9 hours and 30 minutes rather than a round number. Adelaide workers in global companies keep the same mental habit as their counterparts in India (UTC+5:30) and Iran (UTC+3:30): the half-hour is just part of the calculation.

## History of the 9:30 decision

The Railways Commissioner of South Australia pushed for coordinated railway time in the 1890s, and the half-hour offset was formalised in 1895. The reasoning was explicitly geographical: Adelaide sits close to 138.5 degrees East, which corresponds to solar noon at roughly 9:14 AM GMT, putting it between the two standard meridians on either side.

The Northern Territory, which did not become a territory until 1911 (administered by South Australia before that), inherited the same offset. The administrative relationship between Adelaide and Darwin meant they stayed synchronized even after separation.

## Darwin's timeless summer

Darwin has one of the more stable clocks in the world. Because it sits at 12 degrees South latitude, well within the tropics, the variation in day length between June and December is modest compared to temperate cities. Sunrise in June comes around 7:10 AM. In December, around 6:20 AM. The difference is less than an hour.

This consistency is part of the NT government's argument against DST. The premise of daylight saving is that shifting the clock forward in summer makes better use of evening daylight. In Darwin, evening daylight doesn't shift dramatically enough to justify the disruption.

## Cities and towns on ACST

Major locations:
- [Adelaide](/adelaide) (South Australia, UTC+10:30 in summer)
- Darwin (Northern Territory, UTC+9:30 year-round)
- Alice Springs (Northern Territory)
- Port Augusta (South Australia)
- Mount Gambier (South Australia)

## For developers and travelers

The IANA identifiers are `Australia/Adelaide` (observes DST) and `Australia/Darwin` (no DST). They are separate entries in the database precisely because their DST behavior diverges.

When scheduling across the ACentral timezone:
- Darwin to Sydney: 1.5 hours behind in standard time, 0.5 hours behind during eastern DST
- Adelaide to Sydney: 0.5 hours behind in standard time, the same 0.5 hours behind in summer (both on DST)
- Adelaide to Darwin: same clock in winter, one hour ahead of Darwin in summer

For international travelers, ACST sits between Japan (UTC+9) and China/Philippines (UTC+8) on one side, and AEST (UTC+10) on the other. Adelaide and Darwin share a clock with no other major world city.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [Australian Government Bureau of Meteorology](http://www.bom.gov.au/)
- [TimeZone Lookup: Australia](https://www.timeanddate.com/time/australia/)
- Blainey, Geoffrey. *The Tyranny of Distance*. Sun Books, 1966.
