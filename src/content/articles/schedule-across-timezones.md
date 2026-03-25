---
title: "How to Schedule Meetings Across Time Zones"
slug: "schedule-across-timezones"
description: "The practical guide to finding meeting times that work across timezones, with tools and strategies for remote teams."
lastUpdated: "2026-03-25"
---

The key to scheduling across timezones is finding the business hours overlap window between participants, then choosing the time that minimizes inconvenience for the most people.

**Key facts:**
- New York (UTC-4/UTC-5) and London (UTC+0/UTC+1) share roughly 4 to 5 hours of overlap on a normal business day
- New York and Tokyo (UTC+9) share zero overlap during standard hours; someone always takes the call outside normal working time
- Buffer's 2023 State of Remote Work found that timezone differences are the second most common challenge cited by remote workers, behind communication and collaboration
- Cal.com's free tier supports unlimited bookings for one user and auto-detects booker timezone, eliminating the single most common scheduling error

Every meeting you schedule across timezones is a small logistics problem with a clear solution. The problem is that most people solve it ad hoc, every time, by opening a world clock app and doing mental arithmetic. That is time you could be spending on the meeting itself.

## The overlap window: what it is and why it matters

The overlap window is the block of time when two locations are both within standard working hours, roughly 9am to 6pm local time. When there is no overlap, someone is always outside those hours. The window tells you your scheduling latitude; outside it, you are asking someone to sacrifice personal time.

[Compare New York and Tokyo](/compare/new-york-city/tokyo) and the situation is stark. New York is UTC-5 in winter, UTC-4 in summer. Tokyo is UTC+9 year-round (Japan does not observe daylight saving). The offset is 13 or 14 hours depending on the season. When it is 9am Monday in New York, it is 10pm or 11pm Monday in Tokyo. When Tokyo starts its Tuesday at 9am, New York is still in Sunday evening. There is no 9-to-6 overlap. The only meeting times that fall within business hours for both require someone to work early morning or late evening. This is not a scheduling failure. It is geography.

[When it is 9am in London, it is 6pm in Tokyo](/when/9am-london/tokyo). London and Tokyo share a small usable window: late afternoon London time, which arrives just as Tokyo is approaching end of day. It is tight and forgiving of nothing. A 30-minute delay from anyone in London eats the window entirely.

The overlap window is also not symmetric. Asking the Tokyo participant to take a 7pm call is a different ask than asking a New York participant to join at 7am. Evening calls intrude on family time. Early morning calls are unusual but generally more recoverable. This asymmetry matters when you are choosing where within the window to place the meeting.

## The golden hours for common routes

Every major remote work corridor has a known best window. These are not opinions; they are the result of doing the arithmetic on both sides and finding where the inconvenience is least severe.

**New York / US East Coast and London:** The cleanest overlap in global remote work. With UTC-4/UTC-5 on one side and UTC+0/UTC+1 on the other, the offset is between 4 and 6 hours depending on season, with both sides observing daylight saving but on different schedules for a few weeks each year. The practical sweet spot is 9am to 11am US Eastern, which puts London at 2pm to 4pm. Both sides are in the functional part of the workday. This route is why so many international companies run their global standups at 10am Eastern.

**New York / US East Coast and Berlin or Amsterdam (Central European time, UTC+1/UTC+2):** One hour ahead of London, so the arithmetic shifts slightly. The 9am to 10am Eastern window maps to 3pm to 4pm Central European, which is still within normal hours. Anything after 11am Eastern starts pushing toward 5pm or 6pm in Europe, which is workable but not ideal for recurring meetings.

**US West Coast (UTC-7/UTC-8) and London or Europe:** Significantly harder. The offset is 8 to 10 hours. The only workable window is late morning in London, which puts San Francisco at 2am to 3am. There is no overlap. Any meeting requires someone to work outside normal hours; the question is whose time is more flexible.

**US (any coast) and Asia-Pacific:** There is effectively no overlap with standard business hours for most Asia-Pacific cities. US East Coast and Singapore (UTC+8) have a 12-to-13 hour gap. US East Coast and Sydney (UTC+10/UTC+11) have a 14-to-16 hour gap. Scheduling a live meeting between New York and Sydney means someone is taking a very early morning or late evening call, no matter how creatively you rotate.

**London and Singapore or Hong Kong (UTC+8):** 7 to 8 hours apart. The overlap is small but real: 9am London maps to 4pm or 5pm Singapore, which is within business hours for both. This window closes fast in either direction, but it exists and it is genuinely usable for a brief sync.

The [World Timezone Map](/timezones) shows all of these offsets at a glance and updates with daylight saving transitions, which are the most common source of scheduling errors when one side has shifted clocks and the other has not.

## Rotating meeting times: the fairness question

When there is no good overlap window, someone always pays a cost. The worst thing you can do is make that person the same one, every week, because they are the least senior, the most accommodating, or simply the one who never complained.

Rotating meeting times is the standard practice in distributed teams that do this well. GitLab's handbook, one of the most comprehensive public documents on async-first remote work, explicitly recommends rotating meeting times for global teams so that the inconvenience of off-hours calls is shared. The principle is simple: if the Tokyo team member took the 10pm call this week, the New York team member takes the 7am call next week.

Rotation requires tracking, which is the part that tends to fail. Most teams intend to rotate and then forget. The meeting gets booked in the calendar of whoever set it up, and it defaults to the same time for six months. A practical fix is to set the meeting recurrence and then manually alternate the timezone in the calendar event title: "Team sync (Tokyo-friendly)" and "Team sync (NY-friendly)," alternating by week.

