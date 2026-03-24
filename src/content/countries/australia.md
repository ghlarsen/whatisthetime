---
country: "Australia"
slug: "australia"
title: "Time in Australia: Five and a Half Timezones, a Half-Hour Island, and the World's Most Complicated Clock"
description: "Australia uses five standard time zones plus Lord Howe Island's unique UTC+10:30/+11, making it one of the most temporally fragmented nations on Earth. States disagree on DST, territories do their own thing, and Lord Howe Island moves by 30 minutes instead of 60."
timezones: ["Australia/Sydney", "Australia/Melbourne", "Australia/Brisbane", "Australia/Adelaide", "Australia/Darwin", "Australia/Perth", "Australia/Lord_Howe", "Australia/Eucla"]
utcOffsets: ["+10:00", "+10:00", "+10:00", "+09:30", "+09:30", "+08:00", "+10:30", "+08:45"]
hasDST: true
capital: "Canberra"
continent: "Oceania"
lastUpdated: "2026-03-23"
---

Australia uses multiple timezones spanning UTC+8 (Perth) to UTC+11 (Sydney/Melbourne in summer), with Lord Howe Island at UTC+10:30 and Eucla at UTC+8:45. Some states and territories observe daylight saving time while others do not. IANA identifiers: `Australia/Sydney`, `Australia/Melbourne`, `Australia/Brisbane`, `Australia/Adelaide`, `Australia/Darwin`, `Australia/Perth`, `Australia/Lord_Howe`, `Australia/Eucla`.

**Key facts about time in Australia**
- Timezone: Multiple (AWST, ACST, AEST, and variants)
- UTC offset: UTC+8 (Perth), UTC+8:45 (Eucla), UTC+9:30 (Darwin/Adelaide), UTC+10 (Brisbane/Sydney winter), UTC+10:30 (Lord Howe winter), UTC+11 (Sydney/Melbourne summer)
- DST: Yes in NSW, VIC, TAS, SA, ACT; no in QLD, NT, WA
- IANA identifier: Australia/Sydney, Australia/Melbourne, Australia/Brisbane, Australia/Adelaide, Australia/Darwin, Australia/Perth, Australia/Lord_Howe, Australia/Eucla
- Capital: Canberra

Australia is, by any reasonable measure, a timezone disaster. Not because it handles time poorly, but because geography and politics have conspired to make "what time is it in Australia?" a question with as many as five correct answers simultaneously, and "what time is it in Lord Howe Island?" the kind of question that makes software developers groan.

This is the full story.

## The five zones (plus the odd ones)

Australia spans roughly 3,300 kilometers from its western coast to its eastern coast, covering 40 degrees of longitude. This geographic width demands multiple timezones.

**Australian Eastern Time (AET):** UTC+10 (AEST) in winter, UTC+11 (AEDT) in summer. This covers New South Wales, Victoria, Tasmania, Queensland, and the Australian Capital Territory (which includes Canberra). Except that Queensland does not observe DST. So for half the year, Sydney and Brisbane are in the same timezone, and for the other half, they're an hour apart.

**Australian Central Time (ACT, confusingly not the same abbreviation as the Capital Territory):** UTC+9:30 (ACST) in winter, UTC+10:30 (ACDT) in summer. This covers South Australia and the Northern Territory. Except the Northern Territory does not observe DST. So Adelaide and Darwin split for half the year.

**Australian Western Time (AWT):** UTC+8 (AWST). Western Australia, which does not observe DST. The most recent WA DST trial ran from 2006 to 2009 and was put to a referendum in 2009, which rejected it with 55% voting against.

So: Western Australia never adjusts. Queensland never adjusts. The Northern Territory never adjusts. New South Wales, Victoria, Tasmania, South Australia, and the ACT do adjust, but they start and end together, and their adjustments diverge from Queensland and the NT.

This means the difference between Sydney and Brisbane varies between 0 hours (winter) and 1 hour (summer). The difference between Adelaide and Darwin varies between 0 hours (winter) and 30 minutes (summer). The difference between Sydney and Perth varies between 2 hours (winter) and 3 hours (summer).

