---
timezone: "CST-MX"
slug: "cst-mx"
title: "CST Time Now: Central Standard Time Mexico (UTC-6)"
description: "Central Standard Time in Mexico (CST) is UTC-6. Used across most of Mexico including Mexico City, Guadalajara, and Monterrey. Transitions to CDT (UTC-5) in summer."
iana: ["America/Mexico_City", "America/Monterrey", "America/Merida"]
utcOffset: "-06:00"
dstVariant: "CDT"
dstOffset: "-05:00"
countries: ["Mexico"]
lastUpdated: "2026-03-24"
---

Central Standard Time in Mexico is UTC-6. It covers the most populous part of the country: Mexico City, Guadalajara, Monterrey, and the central and southeastern states. In summer, most of this zone observes Central Daylight Time (CDT) at UTC-5.

Mexico operates across three timezone zones. Central Time covers roughly two-thirds of the country by population. The northwest observes Mountain Time. Baja California observes Pacific Time, aligning with California to its north.

## Mexico City

Mexico City is one of the largest cities in the world. The metropolitan area holds between 21 and 22 million people, making it the largest city in North America and the largest Spanish-speaking city on Earth. The city sits at 2,240 meters elevation in a highland basin, surrounded by volcanic mountains.

As the political, financial, and cultural capital of Mexico, Mexico City sets the practical rhythm of CST in Mexico. The Bolsa Mexicana de Valores (Mexican Stock Exchange, BMV) operates in CST. Federal government operations run in CST. The major television networks, the national football league, the national baseball league -- all operate on Mexico City time.

## Mexico's DST history and the 2023 change

Mexico introduced daylight saving time in 1996, partly to align better with the United States during business hours. For most of its territory, Mexico followed a schedule similar to the US and Canadian DST calendar.

In 2022, the Mexican Senate voted to eliminate daylight saving time for most of the country. The change took effect in 2023. Since then, most of Mexico no longer adjusts its clocks seasonally.

The exception is the border states, specifically municipalities within the "Franja Fronteriza Norte" (Northern Border Strip) -- the narrow band of territory along the US-Mexico border. These communities retained DST to stay synchronized with their US neighbor cities. A factory in Juarez supplying goods across the bridge to El Paso, a maquiladora worker whose employer is in Texas, a border crossing where synchronized business hours matter -- these realities kept DST alive in the border strip.

The result: since 2023, most of Mexico runs fixed at UTC-6 year-round, but the border strip observes UTC-5 in summer, following the US schedule.

The IANA database handles this through separate identifiers for border municipalities.

## The maquiladora economy

The US-Mexico border has one of the highest densities of manufacturing activity of any land border in the world. Maquiladoras -- manufacturing plants that import materials duty-free, process them, and export the finished goods, primarily to the United States -- cluster in Juarez, Tijuana, Mexicali, Matamoros, and other border cities.

This economy runs on two clocks: Mexican CST and US Mountain or Pacific time, depending on location. The post-2023 DST change affected these operations, and the border-strip exception was explicitly designed to minimize disruption to cross-border supply chains.

Monterrey in the state of Nuevo Leon is Mexico's industrial capital, less focused on border trade and more on domestic manufacturing and services. It observes CST with no DST under the new rules.

## Guadalajara and the tech sector

Guadalajara, the capital of Jalisco and Mexico's second city, has developed into a significant technology hub sometimes called "Silicon Valley of Mexico" or "Mexico's Silicon Valley." Major technology companies including Intel, IBM, Oracle, and HP have operations there, and a domestic startup ecosystem has grown around them.

The Guadalajara tech sector operates in CST and has to coordinate frequently with US partners on both coasts. Post-2023, with Mexico no longer observing DST for most of its territory, the time gap between Guadalajara and its US partners shifts seasonally as US clocks move but Mexican clocks do not. In winter, Guadalajara is 2 hours behind New York (CST UTC-6, EST UTC-5). In summer, when New York is on EDT (UTC-4) and Guadalajara stays on CST (UTC-6), the gap widens to 2 hours.

Wait -- let me correct that: CST is UTC-6, EST is UTC-5, so Guadalajara is 1 hour behind New York in winter. In summer, EDT is UTC-4 and Guadalajara stays at UTC-6, so the gap becomes 2 hours.

## Cities on CST-MX

- Mexico City -- capital, 21 million metro, economic and political hub
- Guadalajara -- second city, technology and manufacturing
- Monterrey -- industrial capital, northern economic hub
- Puebla -- historic city, automotive manufacturing
- Merida -- Yucatan Peninsula capital, tourism and henequen heritage
- Oaxaca -- cultural tourism destination, gastronomy capital

## For developers

- IANA identifiers: `America/Mexico_City`, `America/Monterrey`, `America/Merida`
- Standard offset: `-06:00` (CST)
- Post-2023 note: most of Mexico no longer observes DST. `America/Mexico_City` reflects this -- it is fixed at UTC-6 year-round as of 2023
- Border strip municipalities use separate IANA identifiers and do still observe DST
- JavaScript: `new Intl.DateTimeFormat('es-MX', { timeZone: 'America/Mexico_City' })`
- Python: `import pytz; pytz.timezone('America/Mexico_City')`
- "CST" is ambiguous -- it refers to this Mexican timezone, to US/Canadian Central Time, and to China Standard Time. Always prefer the IANA identifier in code.

[US Mountain Standard Time (MST)](/timezones/mst) is one hour ahead at UTC-7. [US Pacific Standard Time (PST)](/timezones/pst) is two hours ahead at UTC-8 (confusingly, PST is "more negative" so it is further behind UTC, but it is east of Baja California in the timezone sense).

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- Mexican Senate decree on daylight saving abolition, 2022.
- [INEGI (Instituto Nacional de Estadistica y Geografia)](https://www.inegi.org.mx/)
- [All timezones](/timezones)
