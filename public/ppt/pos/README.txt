CYCLIST CAFÉ — POS FEATURES AND STAFF SHIFT SOP
31 October 2026

START
Open index.html for the interactive 72-slide Reveal.js presentation.
All slide content, fonts, logos, image and Reveal.js files are included locally.
The deck makes no calls to the café API and changes no business data.

PRESENTER NOTES
Use a local web server for speaker view:
  cd <the unzipped presentation folder>
  python3 -m http.server 8057 --bind 127.0.0.1
Then open http://127.0.0.1:8057/ and press S.

CONTROLS
Arrow keys / swipe: navigate
Esc: overview
M or Chapters: chapter index and topic filter
Search: built-in text search
F: full screen
B: blank the screen
S: speaker notes, next-slide preview and timer

COMPANIONS
Cyclist-Cafe-POS-Staff-Training.pdf: printable copy of the slides
Daily-Shift-Checklist.pdf / checklist.html: one-page counter SOP
trainer-notes.html: all trainer notes, implementation references and glossary

EDITING
Edit deck-data.js to change the wording, notes and sequence.
Edit training.css to change the theme and layouts.
The HTML presentation stays editable. Re-export PDFs after changing it.
Reveal.js is pinned to 6.0.2 and distributed with its MIT license in vendor/LICENSE.
Font licenses are in assets/fonts. Existing café assets remain their owners’ assets.

COURSE SCOPE
All 12 main POS modules and every current Setup tab are covered.
Core staff training emphasizes Open → Use system → Hand over → Close day.
Manager/admin reference slides cover configuration and privileged functions.
Examples are fictional. Practise only with training records, never live payments.
This is a software operating guide; keep café-specific food safety, cleaning,
key custody and cash-safe procedures alongside it.

CURRENT OPERATIONAL RULES
Login and register responsibility are separate. The incoming cashier needs
an active POS-enabled, linked login and must accept with their own session.
Cash collection and register transitions need a connection.
Other devices’ unsynced work must be checked on those devices.
A saved or printed ticket is not proof of payment or food delivery.

REFERENCE
Current local source: pos_cc and api.cyclist.cafe.
Detailed implementation references appear in speaker notes / trainer notes.
Official Reveal.js documentation: https://revealjs.com/
