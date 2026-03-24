---
country: "Vatican"
slug: "vatican"
title: "Time in Vatican City: CET, the Smallest State, and 2,000 Years of Telling the World When It Is"
description: "Vatican City uses Central European Time (UTC+1 in winter, UTC+2 in summer), the same as Rome, which surrounds it on all sides. The world's smallest sovereign state has run on Italian time since 1929."
timezones: ["Europe/Vatican"]
utcOffsets: ["+01:00"]
hasDST: true
capital: "Vatican City"
continent: "Europe"
lastUpdated: "2026-03-23"
---

Vatican City uses Central European Time (UTC+1). DST observed: clocks advance to UTC+2 in summer. IANA: `Europe/Vatican`.

**Key facts about time in Vatican**
- Timezone: Central European Time (CET)
- UTC offset: +01:00 (winter), +02:00 (summer DST)
- DST: yes
- IANA identifier: `Europe/Vatican`
- Capital: Vatican City

Vatican City is 0.44 square kilometers. It has about 800 citizens. It is the smallest internationally recognized sovereign state in the world by both area and population. It is surrounded entirely by Rome.

It uses `Europe/Vatican` in the IANA timezone database, which resolves to Central European Time: UTC+1 in winter, UTC+2 in summer (CEST), identical to Rome, Italy, and most of Western and Central Europe.

This is not surprising. Vatican City came into existence as a state under the Lateran Treaty of 1929, signed between the Holy See and the Italian government. At that point, Italy already used CET, and the tiny enclave within Rome naturally kept the same clock as the city surrounding it.

## The IANA entry

`Europe/Vatican` is a genuine IANA timezone identifier, not an alias. The tz database maintains separate entries for countries with distinct sovereignty even when the timezone offset is identical to a neighbor. Vatican City's entry has the same UTC offset history as Rome, but it is Vatican City's sovereign territory.

For developers: `Europe/Vatican` and `Europe/Rome` produce identical offsets at all times. There is no historical period where they differed.

## The Church and calendar time

The Catholic Church has a more complex relationship with time than its current CET observance suggests.

The Gregorian calendar, which most of the world now uses, was a Catholic invention. Pope Gregory XIII, in 1582, issued the papal bull *Inter gravissimas* which reformed the Julian calendar to correct a 10-day accumulated error. The Gregorian reform removed October 5-14, 1582 from existence. People went to bed on October 4 and woke up on October 15.

Catholic countries adopted the reform immediately. Protestant countries resisted for decades or centuries out of theological stubbornness: Britain didn't switch until 1752, dropping 11 days, prompting the "Give us our eleven days" protests. Russia didn't switch until 1918, after the revolution, which is why the Russian Revolution's October Revolution is dated October 25 in the Julian calendar but November 7 in the Gregorian.

The Vatican invented the calendar the world uses. The current Pope's daily schedule runs on CET, an Italian standard inherited from the 20th century.

## The Angelus and the liturgical clock

The Church has its own temporal architecture that operates alongside civil time. The canonical hours, *Lauds* at dawn, *Prime* at 6 AM, *Terce* at 9 AM, *Sext* at noon, *None* at 3 PM, *Vespers* at evening, *Compline* at night, structured the medieval European day.

The Angelus, three sets of prayers rung by bells at 6 AM, noon, and 6 PM, once organized the working day for millions of Catholics across Europe. Jean-François Millet painted it in 1857-1859: two peasants in a field, heads bowed over a basket of potatoes as the Angelus bell rings from the church in the background. The painting hangs in the Musée d'Orsay in Paris. The moment it depicts, people stopping their work when the bell tells them to, is a portrait of time as religious instruction.

The noon Angelus from St. Peter's Square, marked by the Pope's Sunday appearance at his apartment window, is still broadcast. The clock behind the gesture is CET.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [The Holy See](https://www.vatican.va/)
- Coyne, G.V., M.A. Hoskin, and O. Pedersen, eds. *Gregorian Reform of the Calendar: Proceedings of the Vatican Conference to Commemorate its 400th Anniversary*. Specola Vaticana, 1983.
- Richards, E.G. *Mapping Time: The Calendar and Its History*. Oxford University Press, 1998.
