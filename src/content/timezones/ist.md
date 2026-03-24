---
timezone: "IST"
slug: "ist"
title: "IST Time Now: India Standard Time (UTC+5:30)"
description: "India Standard Time (IST) is UTC+5:30, used across all of India and Sri Lanka. India observes no daylight saving time and uses a single timezone across its entire landmass -- a country 3,000 kilometers wide on a 30-minute offset."
iana: ["Asia/Kolkata", "Asia/Colombo"]
utcOffset: "+05:30"
countries: ["India", "Sri Lanka"]
lastUpdated: "2026-03-24"
---

India Standard Time is UTC+5:30. One clock for 1.4 billion people, stretched across a country nearly as wide as the continental United States.

**Key facts about IST**
- Full name: India Standard Time
- UTC offset: UTC+5:30
- DST: no
- IANA identifiers: Asia/Kolkata, Asia/Colombo
- Countries: India, Sri Lanka No daylight saving. No regional exceptions. The entire subcontinent -- from the Thar Desert in the west to the hills of Manipur in the east, from the Himalayas in the north to the tip of Tamil Nadu in the south -- runs on IST.

## The half-hour and the geography

India sits between roughly 68 and 97 degrees East longitude. The 82.5-degree meridian, which runs through Mirzapur near Allahabad in Uttar Pradesh, corresponds to UTC+5:30 exactly. The Indian government placed the official reference meridian there when IST was formalized during British colonial administration in 1905.

The choice of a half-hour offset reflects the geographic reality: India at roughly 82 degrees East falls naturally between UTC+5 (the Pakistan boundary) and UTC+6 (the Myanmar boundary). UTC+5:30 is geographically honest in a way that UTC+5 or UTC+6 would not be.

## One timezone, three time zones worth of country

India spans nearly 30 degrees of longitude, which corresponds to roughly 2 hours of solar time difference between its eastern and western extremes. Sunrise in Arunachal Pradesh, in India's northeast, comes more than 2 hours before sunrise in Gujarat in the west -- yet both use IST.

This has been a source of periodic debate. Northeast Indian states, particularly Assam and Arunachal Pradesh, have discussed the idea of a separate "Chaibagaan Time" (Tea Garden Time), UTC+6:30, to better match local sunrise and sunset. Tea estate workers in Assam start before dawn on IST, working in darkness because the clock hasn't caught up to their solar reality.

The argument for keeping one timezone is coordination: a single clock simplifies rail scheduling, government administration, media broadcasting, and the operation of national institutions across a country that is already complex enough to coordinate. The argument against is that the eastern regions lose two hours of morning light compared to the clock.

The one-timezone decision has held since 1947.

## The tech industry and the IST advantage

India's software and business process outsourcing industry -- based primarily in Bengaluru, Hyderabad, Chennai, Pune, and Delhi -- runs on IST, and IST's position has become central to the industry's global proposition.

IST at UTC+5:30 provides an overlap window with the US West Coast (UTC-8, PST) of approximately:
- IST 7:00 PM = PST 5:30 AM (opening of the US day)
- IST 11:30 PM = PST 10:00 AM (midmorning US)

This means Indian software teams finishing their day hand off work to US teams starting their morning. The overlap isn't large, but the asynchronous handoff model -- "we work while you sleep, you work while we sleep" -- enables 24-hour development cycles across a single 24-hour day.

Indian IT companies have built entire business models around this offset. Infosys, Wipro, Tata Consultancy Services, and hundreds of smaller firms staff global software projects using the IST-to-EST and IST-to-PST time differential as a productivity multiplier.

## The Bollywood production clock

Mumbai is India's entertainment capital, and the Hindi film industry ("Bollywood") produces more films annually than any other national cinema. The industry runs on IST and has its own relationship with time that visitors find distinctive: meetings are approximate, schedules are suggestions, and a 10 AM call time on a film set may mean 11:30 AM or noon.

