Cyclist Café MCP guide screenshots

Source: actual standalone pos_cc frontend in isolated local integration tests.
These images show fictional fixture customers, phone numbers, client IDs,
orders and bookings. They contain no real customer records or credentials.
Do not describe them as screenshots of ChatGPT/Claude connection menus.

customer-consent.png: /tmp/cyclist-mcp-ordering/consent.png
order-confirmation.png: /tmp/cyclist-mcp-ordering/checkout.png
order-mobile.png: /tmp/cyclist-mcp-ordering/checkout-mobile.png
event-confirmation.png: /tmp/cyclist-mcp-events/rsvp-desktop.png
events-attendees.png: /tmp/cyclist-mcp-events/events-going.png
people-history.png: /tmp/cyclist-mcp-events/people-going.png
admin-setup.png: /tmp/cyclist-mcp-events/setup-events.png

Capture tests: backend test:mcp:ordering:ui and test:mcp:events:ui.
The real API/UI flows ran against disposable loopback PostgreSQL.
External Firebase SMS identity proof was simulated, not live SMS.
