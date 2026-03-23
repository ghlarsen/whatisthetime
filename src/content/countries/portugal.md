---
country: "Portugal"
slug: "portugal"
title: "Time in Portugal: The Country That's Actually in the Right Timezone (Unlike Its Neighbor)"
description: "Portugal observes Western European Time (UTC+0/UTC+1 with DST), which is geographically appropriate for its position on the Atlantic coast. Its neighbor Spain, at the same longitude, uses Central European Time. This is one of Europe's great timezone ironies."
timezones: ["Europe/Lisbon", "Atlantic/Azores"]
utcOffsets: ["+00:00", "-01:00"]
hasDST: true
capital: "Lisbon"
continent: "Europe"
lastUpdated: "2026-03-23"
---

Portugal is, objectively, in the correct timezone for its geography.

Lisbon sits at 9 degrees West longitude. The sun's natural noon at this longitude occurs around 12:36 UTC. UTC+0, Western European Time, makes Lisbon's official noon approximately 12:00. The match between solar time and clock time is nearly perfect.

This is rarer than it sounds. Spain, directly to the east, shares nearly identical longitudes with Portugal along the border but uses Central European Time (UTC+1/UTC+2), placing it a full hour behind its solar position in winter, two hours behind in summer. Spain is, as the saying goes in both countries, on the wrong clock.

## WET and WEST

Portugal mainland observes Western European Time (WET, UTC+0) in winter and Western European Summer Time (WEST, UTC+1) during daylight saving. The IANA identifier is `Europe/Lisbon`.

DST transitions follow the EU schedule: clocks advance on the last Sunday in March and return on the last Sunday in October.

The Azores, a Portuguese archipelago in the mid-Atlantic, observe Atlantic/Azores, which is UTC-1 in winter and UTC+0 (same as mainland Portugal) in summer. The Azores sit further west, at roughly 28 degrees West longitude, and their winter offset reflects this.

## The Franco effect on Portugal

Portugal's clock has a Franco connection, just not the one you might expect.

Spain's misaligned timezone came directly from Francisco Franco's decision in March 1940 to synchronize Spain's clocks with Nazi Germany. (That story, told fully in the Spain article, is one of Europe's most extraordinary timezone decisions.) Portugal under António de Oliveira Salazar, who ran Portugal as an authoritarian corporatist state from 1932 to 1968, chose not to follow Spain.

Portugal maintained its geographically correct UTC+0 alignment. This meant that the Iberian Peninsula, two countries occupying roughly the same longitudes, ended up running on different times. Portugal at UTC+0 in winter, Spain at UTC+1 in winter.

This difference persists today. Stand at the Portuguese-Spanish border and cross eastward, and you lose an hour.

## Salazar's Portugal and the clock

Salazar's Estado Novo regime ran Portugal for decades as a conservative Catholic nationalist state. It abolished labor unions, censored the press, and maintained an extensive secret police force, the PIDE. But it did not do what Franco did with the clock.

There are various theories for why Portugal didn't follow Spain. Salazar's regime, though allied with Franco, maintained a degree of independence. Portugal had been Britain's oldest ally since the Treaty of Windsor in 1386, the oldest alliance still in force between two nations. Aligning Portugal's time with Germany would have been a symbolic snub to Britain.

Salazar chose UTC+0. Portugal's clock stayed on the correct meridian.

## The Azores and deep Atlantic time

The Azores archipelago, nine volcanic islands roughly 1,500 kilometers off the coast of Portugal, are in their own timezone: UTC-1 in winter (Atlantic/Azores), which shifts to UTC+0 in summer via DST.

The Azores were a crucial waypoint in the age of transatlantic navigation. Whalers, merchant ships, and eventually airline transatlantic routes (Lajes Air Base on Terceira was a key refueling stop for aircraft crossing the Atlantic) all touched these islands. The isolation and distance from both Europe and North America gave the Azores a particular geographic identity.

At UTC-1 in winter, the Azores are one hour behind mainland Portugal and one hour ahead of the Azores' geographic peers in the mid-Atlantic. In summer, when the Azores shift to UTC+0, they become synchronized with mainland Portugal for the daylight hours.

## Fado and time

Portuguese fado is a musical form built around *saudade*, a Portuguese word often described as untranslatable: a longing, an ache for something absent, a melancholy awareness of what has been lost or left behind. Amalia Rodrigues, the great fado singer, described it as "the love we have for our loves."

Saudade has a temporal dimension. It is not simply nostalgia, though it resembles it. It is a present feeling that reaches backward and forward simultaneously. In fado performances, time slows. The room holds still. The clock is irrelevant.

Portugal is geographically well-positioned relative to UTC. But fado suggests a country with a more complicated relationship with time than any timezone can capture.

## For developers

- IANA timezone (mainland): `Europe/Lisbon` (UTC+0 winter, UTC+1 DST)
- IANA timezone (Azores): `Atlantic/Azores` (UTC-1 winter, UTC+0 DST)
- DST: last Sunday March (forward), last Sunday October (back)
- Follows EU DST schedule

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [Instituto Português da Qualidade (IPQ)](https://www.ipq.pt/)
- [Royal Observatory Greenwich: GMT/UTC history](https://www.rmg.co.uk/royal-observatory/astronomy-and-time)
- Ramos, Rui. *History of Portugal*. A Sphere of Books, 2009.
- Paxman, Jeremy. *On Royalty*. Penguin, 2007. (Context on Anglo-Portuguese alliance)
