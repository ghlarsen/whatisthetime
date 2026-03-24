// whatisthetime.now embeddable clock widget
// Usage: <div class="wtit-clock" data-city="tokyo" data-theme="dark"></div>
//        <script src="https://whatisthetime.now/widget.js"></script>
(function() {
  'use strict';

  var STYLE_ID = 'wtit-widget-style';
  if (!document.getElementById(STYLE_ID)) {
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.wtit-widget { font-family: system-ui, -apple-system, sans-serif; display: inline-flex; flex-direction: column; gap: 4px; padding: 12px 16px; border: 1px solid; border-radius: 6px; text-decoration: none; min-width: 120px; }',
      '.wtit-widget[data-theme="dark"] { background: #0a0a0a; border-color: #222; color: #fff; }',
      '.wtit-widget[data-theme="light"] { background: #fff; border-color: #eee; color: #111; }',
      '.wtit-widget-city { font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase; opacity: 0.5; }',
      '.wtit-widget-time { font-family: ui-monospace, "SF Mono", "Fira Code", monospace; font-size: 28px; font-variant-numeric: tabular-nums; line-height: 1; }',
      '.wtit-widget-offset { font-family: ui-monospace, monospace; font-size: 10px; opacity: 0.4; }',
      '.wtit-widget-link { font-size: 9px; opacity: 0.3; text-decoration: none; color: inherit; margin-top: 4px; }',
      '.wtit-widget-link:hover { opacity: 0.6; }',
    ].join('\n');
    document.head.appendChild(style);
  }

  function initWidget(el) {
    var city = el.getAttribute('data-city') || 'london';
    var theme = el.getAttribute('data-theme') || 'dark';
    var showLink = el.getAttribute('data-no-branding') !== 'true';

    // Map common city names to IANA timezones
    var cityMap = {
      'london': { tz: 'Europe/London', name: 'London' },
      'new-york': { tz: 'America/New_York', name: 'New York' },
      'new-york-city': { tz: 'America/New_York', name: 'New York' },
      'tokyo': { tz: 'Asia/Tokyo', name: 'Tokyo' },
      'paris': { tz: 'Europe/Paris', name: 'Paris' },
      'sydney': { tz: 'Australia/Sydney', name: 'Sydney' },
      'dubai': { tz: 'Asia/Dubai', name: 'Dubai' },
      'singapore': { tz: 'Asia/Singapore', name: 'Singapore' },
      'berlin': { tz: 'Europe/Berlin', name: 'Berlin' },
      'los-angeles': { tz: 'America/Los_Angeles', name: 'Los Angeles' },
      'chicago': { tz: 'America/Chicago', name: 'Chicago' },
      'mumbai': { tz: 'Asia/Kolkata', name: 'Mumbai' },
      'shanghai': { tz: 'Asia/Shanghai', name: 'Shanghai' },
      'hong-kong': { tz: 'Asia/Hong_Kong', name: 'Hong Kong' },
      'seoul': { tz: 'Asia/Seoul', name: 'Seoul' },
      'moscow': { tz: 'Europe/Moscow', name: 'Moscow' },
      'copenhagen': { tz: 'Europe/Copenhagen', name: 'Copenhagen' },
      'amsterdam': { tz: 'Europe/Amsterdam', name: 'Amsterdam' },
      'stockholm': { tz: 'Europe/Stockholm', name: 'Stockholm' },
      'cairo': { tz: 'Africa/Cairo', name: 'Cairo' },
      'bangkok': { tz: 'Asia/Bangkok', name: 'Bangkok' },
      'toronto': { tz: 'America/Toronto', name: 'Toronto' },
      'sao-paulo': { tz: 'America/Sao_Paulo', name: 'São Paulo' },
      'beijing': { tz: 'Asia/Shanghai', name: 'Beijing' },
      'delhi': { tz: 'Asia/Kolkata', name: 'Delhi' },
      'jakarta': { tz: 'Asia/Jakarta', name: 'Jakarta' },
      'istanbul': { tz: 'Europe/Istanbul', name: 'Istanbul' },
      'auckland': { tz: 'Pacific/Auckland', name: 'Auckland' },
      'denver': { tz: 'America/Denver', name: 'Denver' },
      'phoenix': { tz: 'America/Phoenix', name: 'Phoenix' },
    };

    var info = cityMap[city];
    if (!info) {
      // Try treating data-city as an IANA timezone directly
      info = { tz: city, name: city.split('/').pop().replace(/_/g, ' ') };
    }

    var widget = document.createElement('div');
    widget.className = 'wtit-widget';
    widget.setAttribute('data-theme', theme);

    var cityEl = document.createElement('span');
    cityEl.className = 'wtit-widget-city';
    cityEl.textContent = info.name;

    var timeEl = document.createElement('span');
    timeEl.className = 'wtit-widget-time';
    timeEl.textContent = '--:--:--';

    var offsetEl = document.createElement('span');
    offsetEl.className = 'wtit-widget-offset';

    widget.appendChild(cityEl);
    widget.appendChild(timeEl);
    widget.appendChild(offsetEl);

    if (showLink) {
      var link = document.createElement('a');
      link.className = 'wtit-widget-link';
      link.href = 'https://whatisthetime.now/' + city;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = 'whatisthetime.now';
      widget.appendChild(link);
    }

    el.parentNode.replaceChild(widget, el);

    function tick() {
      try {
        var now = new Date();
        var parts = new Intl.DateTimeFormat('en-US', {
          timeZone: info.tz,
          hour: '2-digit', minute: '2-digit', second: '2-digit',
          hour12: false,
        }).formatToParts(now);
        var get = function(t) {
          var p = parts.find(function(p) { return p.type === t; });
          return p ? p.value : '00';
        };
        var h = get('hour') === '24' ? '00' : get('hour');
        timeEl.textContent = h + ':' + get('minute') + ':' + get('second');

        var tzParts = new Intl.DateTimeFormat('en-US', {
          timeZone: info.tz,
          timeZoneName: 'shortOffset',
        }).formatToParts(now);
        var tzName = tzParts.find(function(p) { return p.type === 'timeZoneName'; });
        offsetEl.textContent = tzName ? tzName.value : '';
      } catch(e) {
        timeEl.textContent = 'Invalid timezone';
      }
    }

    tick();
    setInterval(tick, 1000);
  }

  // Init all widgets on page
  function initAll() {
    var widgets = document.querySelectorAll('.wtit-clock');
    for (var i = 0; i < widgets.length; i++) {
      initWidget(widgets[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
