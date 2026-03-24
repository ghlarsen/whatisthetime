---
country: "Morocco"
slug: "morocco"
title: "Time in Morocco: The Country That Pauses Its Clock for Ramadan"
description: "Morocco uses UTC+1 year-round since 2018, but observes a unique exception: during Ramadan, the country reverts to UTC+0 before returning to UTC+1 after Eid. No other country in the world has a religious festival written into its DST rules."
timezones: ["Africa/Casablanca"]
utcOffsets: ["+01:00"]
hasDST: false
capital: "Rabat"
continent: "Africa"
lastUpdated: "2026-03-23"
---

Morocco uses Western European Time (UTC+1). No daylight saving time is observed year-round, except that Morocco reverts to UTC+0 during Ramadan each year before returning to UTC+1. IANA: `Africa/Casablanca`.

**Key facts about time in Morocco**
- Timezone: Western European Time (WET)
- UTC offset: +01:00 (standard), +00:00 (during Ramadan)
- DST: No (but unique Ramadan reversion to UTC+0)
- IANA identifier: `Africa/Casablanca`
- Capital: Rabat

Morocco runs on UTC+1, year-round. That's been the official standard since October 2018, when the country permanently adopted Western European Summer Time as its standard time and stopped observing the annual spring-forward/fall-back cycle.

Except during Ramadan. During the Islamic holy month, Morocco reverts to UTC+0 for the duration of the fast, then moves back to UTC+1 after Eid al-Fitr marks the end of Ramadan.

This is the only country in the world where a religious festival is formally embedded in the timezone rules. Morocco's IANA entry (`Africa/Casablanca`) is one of the more complex in the database because the transition dates change every year, following the Islamic lunar calendar.

## Why Ramadan changes the clock

The logic involves the relationship between clock time and fasting time. During Ramadan, observant Muslims fast from dawn (Fajr) to sunset (Maghrib) daily for 29 or 30 days.

When Morocco moved to permanent UTC+1 in 2018, it effectively shifted sunrise and sunset one hour later by the clock. In winter solar terms, UTC+1 means the sun sets around 7pm instead of 6pm. During Ramadan, which rotates through all seasons over the 33-year Islamic calendar cycle, this could mean waiting until 7 or 8pm clock time to break the fast.

The Ramadan reversion to UTC+0 brings iftar (the meal breaking the fast) back to an earlier clock hour, easing the fast's burden for workers and families. It is, in effect, a clock change designed around religious observance rather than daylight harvesting or energy savings.

## The administrative complexity

The consequence is that Morocco's software, phone systems, and scheduling infrastructure must handle a timezone that transitions not on predictable fixed dates but on Islamic lunar calendar dates, which vary by roughly 11 days per year on the Gregorian calendar.

Technology systems that hardcode timezone transitions fail in Morocco. Any scheduling application, calendar software, or trading platform that processes Morocco time must reference an up-to-date IANA database and correctly implement the Ramadan exception. This is a known complexity in timezone database maintenance: the Morocco transitions require annual updates as the Ramadan dates shift.

## The Sahara to the Atlantic

Morocco's geography spans from the Atlas Mountains and the northern Saharan fringe in the south to the Atlantic and Mediterranean coasts in the north and west. Casablanca, the commercial capital, sits on the Atlantic coast. Marrakech, famous for its medina and souks, sits at the base of the High Atlas. Fes, the intellectual and religious heart, is in the northern plains.

All three run on UTC+1 permanently, with the Ramadan reversion. This single timezone covers a country that geographically straddles two continents: Morocco borders Algeria and Mauritania, and its southern regions of Western Sahara (under Moroccan administration, disputed internationally) extend into deep Africa while the northern coast faces southern Spain across the Strait of Gibraltar.

## The literary Marrakech

Paul Bowles lived in Tangier for most of his adult life (he arrived in 1947 and died there in 1999), writing about Morocco's landscape of dislocation, cultural encounter, and the uncanny. His 1949 novel *The Sheltering Sky* is set in the Saharan fringe, its characters' temporal disorientation a central theme. Bowles's Morocco was a place where Western time frameworks dissolved in the heat and light.

The medinas of Fes, Marrakech, and Rabat operate on layers of time: the call to prayer from the minaret, the opening and closing of the souk, the festivals of the Islamic calendar. The Djemaa el-Fna square in Marrakech fills with storytellers, musicians, and food vendors in the evening, exactly when the day's heat has passed and clock time (UTC+1 ordinarily, UTC+0 in Ramadan) has tipped into darkness.

## Across the Strait

Morocco and Spain are separated by the Strait of Gibraltar, which is about 14 kilometers wide at its narrowest. Spain runs on Central European Time (UTC+1 in winter, UTC+2 in summer). Morocco, since 2018, runs on UTC+1 permanently.

This means that in winter, Morocco and Spain are on the same clock. In summer, Spain moves to UTC+2 while Morocco stays at UTC+1, a one-hour gap across a 14-kilometer strait. The ferries between Algeciras and Tangier cross a timezone boundary during European summer.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [Haut-Commissariat au Plan du Maroc (HCP)](https://www.hcp.ma/)
- [Ministère de l'Intérieur du Maroc: decrees on time](https://www.interieur.gov.ma/)
- Bowles, Paul. *The Sheltering Sky*. New Directions, 1949.
