---
title: "Military Time: The 24-Hour Clock Explained"
slug: "military-time"
description: "Why the military, aviation, and medicine abandoned AM and PM, and how the 24-hour clock removes an entire category of fatal ambiguity."
lastUpdated: "2026-03-24"
---

**Key facts:**
- The 24-hour clock runs from 0000 to 2359; midnight is 0000, noon is 1200
- Zulu (Z) designates UTC in all NATO military and international aviation communications
- ICAO (International Civil Aviation Organization) mandates UTC for all aviation timekeeping globally
- The United States military standardized on the 24-hour clock during World War II
- NATO assigns a phonetic alphabet letter to each timezone offset, from Alpha (UTC+1) through Yankee (UTC-10), with Zulu as UTC+0

At 2:00, do you mean day or night?

In civilian life, context usually answers that question. If someone says "meet me at 2:00," you assume afternoon because almost nothing happens at 2am without further explanation. The assumption usually holds. In military operations, aviation, and medicine, the assumption fails often enough to be dangerous.

The 24-hour clock removes the question entirely. There is no ambiguity between 0200 and 1400. They cannot be confused. One is deep night. One is mid-afternoon. The system is used wherever clarity at the moment of transmission matters more than convenience at the moment of reading.

## The conversion

The 24-hour clock runs from 0000 to 2359. Midnight is 0000. Noon is 1200. The transition point between the two formats happens at 1300: from 1pm onward, add 12 to get the 24-hour equivalent.

| 12-Hour | 24-Hour | Spoken (Military) |
|---------|---------|-------------------|
| 12:00 AM (midnight) | 0000 | "zero hundred hours" |
| 1:00 AM | 0100 | "zero one hundred hours" |
| 2:00 AM | 0200 | "zero two hundred hours" |
| 6:00 AM | 0600 | "zero six hundred hours" |
| 9:00 AM | 0900 | "zero nine hundred hours" |
| 12:00 PM (noon) | 1200 | "twelve hundred hours" |
| 1:00 PM | 1300 | "thirteen hundred hours" |
| 3:00 PM | 1500 | "fifteen hundred hours" |
| 6:00 PM | 1800 | "eighteen hundred hours" |
| 9:00 PM | 2100 | "twenty-one hundred hours" |
| 11:00 PM | 2300 | "twenty-three hundred hours" |
| 11:59 PM | 2359 | "twenty-three fifty-nine" |

The rule for conversion is mechanical. For AM times from 1:00 to 11:59, prepend a zero if needed (7:45am becomes 0745). For noon and PM times, add 12 to the hour (3:30pm becomes 1530, 11:45pm becomes 2345). Midnight is 0000, not 2400, though 2400 is sometimes used in schedules to mean the very end of a day rather than the start of the next.

Minutes and seconds work identically in both systems. The only difference is the hour.

## Why the military uses it

The origins of military standardization on 24-hour time are tangled with the development of global communications.

The French Navy adopted a version of the 24-hour clock in the late 19th century. The Royal Navy began transitioning in 1915. The United States military standardized on it during World War II, when operations required coordinating forces across multiple theaters with radio communications. A message saying "rendezvous at 4:00" across a tactical radio net, with multiple units in different time zones and different cultural conventions, was an invitation to catastrophe.

The military format goes further than just the 24-hour clock. A full military datetime group includes: day, hour, minute, month, year, and a timezone designator letter. "241430ZMAR26" means 24 March 2026, 14:30 UTC (Zulu time). Every element is explicit. There is no "which month," "which year," or "which timezone."

This is the system described in NATO STANAG 2101, the standardization agreement that governs military datetime formats across alliance member nations. It is also reflected in the US Department of Defense's Joint Publication 1-02 (terminology and definitions for joint operations).

## NATO phonetic timezone letters

The military assigns a letter to each timezone offset. The most important is Z, for Zulu.

Zulu time is UTC. It is the reference timezone for all NATO military operations, most aviation communication, and the majority of international military correspondence. When a military officer says "the operation begins at 0300 Zulu," they mean 3am UTC, regardless of what the local time is at the operations center.

The letter system covers the full range of offsets:

**Z (Zulu):** UTC+0. The global reference. Used in all international military and aviation communications.

**A (Alpha) through M (Mike):** UTC+1 through UTC+12, progressing eastward. Alpha is UTC+1 (Central European Time), Bravo is UTC+2, Charlie is UTC+3, and so on. Mike is UTC+12. The letter J (Juliet) is reserved and not assigned to a timezone; it is sometimes used informally to indicate local time at the speaker's position.

