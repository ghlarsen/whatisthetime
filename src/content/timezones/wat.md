---
timezone: "WAT"
slug: "wat"
title: "WAT Time Now: West Africa Time (UTC+1)"
description: "West Africa Time (WAT) is UTC+1. Used across Nigeria, Cameroon, Chad, Niger, Central African Republic, and other countries. Lagos, Kinshasa, and Luanda all run on WAT."
iana: ["Africa/Lagos", "Africa/Bangui", "Africa/Brazzaville", "Africa/Douala", "Africa/Kinshasa", "Africa/Libreville", "Africa/Luanda", "Africa/Malabo", "Africa/Niamey", "Africa/Ndjamena"]
utcOffset: "+01:00"
countries: ["Nigeria", "Cameroon", "Chad", "Niger", "Central African Republic", "Republic of Congo", "Democratic Republic of Congo (west)", "Angola", "Equatorial Guinea", "Gabon"]
lastUpdated: "2026-03-24"
---

West Africa Time is UTC+1. It covers a wide band of equatorial and tropical Africa, including some of the continent's most populous countries and its largest city. No daylight saving time is observed by any of the countries in this zone.

WAT at UTC+1 shares its offset with Central European Time (CET) in winter, the same numerical position as Paris and Rome, though the name and IANA structure are separate.

## Nigeria and Lagos

Nigeria is the most populous country in Africa, with approximately 220 million people. Lagos, its commercial capital, is one of the fastest-growing cities on Earth, with a metropolitan population estimated between 14 and 22 million depending on the source, making it Africa's largest city and one of the ten largest in the world.

Lagos is a port city on the Gulf of Guinea, the financial center of West Africa, and a hub for Nollywood, the Nigerian film industry that produces more titles annually than Hollywood and is the second-largest film industry in the world by volume. Time in Lagos is time in WAT.

The Nigeria Stock Exchange, headquartered in Lagos, is the largest stock exchange in West Africa. Its trading hours run from 10am to 2:30pm WAT.

## The colonial division and Africa's timezone structure

African timezones reflect the colonial partition of the continent. The Berlin Conference of 1884-1885, at which European powers divided Africa among themselves, produced administrative boundaries that ran through ethnic groups, geographic regions, and natural trade routes. The timezone structure that followed from these divisions carries the same arbitrary quality.

West Africa was divided primarily among Britain, France, and Belgium, with smaller German and Portuguese possessions. These colonial powers used their own administrative preferences to set local times. French West Africa generally aligned with time zones that suited communications with Paris. British territories aligned with their own administrative needs.

After independence movements in the 1960s, most newly sovereign African states kept the timezone structures they inherited. Changing clocks requires legislative action, administrative coordination, and public adjustment. For governments managing the immediate crises of newly independent nations, timezone reform was rarely a priority.

## Countries on WAT

WAT covers a geographically diverse set of countries:

- Nigeria -- most populous country, regional economic hub
- Cameroon -- often called "Africa in miniature" for its geographic diversity
- Chad -- landlocked, stretching from the Sahara to equatorial regions
- Niger -- landlocked Sahel country, large territory, uranium producer
- Central African Republic -- landlocked, tropical
- Republic of the Congo (Brazzaville) -- across the Congo River from Kinshasa
- Democratic Republic of Congo (western part, including Kinshasa) -- most of the DRC uses WAT
- Angola -- southwestern coast, oil-producing major economy
- Equatorial Guinea -- small country straddling the equator, significant oil production
- Gabon -- equatorial, forested, oil producer

## Kinshasa

The Democratic Republic of Congo is a vast country -- the second-largest in Africa by area -- and its western half, including the capital Kinshasa, observes WAT at UTC+1. The eastern DRC observes Central Africa Time at UTC+2.

Kinshasa sits across the Congo River from Brazzaville, the capital of the Republic of Congo. These two capitals face each other across a wide river, and the Congo River at this point forms one of the most famous river borders in the world. Both cities run on WAT.

## Nollywood and cultural reach

Nigeria's film industry produces several thousand features and direct-to-video titles per year and reaches audiences across sub-Saharan Africa and in Nigerian diaspora communities on every continent. Nollywood operates in Lagos time, which is WAT. Its cultural influence is disproportionate to Nigeria's timezone position on the world stage.

In the same way that PST has become the industry timezone for Hollywood, WAT is the timezone of Nollywood. Nigerian musicians in the Afrobeats genre, who have achieved global commercial success in the 2010s and 2020s, also operate on Lagos time. When Burna Boy announces a concert or a release, the timestamp is WAT.

## For developers

- IANA identifier: `Africa/Lagos` is the primary reference for WAT; other entries (`Africa/Bangui`, `Africa/Kinshasa`, `Africa/Luanda`, etc.) are distinct identifiers for the same offset
- UTC offset: `+01:00`, fixed year-round (no DST in any WAT country)
- JavaScript: `new Intl.DateTimeFormat('en-NG', { timeZone: 'Africa/Lagos' })`
- Python: `import pytz; pytz.timezone('Africa/Lagos')`
- WAT is numerically equal to Central European Time (CET) in winter, but uses different IANA identifiers

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- African Development Bank, regional economic reports.
- Pakenham, Thomas. *The Scramble for Africa*. Weidenfeld and Nicolson, 1991.
- [All timezones](/timezones)