Scheduling an all-hands meeting across an Australian company, in November, is a special kind of exercise.

## Lord Howe Island: the 30-minute DST adjustment

And then there's Lord Howe Island.

Lord Howe Island is a tiny island 600 kilometers northeast of Sydney, a UNESCO World Heritage Site, home to about 400 permanent residents and strict limits on tourism (the island allows a maximum of 400 visitors at any one time to protect its ecosystem). Its timezone is `Australia/Lord_Howe`, which is UTC+10:30 in summer and UTC+10 in... winter? Wait.

Lord Howe Island observes DST. But it only moves its clocks by 30 minutes, not 60. This makes it one of only two places in the world (the other being the Chatham Islands in New Zealand) that adjusts by a half-hour rather than a full hour.

The rationale: the island sits between New South Wales (UTC+10 winter, UTC+11 summer) and Queensland (UTC+10 permanent). The 30-minute shift is a compromise that keeps the island partially aligned with NSW while not going as far ahead as NSW summer time. It's genuinely a case where someone sat down and said "we'll split the difference," and then wrote that into the timezone database.

For anyone building scheduling software: `Australia/Lord_Howe` will test your UTC offset handling. When UTC+10:30 becomes UTC+11, you're in normal territory. When UTC+10:30 becomes UTC+10 (a -30 minute adjustment), that's the edge case that breaks naive implementations.

## Eucla: the strangest offset of all

Western Australia also contains the Eucla timezone, `Australia/Eucla`, used by a small community near the South Australian border. UTC+8:45. This is the result of a community near the state border using a time that felt locally practical, halfway between WA and SA. It's used by roughly 200 people. It has its own IANA entry because the IANA database tracks what's actually used, not just what's officially declared.

Australia therefore contains, within its borders, UTC offsets at 8, 8:45, 9:30, 10, 10:30 (and 11 when NSW is on summer time). At least six distinct clock readings simultaneously.

## Why Queensland won't do DST

Queensland's refusal to adopt daylight saving time is one of Australia's more durable cultural disputes, regularly producing articles in newspapers, arguments at barbecues, and strong opinions from everyone south of the Tweed River.

The official reasons: Queensland's latitude (around 27°S in Brisbane) means the seasonal daylight variation is less extreme than in Melbourne or Sydney. Early evening light in summer extends late enough without the clock change that children going to school in dark mornings (a common DST complaint in southern states) would be more pronounced in the subtropical north.

The unofficial reason often cited by Queenslanders themselves: the rest of Australia, particularly Sydney, wants the change, and Queensland is not going to let Sydney tell it what to do.

Queensland has held several DST referendums. The most recent, in 1992, rejected it. A campaign in the mid-2000s by some Gold Coast businesses (who wanted alignment with Sydney for tourism and business reasons) failed to gain traction.

## The Broken Hill situation

Broken Hill, New South Wales, observes South Australian time rather than New South Wales time. This is because the city's economy is tied to South Australian infrastructure, its TV comes from Adelaide, its radio stations are based there. A city of 17,000 people in one state keeps the time of the neighboring state because that's what makes daily life work.

The IANA database notes this but routes it through SA entries. It's a small, elegant example of how time, ultimately, follows community and commerce rather than political lines drawn on a map.

## The Canberra question

Canberra is in the ACT, which observes DST with NSW. The ACT was created in 1911 as a federal territory to house the national capital, carved out of NSW specifically so the capital wouldn't be in any state. It follows NSW time. It always has.

## Sources

- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- [Australian Government — Geoscience Australia Time Zones](https://www.ga.gov.au/scientific-topics/positioning-navigation/geodesy/time)
- [Lord Howe Island Board](https://www.lhib.nsw.gov.au/)
- [Western Australia DST Referendum 2009 — WA Electoral Commission](https://www.elections.wa.gov.au/)
- Queensland Parliamentary Library. *Daylight Saving in Queensland: A Brief History*. Research Brief 2006/15.
