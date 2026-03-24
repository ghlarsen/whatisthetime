---
timezone: "TRT"
slug: "trt"
title: "TRT Time Now: Turkey Time (UTC+3)"
description: "Turkey Time (TRT) is UTC+3. Turkey permanently moved to UTC+3 in 2016, abolishing daylight saving time. Istanbul, Ankara, and all of Turkey share one fixed clock."
iana: ["Europe/Istanbul"]
utcOffset: "+03:00"
countries: ["Turkey"]
lastUpdated: "2026-03-24"
---

Turkey Time is UTC+3. The entire country, from the European section of Istanbul to the border with Iran in the far east, runs on one clock.

**Key facts about TRT**
- Full name: Turkey Time
- UTC offset: UTC+3
- DST: no (permanent UTC+3 since 2016)
- IANA identifiers: Europe/Istanbul
- Countries: Turkey Turkey has not changed its clocks seasonally since September 2016, when the government moved to permanent summer time and never moved back.

The decision placed Turkey in a timezone position that is unusual in Europe: consistently ahead of Central European Time (CET) rather than occasionally aligned with it. Istanbul, which straddles two continents, now sits closer in clock terms to Moscow than to Brussels.

## The permanent summer

Turkey's relationship with daylight saving time tracked the European norm for decades. Clocks went forward in spring and back in autumn, coordinated loosely with the European Union's schedule. The system was standard and unremarkable.

In September 2016, the government under President Recep Tayyip Erdogan announced that Turkey would not adjust its clocks back to UTC+2 when standard time resumed. The clocks would stay at UTC+3 permanently.

The official reasoning cited daylight efficiency and energy savings. The timing also coincided with political tensions between Turkey and the EU, and the decision to maintain a permanent one-hour difference from Central European Time had some commentators reading it as a symbolic distancing, whether intentional or not.

The practical effect is that Turkish winters have later sunrises and later sunsets than would be the case at UTC+2. In Istanbul in December, sunrise falls after 8:30am and sunset after 5:30pm. The mornings are dark longer than they would be under Central European Time.

## Istanbul: a city on two continents

Istanbul is the only major city in the world that sits on two continents. The Bosphorus Strait, roughly 30 kilometers long and less than a kilometer wide at its narrowest point, divides the city between its European and Asian sections. The Fatih Sultan Mehmet Bridge and the Bosphorus Bridge (officially the 15 July Martyrs Bridge) connect them.

The city was Constantinople until 1453, capital of the Eastern Roman Empire for over a thousand years. It became the capital of the Ottoman Empire and remained so until 1923, when Ankara became the capital of the new Turkish Republic. Istanbul is no longer the political capital but remains by far the largest city and economic center.

More than 15 million people live in greater Istanbul, making it the largest city in Europe by most measures, even though its population largely lives on the Asian side of the Bosphorus. The whole city runs on TRT.

## Turkey's geographic position and timezone logic

Turkey occupies a geographically awkward position for timezone purposes. The country stretches from roughly 26 degrees East (the Greek-Turkish border near Edirne) to about 44 degrees East (the border with Iran). That span covers nearly 20 degrees of longitude, corresponding to a natural solar time variation of over an hour across the country.

Istanbul, in the far west, has solar noon at roughly 12:40 TRT in standard solar terms. The eastern city of Van has solar noon closer to 11:30 TRT. Keeping a single timezone means the country accepts a significant mismatch between clock and sun at one end or the other.

UTC+3 represents a compromise. The western edge is slightly "fast" relative to solar time, and the eastern edge is slightly "slow." Neither extreme is severe.

## Cities on TRT

Every Turkish city observes Turkey Time:

- [Istanbul](/cities/istanbul) -- 15 million, the country's economic and cultural hub, straddling Europe and Asia
- Ankara -- capital, located on the Anatolian plateau, government and university center
- Izmir -- Aegean coast city, major port, Turkey's third city
- Bursa -- industrial city in northwestern Anatolia, automotive manufacturing
- Antalya -- Mediterranean coast, major tourism center
- Adana -- southern Anatolia, agricultural and industrial center

## Turkey and the Europe-Middle East bridge

TRT's UTC+3 offset places Turkey between European time (CET at UTC+1, CEST at UTC+2) and the Middle East (Gulf Standard Time at UTC+4). Turkish businesses operate with one eye on European market hours and one on Gulf and Central Asian partners.

Istanbul's financial markets open in the morning in TRT, which means they are already well into the trading day when London opens at what is 11am Istanbul time in winter (10am in summer). The overlap with European trading hours is genuine but shifted. Turkish exporters, particularly in textiles and agriculture, deal with European buyers across a 2-hour (winter) or 1-hour (summer) gap.

TRT shares its UTC+3 offset with [Moscow Standard Time (MSK)](/timezones/msk) and East Africa Time. These are different IANA entries with distinct histories, but from a pure offset perspective, Istanbul and Moscow are on the same clock.

## For developers

- IANA identifier: `Europe/Istanbul`
- UTC offset: `+03:00`, fixed year-round (no DST since September 2016)
- JavaScript: `new Intl.DateTimeFormat('tr-TR', { timeZone: 'Europe/Istanbul' })`
- Python: `import pytz; pytz.timezone('Europe/Istanbul')`
- Historical note: before September 2016, Turkey observed UTC+2/+3 seasonal DST. Historical data from before this date requires careful handling with the full IANA database.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- Official Gazette of the Republic of Turkey, 2016 timezone decree.
- [All timezones](/timezones)
