---
timezone: "BST-BD"
slug: "bst-bd"
title: "BST Time Now: Bangladesh Standard Time (UTC+6)"
description: "Bangladesh Standard Time (BST) is UTC+6. Used across all of Bangladesh. No daylight saving time. Home to Dhaka, one of the world's most densely populated cities."
iana: ["Asia/Dhaka"]
utcOffset: "+06:00"
countries: ["Bangladesh"]
lastUpdated: "2026-03-24"
---

Bangladesh Standard Time is UTC+6. The country runs on a single clock, has not observed daylight saving time since 2009, and sits at an offset shared with Bhutan, Kazakhstan (most of), Kyrgyzstan, and the Cocos Islands.

**Key facts about BST**
- Full name: Bangladesh Standard Time
- UTC offset: UTC+6
- DST: no
- IANA identifiers: Asia/Dhaka
- Countries: Bangladesh

Bangladesh is roughly the size of the state of Iowa and has a population of approximately 170 million, making it one of the most densely populated countries in the world. Dhaka, its capital, is among the ten largest cities on Earth.

## A new nation, an inherited clock

Bangladesh did not exist as an independent country until 1971. Before that, the territory was East Bengal (under British India), then East Pakistan after the 1947 partition of British India. During the partition, East Pakistan and West Pakistan shared a timezone at UTC+6 (East Pakistan) and UTC+5 (West Pakistan).

When Bangladesh declared independence from Pakistan in March 1971, following the Bangladesh Liberation War, it retained the UTC+6 offset that East Pakistan had observed. The war, which lasted nine months and involved significant atrocities, ended in December 1971 with Pakistani surrender. Bangladesh emerged as a sovereign state.

The UTC+6 offset has remained the standard since independence. It aligns approximately with Bangladesh's geographic position: the country's center sits near 90 degrees East longitude, which corresponds to solar time of approximately UTC+6:00. The fit is reasonable.

## Dhaka

Dhaka is the capital and largest city of Bangladesh, with a metropolitan population estimated between 22 and 23 million, making it one of the largest cities in the world. The city sits in the lowland delta region of the Ganges-Brahmaputra river system, a flat, river-laced landscape that is also among the most fertile agricultural regions in South Asia.

Dhaka is the center of Bangladesh's garment manufacturing industry, which accounts for a significant share of global readymade garment exports. Bangladesh is consistently ranked second or third in the world for clothing exports, behind China. Major Western fashion brands manufacture in Bangladesh. The supply chains that link factories in Dhaka to retail stores in Europe and North America operate across a significant timezone gap -- Bangladesh is 5 or 6 hours ahead of Central European Time depending on season, and 11 or 12 hours ahead of the US east coast.

## Daylight saving: brief and abandoned

Bangladesh introduced daylight saving time in 2009, advancing clocks to UTC+7 for the summer months. The official rationale was energy saving and maximizing daylight use. The practical result was significant disruption.

Bangladesh's working culture, agricultural calendar, and religious schedule (particularly the timing of prayers, which are calculated from solar positions) did not adapt smoothly to the change. The DST was abandoned after one year, in 2010, and Bangladesh has remained fixed at UTC+6 since.

## Geography and neighbors

Bangladesh is surrounded almost entirely by India, with a short southeastern border with Myanmar. On the clock:

- India Standard Time is UTC+5:30, 30 minutes behind Bangladesh
- Myanmar Time is UTC+6:30, 30 minutes ahead of Bangladesh
- [Nepal Time (NPT)](/timezones/npt) is UTC+5:45, 15 minutes behind Bangladesh

This places Bangladesh in a cluster of half-hour and quarter-hour offset neighbors, a consequence of South and Southeast Asia's tendency toward non-round offsets to match solar time more precisely.

## The Bay of Bengal

Bangladesh's southern coast opens onto the Bay of Bengal, and the country is acutely vulnerable to cyclones originating in the bay. The 1970 Bhola cyclone, which struck East Pakistan (now Bangladesh), was one of the deadliest natural disasters of the twentieth century. The cyclone warning and response system in Bangladesh has improved significantly since then, but the country's low-lying geography remains a major vulnerability.

The coast is also home to Cox's Bazar, which contains one of the world's longest natural sea beaches (about 120 kilometers) and which became the site of one of the world's largest refugee camps following the 2017 Rohingya crisis.

## For developers

- IANA identifier: `Asia/Dhaka`
- UTC offset: `+06:00`, fixed year-round (no DST since 2010)
- JavaScript: `new Intl.DateTimeFormat('bn-BD', { timeZone: 'Asia/Dhaka' })`
- Python: `import pytz; pytz.timezone('Asia/Dhaka')`
- Note: the abbreviation BST is ambiguous. British Summer Time also uses BST. When writing code or documentation, prefer "BST (Bangladesh)" or use the offset explicitly.

[PKT (Pakistan)](/timezones/pkt) sits at UTC+5, one hour behind. [MMT (Myanmar)](/timezones/mmt) sits at UTC+6:30, 30 minutes ahead.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- Bangladesh Bureau of Statistics.
- [All timezones](/timezones)
