---
timezone: "WIB"
slug: "wib"
title: "WIB Time Now: Western Indonesia Time (UTC+7)"
description: "Western Indonesia Time (WIB) is UTC+7. Used across Java, Sumatra, and West Kalimantan. Jakarta, Medan, and Surabaya all run on WIB. Indonesia observes three timezones total."
iana: ["Asia/Jakarta", "Asia/Pontianak"]
utcOffset: "+07:00"
countries: ["Indonesia"]
lastUpdated: "2026-03-24"
---

Western Indonesia Time is UTC+7. It covers Java, the most populous island in the world, along with Sumatra, West Kalimantan, and several smaller western islands. Jakarta, the country's capital and largest city, runs on WIB.

Indonesia is an archipelago of over 17,000 islands stretching across more than 5,000 kilometers from west to east. A country that vast requires multiple timezones. Indonesia uses three: WIB (UTC+7) in the west, WITA (UTC+8) in the center including Bali, and WIT (UTC+9) in the east including Papua.

## Java and its population density

Java is home to approximately 145 million people, roughly 56 percent of Indonesia's total population, on an island of about 138,000 square kilometers. That makes Java one of the most densely populated places on Earth, with roughly 1,000 people per square kilometer on average, and far more in urban centers.

This density, and the economic and political concentration that comes with it, means that WIB is in practice the dominant Indonesian timezone. The national government in Jakarta, the central bank, the Indonesia Stock Exchange (IDX), and most of the country's major corporations operate on WIB.

## Jakarta

Jakarta is Indonesia's capital and largest city, with a metropolitan population estimated at 34 million, making it one of the largest urban agglomerations in the world. The city sits on the northwestern coast of Java, at sea level or below in many areas -- subsidence from groundwater extraction has caused significant portions of the city to sink, and flooding is a recurring challenge.

The Indonesian government has been constructing a new capital, Nusantara, in East Kalimantan (Borneo), with a planned partial relocation of government functions beginning in the mid-2020s. Nusantara sits in the WITA timezone zone (UTC+8), one hour ahead of Jakarta's WIB. This creates an unusual situation: eventually, the administrative capital and the commercial capital may be in different timezones.

## Sumatra and the western islands

Sumatra is one of the world's largest islands and the most westerly of Indonesia's main islands. Its major cities:

- Medan -- largest city in Sumatra, major trading hub in the north
- Palembang -- historical Srivijaya empire capital, now industrial city
- Pekanbaru -- center of Riau Province, oil industry hub
- Batam -- free trade zone island near Singapore, significant manufacturing

The geographic position of Sumatra makes WIB's UTC+7 offset somewhat fast relative to solar time in the far west of the island, where solar noon can fall noticeably before the clock says 12:00. The country accepts this inconsistency in exchange for administrative simplicity within the western zone.

## Indonesia's timezone history

During Dutch colonial rule, the Netherlands East Indies used various local times. After independence in 1945, Indonesia consolidated into fewer time zones than the geographic spread of the archipelago might suggest. The three-timezone structure was formally set by government regulation.

The structure has been debated periodically. One proposal, raised in the 1980s and again in the 2010s, would have consolidated the entire country into a single timezone, UTC+8, to align with major trading partners Singapore and China. The proposal never advanced. Western Java and Sumatra residents pointed out that UTC+8 would mean sunrise after 7am for much of the year, which cuts against the Indonesian morning-heavy cultural and economic schedule.

## The three Indonesian timezones

For reference:
- WIB (UTC+7): Java, Sumatra, West Kalimantan -- this article
- WITA (UTC+8): Bali, Lombok, South and Central Kalimantan, Sulawesi -- `Asia/Makassar`
- WIT (UTC+9): Maluku, Papua -- `Asia/Jayapura`

Bali, Indonesia's internationally famous tourist destination, is in WITA, not WIB. A traveler flying from Jakarta to Bali crosses a one-hour timezone boundary that is easy to miss if you do not know about Indonesia's three-zone system.

## For developers

- IANA identifiers: `Asia/Jakarta` (Java and Sumatra), `Asia/Pontianak` (West Kalimantan, which historically had a different offset)
- UTC offset: `+07:00`, fixed year-round (no DST)
- JavaScript: `new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta' })`
- Python: `import pytz; pytz.timezone('Asia/Jakarta')`
- Do not assume all of Indonesia uses WIB. Always verify which island/province when working with Indonesian addresses. Bali is `Asia/Makassar` (UTC+8), not `Asia/Jakarta`.

WIB at UTC+7 is the same offset as Thailand, Vietnam, Cambodia, and Laos (all `Asia/Bangkok` in the IANA database), and [Indochina Time](/timezones/ict).

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- Badan Pusat Statistik (Statistics Indonesia).
- [All timezones](/timezones)
