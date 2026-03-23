---
country: "Sweden"
slug: "sweden"
title: "Time in Sweden: The Country That Once Changed Its Clocks One Minute Per Day"
description: "Sweden observes Central European Time (UTC+1 in winter, UTC+2 in summer). But in 1900, Sweden attempted to transition to a new standard time using a method that has never been attempted before or since: moving the clocks one minute forward every day for 14 days."
timezones: ["Europe/Stockholm"]
utcOffsets: ["+01:00"]
hasDST: true
capital: "Stockholm"
continent: "Europe"
lastUpdated: "2026-03-23"
---

Sweden observes Central European Time: UTC+1 in winter, UTC+2 during daylight saving. The IANA identifier is `Europe/Stockholm`. Sweden follows the EU DST schedule, advancing on the last Sunday in March and retreating on the last Sunday in October.

This is entirely unremarkable for a Northern European country. What is remarkable is what Sweden did in 1900.

## The world's slowest clock change

In 1879, Sweden adopted a national standard time of UTC+1:00:14, based on the meridian running through Stockholm's old observatory. This was a local solar-time approximation but with a slightly odd offset from UTC.

By 1900, Sweden wanted to align with the emerging international standard time system and adopt a clean UTC+1:00:00 offset. This required moving Swedish clocks back by 14 minutes and 12 seconds.

Rather than simply changing the clocks at a single midnight, the Swedish government decided to implement the change gradually to avoid confusion and minimize disruption. The plan: advance the clocks by approximately one minute per day for 14 days, a gradual transition that would ease the country from the old time to the new.

Beginning on January 1, 1900, Swedish clocks moved forward slightly each day. Over two weeks, the cumulative effect shifted Sweden's time by the required amount.

This is, as far as timezone historians have been able to determine, the only time in history that a country implemented a timezone change through incremental daily adjustments spread over multiple days. Standard timezone changes happen at a single moment, typically at 2:00 AM to minimize disruption. Sweden's 1900 transition was the opposite approach.

Whether it actually reduced confusion is unclear. Having every clock in the country set to a slightly different time each day, with no two consecutive days sharing the same offset, seems like it would create its own problems. But the historical record does not document significant public complaint.

The transition completed on January 14, 1900. Sweden has used clean UTC offsets ever since.

## The midnight sun and the dark winter

Sweden ranges from Malmo in the south (55.6 degrees North) to Kiruna in the far north (67.9 degrees North, above the Arctic Circle). This range creates dramatically different daylight experiences.

In Stockholm at midsummer, the sun barely dips below the horizon. Darkness lasts perhaps three hours. In Kiruna, the sun does not set at all for roughly six weeks around midsummer.

In winter, the asymmetry reverses. Stockholm has about seven hours of daylight in December. Kiruna has polar night from December through January: no sunrise at all.

DST in Sweden operates on the same dates for the entire country, regardless of this north-south variation. Kiruna residents moving their clocks forward in March are doing so in a place where the sun is behaving very differently from Stockholm. The administrative convenience of a single national transition date means the clock change's practical effect varies dramatically by latitude.

## ABBA and time

ABBA's "Waterloo" won the Eurovision Song Contest in 1974, launching one of the most successful pop careers in history. The song's subject, Napoleon's defeat at Waterloo in 1815, is a story about a specific moment of historical time when one man's fate was decided in a single afternoon.

ABBA specialized in songs about time's passage: "The Winner Takes It All," "Fernando," "Knowing Me, Knowing You." Many of their ballads are elegies for things that have ended, structured around the awareness that certain moments are gone permanently. The specific texture of Scandinavian melancholy about transience is present throughout.

This is perhaps appropriate for a country that once moved its clocks by a minute a day.

## For developers

- IANA timezone: `Europe/Stockholm`
- UTC offset: +01:00 (winter), +02:00 (DST)
- DST: last Sunday March (forward), last Sunday October (back)
- Historical note: 14-day gradual transition in January 1900 (recorded in IANA database as the UTC+1:00:14 → UTC+1:00:00 shift)

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [Swedish Meteorological and Hydrological Institute (SMHI)](https://www.smhi.se/en/)
- [IANA tz data historical comments for Europe/Stockholm](https://data.iana.org/time-zones/tz-link.html)
- [European Parliament resolution on DST, 2019](https://www.europarl.europa.eu/doceo/document/TA-8-2019-0225_EN.html)
