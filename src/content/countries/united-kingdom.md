---
country: "United Kingdom"
slug: "united-kingdom"
title: "Time in the United Kingdom: How Greenwich Became the Center of the World's Clock"
description: "The UK invented standard time, gave the world the prime meridian, and still uses GMT as the winter baseline while switching to BST in summer. Why does a small island off the coast of Europe own the world's temporal reference point?"
timezones: ["Europe/London"]
utcOffsets: ["+00:00"]
hasDST: true
capital: "London"
continent: "Europe"
lastUpdated: "2026-03-23"
---

In 1851, the Great Exhibition opened in Hyde Park. A million objects from forty countries displayed in the Crystal Palace, the world's industrial output under glass. Britain was the workshop of the world, and London was its address. That same year, the British railway system first used Greenwich Mean Time across its entire network, beginning the process by which one small observatory on a hill in southeast London would become the reference point for every clock on Earth.

This did not happen because Greenwich is particularly special. It happened because the British Empire was particularly large.

## The observatory on the hill

The Royal Observatory Greenwich was established by Charles II in 1675, its explicit purpose to determine longitude at sea. Ships were dying because sailors could not calculate their east-west position accurately. The solution was astronomy: measure the precise positions of stars and the moon, correlate with known star charts, calculate longitude.

The first Astronomer Royal was John Flamsteed, who spent forty years mapping the heavens from Greenwich. His successors continued this work for two centuries. By the mid-19th century, Greenwich had accumulated the most precise astronomical records in the world, and Greenwich Mean Time, the average solar time as measured from that meridian, was the reference clock for British maritime navigation.

The crucial point: GMT worked because Britain had the most ships. If the Dutch or the Spanish or the French had more vessels, we might be counting from Amsterdam or Cádiz or Paris.

## The International Meridian Conference, 1884

On October 13, 1884, delegates from 25 nations voted at the International Meridian Conference in Washington DC to designate Greenwich as the prime meridian, longitude 0 degrees, the reference point for all longitude measurements.

The vote was not unanimous. France abstained, and continued using the Paris meridian on French maps for another three decades. The French have never been entirely comfortable with the fact that the world's reference longitude runs through a British royal park.

The 1884 decision was pragmatic, not scientific. Two-thirds of the world's shipping already used charts based on the Greenwich meridian. Choosing Greenwich meant disrupting the fewest ships.

## GMT and BST: the split personality

The United Kingdom uses two time designations: Greenwich Mean Time (GMT, UTC+0) in winter, and British Summer Time (BST, UTC+1) in summer. The switch happens on the last Sunday in March (clocks spring forward) and the last Sunday in October (clocks fall back).

GMT is also approximately equivalent to Coordinated Universal Time (UTC), though strictly speaking they are not identical. UTC is maintained by atomic clocks at the Bureau International des Poids et Mesures in France (note: France maintains the world's primary timekeeping standard, even though the prime meridian runs through England). GMT is defined astronomically. In practice, the two differ by less than a second at any given moment, and for everyday purposes they are treated as identical.

## The double summer time experiment

During World War II, the UK used British Double Summer Time (BDST, UTC+2) in summer and BST (UTC+1) in winter, abandoning the winter return to GMT entirely from 1941 to 1945. The intention was to maximize evening daylight for industrial war production and to reduce the country's overlap with Continental European time during enemy operations.

After the war, the country reverted to GMT/BST. But the experiment was not forgotten. In 1968, the UK adopted British Standard Time (UTC+1 year-round) for a three-year experiment to see whether abandoning the GMT-in-winter arrangement would benefit the economy. The experiment ran until 1971. Scotland hated it: Scottish winter mornings stayed dark until 9 AM, creating hazardous conditions for children walking to school. The UK reverted to GMT/BST and has never seriously revisited year-round UTC+1.

## Interstellar and the weight of time

Christopher Nolan's *Interstellar* (2014) opens in rural America but its core concern is physics that was worked out in large part at British universities. The film's central premise draws on gravitational time dilation, the phenomenon by which time passes slower in stronger gravitational fields, a prediction of Einstein's general theory of relativity confirmed by British observations during the 1919 solar eclipse.

Arthur Eddington, observing the bending of starlight around the sun from the island of Príncipe during the 1919 eclipse, provided the first experimental confirmation of general relativity. That observation didn't happen at Greenwich, but Eddington was a Cambridge astronomer working within the British scientific tradition that had spent two centuries doing precision timekeeping at the observatory on the hill.

The film's time dilation sequences, where an hour on the ocean planet equals seven years on Earth, use physics that emerged directly from the British tradition of precise astronomical observation that also gave us Greenwich Mean Time. The science and the clock share a family tree.

## King Charles III and the royal clock connection

There is a clock, known as the "Shepherd Clock," on the outside wall of the Royal Observatory Greenwich, installed in 1852. It was the first public clock to show Greenwich Mean Time to the nearest second, driven by an electric signal from a master clock inside the building. It was visible to ships in the Thames and to anyone walking past.

A small red ball still drops from a mast on top of the Observatory at 1 PM every day. It was installed in 1833. Ships on the Thames would set their chronometers by it. The ball still drops, now as ceremony rather than navigation aid. But the habit is there: time at Greenwich is meant to be broadcast outward.

## For developers

The IANA timezone for the UK mainland is `Europe/London`. The hasDST flag is true. The transitions happen on the last Sunday in March (to UTC+1) and the last Sunday in October (to UTC+0).

The difference between the UK's timezone transitions and the US transitions used to cause particular grief in software before international DST rules were codified properly. The EU standardized timezone transitions in 1981, which helped significantly.

Post-Brexit, the UK has retained the EU-synchronized DST schedule but is no longer formally bound by EU regulations on the topic. A permanent clock change could theoretically happen through an Act of Parliament.

## Sources

- [Royal Museums Greenwich](https://www.rmg.co.uk/)
- [National Physical Laboratory (NPL), UK Time](https://www.npl.co.uk/time)
- [IANA Time Zone Database](https://data.iana.org/time-zones/tz-link.html)
- Howse, Derek. *Greenwich Time and the Longitude*. Philip Wilson Publishers, 1997.
- Galison, Peter. *Einstein's Clocks, Poincaré's Maps: Empires of Time*. W.W. Norton, 2003.
- Bartky, Ian R. *One Time Fits All: The Campaigns for Global Uniformity*. Stanford University Press, 2007.
