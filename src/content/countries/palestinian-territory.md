---
country: "Palestinian Territory"
slug: "palestinian-territory"
title: "Time in Palestine: When the Clock Becomes a Political Act"
description: "The Palestinian territories observe Eastern European Time (UTC+2) with DST, but the act of setting a separate clock from Israel has been, at various points, a deliberate assertion of sovereignty over something that cannot be bombed or annexed."
timezones: ["Asia/Hebron"]
utcOffsets: ["+02:00"]
hasDST: true
capital: "Ramallah"
continent: "Asia"
lastUpdated: "2026-03-23"
---

In most places, timezone policy is bureaucratic. In Palestine, it has been an act of political will.

The Palestinian territories, the West Bank and Gaza, officially observe UTC+2 in winter and UTC+3 during daylight saving time. The IANA identifier is `Asia/Hebron`, with a secondary entry `Asia/Gaza` for the Gaza Strip. On paper these are close to Israel's timezone. In practice, the two have sometimes diverged on purpose.

## The deliberate divergence

Israel observes daylight saving time according to its own schedule, set by law and adjusted periodically. The Palestinian Authority has, at various points, chosen different DST transition dates from Israel, creating periods where Palestinians and Israelis operating in the same geographic space were running on different clocks.

This is not an accident of bureaucratic miscommunication. It is a signal.

Time sovereignty is one of the subtle markers of statehood. When a government declares its own timezone, issues its own DST schedule, maintains its own official clock, it is performing self-governance in a domain that does not require military force or international recognition to enact.

The Palestinian Authority has used this deliberately. In years when Israel and Palestine observed DST transitions on different days, the practical inconvenience for people crossing between areas was real: business meetings, phone calls, coordination across checkpoints. But the political message was also real: we have our own time here.

## The Hebron identifier

The IANA database uses `Asia/Hebron` as the representative timezone for the West Bank. Hebron (Al-Khalil in Arabic) is one of the oldest continuously inhabited cities in the world, and one of the most politically charged places in the West Bank. It is divided between Palestinian Authority control and areas under Israeli civil and military control.

The choice of Hebron as the IANA identifier, rather than Ramallah (the administrative capital of the Palestinian Authority) or East Jerusalem (which Palestine claims as its capital), is itself a piece of timezone politics frozen into software.

## Gaza Strip

The Gaza Strip has a separate IANA entry, `Asia/Gaza`, which historically tracked the same offset as `Asia/Hebron` but is listed separately because Gaza's governance has been distinct from the West Bank since Hamas took control in 2007.

Both entries are maintained in the IANA database, though they have not diverged in practice for extended periods.

## Wristwatches and statehood

There is something profound about the insistence on a separate clock. Palestine has been recognized as a state by the majority of UN member states, but does not control its own borders, airspace, or currency in the way recognized states typically do.

But it can set a time. It can issue an official DST order. It can make the Palestinian Authority's clock differ from Israel's by one hour on a Tuesday in spring.

Scholars of political geography have written about "everyday nationalism," the small acts through which political identity is expressed and maintained outside formal government structures. Timezone policy is not exactly everyday, but it occupies a similar conceptual space: maintaining the symbols and functions of statehood when statehood itself is contested.

## For developers

- IANA timezone: `Asia/Hebron` (West Bank), `Asia/Gaza` (Gaza Strip)
- UTC offset: +02:00 (winter), +03:00 (DST)
- DST transition dates have historically differed from Israel's; verify before processing historical timestamps
- Both identifiers are maintained in the IANA database

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [Palestinian Authority Ministry of Telecommunications](https://www.moi.ps/)
- Billig, Michael. *Banal Nationalism*. Sage Publications, 1995.
- [UN: Status of Palestine](https://www.un.org/en/about-us/member-states)
- [B'Tselem: Hebron background](https://www.btselem.org/hebron)