This is not laziness but a different cultural relationship with scheduling. Indian social and professional culture has concepts like "Indian Standard Time" (a joke about perpetual lateness) that acknowledge the gap between official clock time and actual social time. The official IST and the operating IST of Bollywood's social schedule are different things sharing a name.

The films themselves, however, are globally distributed and globally scheduled. OTT releases on Netflix, Amazon Prime, and Disney+ Hotstar are timed to coordinate across IST, UTC, and US timezones. A new Bollywood release drops at midnight IST, which translates to specific hours across the global Indian diaspora.

## The Indian Railways clock

Indian Railways is one of the largest railway networks in the world, carrying roughly 8 billion passengers annually across more than 67,000 kilometers of track. The entire network operates on IST.

The railway timetable is effectively the national time reference for much of India. Station clocks, train departures, and platform announcements are the time coordination infrastructure that millions of Indians use daily. Being on the train or missing it is determined by IST, and IST is determined by the railways as much as by the government meridian.

When a train is "on time" in India, it means on IST. When it is delayed, the delay is measured in IST minutes and announced over PA systems in IST terms. The railway and the clock are inseparable.

## Sri Lanka's shared offset

Sri Lanka (formerly Ceylon) uses IST -- UTC+5:30 -- and the IANA identifier is `Asia/Colombo`. The shared offset with India reflects historical administrative alignment during the British colonial period.

Sri Lanka is 5 to 10 degrees further east than the western coast of India, making UTC+5:30 a reasonable fit for the island. Colombo at roughly 80 degrees East corresponds to a solar noon of around 12:28 PM on UTC+5:30 -- close enough.

Sri Lanka briefly tried UTC+6 (known as "Lanka Time") from 1996 to 2006, in what was described as an effort to distinguish itself from India's timezone. The experiment was abandoned and Sri Lanka returned to UTC+5:30, accepting the shared clock with its large neighbor.

## The diaspora and the clock connection

The Indian diaspora is global: significant Indian communities exist in the UK, the US, Canada, Australia, Singapore, the UAE, and dozens of other countries. WhatsApp calls home to India happen at the edge hours when IST and the diaspora's local timezone align. Diwali, Holi, and other festivals are celebrated across timezones with video calls connecting families separated by 5, 10, or 13 hours.

The IST clock is the temporal anchor for global Indian identity in ways that go beyond business scheduling. When someone in the Indian diaspora says "I need to call my parents," they are calculating IST -- figuring out when it is 10 AM in Bangalore or afternoon in Delhi, regardless of what their local clock says.

## Cities on IST

Key locations:
- Mumbai (Maharashtra, financial capital)
- Delhi / New Delhi (national capital)
- Bengaluru (technology hub)
- Hyderabad (technology and pharma)
- Chennai (automotive and technology)
- Kolkata (Bengal, gateway to Northeast)
- Pune (IT and manufacturing)
- Ahmedabad (Gujarat, industry)
- Colombo (Sri Lanka)

## For developers

IANA identifiers:
- `Asia/Kolkata` (India -- note: Kolkata, not "India")
- `Asia/Colombo` (Sri Lanka)

UTC+5:30 expressed in minutes is UTC + 330 minutes. The offset is not expressible as whole hours, which creates edge cases in older software that assumes hourly offsets.

Common conversions:
- IST to UTC: subtract 5 hours 30 minutes
- IST to EST (winter): subtract 10 hours 30 minutes
- IST to PST (winter): subtract 13 hours 30 minutes
- IST to CET (winter): subtract 4 hours 30 minutes
- IST to GST (Dubai): subtract 1 hour 30 minutes

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [Government of India: Standard Meridian](https://www.india.gov.in/)
- [Indian Railways: Official Timetable](https://www.irctc.co.in/)
- [NASSCOM: Indian IT Industry](https://nasscom.in/)
- Keay, John. *India: A History*. HarperCollins, 2000.
