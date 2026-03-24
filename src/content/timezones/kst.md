---
timezone: "KST"
slug: "kst"
title: "KST Time Now: Korea Standard Time (UTC+9)"
description: "Korea Standard Time (KST) is UTC+9. South Korea has not observed daylight saving time since 1988. Seoul, Busan, and the entire peninsula share one clock."
iana: ["Asia/Seoul"]
utcOffset: "+09:00"
countries: ["South Korea"]
lastUpdated: "2026-03-24"
---

Korea Standard Time is UTC+9. South Korea uses a single timezone across the peninsula, has not adjusted its clocks for daylight saving since 1988, and maintains one of the more politically charged timezone histories in East Asia.

KST and [JST](/timezones/jst) share the same UTC offset. They are nine hours ahead of Greenwich, and in ordinary technical practice they behave identically. But the story of how Korea arrived at UTC+9 runs through Japanese occupation, American administration, military division, and a government decision in 1961 that still provokes occasional debate.

## The Japanese meridian and its shadow

Korea's modern timekeeping begins under Japanese colonial rule, which imposed Japan Standard Time across the peninsula in 1912. Before that, Korea used its own local solar time, centered on the Korean meridian at 127.5 degrees East, which places natural Korean solar time at UTC+8:30.

When Japan annexed Korea and set the clocks to UTC+9, it was alignment by force, a practical and symbolic act of incorporation. The offset matched the metropole.

After Japan's defeat in 1945, Korea was divided at the 38th parallel, with the Soviet Union administering the north and the United States the south. The American military government in the south reset clocks to UTC+9 for administrative continuity, then shifted to UTC+8:30 after the Republic of Korea government was established in 1948, attempting to restore the pre-colonial meridian.

The Korean War interrupted everything. During the war and the years following, timekeeping was chaotic. In 1961, the government under Park Chung-hee standardized at UTC+9, arguing that UTC+8:30 was awkward for international coordination and that the half-hour offset was unusual. UTC+9 matched Japan, which remained a primary trading partner regardless of the political complications.

That decision has never fully stopped being controversial. UTC+8:30 advocates argue it better reflects Korean solar time and would provide symbolic distance from the Japanese colonial imposition. UTC+9 defenders point to practical alignment with international systems and trading relationships. The debate surfaces periodically but has never produced a change.

North Korea, for its part, shifted to UTC+8:30 in 2015, introducing what it called "Pyongyang Time" as an act of de-Japanification. The two halves of the peninsula ran on different clocks. Then in 2018, hours before the inter-Korean summit at Panmunjom, North Korea quietly shifted back to UTC+9, synchronizing with the south for the occasion. It was a gesture laden with meaning, coordinated time as diplomatic signal.

## Daylight saving: on and off

South Korea observed daylight saving time inconsistently across the twentieth century. It was imposed and removed multiple times between the 1940s and the 1980s. The Seoul Olympics in 1988 prompted a final implementation, and after the games ended, South Korea discontinued DST entirely.

Since 1988, KST has been UTC+9 year-round, fixed, no seasonal adjustments. The decision has not been seriously revisited.

## Seoul and beyond

Every city in South Korea runs on KST.

- [Seoul](/cities/seoul) -- capital and largest city, home to roughly half the country's population in the greater metropolitan area
- Busan -- South Korea's second city, major port on the southeastern coast
- Incheon -- international gateway, location of the country's primary international airport
- Daegu -- southeastern industrial and commercial hub
- Gwangju -- southwest regional center

## The K-wave timezone

KST has taken on cultural visibility in the last decade that it never previously had, as Korean entertainment reached global audiences. K-pop groups announce comeback dates in KST. Korean drama streaming releases drop at midnight KST. Fans in Los Angeles, London, and São Paulo maintain a working awareness of what time it is in Seoul.

This is a new kind of timezone relevance: not driven by financial markets or international business, but by entertainment fandom. When BTS releases a new album, the KST timestamp on the announcement matters to people in dozens of countries who have learned to do the conversion automatically.

Korean esports has added another layer. Major tournaments in League of Legends and StarCraft II run on KST schedules, and international viewers plan their viewing around Seoul time.

## For developers

- IANA identifier: `Asia/Seoul`
- UTC offset: `+09:00`, fixed year-round
- JavaScript: `new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul' })`
- Python: `import pytz; pytz.timezone('Asia/Seoul')`
- The abbreviation KST is widely understood but not a valid IANA timezone identifier.

KST is 9 hours ahead of UTC. It runs identical to [JST](/timezones/jst) and to [WIT (Eastern Indonesia Time)](/timezones/wib) in numerical terms, though each has its own IANA entry and distinct history.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- Korea Astronomy and Space Science Institute (KASI)
- Shin, Michael D. "Colonial Legacies in Korea's Timezone Politics." *Journal of Korean Studies*, 2012.
- [All timezones](/timezones)
