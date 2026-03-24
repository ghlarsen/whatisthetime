---
timezone: "GMT"
slug: "gmt"
title: "GMT Time Now: Greenwich Mean Time (UTC+0)"
description: "Greenwich Mean Time (GMT) is UTC+0, the baseline from which all other timezones are measured. Used year-round by the United Kingdom in winter, Iceland permanently, and much of West Africa. The UK shifts to BST (UTC+1) in summer."
iana: ["Europe/London", "Atlantic/Reykjavik", "Africa/Abidjan", "Africa/Accra"]
utcOffset: "+00:00"
dstVariant: "BST"
dstOffset: "+01:00"
countries: ["United Kingdom", "Iceland", "Ireland", "Ghana", "Ivory Coast", "Senegal", "Gambia", "Guinea-Bissau", "Guinea", "Sierra Leone", "Liberia", "Togo", "Burkina Faso", "Mali"]
lastUpdated: "2026-03-24"
---

Greenwich Mean Time (GMT) is UTC+0, the baseline from which all other timezones are measured. It is used year-round in Iceland, West Africa (including Ghana and Ivory Coast), and by the United Kingdom in winter, which shifts to BST (UTC+1) in summer. IANA identifiers: `Europe/London`, `Atlantic/Reykjavik`, `Africa/Accra`, `Africa/Abidjan`.

**Key facts about GMT**
- Full name: Greenwich Mean Time
- UTC offset: UTC+0
- DST: UK and Ireland observe BST/IST (UTC+1) in summer; Iceland and West Africa observe no DST
- IANA identifiers: Europe/London, Atlantic/Reykjavik, Africa/Accra, Africa/Abidjan
- Countries: United Kingdom, Iceland, Ireland, Ghana, Ivory Coast, Senegal, Gambia, Guinea-Bissau, Guinea, Sierra Leone, Liberia, Togo, Burkina Faso, Mali

Greenwich Mean Time is the zero point. Every other timezone on earth is defined by its relationship to GMT: how many hours ahead or behind. It is the baseline of global timekeeping, set at the Greenwich Observatory in London, and it has been the reference for international coordination since the Washington Meridian Conference of 1884.

## How Greenwich became the center of time

In 1884, delegates from 25 nations gathered in Washington, D.C. to settle the question of a universal prime meridian. There were competing proposals. France argued for a meridian through Paris. The United States had its own preferences. But the practical reality was decisive: the Greenwich Meridian was already marked on more navigation charts than any other, because the British Royal Navy had used it as its reference for almost two centuries.

The conference voted 22 to 1 (with France and Brazil abstaining) to adopt the Greenwich Meridian as the international baseline. France held out for another 27 years, finally adopting GMT for legal purposes in 1911, though French cartography continued to reference Paris for years after.

The Greenwich Observatory itself sits on a hill in southeast London, above the Thames. The prime meridian is marked by a laser beam shooting north from the observatory at night and a brass line in the ground by day. Tourists line up to stand with one foot on each side of the line -- in two timezone hemispheres simultaneously.

## The UK's unusual summer shift

The United Kingdom observes GMT in winter and British Summer Time (BST, UTC+1) in summer. This makes the UK one of the few countries where the standard timezone name is different from the daylight saving name (in most countries, the standard abbreviation just adds a "D" for Daylight or "S" for Summer).

The shift to BST happens on the last Sunday in March, when clocks spring forward. It reverts on the last Sunday in October. During BST season, the UK is on the same offset as Central European Time (CET) -- which means London and Paris are temporarily on the same clock, despite being in different "standard" timezones.

There have been periodic proposals to move the UK permanently to UTC+1 (year-round BST) or even UTC+2. A 2010 private member's bill in Parliament proposed a single-hour advancement. The argument was that more evening daylight would reduce road accidents (particularly among children walking home from school in dark autumn afternoons), boost outdoor recreation, and potentially reduce energy consumption. The proposal failed to advance, partly due to opposition from Scotland, where permanent UTC+1 would mean sunrise after 9:00 AM in midwinter.

## Iceland: GMT without DST

