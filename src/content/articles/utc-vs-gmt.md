---
title: "UTC vs GMT: What's the Difference?"
slug: "utc-vs-gmt"
description: "GMT is solar. UTC is atomic. They read the same on a clock but are built on entirely different foundations, and the distinction matters more than most people realize."
lastUpdated: "2026-03-24"
---

UTC (Coordinated Universal Time) is defined by atomic clocks and maintained by international treaty. GMT (Greenwich Mean Time) is defined by Earth's rotation relative to the Sun. They read identically on a clock but are measured differently.

**Key facts:**
- The second is defined as exactly 9,192,631,770 oscillations of the cesium-133 atom
- 27 leap seconds have been inserted since the leap second system was formalized in 1972
- In 2022, the General Conference on Weights and Measures (CGPM) voted to suspend leap second insertions by 2035

Ask most people what time it is in London and they will say GMT. Ask a network engineer what timestamp to use in a distributed system and they will say UTC. Both answers point to the same clock on the wall. Neither person is wrong. But they are describing two fundamentally different things that happen to agree with each other, most of the time, by design.

The difference between UTC and GMT is not cosmetic. It goes down to how time is measured, who controls it, and what problem each was originally built to solve.

## GMT: the observatory on the hill

Greenwich Mean Time was born from a practical problem: ships were getting lost.

In the 17th and 18th centuries, determining longitude at sea required knowing the exact time at a reference meridian. If you knew that and could observe the sun's position, you could calculate how far east or west you were. The problem was clocks. The mechanical timepieces available before the marine chronometer were not accurate enough to survive months at sea.

The Royal Observatory was established at Greenwich in 1675, specifically to solve this problem. Its mission was to create accurate tables of the moon's position, which could be used as a kind of celestial clock, and to establish a reliable time standard. The observatory sat on a hill above the Thames in southeast London, and over time its position became the reference meridian from which the world would measure longitude.

GMT is defined by the Earth's rotation. Specifically, it is the mean solar time at the prime meridian running through the Greenwich Observatory. "Mean" is the key word. Solar noon varies through the year due to the Earth's elliptical orbit and axial tilt. GMT smooths these variations out, taking the average, so that clocks do not have to vary their rate through the seasons.

For two centuries, this was good enough. Astronomy, navigation, colonial administration, and eventually global commerce all ran on Greenwich time. The 1884 International Meridian Conference, held in Washington D.C., formalized Greenwich as the prime meridian for the entire world. Twenty-five nations voted. San Domingo voted against. France and Brazil abstained. The United Kingdom's astronomical dominance, backed by the simple fact that most of the world's nautical charts already used Greenwich as their reference, carried the vote.

## UTC: the atomic successor

In the 20th century, a new problem emerged. The Earth's rotation is not perfectly regular. It slows slightly due to tidal friction from the Moon, speeds up slightly due to glacial melt redistributing mass, and wobbles in complex ways tied to core-mantle interactions, earthquakes, and atmospheric dynamics. These variations are tiny but measurable. And for systems that depend on precise time, they matter.

The development of atomic clocks in the 1950s created a new kind of timekeeping. An atomic clock measures time by counting the oscillations of cesium-133 atoms. The second was redefined in 1967 at the 13th General Conference on Weights and Measures: one second equals exactly 9,192,631,770 oscillations of the cesium-133 atom transitioning between two hyperfine energy levels of its ground state. This definition is independent of the Earth's rotation. It is based on quantum physics, not astronomy.

Coordinated Universal Time, abbreviated UTC through a compromise between the English "Coordinated Universal Time" and the French "Temps Universel Coordonne," was established as the international standard in 1960 and has been maintained by the Bureau International des Poids et Mesures (BIPM) ever since. It is based on TAI, International Atomic Time, which accumulates elapsed atomic seconds without adjustment.

The problem is that atomic seconds accumulate faster than the Earth rotates. Over time, atomic time would drift away from solar time, and noon on the atomic clock would start to arrive before the sun was overhead in Greenwich. To prevent this, UTC is periodically adjusted by inserting a "leap second." These are added (or in theory subtracted) at the end of June or December by the International Earth Rotation and Reference Systems Service (IERS), which monitors the difference between atomic time and astronomical time.

Since 1972, when the current leap second system was formalized, 27 leap seconds have been inserted. The most recent, as of this writing, was in December 2016.

## What leap seconds cost

Leap seconds are administratively tidy and technically brutal.

For most people, a leap second is invisible. Clocks that receive time signals update quietly. Your phone does not stutter. Your microwave does not care.

