---
timezone: "GMT-IS"
slug: "gmt-is"
title: "GMT Time Now: Greenwich Mean Time Iceland (UTC+0)"
description: "Iceland observes UTC+0 year-round, never adjusting for daylight saving time. Reykjavik is one of the only capitals in the developed world that stays on GMT permanently."
iana: ["Atlantic/Reykjavik"]
utcOffset: "+00:00"
countries: ["Iceland"]
lastUpdated: "2026-03-24"
---

Greenwich Mean Time Iceland (GMT) is UTC+0, used year-round across Iceland with no daylight saving time. Iceland is one of the few countries that permanently observes UTC+0 without seasonal adjustment. IANA identifier: `Atlantic/Reykjavik`.

**Key facts about GMT (Iceland)**
- Full name: Greenwich Mean Time (Iceland)
- UTC offset: UTC+0
- DST: No, Iceland observes UTC+0 permanently year-round
- IANA identifiers: Atlantic/Reykjavik
- Countries: Iceland

Iceland runs on UTC+0 year-round. No daylight saving. No seasonal adjustment. The entire country, from Reykjavik in the southwest to the farms of the East Fjords, shares one permanent clock aligned with Greenwich Mean Time.

This is unusual. Most of Europe adjusts its clocks twice a year, and Iceland's geographic position at high latitude, where summer daylight and winter darkness are both extreme, might seem to argue for some kind of seasonal compensation. Iceland chose the opposite approach: one consistent clock, all year, and let people adapt their schedules to the light rather than the other way around.

## The latitude problem with daylight saving

Iceland sits between 63 and 66 degrees North latitude. In midsummer (around June 21), Reykjavik experiences nearly 22 hours of daylight. In midwinter (around December 21), it gets about 5 hours. The variation is so extreme that daylight saving time would be largely meaningless in the traditional sense.

The purpose of DST in temperate latitudes is to shift one hour of daylight from the useless morning (when people are asleep) to the useful evening (when people are awake and active). At Iceland's latitude, in summer there is abundant daylight at every hour regardless. Moving the clock forward or back by an hour would make no practical difference to the experience of daylight.

Iceland tried daylight saving time in 1968 but abandoned it almost immediately. The conclusion: at this latitude, the concept does not apply.

## Why UTC+0 and not UTC-1

Iceland's geographic position actually corresponds most closely to UTC-1. The country straddles the mid-Atlantic ridge near the 18th to 24th meridians West. Solar noon in Reykjavik falls around 1pm UTC+0, which means the country runs about an hour "fast" relative to natural solar time.

This choice was made to align with the United Kingdom and Ireland, Iceland's primary trading partners through much of the twentieth century. UTC+0 keeps Iceland's business hours synchronized with London, allowing same-day communication and trade. The slight mismatch with solar time was accepted as the price of practical alignment.

## The midnight sun and the dark winter

The lived experience of time in Iceland is shaped entirely by light.

In June and July, darkness essentially does not exist. The sun dips below the horizon briefly around midnight, but twilight persists. Children play outside at 11pm. Restaurants serve dinner at 10pm. The clock says it is late; the light says otherwise. Icelanders learn to use blackout curtains, sleep masks, and self-discipline to maintain normal rest schedules.

In December and January, the reverse holds. Sunrise around 11am, sunset before 4pm. The working day proceeds largely in darkness. Vitamin D supplementation is widespread. Light therapy lamps sit on many desks. The Icelandic tradition of hygge-adjacent coziness -- warm homes, candles, hot drinks, indoor gathering -- is a cultural adaptation to the winter darkness.

UTC+0 year-round means these light extremes play out against a consistent clock. There is no additional confusion from clock changes on top of the already dramatic seasonal variation.

## Reykjavik

Reykjavik is the capital and largest city of Iceland, with about 130,000 people in the city proper and roughly 230,000 in the greater Capital Region. It is the northernmost national capital in the world.

Despite its small size, Reykjavik has an outsized cultural footprint. Icelandic literature has an ancient tradition, with the Sagas -- medieval prose narratives about Viking Age exploration and conflict -- among the most significant bodies of medieval European literature. Contemporary Icelandic music, particularly the band Sigur Ros and singer Bjork, achieved global recognition disproportionate to the country's population.

Iceland's creative industries, technology sector (largely geothermal energy and data centers), and tourism economy all operate on UTC+0.

## Geothermal and data centers

Iceland's geothermal energy resources, produced by the volcanic activity along the Mid-Atlantic Ridge, provide cheap and renewable electricity and heating. This has made Iceland attractive for data center operations, where the cold climate assists cooling and the energy costs are low.

Large-scale data center operations in Iceland run in UTC+0, which aligns with European business hours. The practical benefit is that a data center in Iceland can be managed by European engineers working in their own timezone without any offset. The midnight sun can cause scheduling quirks for automated jobs set to run at "2am local time" in summer, when local time is as bright as noon.

## For developers

- IANA identifier: `Atlantic/Reykjavik`
- UTC offset: `+00:00`, fixed year-round (no DST)
- JavaScript: `new Intl.DateTimeFormat('is-IS', { timeZone: 'Atlantic/Reykjavik' })`
- Python: `import pytz; pytz.timezone('Atlantic/Reykjavik')`
- Iceland is one of the few places where `UTC+0` is genuinely fixed. Do not confuse with GMT (which is also UTC+0 in winter but becomes BST/UTC+1 in British summer). Iceland stays at UTC+0 when the UK moves to BST, meaning Iceland is 1 hour behind London in summer.
- This is a common source of bugs: during British Summer Time, a developer who assumes "Iceland is the same as London" will be wrong by one hour.

Ghana and a handful of other West African countries also observe UTC+0 year-round, using the IANA identifiers `Africa/Accra` and `Africa/Abidjan`.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- Statistics Iceland (Hagstofa Islands).
- [All timezones](/timezones)
