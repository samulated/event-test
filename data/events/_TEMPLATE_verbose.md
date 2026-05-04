---
# This is a verbose template for event Markdown files
# Frontmatter is used for standardised event info
# plugin additionals can also be added for the parser

# a 'quick template' file is also available for creating your own events

# SECTION 1 - Required Info
title: "An event title"
slug: an-event-title
start: 2026-06-01T12:00:00
end: 2026-06-01T13:00:00
timezone: Australia/Melbourne
location: a-location-name
organiser: an-organiser-name
status: draft

# SECTION 2 - Recommended Info
categories: []
updated: 2026-05-04T03:22:00

# SECTION 3 - Additional Modules
# Age / Access
age_restriction: null # null | all_ages | 18+

# Cost / Ticketing
cost: unknown # free | paid | donation | mixed | unknown
ticketing: none # none | optional | required | door_sales | sold_out
ticket_url: ""

# URLs / socials
website_url: ""
socials:
  instagram: ""
  bluesky: ""
  twitter: ""
  facebook: ""
  telegram_channel: ""
  telegram_group: ""

# Accessibility module
accessibility:
  wheelchair_accessible: null
  quiet_space: null
  companion_card: null
  notes: ""

# Safety / content module
content_warnings: []
dress_code: ""
kink_event: false
alcohol_present: null

# Calendar routing
calendars:
  - main # main | australia | vic | nsw | qld | nt | sa | wa | tas | act | online

# External IDs / sync module
uid: "" # traditionally we just make this YYYY-MM-DD- using 'start' and then add 'slug' to the end of it
source_url: ""
external_id: ""
---

Event description goes here