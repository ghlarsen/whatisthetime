---
country: "Japan"
slug: "japan"
title: "Time in Japan: UTC+9, No DST, and the Culture of Punctuality"
description: "Japan uses a single timezone (JST, UTC+9) across the entire archipelago. No daylight saving time since 1951. The trains run on time, and so does everything else."
timezones: ["Asia/Tokyo"]
utcOffsets: ["+09:00"]
hasDST: false
capital: "Tokyo"
continent: "Asia"
lastUpdated: "2026-03-23"
---

Japan uses Japan Standard Time (UTC+9). No daylight saving time has been observed since 1951. IANA: `Asia/Tokyo`.

**Key facts about time in Japan**
- Timezone: Japan Standard Time (JST)
- UTC offset: +09:00
- DST: No
- IANA identifier: `Asia/Tokyo`
- Capital: Tokyo

Japan runs on a single clock. From Hokkaido's snow-buried north to Okinawa's subtropical south, a country stretching across 3,000 kilometers, everyone shares one timezone: Japan Standard Time, UTC+9.

No daylight saving. No regional exceptions. No debate. This isn't an accident. It's a choice that tells you something about the country.

## The railroad set the clock

Japan adopted standard time on January 1, 1888, just sixteen years after the Meiji government opened the country's first railway line between Tokyo and Yokohama. The connection isn't coincidental. Railroads need synchronized time. You can't run a timetable when every station sets its clock by local solar noon.

The initial standard was set at 135 degrees East longitude, the meridian running through Akashi in Hyogo Prefecture. That city still calls itself "the town of time" and houses the Akashi Municipal Planetarium on the exact meridian line.

## The failed DST experiment

Japan did try daylight saving time. The American occupation government imposed it from 1948 to 1951, calling it "summer time" (サマータイム). The Japanese public hated it. Workers complained that the extra evening daylight simply meant their bosses expected them to work longer. The Diet abolished it the moment the occupation ended.

The idea resurfaces periodically. In 2008, a group of Liberal Democratic Party lawmakers proposed reintroducing DST ahead of the Tokyo Olympics bid, arguing it would save energy. The proposal went nowhere. A 2007 survey by the Japan Productivity Center found only 30% of respondents supported the change.

Japan's position is clear: one timezone, no adjustments, year-round consistency.

## Punctuality as national identity

The Japanese relationship with time goes far beyond policy. It's cultural infrastructure.

Shinkansen bullet trains average a delay of 54 seconds per year. When a train on the Tsukuba Express line departed Minami-Nagareyama station 20 seconds early in November 2017, the railway company issued a formal public apology.

This precision isn't performative. It's systematic. Japanese train platforms have markers painted on the ground showing exactly where each car door will stop. Passengers queue at these markers. The system works because everyone agrees that time means what it says.

Haruki Murakami's novels are famously precise about clock time. Characters in *Norwegian Wood* and *Kafka on the Shore* note the exact hour and minute of events, embedding temporal precision into the narrative rhythm of Japanese literary fiction.

## The IANA identifier

Japan's timezone is `Asia/Tokyo` in the IANA database. Despite the country's size, there is only one entry. No `Asia/Osaka`, no `Asia/Sapporo`. Those names existed in older timezone databases but were consolidated because Japan has never had internal timezone differences.

For developers:
- JavaScript: `new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo' })`
- Python: `pytz.timezone('Asia/Tokyo')`
- The abbreviation JST (Japan Standard Time) is universally understood but not an IANA identifier itself.

## In film and culture

Sofia Coppola's *Lost in Translation* (2003) is essentially a film about timezone displacement. Bill Murray's character exists in a permanent jet-lag haze in Tokyo, and the film captures that specific disorientation of being 13 or 14 hours offset from everyone you know. Close enough to overlap briefly, far enough that you're always out of phase.

The precision of Japanese time culture also appears in anime, where train departure times, school bell schedules, and clock towers function as narrative devices. Makoto Shinkai's *5 Centimeters Per Second* (2007) uses a train schedule, and the agonizing minutes of a delay, as the emotional core of its first act.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [National Institute of Information and Communications Technology (NICT)](https://jjy.nict.go.jp/index-e.html)
- [Akashi Municipal Planetarium](https://www.am12.jp/english/)
- [JR Central Annual Report](https://global.jr-central.co.jp/en/company/ir/annualreport/)
- Clark, Gregory. "The Japanese Way of Time." *Japan Quarterly*, vol. 41, no. 2, 1994.
