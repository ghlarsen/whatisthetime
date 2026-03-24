---
country: "Argentina"
slug: "argentina"
title: "Time in Argentina: The Country That Tried DST Twelve Times and Finally Quit"
description: "Argentina uses ART (UTC-3) year-round with no daylight saving. This sounds simple. Getting here was not. Argentina's history with daylight saving is a case study in how a country can collectively decide that it is not worth the trouble."
timezones: ["America/Argentina/Buenos_Aires"]
utcOffsets: ["-03:00"]
hasDST: false
capital: "Buenos Aires"
continent: "South America"
lastUpdated: "2026-03-23"
---

Argentina uses Argentina Time (ART) (UTC-3) year-round with no daylight saving. IANA identifier: `America/Argentina/Buenos_Aires`.

**Key facts about time in Argentina**
- Timezone: Argentina Time (ART)
- UTC offset: UTC-3
- DST: No
- IANA identifier: America/Argentina/Buenos_Aires
- Capital: Buenos Aires

Argentina runs on Argentina Time (ART), UTC-3, year-round. No daylight saving. The clocks don't move. This is the permanent arrangement as of 2009, when the country made its final decision to abandon seasonal time changes.

Getting to this point involved twelve separate attempts at implementing daylight saving, scattered across most of the 20th century. Argentina tried it, abandoned it, tried it again, changed the rules, changed the rules again, and eventually concluded: not worth it.

## The DST saga: a brief history of twelve attempts

Argentina first experimented with daylight saving in 1930. The pattern over the following eight decades looked roughly like this: the government would introduce DST, sometimes only for Buenos Aires province, sometimes nationally, with changing start and end dates, sometimes in response to energy crises, sometimes reversed by the next administration. At one point in the 1990s, different Argentine provinces were on different time settings simultaneously, creating internal timezone fragmentation.

The chaotic administration of Argentine DST across the 20th century became a genuine operational problem. Airlines, railways, phone companies, and eventually software systems had to maintain complex tables of Argentine timezone history just to accurately calculate times for dates in the past. The IANA timezone database's `America/Argentina/Buenos_Aires` entry contains one of the longer and more intricate historical records of any timezone entry in the database.

The definitive end came under President Cristina Fernández de Kirchner's administration. In 2009, Argentina announced it would no longer observe daylight saving time. The decision was made and it held. Since then, Argentina has been UTC-3, permanently.

## Why UTC-3?

Buenos Aires sits at approximately 58°W longitude, where solar noon falls at roughly UTC+3:52 east of the meridian. Wait, let me restate that: at 58°W, solar noon is at about 15:52 UTC, which corresponds to local solar noon at about 12:52 local time under UTC-3. The offset is slightly fast relative to the sun, meaning Buenos Aires runs a little ahead of solar time, but within an acceptable range.

The more useful fact: UTC-3 places Argentina 3 hours behind London in winter, 4 hours behind London in summer (since London observes DST and Argentina doesn't), and at the same offset as Brazil's main population centers for part of the year, until Brazil's DST changes (which it has now also abolished, but that's Brazil's story to tell).

## The Borges angle

Jorge Luis Borges, arguably the most important Spanish-language prose writer of the 20th century, had a peculiar relationship with time. His stories return obsessively to temporal paradox: "The Garden of Forking Paths" imagines time as an infinite branching structure of parallel presents. "The Lottery in Babylon" describes a system of random outcomes that eventually determines everything, including time itself. "A New Refutation of Time" is a philosophical essay arguing, seriously and with complete awareness of its own absurdity, that time does not exist.

Borges was born in Buenos Aires in 1899. He lived there most of his life. He died in Geneva in 1986. His relationship with Argentine time was intimate: he grew up on the city's streets, worked as a librarian here, went gradually blind here. His fictional time might be infinite and paradoxical, but his actual daily time was the same fixed clock everyone else used.

The idea that Argentine time would be stable, permanent, non-adjusting, would probably have pleased him.

## Tango and the hour

The tango milonga, the social dance event where tango is danced, has its own relationship with time. Milongas in Buenos Aires traditionally begin late: doors open around 10 PM or 11 PM, dancing begins properly after midnight, and the best tandas (sets of dances) happen in the small hours of the morning. This is consistent with the broader Buenos Aires pattern of dining at 10 PM, socializing until 2 AM or 3 AM.

UTC-3 is, in this context, a timezone calibrated for a culture that has organized its social life around the night end of the clock.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [Servicio de Hidrografía Naval, Argentina — Official Time](http://www.hidro.gov.ar/)
- [Decreto 1236/1999 — Argentine DST legislation](https://infoleg.gob.ar/)
- Borges, Jorge Luis. *Ficciones*. Sur, 1944.
- Borges, Jorge Luis. "A New Refutation of Time" in *Other Inquisitions*. Sur, 1952.