Iceland uses UTC+0 year-round and observes no daylight saving time. The country's position at 64 to 66 degrees North latitude -- straddling the Arctic Circle -- makes DST particularly absurd. In midsummer, the sun barely sets at all in Reykjavik. In midwinter, days are fewer than 5 hours long.

Iceland's fixed GMT creates an interesting situation: in summer, when London shifts to BST (UTC+1), Iceland falls one hour behind the UK despite being relatively close geographically. London and Reykjavik are on the same clock only in winter.

Icelandic time is one of those rare cases where a country's timezone is identical to UTC: no offset, no adjustment, no complication. Every clock in Iceland shows the exact same time as UTC.

## West Africa: the GMT bloc

A significant portion of West Africa uses GMT year-round: Ghana, Ivory Coast, Senegal, Gambia, and several smaller nations. These countries sit between the 0-degree and 15-degree West longitudes, making GMT a geographically reasonable choice.

Accra, Ghana, at nearly exactly 0 degrees longitude, is probably the most naturally GMT-aligned major city in the world. Accra's solar noon falls within minutes of 12:00 PM GMT. The city is the rare place where the clock and the sun agree perfectly.

The GMT-aligned West African countries share their timezone with London in winter and diverge by an hour when the UK shifts to BST in summer. For trade, diplomatic, and financial coordination between West Africa and the UK, the annual split causes regular scheduling friction.

## London: the financial center that set the clock

The City of London -- the ancient square mile in the center of the capital that houses the Bank of England, the London Stock Exchange, and the Lloyd's of London insurance market -- operates on GMT in winter and BST in summer.

London is Europe's largest financial center and one of the largest in the world. The London Stock Exchange opens at 8:00 AM local time (GMT or BST depending on season). This timing was chosen to provide maximum overlap with continental European markets to the east and to allow some overlap with the Americas before the New York close. London effectively bridges the Asian close and the New York open.

The foreign exchange market, which trades $7.5 trillion per day, is heavily centered in London. About 40% of global forex trading happens in the city. The benchmark LIBOR rate (now superseded by SONIA) was set in London. GMT and BST set the cadence for global currency markets.

## The Greenwich pubs and the historic meridian

The area around Greenwich is today a UNESCO World Heritage Site. The Royal Observatory, the National Maritime Museum, the Cutty Sark clipper ship, and the Queens House all sit within the Maritime Greenwich complex. The Royal Observatory remains the reference point for GMT, though actual time coordination has moved to atomic clocks maintained by national metrology laboratories.

The brass line on the ground at the observatory marks the Airy Transit Circle, through which the prime meridian officially passes. The line has a slight paradox: GPS systems, which use a slightly different reference datum (WGS84), place the prime meridian about 102 meters east of the Airy Transit Circle. The historic meridian and the modern operational meridian are slightly different lines.

## Ireland and the GMT community

The Republic of Ireland uses GMT in winter and Irish Standard Time (IST, UTC+1) in summer -- the same pattern as the UK. The Northern Ireland counties (part of the UK) use GMT/BST on the same schedule.

This means the island of Ireland runs on a single timezone despite being politically divided between two countries. Scheduling a meeting between Dublin and Belfast involves no timezone adjustment, only a potential political one.

## Cities on GMT

In winter (standard time):
- London (UK, shifts to BST in summer)
- Dublin (Ireland, shifts to IST in summer)
- Reykjavik (Iceland, fixed GMT year-round)
- Accra (Ghana)
- Dakar (Senegal)
- Abidjan (Ivory Coast)
- Conakry (Guinea)
- Freetown (Sierra Leone)

## For developers

`UTC` and `GMT` are treated as equivalent in most programming contexts. The IANA identifier for London is `Europe/London`, which observes BST in summer. For a truly fixed UTC+0, use `UTC` or `Africa/Accra` (which observes no DST).

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [Royal Observatory Greenwich](https://www.rmg.co.uk/royal-observatory)
- [International Meridian Conference, 1884](https://www.gutenberg.org/ebooks/17759)
- Howse, Derek. *Greenwich Time and the Longitude*. Philip Wilson Publishers, 1997.