For teams spanning more than two timezones, the rotation math gets more complicated. A team across San Francisco, New York, London, and Singapore has no time that is good for everyone. Some teams solve this by accepting that global all-hands calls will always be inconvenient for someone, and making the inconvenience as equal as possible over time rather than pretending it can be eliminated.

## Tools that solve the calculation problem

The manual approach is to open a [World Timezone Map](/timezones), locate your participants, do the arithmetic, check that both times are within business hours, and send the invite with the correct time conversion in the event body. This works. It is also something you have to do every single time, for every meeting, without error.

The automated approach is to use a scheduling tool that does this for you.

[Cal.com](https://refer.cal.com/larsen.studio-7mza) is the primary recommendation for this. It auto-detects the booker's timezone and displays your availability in their local time, which eliminates the most common scheduling error: sending someone a meeting invite in your timezone and having them mentally convert incorrectly. The free tier covers unlimited bookings for a single user, which is sufficient for most individual use cases. For teams, Cal.com supports round-robin scheduling, which distributes incoming meetings across team members and can be configured to respect each person's timezone-adjusted availability.

If you are reading a page that shows you time zone comparisons, you are manually doing what Cal.com automates at the moment of booking. The link above takes you to the free tier. Setup takes about ten minutes.

Google Calendar has a timezone view that lets you display multiple timezones in the time-of-day column on the left side of the week view. To enable it: Settings, then "World clock," add the timezones you need. This does not solve the scheduling problem automatically, but it makes the manual version faster because you can see all relevant local times on a single screen.

World Time Buddy is a web-based tool specifically for comparing multiple timezones visually. It shows a grid of times across cities and color-codes business hours, making the overlap window obvious. It is free for basic use and better than mental arithmetic for anything involving more than two timezones.

The combination that works for most remote teams: World Time Buddy for ad hoc scheduling decisions, Cal.com for anything with a booking link that goes outside the team.

## When the overlap is too narrow: the async alternative

Some timezone combinations make synchronous meetings structurally difficult enough that the better answer is not to find the least-bad meeting time; it is to question whether the meeting needs to be synchronous at all.

Doist, the company behind Todoist and Twist, has published extensively on async-first communication. Their position, grounded in years of operating a fully distributed team across more than 30 countries, is that most communication that happens in meetings can happen in writing, with a response window of 24 hours rather than real-time. A status update, a decision that does not require live debate, a question that has a factual answer: none of these require both people to be present simultaneously.

The async toolkit for teams with minimal overlap has a few core components. Loom for recorded video explanations, when tone or visual context matters and a text message would lose it. A shared document (Notion, Google Docs, Confluence) for persistent reference material and decisions that need to be findable later. Recorded standups, where team members post a 2-minute video or text update to a shared channel at the start of their day, replacing the synchronous daily standup entirely.

Buffer's State of Remote Work (2023) found that 56% of remote workers struggle with unplugging after work, and that timezone-driven communication pressure is a significant contributor to that. Teams that shift more communication to async often report improvement in both productivity and working-hours discipline, because the expectation of immediate response disappears.

The question to ask before scheduling any cross-timezone meeting is: does this decision require live back-and-forth, or does it require that two people share information? If it is the latter, a Loom video or a well-written document sent 24 hours in advance of a deadline is usually better than a meeting.

## What distributed teams that do this well actually do

The companies with the best track records on cross-timezone collaboration share a few consistent practices.

They document timezone availability explicitly. GitLab asks every team member to put their timezone in their profile and their working hours in their calendar. This sounds trivial. The effect is that no one is expected to respond in real time outside their stated hours, and meeting invites go out with awareness of who is being asked to join at what local time.

They build buffer time into anything cross-timezone. A meeting scheduled for the exact edge of someone's business hours will fail regularly because of the small delays that are normal in distributed work. Scheduling 30 minutes inside the overlap, rather than at the boundary of it, makes the meeting more likely to happen without someone joining from their car or rushing out immediately after.

They use the [Time Zones Explained](/articles/time-zones-explained) principle when onboarding new team members: not just "here is what time it is there," but "here is why we schedule the way we do and whose time we are protecting." Teams that explain the rotation logic get better buy-in from the people taking inconvenient calls.

They treat the calendar invite as the source of truth on timezone. Every invite specifies the time in each participant's local timezone in the description. This is a 30-second habit that eliminates an entire category of "I thought it was at 3pm my time" errors.

And they revisit the meeting cadence when team composition changes. A schedule that worked when the team was New York and London may not work when someone joins from Singapore. The right response is to redo the overlap calculation and adjust, not to ask the Singapore person to fit into a structure that was designed before they existed on the team.

The underlying principle is that timezone scheduling is a systems problem, not a willpower problem. The teams that handle it well have built lightweight systems: a shared timezone view, a rotation schedule, a booking link that handles the conversion automatically, a norm around async for anything that does not require live conversation. The teams that handle it badly are solving the same problem from scratch, every time, informally, and wondering why meetings keep going wrong.

## Sources

- Buffer. "State of Remote Work 2023." [buffer.com/state-of-remote-work](https://buffer.com/state-of-remote-work)
- GitLab. "GitLab Team Member Handbook: Communication." [handbook.gitlab.com](https://handbook.gitlab.com/handbook/communication/)
- Doist. "Async Communication: The Real Reason Remote Workers Are More Productive." [blog.doist.com](https://blog.doist.com/async-remote-working/)
- Nilles JM. "Making Telecommuting Happen." Van Nostrand Reinhold, 1994. (Foundational text on distributed work logistics)
- Stawarz K, Cox AL, Bird J, Benedyk R. "'I'd sit at home and do work emails': How tablets affect the work-life balance of office workers." *CHI Extended Abstracts*, 2013. doi: 10.1145/2468356.2468744
