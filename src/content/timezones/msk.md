---
timezone: "MSK"
slug: "msk"
title: "MSK Time Now: Moscow Standard Time (UTC+3)"
description: "Moscow Standard Time (MSK) is UTC+3. Russia's dominant timezone, covering Moscow and most of European Russia. No daylight saving time since 2014."
iana: ["Europe/Moscow"]
utcOffset: "+03:00"
countries: ["Russia"]
lastUpdated: "2026-03-24"
---

Moscow Standard Time is UTC+3. It is the timezone of the Russian capital, the country's financial and political center, and by convention the reference clock for much of Russian public life.

**Key facts about MSK**
- Full name: Moscow Standard Time
- UTC offset: UTC+3
- DST: no (abolished 2014)
- IANA identifiers: Europe/Moscow
- Countries: Russia Train departures across the entire Russian rail network, regardless of local time, are printed in Moscow time. A passenger in Vladivostok, ten time zones east of Moscow, reads a timetable in MSK.

Russia's relationship with its own clocks is complicated, politically charged, and surprisingly recent in its current form.

## The Trans-Siberian and eleven timezones

Russia spans eleven IANA timezones, more than any country on Earth. The Trans-Siberian Railway, the longest single continuous rail line in the world at 9,289 kilometers, crosses seven of them on its journey from Moscow to Vladivostok.

Running the railway required coordination, and coordination required a reference. Moscow time became that reference. Timetables posted at every station along the line have always shown Moscow time alongside local time, or in many cases, Moscow time only. A traveler boarding in Yekaterinburg, which is UTC+5, reads departure and arrival times in UTC+3 and adds the difference mentally. This has been the system for over a century.

The Trans-Siberian opened to full traffic in 1916, the year before the revolution. Soviet planning later extended and systematized the practice. Moscow time as a national administrative clock survived every political change.

## The Soviet timezone architecture

The Soviet Union rationalized timekeeping across its vast territory with characteristic ambition. Moscow was designated UTC+3, and the other zones were arranged in hourly steps eastward. The system imposed standardization on regions that had previously observed loose local solar times.

Soviet Russia observed daylight saving time for decades, switching clocks by one hour in spring and back in autumn, with the same bureaucratic precision applied to everything else.

## Putin's reforms

In 2011, President Dmitry Medvedev announced that Russia would stop observing daylight saving time. Clocks were moved forward in March 2011 and never moved back. The logic offered was that the biannual clock change caused health problems, disrupted sleep, and produced economic inefficiency. Russia would stay permanently on summer time.

The immediate result was dark mornings in winter that stretched well past 10am in Moscow. There were genuine complaints about children leaving for school in complete darkness, and about the psychological weight of dark mornings. The public response was mixed to negative.

Vladimir Putin, having returned to the presidency, reversed the policy in 2014. Clocks went back an hour in October of that year and have not moved since. Russia now sits on what is effectively permanent standard time: UTC+3 for Moscow, without seasonal adjustment.

The shift also had a geopolitical dimension. When Russia annexed Crimea in 2014, the peninsula's clocks were moved from UTC+2 (Ukraine) to UTC+3 (Moscow) as part of administrative integration. Time, as it has been throughout history, was an instrument of political alignment.

## Moscow time and the Russian internet

MSK matters for digital life in Russia in ways that go beyond business hours. The Moscow Exchange (MOEX) runs on Moscow time. Russian government services, federal announcements, and broadcast television operate on MSK. The major Russian internet platforms, including older iterations of social networks and messaging services, set their server defaults to MSK.

For Russian diaspora communities, MSK remains the reference for keeping in contact with family. The 3-hour gap to London, the 8 or 11-hour gap to the American coasts, the more manageable 2-hour gap to Istanbul, these are the arithmetic of a Russian living abroad.

## Cities on MSK

The following major cities observe Moscow Standard Time or use it as an administrative reference:

- Moscow -- capital, 12 million people in the city proper, more than 20 million in the metropolitan area
- Saint Petersburg -- Russia's second city, cultural capital, historical imperial seat
- Murmansk -- Arctic port, northernmost major city in the world, strategically important
- Nizhny Novgorod -- industrial city on the Volga
- Kazan -- capital of Tatarstan, major religious and cultural center

Much of European Russia, including cities west of the Ural Mountains, observes MSK. Eastern regions have their own offsets, from UTC+4 in Samara to UTC+12 in Kamchatka.

## For developers

- IANA identifier: `Europe/Moscow`
- UTC offset: `+03:00`, fixed year-round (no DST since 2014)
- JavaScript: `new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Moscow' })`
- Python: `import pytz; pytz.timezone('Europe/Moscow')`
- Note: Russia made multiple timezone changes in 2010, 2011, and 2014. Historical data requires careful handling. Always use the IANA database for pre-2014 conversions.

MSK shares its UTC+3 offset with [Turkey Time (TRT)](/timezones/trt) and [East Africa Time](/timezones/eat), though the histories and IANA identifiers differ.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- Marks, Steven G. *Road to Power: The Trans-Siberian Railroad and the Colonization of Asian Russia*. Cornell University Press, 1991.
- Decree of the Government of the Russian Federation on Timezone Changes, 2014.
- [All timezones](/timezones)