For distributed computer systems, leap seconds have caused significant real-world problems. In 2012, a leap second insertion caused crashes at Reddit, LinkedIn, Mozilla, and Qantas Airlines, among others. The issue was that operating systems and applications did not handle the 61-second minute consistently. Some crashed. Some entered tight CPU loops. Some simply reported incorrect times.

The 2012 incident prompted a long debate in the technology industry about whether leap seconds should be abolished entirely. In 2022, the General Conference on Weights and Measures voted to suspend the insertion of leap seconds by 2035, allowing atomic time to drift from solar time by up to a full minute before any correction is made. The tolerance window may be extended further. The era of leap seconds may be ending.

## Why GMT still exists

GMT has not disappeared. It serves a different function now.

For civilian timekeeping in the United Kingdom, GMT remains the legal winter standard. British Summer Time is one hour ahead of GMT. When British Summer Time ends in autumn, the UK reverts to GMT, not UTC. The [United Kingdom's](/country/united-kingdom) legal time standard is based on the Interpretation Act 1978, which defines legal time using GMT.

For maritime and aviation contexts, GMT appears in legal documents, treaties, and some operational procedures precisely because it has that long legal and historical authority. Many international conventions reference GMT rather than UTC because they were written before UTC existed and have not been updated.

GMT is also, in practice, equivalent to UTC for most purposes. The difference between GMT (based on Earth rotation) and UTC (based on atomic clocks, adjusted with leap seconds) is kept within 0.9 seconds by the leap second mechanism. In everyday use, they are interchangeable. The distinction matters at millisecond precision. Below that threshold, they are the same.

## Developer implications

If you write software, the choice between UTC and GMT is not academic.

UTC is the correct choice for machine timestamps, database storage, log files, APIs, and any system that needs to calculate elapsed time or compare timestamps from different sources. UTC is unambiguous, universal, and not subject to daylight saving transitions. It is what POSIX systems use internally. Unix timestamps count seconds since the Unix epoch (1970-01-01T00:00:00Z), where Z explicitly denotes UTC.

GMT, in a software context, is often used as a timezone identifier, but it carries a semantic ambiguity. Some systems treat GMT as identical to UTC. Others treat it as a historical timezone with the same rules as UTC. The IANA timezone database, which underlies most modern timezone handling, includes "GMT" as a separate zone from "UTC," though they behave identically for almost all purposes. It also includes "Etc/GMT" zones for fixed-offset timekeeping.

The [IANA timezone database](/timezones) is the canonical reference for software. Always use UTC for internal timestamps. Display in the user's local timezone by conversion. Never store local time as a timestamp if you can avoid it.

For UTC specifically: ISO 8601 format with the Z suffix is the standard. `2026-03-24T14:30:00Z` is unambiguous. `2026-03-24T14:30:00 GMT` is technically the same thing but creates ambiguity in parsing. Write Z. Always write Z.

## The philosophical note

GMT and UTC are both attempts to answer the same question: what is the time, everywhere, agreed upon? But they answer it differently.

GMT says: time is the position of the Earth relative to the Sun, measured from this specific hill in southeast London. It is an astronomical, geographic answer.

UTC says: time is the accumulated count of atomic oscillations, corrected by treaty to stay close to GMT. It is a physical, international answer.

For centuries, the first answer was sufficient. We live in an era where the second answer is necessary. Both answers remain in use because the world does not update its reference documents and legal frameworks on the same schedule as its physics.

The [GMT timezone page](/timezone/gmt) has live current time, offset information, and notes on which territories use GMT as their standard time. For the full list of timezone offsets and their IANA identifiers, see [/timezones](/timezones).

## Sources

- Bureau International des Poids et Mesures. "Coordinated Universal Time (UTC)." [bipm.org](https://www.bipm.org/en/time-faq)
- International Earth Rotation and Reference Systems Service. "Bulletin C: Leap Second Announcements." [iers.org](https://www.iers.org/IERS/EN/Publications/Bulletins/bulletins.html)
- General Conference on Weights and Measures. Resolution 4 of the 27th CGPM, 2022. "On the use and future development of UTC."
- Royal Observatory Greenwich. "The History of GMT." [rmg.co.uk](https://www.rmg.co.uk)
- McCarthy DD, Seidelmann PK. *Time: From Earth Rotation to Atomic Physics*. Wiley-VCH, 2009.
- Interpretation Act 1978 (UK), Schedule 1. Definition of legal time in the United Kingdom.
- Stross R. "When Clocks Spring Forward, the Internet Can Fall Behind." *IEEE Spectrum*, 2012.
