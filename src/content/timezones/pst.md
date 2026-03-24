---
timezone: "PST"
slug: "pst"
title: "PST Time Now: Pacific Standard Time (UTC-8)"
description: "Pacific Standard Time (PST) is UTC-8. Used along the US and Canadian west coast, including Los Angeles, San Francisco, Seattle, and Vancouver. Transitions to PDT (UTC-7) in summer."
iana: ["America/Los_Angeles", "America/Vancouver", "America/Seattle"]
utcOffset: "-08:00"
dstVariant: "PDT"
dstOffset: "-07:00"
countries: ["United States", "Canada"]
lastUpdated: "2026-03-24"
---

Pacific Standard Time is UTC-8. It covers the western edge of North America: the California coast from San Diego to the Oregon border, the Pacific Northwest through Washington and Oregon, and the Canadian province of British Columbia. In summer, most of the zone observes Pacific Daylight Time (PDT) at UTC-7.

PST is the timezone of the American technology industry, the global film business, and two of the world's most recognizable city names: Los Angeles and San Francisco. The decisions made in office buildings in this timezone reverberate through daily digital life everywhere on Earth.

## Silicon Valley sets the clock

The technology industry that grew in the Santa Clara Valley south of San Francisco did not choose PST deliberately. Companies ended up there for reasons of university proximity, weather, and available real estate. But PST became the technology industry's clock by default, and that has had lasting consequences.

Major platform companies headquartered in the Pacific zone -- Apple, Google, Meta, Netflix, Salesforce, and dozens of others -- set their internal rhythms on Pacific Time. When Google announces a product, the announcement is typically at 9am or 10am PST/PDT. When Apple holds a keynote, it starts at 10am Pacific. When a software company sends a maintenance notification saying "services will be down from 2am to 4am," they usually mean Pacific Time unless specified otherwise.

The consequence is that engineers in New York are used to reading PST timestamps on everything their west coast colleagues produce. Developers in Europe and Asia often do timezone conversion automatically when reading American technology news. PST is not just a geographic designation. It is an industry timezone.

## Hollywood

Los Angeles developed as the world's film capital in the early twentieth century, partly for weather (reliable sunlight before electric lighting), partly for distance from Thomas Edison's patent enforcement in New York, and partly for geography (cheap land, diverse terrain). By the time the industry was firmly established, it was built around PST schedules.

The Academy Awards ceremony, broadcast globally, airs live from the Dolby Theatre in Los Angeles. In January 2026, that ceremony runs in PST. Viewers in London watch it late night (or early morning), viewers in Tokyo watch it the next day. The global entertainment industry orbits a timezone set by California real estate decisions made in 1910.

Film and television production schedules run on PST. Call times, union contracts, distribution windows, streaming releases -- all calibrated to Pacific Time. When Netflix releases a new season at midnight, it typically means midnight Pacific. Viewers in New York wait until 3am their time, or simply go to sleep and watch in the morning.

## The Pacific coast cities

- [Los Angeles](/cities/los-angeles) -- second-largest US city, global entertainment capital, 13 million in the metropolitan area
- [San Francisco](/cities/san-francisco) -- financial and technology hub, smaller city (870,000) with outsized economic influence
- Seattle -- home to Amazon, Boeing, and Microsoft's original campus; major port city
- San Diego -- military hub, biotech cluster, US-Mexico border gateway
- Portland -- Pacific Northwest's second city, significant tech and creative industries
- Vancouver, BC -- Canadian Pacific hub, major film production city, gateway to Asia-Pacific markets
- Las Vegas -- major tourism and convention city, in Nevada which observes Pacific Time

## The 3-hour gap

PST sits 3 hours behind Eastern Standard Time, which creates the defining scheduling challenge of American business. A 9am meeting in New York falls at 6am in San Francisco, too early for most people. A 5pm close in San Francisco is 8pm in New York, too late for most. The usable overlap window is roughly 9am to 5pm Pacific / noon to 8pm Eastern, and in practice it narrows further.

Technology companies with offices on both coasts have various strategies. Some hold all-hands meetings at 10am Pacific / 1pm Eastern, the compromise point that is late enough for the west and still within working hours for the east. Some rotate meeting times. Some simply accept the asymmetry and ask west-coast employees to take early morning calls more often because they are the minority.

The 3-hour gap to New York becomes an 8 or 9-hour gap to London, and a 16 or 17-hour gap to Tokyo. Pacific Time is geographically remote from the world's other major financial and commercial centers.

## PST vs. PDT

During standard time (roughly November through March), the zone is PST at UTC-8. During daylight saving time (March through November), it becomes PDT at UTC-7. The transition follows the US federal schedule: clocks spring forward on the second Sunday of March and fall back on the first Sunday of November.

California voters passed Proposition 7 in 2018, which authorized the state legislature to change California's daylight saving time rules. The measure passed but required federal authorization that has not materialized. California still observes DST on the same schedule as the rest of the country.

## For developers

- IANA identifiers: `America/Los_Angeles` (US), `America/Vancouver` (Canada)
- Standard offset: `-08:00` (PST)
- Daylight offset: `-07:00` (PDT)
- DST transitions: Second Sunday in March (spring forward) to first Sunday in November (fall back)
- JavaScript: `new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles' })`
- Python: `import pytz; pytz.timezone('America/Los_Angeles')`
- "PST" is often used loosely year-round, even during PDT. In technical contexts, use the full offset or IANA identifier.

[Mountain Standard Time (MST)](/timezones/mst) is one hour ahead. Alaska Time is one hour behind at UTC-9.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [National Institute of Standards and Technology (NIST)](https://www.nist.gov/pml/time-and-frequency-division/time-realization/standard-time-zones)
- Lécuyer, Christophe. *Making Silicon Valley: Innovation and the Growth of High Tech, 1930-1970*. MIT Press, 2006.
- [All timezones](/timezones)
