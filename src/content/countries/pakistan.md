---
country: "Pakistan"
slug: "pakistan"
title: "Time in Pakistan: PKT, UTC+5, and a Complicated History with Daylight Saving"
description: "Pakistan runs on Pakistan Standard Time (UTC+5) and has a genuinely strange relationship with daylight saving time, having switched it on and off multiple times in response to energy crises, public protests, and political pressure."
timezones: ["Asia/Karachi"]
utcOffsets: ["+05:00"]
hasDST: false
capital: "Islamabad"
continent: "Asia"
lastUpdated: "2026-03-23"
---

Pakistan's timezone story is not a clean one. It involves energy shortages, disputed experiments, public resistance, religious objections, and a government that changed its mind more than once within the same decade. The current situation, Pakistan Standard Time, UTC+5, with no daylight saving, is the result of all that turbulence settling out. For now.

## Pakistan Standard Time

Pakistan Standard Time (PKT) places the country five hours ahead of UTC. The IANA identifier is `Asia/Karachi`, reflecting the city where Pakistan's timezone infrastructure historically centered.

Karachi sits at roughly 67 degrees East longitude. Solar noon occurs around 07:10 UTC, or 12:10 PKT, which makes Pakistan's clock a reasonable match for the sun. UTC+5 is not a politically contorted offset; it is geographically appropriate.

Pakistan shares UTC+5 with neighboring India, though India uses UTC+5:30, a half-hour offset that has its own contested history. Pakistan rounded down. The two countries' clocks are close but not synchronized, which can create confusion along their shared border.

## The DST experiments

This is where it gets interesting.

Pakistan observed daylight saving time from 2008 to 2009, and again in 2010, in response to a severe electricity shortage. The logic was straightforward: move the clocks forward one hour in summer, align waking hours better with daylight, reduce demand for artificial lighting in the evening, save power.

In June 2008, Pakistan moved clocks forward to UTC+6 for the summer months.

It did not go smoothly.

Religious groups objected that the time change disrupted prayer schedules. Fajr (pre-dawn prayer) and Isha (night prayer) are timed to sunrise and sunset respectively, and DST shifted those in ways that were felt as an imposition. Business owners complained about confusion with trading partners, particularly in the Gulf, where no DST was observed. The general public was deeply skeptical that the energy savings materialized at all.

Pakistan abolished DST in October 2008 after just one season. Then brought it back in 2009. Then abolished it again permanently in 2010.

The Energy Conservation Act 2010 formalized the abandonment. Pakistan has been UTC+5 year-round since then.

## The Karachi meridian

There is a minor bureaucratic irony embedded in the IANA identifier. `Asia/Karachi` represents Pakistan's timezone, but the national capital is Islamabad, 1,300 kilometers to the north. Karachi was Pakistan's original capital from independence in 1947 until 1958, when the capital began its staged move to Islamabad, completed in 1966.

The timezone database kept Karachi in the name because that is how timezone identifiers work: they record historical anchors, not current political centers. No one has proposed renaming it `Asia/Islamabad`, and there is no practical reason to do so.

## Waqt: the texture of Pakistani time

In Urdu, the word for time is *waqt*. Pakistani culture, like many South Asian cultures, has a flexible relationship with clock time in social contexts. Invitations for seven o'clock may imply eight. The concept of "Pakistani Standard Time" as a joke about habitual lateness in informal settings is widely recognized within Pakistan itself.

But this coexists with strict precision in religious practice. The five daily prayers are scheduled to the minute. In Karachi, a city of some 16 million people, the adhan (call to prayer) from thousands of mosques marks the passage of the day with more regularity than any public clock.

## Partition and the clock

When British India was partitioned in August 1947 into India and Pakistan, the new countries kept the same timezone India had used: UTC+5:30. Pakistan held this until 1951, when it shifted to UTC+5:30 independently (India had also kept it), and then moved to UTC+5 in 1971.

The shift to UTC+5 in 1971 is not coincidentally also the year of Bangladesh's independence from Pakistan. The Bengali-speaking eastern half of Pakistan had always been a geographic and cultural anomaly for a country whose western half formed its political center. East Pakistan became Bangladesh on March 26, 1971. By the end of that year, Pakistan's geography and its clock had both been redrawn.

## For developers

- IANA timezone: `Asia/Karachi`
- UTC offset: +05:00 year-round
- No DST currently (last observed 2010)
- Historical transitions are in the IANA database; note the 2008 and 2009 DST experiments if processing historical timestamps

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [Pakistan Electronic Media Regulatory Authority](https://www.pemra.gov.pk/)
- Pakistan Energy Conservation Act 2010, Government of Pakistan
- [Dawn newspaper archive: DST coverage 2008-2010](https://www.dawn.com/)
- [The News International: Pakistan DST abolishment](https://www.thenews.com.pk/)
