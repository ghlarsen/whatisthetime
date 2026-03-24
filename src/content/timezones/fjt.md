---
timezone: "FJT"
slug: "fjt"
title: "FJT Time Now: Fiji Time (UTC+12)"
description: "Fiji Time (FJT) is UTC+12. Fiji observes daylight saving time (FJST, UTC+13) from October to January. The Fijian archipelago spans the International Date Line."
iana: ["Pacific/Fiji"]
utcOffset: "+12:00"
dstVariant: "FJST"
dstOffset: "+13:00"
countries: ["Fiji"]
lastUpdated: "2026-03-24"
---

Fiji Time is UTC+12. During daylight saving, which runs from late October through January, Fiji moves to UTC+13, placing it among the furthest-forward clocks on Earth and, on the calendar, ahead of most of the world.

Fiji is an archipelago of over 330 islands in the South Pacific, sitting close to the International Date Line. The date line itself, which runs at roughly 180 degrees longitude, passes through the Fijian island group, creating an unusual geographic situation: without an adjustment, parts of Fiji would be on one calendar day and other parts on the next.

## The date line adjustment

The International Date Line is not a straight line. It bends around the Fijian islands, keeping the entire archipelago on the same calendar date. Without this adjustment, the eastern islands of the group would be a day behind the main islands when crossing the 180th meridian.

This bending of the date line is a practical convenience. Fiji is one of several Pacific nations that prompted adjustments to the line's position, including Kiribati, Tonga, and Samoa. Kiribati moved its date line position in 1995 so that its easternmost islands could share the same day as its western islands, a particularly dramatic adjustment given that the Line Islands of Kiribati sit east of 180 degrees but observe UTC+14.

Fiji, sitting close to but just west of 180 degrees, observes UTC+12 in standard time and UTC+13 in summer, without needing to cross the date line itself.

## Daylight saving in the Southern Hemisphere

Fiji observes daylight saving time on the Southern Hemisphere schedule: clocks go forward in October or November (beginning of southern spring and summer) and back in January or February (end of summer). The exact dates vary by government regulation.

During FJST at UTC+13, Fiji is one of the first populated places to enter each new calendar day. On New Year's Eve, Fijian celebrations are among the first globally, though [New Zealand at UTC+13](/timezones/nzst) during its own DST period and Samoa and Tonga sit at UTC+13 and UTC+13 respectively.

## Nadi and the tourism economy

Fiji's primary international airport is Nadi International Airport (pronounced "Nandi"), on the western coast of the main island Viti Levu. Nadi is the aviation gateway to Fiji and the center of the tourism industry, though it is not the capital.

Suva, on the southeastern coast of Viti Levu, is the capital and largest city, home to the University of the South Pacific and the principal port.

- Suva -- capital, on the southeastern coast of Viti Levu
- Nadi -- tourism hub, international airport
- Lautoka -- second city, sugar industry center
- Labasa -- main town of Vanua Levu, the second-largest island

Tourism is one of Fiji's primary industries. The country receives visitors primarily from Australia, New Zealand, and the United States. All three origin countries are significantly offset from FJT: Australia is typically 2-4 hours behind depending on Australian timezone, New Zealand is in the same zone for parts of the year, and the US west coast is 20 hours behind in standard time.

## The iTaukei and Indo-Fijian communities

Fiji's population has a complex demographic history. The indigenous iTaukei Fijians coexist with a significant Indo-Fijian community descended from laborers brought to Fiji by the British colonial government between 1879 and 1916 to work the sugar cane fields. The two communities have distinct cultural traditions and have been at the center of Fiji's post-independence political history.

Rugby union is a significant cultural touchstone for both communities and for Fijian national identity. The Fijian national rugby sevens team has been a dominant force in the global game, winning gold at the 2016 and 2020 Olympic Games. Major tournaments are watched on Fiji Time, with Fijian sports fans keenly aware of the timezone adjustments needed to watch games from European or Southern Hemisphere venues.

## For developers

- IANA identifier: `Pacific/Fiji`
- Standard offset: `+12:00` (FJT), approximately late January to late October
- Daylight offset: `+13:00` (FJST), approximately late October to late January
- DST follows Southern Hemisphere schedule -- opposite of Northern Hemisphere
- Exact DST transition dates are set annually by the Fijian government and can vary year to year
- JavaScript: `new Intl.DateTimeFormat('en-FJ', { timeZone: 'Pacific/Fiji' })`
- Python: `import pytz; pytz.timezone('Pacific/Fiji')`
- Note: Fiji's DST dates have historically been irregular. The IANA database is updated when Fiji announces changes; check for current year data.

[New Zealand Standard Time (NZST)](/timezones/nzst) also uses UTC+12 in standard time. [JST](/timezones/jst) sits at UTC+9, three hours behind FJT.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- Fiji Bureau of Statistics.
- [All timezones](/timezones)
