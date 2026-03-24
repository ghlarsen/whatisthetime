---
timezone: "PKT"
slug: "pkt"
title: "PKT Time Now: Pakistan Standard Time (UTC+5)"
description: "Pakistan Standard Time (PKT) is UTC+5. Used across all of Pakistan, year-round. No daylight saving time since 2009. Home to Karachi, one of the world's largest cities."
iana: ["Asia/Karachi"]
utcOffset: "+05:00"
countries: ["Pakistan"]
lastUpdated: "2026-03-24"
---

Pakistan Standard Time is UTC+5. The whole country runs on one clock: from the Arabian Sea coast at Karachi to the Himalayan peaks of Gilgit-Baltistan, from the Thar Desert in the east to the Afghan border in the west. No daylight saving time, no regional exceptions.

Pakistan is the world's fifth most populous country, with over 230 million people. Its timezone is shared with a handful of neighboring states: Uzbekistan, Tajikistan, and the Maldives all sit at UTC+5.

## Colonial time and partition

British India, as administered from London, used a patchwork of local times before railway standardization. The subcontinent eventually aligned on Indian Standard Time at UTC+5:30. When British India was partitioned in 1947 into India and Pakistan, the two successor states went their separate ways on the clock as well.

Pakistan set its national time at UTC+5, half an hour behind India's UTC+5:30. The difference had practical origins: Pakistan's geographic center, particularly its most populous western regions, aligns more closely with UTC+5. Karachi sits near the 67th meridian East, which corresponds to approximately UTC+4:28. UTC+5 is a closer fit than UTC+5:30.

The 30-minute gap with India carries symbolic weight. The two countries have fought three major wars and maintain one of the world's most militarized borders. That their clocks differ by 30 minutes is a daily reminder of the partition's administrative separation, and a source of constant friction for the significant populations on both sides with family ties crossing the border.

## Daylight saving: tried and abandoned

Pakistan did experiment with daylight saving time. The government introduced it in 2002 and observed it intermittently through the 2000s. It was implemented in some years and skipped in others, creating confusion. In 2009, Pakistan formally ended the practice and has not returned to it.

The reasoning was similar to what other South Asian countries cite: the benefits in terms of energy savings were marginal, the disruption to agricultural and religious schedules was real, and the coordination with neighboring countries that do not observe DST was simpler without it.

## Karachi

Karachi is the largest city in Pakistan and one of the largest cities in the world, with estimates of the metropolitan population ranging from 15 to 22 million depending on how the boundaries are drawn. It is Pakistan's financial capital, home to the Karachi Stock Exchange (now merged into the Pakistan Stock Exchange), its largest port, and its primary industrial base.

Karachi sits on the Arabian Sea, which means that PKT functions as the timezone of a major maritime hub with significant container shipping traffic, connecting Pakistan's textile and manufacturing exports to global supply chains.

- Karachi -- largest city, financial and industrial hub, southern coast
- Lahore -- second city, cultural capital, near the Indian border
- Islamabad -- planned capital, in the north near the Himalayan foothills
- Rawalpindi -- twin city of Islamabad, large military presence
- Faisalabad -- major industrial city in the Punjab
- Peshawar -- northwest gateway, historic city near the Afghan border

## Cricket and timezone coordination

Pakistan is one of cricket's major nations, and the sport's international schedule creates specific timezone logistics. Pakistan Super League matches, international Test matches at grounds in Karachi and Lahore, and away tours to England, Australia, and the West Indies all require coordination across widely varying offsets.

The gap between PKT and BST (British Summer Time) is 4 hours in summer, which means afternoon matches in England are evening viewing in Pakistan, and the television audience for England-Pakistan Tests is substantial and engaged at civilized hours on both ends.

## For developers

- IANA identifier: `Asia/Karachi`
- UTC offset: `+05:00`, fixed year-round (no DST)
- JavaScript: `new Intl.DateTimeFormat('ur-PK', { timeZone: 'Asia/Karachi' })`
- Python: `import pytz; pytz.timezone('Asia/Karachi')`
- PKT is exactly one hour ahead of Gulf Standard Time (GST, UTC+4) and half an hour behind India Standard Time (IST, UTC+5:30). [Nepal Time at UTC+5:45](/timezones/npt) is 45 minutes ahead.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- Pakistan Standards and Quality Control Authority (PSQCA).
- [All timezones](/timezones)
