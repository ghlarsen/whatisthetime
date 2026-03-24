---
timezone: "COT"
slug: "cot"
title: "COT Time Now: Colombia Time (UTC-5)"
description: "Colombia Time (COT) is UTC-5, used across all of Colombia with no daylight saving time. Bogota, Medellin, Cali, and Cartagena all share the same fixed clock, making Colombia one of the simpler timezones to work with in the Americas."
iana: ["America/Bogota"]
utcOffset: "-05:00"
countries: ["Colombia"]
lastUpdated: "2026-03-24"
---

Colombia Time is UTC-5, fixed and simple. No daylight saving, no regional subdivisions, one offset for a country that stretches from the Caribbean coast in the north to the Amazon basin in the south. Bogota, Medellin, Cali, Cartagena: they all share the same clock.

## One country, one clock

Colombia sits entirely in the low latitudes, between roughly 4 degrees North (the Amazon south) and 12 degrees North (the Caribbean north). At these latitudes, the variation in day length across the year is minimal. June days are barely longer than December days. The argument for daylight saving time -- that shifting the clock forward makes better use of summer evening light -- simply doesn't apply in the tropics.

Colombia's geographic uniformity also helps. While the country is topographically varied (three mountain ranges, lowland coast, Amazon forest), its east-west span is compact enough that a single UTC offset serves all of it without major solar noon distortion. Bogota at 74 degrees West corresponds naturally to a solar noon around 12:56 PM on a UTC-5 clock, a reasonable fit.

## Bogota and the South American financial calendar

Bogota is Colombia's capital and financial center, home to the Bolsa de Valores de Colombia. At UTC-5, Bogota shares its offset with New York (during US Eastern Standard Time in winter), making Colombia one of the few Latin American countries that is exactly in sync with the US East Coast for part of the year.

When the US Eastern states observe EDT (UTC-4) in summer, Bogota falls one hour behind New York. But during US standard time (November to March), the two cities are on identical clocks. This alignment matters for financial services, trade, and the many multinational companies that use Bogota as a regional Latin American headquarters.

## UTC-5 and its neighbors

Colombia shares UTC-5 with Ecuador and Peru to the south, with some of Brazil's western Amazon territories, and with the US Eastern time zone in winter. This puts Colombia in a cluster of Andean countries that forms a coherent scheduling block for South American business.

Chile and Argentina are both at UTC-3, two hours ahead. Brazil's main cities are at UTC-3. But the Andean countries -- Colombia, Ecuador, Peru -- cluster at UTC-5, reflecting both their geographic longitude and their choice not to observe DST.

## The coffee economy and global timing

Colombia is the third-largest coffee producer in the world, and the coffee trade runs on an international clock. Coffee futures trade on the Intercontinental Exchange (ICE) in New York. At UTC-5 in winter, Colombian coffee traders are exactly in sync with the New York exchange. The morning price-setting on ICE is their morning too.

This alignment has shaped the commercial rhythm of Colombia's agricultural sector. Coffee farms in the mountains around Medellin and in the coffee triangle (Quindio, Risaralda, Caldas) supply a commodity priced in New York on a schedule that, during EST months, is their own schedule.

## Cartagena and the colonial port

Cartagena on the Caribbean coast was the most important Spanish colonial port in the Americas. Spanish galleons loaded silver from the Andes and sent it to Seville, and Cartagena's fortifications -- built to protect that wealth from pirates -- remain some of the best-preserved colonial military architecture in the hemisphere.

Cartagena today is a major tourism destination and runs on the same COT as Bogota, though the city's character is more Caribbean than Andean. The coastal heat, the cumbia rhythms in the walled city's streets, and the proximity to the sea give Cartagena a tempo that feels separate from the capital, even on the same clock.

## Medellin's transformation

Medellin was known for decades primarily for violence and the cartel of the same name. The city's physical geography -- a valley surrounded by steep mountains -- made it feel enclosed, a place where the clock mattered less than the territorial boundaries of neighborhoods.

The city has undergone a documented urban transformation since the early 2000s, and it now attracts international attention as a model of urban innovation. Cable cars connect previously isolated hillside communities to the city center. Innovation districts have grown around the same geography. Medellin's COT clock now ticks for a city with serious international technology and startup activity, not just for the legacy industries.

## The IANA identifier

Colombia uses a single IANA identifier: `America/Bogota`. No DST transitions. The offset is fixed at UTC-5.

In programming:
- Python: `pytz.timezone('America/Bogota')`
- JavaScript: `new Intl.DateTimeFormat('es-CO', { timeZone: 'America/Bogota' })`

UTC-5 is 5 hours behind UTC, the same as US Eastern Standard Time (but COT remains at -5 year-round).

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [Bolsa de Valores de Colombia](https://www.bvc.com.co/)
- [Federacion Nacional de Cafeteros de Colombia](https://federaciondecafeteros.org/wp/)
- [DANE: Departamento Administrativo Nacional de Estadistica](https://www.dane.gov.co/)
