---
country: "Denmark"
slug: "denmark"
title: "Time in Denmark: The Country Fighting to Keep Its Clocks Still"
description: "Denmark uses Central European Time (CET/CEST), but it has been among the loudest voices in Europe calling to abolish daylight saving time, a debate that has stalled in bureaucratic deadlock for years."
timezones: ["Europe/Copenhagen"]
utcOffsets: ["+01:00"]
hasDST: true
capital: "Copenhagen"
continent: "Europe"
lastUpdated: "2026-03-23"
---

Denmark uses Central European Time (CET) (UTC+1 in winter, UTC+2 in summer). DST observed. IANA: `Europe/Copenhagen`.

**Key facts about time in Denmark**
- Timezone: Central European Time (CET) / Central European Summer Time (CEST)
- UTC offset: +01:00 (winter), +02:00 (summer)
- DST: Yes
- IANA identifier: `Europe/Copenhagen`
- Capital: Copenhagen

Denmark runs on Central European Time: UTC+1 in winter, UTC+2 in summer (CEST). It has done so continuously since 1940, when German occupation imposed the Central European timezone on occupied territories. Before that, Denmark had been on UTC+1 year-round, without daylight saving. The occupation changed the clocks, and they never quite went back to what they were.

The irony is rich: Denmark is geographically a North Atlantic country, sitting at roughly the same longitude as the UK and Portugal. Copenhagen's solar noon falls closer to UTC+0 than UTC+1. Denmark is in the wrong timezone, and it has known this for a while.

## The EU DST abolition saga

In 2018, the European Commission ran a public consultation on whether to abolish the twice-yearly clock change. Over 4.6 million Europeans responded, making it one of the largest consultations in EU history. Roughly 84% wanted to end the practice.

The European Parliament voted in March 2019 to eliminate clock changes by 2021. Member states would choose their permanent timezone: permanent standard time or permanent summer time. Then the process stalled.

Denmark was one of the countries that had to decide which permanent timezone it wanted. This turned out to be a surprisingly contentious question. Danish health authorities and sleep researchers favored permanent winter time (UTC+1), citing evidence that the human body aligns better with solar time. Business interests and many citizens preferred permanent summer time (UTC+2), arguing that lighter evenings were worth more than lighter mornings.

The European Council failed to reach consensus on a timeline. Neighboring countries wanted coordination: you cannot have Germany permanently on UTC+1 and Denmark permanently on UTC+2 if you share a land border and are major trading partners. As of 2026, the EU clock change is still happening, the vote to abolish it still unrealized, the member states still unable to agree on which time to freeze.

Denmark is stuck changing its clocks twice a year, having voted to stop doing exactly that, waiting for a political resolution that keeps not arriving.

## What the clock change actually costs

The Danish health argument is not trivial. The State Serum Institute and researchers at the University of Copenhagen have published work showing measurable effects from the autumn clock change: spikes in hospital admissions, increases in traffic accidents in the days following the change, and impacts on sleep quality that can persist for weeks in some individuals.

The specific rhythm disruption of springing forward in March, losing an hour of morning sleep, affects people differently by chronotype. Morning people adjust relatively quickly. Evening types, the night owls, can take longer to recalibrate, and the aggregate health cost across a population of nearly six million people is not trivial.

## Danish time culture

Denmark has its own concept of time that foreigners sometimes find disorienting. Danes are generally punctual in professional and formal contexts, but Danish social culture has a concept called *hygge* that is fundamentally about unhurried presence. You do not watch the clock during *hygge*. The whole point is that time loosens.

This creates a cultural bifurcation: precise professional scheduling in business hours, and a deliberate suspension of clock-consciousness in domestic and social life.

There is also the matter of Danish winter light. Copenhagen sits at 55 degrees north latitude. In December, the sun rises at around 8:30 AM and sets before 4:00 PM. The clock is almost beside the point; the sun will not cooperate with any timezone arrangement, and Danes have developed an entire aesthetic culture around candlelight, warm interiors, and the acceptance that winter is dark and that this is fine.

## The Faroe Islands and Greenland

Denmark's autonomous territories do their own timezone thing entirely. The Faroe Islands follow the same DST schedule as Denmark but use UTC+0 as their standard. Greenland is split across multiple timezones. Neither follows Copenhagen's clock precisely. The Kingdom of Denmark, constitutionally, is three territories in three different timezone situations.

## Developer notes

The IANA identifier is `Europe/Copenhagen`. DST transitions follow the EU standard: clocks spring forward on the last Sunday of March and fall back on the last Sunday of October. When the EU eventually resolves its DST abolition debate, this identifier will need updating.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [European Parliament resolution on seasonal time changes, March 2019](https://www.europarl.europa.eu/doceo/document/TA-8-2019-0225_EN.html)
- [European Commission public consultation results, 2018](https://ec.europa.eu/transport/modes/road/news/2018-09-12-summer-time_en)
- [State Serum Institute Denmark](https://www.ssi.dk/en)
- Roenneberg, Till. *Internal Time: Chronotypes, Social Jetlag, and Why You're So Tired*. Harvard University Press, 2012.
