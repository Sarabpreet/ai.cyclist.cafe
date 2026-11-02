# ai.cyclist.cafe

[![Guide checks](https://github.com/Sarabpreet/ai.cyclist.cafe/actions/workflows/checks.yml/badge.svg)](https://github.com/Sarabpreet/ai.cyclist.cafe/actions/workflows/checks.yml)

Standalone public guide to the Cyclist Café MCP server, for customers, agents and developers. Intended hostname: **https://ai.cyclist.cafe**. Server endpoint: **https://api.cyclist.cafe/mcp**.

This repository is independent of `pos_cc` and `api.cyclist.cafe`. It is a static documentation site: no backend, customer sign-in, API proxy, analytics, credentials, external fonts, runtime packages or `node_modules` are needed. pnpm is pinned, so future additions can use its shared content-addressed store. Do not copy another repository's dependencies into this one.

## Local use

Use Node.js 22 and pnpm 9.15.9:

```sh
corepack pnpm@9.15.9 install --frozen-lockfile
corepack pnpm@9.15.9 test
corepack pnpm@9.15.9 build
corepack pnpm@9.15.9 dev
```

With a working pnpm shim, plain `pnpm install`, `pnpm test`, `pnpm build` and `pnpm dev` work too. Using the explicit Corepack command avoids a broken global pnpm launcher. Preview: http://127.0.0.1:4174. Set `PORT` for another local port.

Both `dev` and `preview` build and serve `dist/` using Node's HTTP server. Re-run the command after editing source; there is no development framework or hot-reload dependency. `pnpm build` only replaces this repository's generated `dist/` folder.

## Structure

- `src/index.html`: complete readable guide, including current client instructions and local/live readiness caveat.
- `src/styles.css`: responsive café branding, print rules and reduced-motion support.
- `src/app.js`: keyboard-accessible tabs, guide search, copy controls, screenshot dialog and tool filters.
- `src/tools.json`: the 12 documented tools, scopes and executable request shapes. The build renders the tool table into HTML; reading it does not require JavaScript.
- `public/llms.txt`: agent-readable workflow and confirmation rules.
- `public/cyclist-mcp.json`: non-secret connection metadata. This is documentation, not an MCP discovery standard or import configuration for a specific AI client.
- `public/screenshots/`: actual local test captures and provenance. All visible identities/orders are fictional fixtures.
- `public/_headers`: Cloudflare security headers; no remote scripts, frames or API calls are needed.
- `scripts/`: zero-dependency build and local preview.
- `tests/`: build, internal links, image references, tool contract and security checks.

## Publishing

- Live guide: https://ai.cyclist.cafe
- Public source: https://github.com/Sarabpreet/ai.cyclist.cafe
- Cloudflare project: `ai-cyclist-cafe` (`https://ai-cyclist-cafe.pages.dev`)
- Host: Cloudflare Pages, connected to this repository's main branch.
- Cloudflare Pages hosts the site; GitHub holds its open-source code and runs checks. GitHub Pages hosting is not required.

Cloudflare's build runs the following before publishing `dist/`:

```sh
corepack pnpm@9.15.9 install --frozen-lockfile && corepack pnpm@9.15.9 test && corepack pnpm@9.15.9 build
```

Use Node.js 22, `SKIP_DEPENDENCY_INSTALL=true` and repository root as the build root. The build has no secrets. Cloudflare's GitHub integration handles deployment credentials; do not add personal OAuth tokens or business API credentials to this repository. GitHub Actions also runs tests and builds for main-branch pushes and pull requests. Failed Cloudflare tests/builds keep the previous successful site live. Preview deployments are disabled to avoid publishing unreviewed contributions automatically.

To update the site, merge a reviewed change into `main`. Cloudflare runs the tests and builds before publishing. To recover a failed content release, roll back to a previous successful deployment in Cloudflare Pages and revert the corresponding source change.

Only this guide is published by this integration. It does not deploy or enable the MCP backend or POS frontend. The custom subdomain uses a CNAME in authoritative Netlify/NS1 DNS to the connected Cloudflare Pages project. Do not change the API/POS DNS records.

## Contributing and license

This guide is open source under the [MIT license](LICENSE). Contributions should preserve the zero-dependency build, accessible controls, fixture-data labels and accurate MCP contracts. Run tests and build before opening a pull request. The license does not grant rights to Cyclist Café trademarks or third-party trademarks. Third-party brand artwork is excluded from the MIT license; original sources are recorded in `public/brands/README.txt`.

## Readiness and content accuracy

The underlying menu/order/event contracts come from the existing API source and its local tests. The tests verified event confirmation/cancellation in both People and Events. Production activation, external ChatGPT/Claude OAuth and live SMS remain separate rollout checks. The page must retain this distinction until a real hosted verification succeeds; it must not display a fabricated live-health badge.

Only public screenshots from disposable fixtures belong here. Recapture with backend `test:mcp:ordering:ui` and `test:mcp:events:ui`; inspect images before copying. No staff salaries, real customer data, tokens, passwords, environment files or account screenshots should be published.

Official client instructions checked 1 November 2026:

- OpenAI: https://developers.openai.com/api/docs/guides/custom-mcp-server
- Claude: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
- MCP: https://modelcontextprotocol.io/docs/develop/connect-remote-servers

Current clients may offer CIMD/published client identity, but Cyclist's implementation supports **DCR**. Use automatic client registration, not those unsupported alternatives. Recheck client UI instructions when publishing after a delay.

## Testing

`pnpm test` builds the actual static output and verifies unique IDs, local anchors/assets, screenshot references, canonical endpoint, tool names/permissions, JSON examples, machine-readable instructions and security headers. No business API calls or provider messages are made.

Browser QA additionally checks responsive overflow, keyboard tabs, guide search, screenshot open/close, copy controls and filters. It can use an existing isolated headless browser harness; no browser dependency is shipped in the site.

## Search metadata

The page targets “MCP Server for Cyclist Cafe” with a descriptive title, visible H1, natural copy, a canonical URL, robots directives, sitemap, Open Graph/Twitter preview and Organization/WebSite/TechArticle structured data. The schema describes the guide, not a claim that the backend is active. A build-generated CSP hash permits only the exact structured-data block while executable inline scripts remain blocked.

The social preview is `public/social/mcp-server-cyclist-cafe.jpg` (1200 × 630), rendered from the adjacent SVG source. Update the canonical URL, schema, social URLs, llms.txt and sitemap together if the hostname changes. Keep `dateModified` and sitemap `lastmod` tied to actual content changes. Publishing and search indexing are separate; this repository does not submit URLs to Search Console or promise rankings.


## Presentations at /ppt

`/ppt/` is the presentation library. `/ppt/ai/` (`public/ppt/ai/`) is a 19-slide Reveal.js presentation about why the café exposes MCP, how customers connect and use it, and when it is useful. Open `/ppt/ai/` (or `/ppt/ai`) on the local preview or published guide. The main navigation links to it.

- Arrow keys or swipe: navigate; Esc: overview; F: full screen.
- Slides / M: jump to a slide; Notes / S: open the current slide's public presenter notes.
- Print / PDF opens `/ppt/ai/?print-pdf`. In Chromium's print dialog, choose Save as PDF, landscape, no margins and background graphics. See [Reveal.js PDF instructions](https://revealjs.com/pdf-export/).
- The server URL has a copy control. The deck never calls the business API or creates orders or RSVPs.
- Screenshot slides reuse labeled, fictional local fixtures. Hosted activation and client/SMS verification remain separate.

Reveal.js 6.0.2 is vendored with its MIT license in `public/ppt/ai/vendor/`, verified from the official npm tarball. This keeps the existing pnpm build free of package dependencies and avoids a CDN requirement. Theme and controls live in `presentation.css` and `presentation.js`; slide content and notes are editable in `index.html`.

The production CSP keeps executable scripts restricted to self. The build hashes Reveal's two fixed print CSS blocks and its two display-restoration attributes instead of allowing arbitrary inline styles. The local preview serves the built security headers too; recheck printing after changing Reveal, deck dimensions or margins.

The POS staff training is at `/ppt/pos/` (`public/ppt/pos/`): 72 Reveal.js slides covering the POS and Open → Use system → Hand over → Close day. The deck includes a training PDF, daily checklist PDF/HTML, and trainer notes. It contains fictional examples and never calls the business API. `deck-data.js` holds its content; the training source remains unchanged in the separate `pos-staff-training` folder.

Old `/ppt/#/slide-id` and `/ppt/?print-pdf` links forward to the MCP deck at `/ppt/ai/`. Both `/ppt/ai` and `/ppt/pos` resolve without a trailing slash on the preview; Cloudflare Pages canonicalizes directory URLs.

## Restricted POS presentation

`/ppt/pos/` and every nested asset/download are protected by a Cloudflare Pages advanced-mode worker. The public library and sitemap do not list this deck. Configure `POS_PRESENTATION_PASSWORD` and a random `POS_PRESENTATION_COOKIE_SECRET` as encrypted production Pages secrets before deploying. Neither value is committed or included in the browser bundle. Missing configuration fails closed.

Successful entry issues a signed HttpOnly, Secure, SameSite=Strict cookie scoped to `/ppt/pos`, expiring after 90 days. It remembers that browser, not a person across devices. Password or signing-key rotation invalidates existing access. Protected responses use `private, no-store` and `noindex, nofollow, noarchive`; a localStorage flag cannot bypass the server check. The worker includes a best-effort per-isolate attempt limit, not a durable rate limiter.

Local preview uses the same worker: provide both variables through the shell before `pnpm preview`. For local tests use disposable test values. Do not use a plain static-file server to preview access control.

The repository and previous public versions already contain the training source. This gate controls hosted access; it does not make public Git history confidential or retract earlier copies. Do not put confidential staff/customer records in the training files.


## Recent orders, rewards and table status additions

The guide now documents `list_my_orders`, explicit `orderNumber` lookup in `get_my_order`, `get_my_rewards` and public `get_table_status`. These require the corresponding API release; documentation publication does not activate them. Recent orders use orders:read, a rolling seven-day limit, 5 results by default (1–20), customer/grant-scoped opaque pagination, and canonical IDs for follow-up details. Reward reads require new rewards:read consent. Table snapshots need the public tool enabled in Setup and never reserve seats. Refresh tool discovery after the API release, then re-consent only needed permissions. Existing quote/checkout and RSVP confirmations remain mandatory.