**N (November) through Y (Yankee):** UTC-1 through UTC-12, progressing westward. November is UTC-1, Oscar is UTC-2, Quebec is UTC-3 (which covers most of Canada's eastern coast), Romeo is UTC-4 (Eastern Daylight Time), Sierra is UTC-5 (Eastern Standard Time and Central Daylight Time), Uniform is UTC-6, Victor is UTC-7, Whiskey is UTC-8 (Pacific Standard Time), X-Ray is UTC-9, Yankee is UTC-10 (Hawaii Standard Time).

The phonetic alphabet letters used as timezone designators (Zulu, Alpha, Bravo) are the same NATO phonetic alphabet used for spelling in voice communications. This is not coincidence. Consistency in phonetic conventions reduces errors when communications are degraded.

## Aviation adopted the same system

Commercial and civilian aviation runs on Zulu time for coordination and UTC for recorded data.

Air traffic control communications between aircraft and ground controllers specify times in UTC, spoken as Zulu. A controller in London talking to a flight inbound from New York will use Zulu time for any time references, regardless of what the local clocks read. Flight plans are filed in UTC. Air traffic control records are timestamped in UTC. Aircraft accident investigation reports use UTC timestamps.

The instrument panel of a commercial airliner will display at minimum one clock showing UTC/Zulu, regardless of what other clocks are present. The flight management system computes waypoint arrival times in UTC.

This standardization is mandated by the International Civil Aviation Organization (ICAO), the United Nations body that sets global aviation standards. ICAO Annex 2 and related documents specify UTC as the standard for all aviation timekeeping.

The reason is identical to the military reason: an aircraft at 35,000 feet crossing time zones every 30 minutes cannot track local time at every city below it. There is exactly one time that matters for coordination: the time everyone else is using. For global aviation, that is UTC.

## Medicine and the AM/PM problem

Hospitals and pharmacies have their own reasons for the 24-hour clock.

Medication dosing errors are a significant source of preventable hospital harm. A 2010 study published in *Archives of Internal Medicine* (doi: 10.1001/archinternmed.2010.300) found that medication errors accounted for nearly 1.5 million injuries per year in the United States. Timing errors, administering a dose at the wrong time due to AM/PM confusion, contribute to this number.

The simplest case: a patient is prescribed a medication twice daily, at 6am and 6pm. A nurse transcribing the order from a handwritten note that says "6:00" without AM/PM specification must either guess or ask for clarification. With 0600 and 1800, no clarification is needed.

Hospital systems in the UK, Australia, Canada, and much of Europe use 24-hour time as standard in medical records, prescriptions, and handover documentation. The United States healthcare system has been slower to standardize, but electronic health record systems increasingly default to 24-hour time for precisely this reason.

The Joint Commission, which accredits US hospitals, has included clear time documentation (specifying AM/PM when 12-hour time is used) in its patient safety goals. The 24-hour format eliminates the requirement entirely.

## Why civilian life resisted

The 24-hour clock is objectively less ambiguous than the 12-hour clock. Most of the world's people use the 12-hour clock in everyday conversation anyway.

The reasons are habitual and ergonomic. The 12-hour clock maps onto natural daily experience: you wake in the morning, work through the day, and sleep at night. Most significant events happen between 6am and 10pm. The 12-hour format covers this range with small, familiar numbers. Saying "three in the afternoon" is compact and vivid. Saying "fifteen hundred" takes a beat of translation for civilians.

The United States, Canada, the UK, Australia, and a handful of other countries maintain 12-hour conventions in casual speech while using 24-hour time in professional, technical, and formal contexts. Germany, France, Japan, and most of the rest of the world use 24-hour time in daily life as the default.

The [/timezones](/timezones) reference covers the current UTC offsets for all major zones, in both 12-hour and 24-hour formats where applicable.

## Sources

- NATO STANAG 2101: "Promulgation and use of time." NATO Standardization Office.
- International Civil Aviation Organization. Annex 2 to the Convention on International Aviation: Rules of the Air.
- Kohn LT, Corrigan JM, Donaldson MS, eds. *To Err is Human: Building a Safer Health System*. National Academies Press, 2000.
- Aspden P, et al. *Preventing Medication Errors*. National Academies Press, 2007.
- US Department of Defense. Joint Publication 1-02: Department of Defense Dictionary of Military and Associated Terms.
- Royal Navy. *BR 875: Naval Time System*. Historical records, circa 1915.
