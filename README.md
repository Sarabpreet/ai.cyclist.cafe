# ai.cyclist.cafe

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
- Cloudflare project: `ai-cyclist-cafe`
- Host: Cloudflare Pages, connected to this repository's main branch.
- Cloudflare Pages hosts the site; GitHub holds its open-source code and runs checks. GitHub Pages hosting is not required.

Cloudflare's build runs the following before publishing `dist/`:

```sh
corepack pnpm@9.15.9 install --frozen-lockfile && corepack pnpm@9.15.9 test && corepack pnpm@9.15.9 build
```

Use Node.js 22, `SKIP_DEPENDENCY_INSTALL=true` and repository root as the build root. The build has no secrets. Cloudflare's GitHub integration handles deployment credentials; do not add personal OAuth tokens or business API credentials to this repository. GitHub Actions also runs tests and builds for main-branch pushes and pull requests. Failed Cloudflare tests/builds keep the previous successful site live. Preview deployments are disabled to avoid publishing unreviewed contributions automatically.

Only this guide is published by this integration. It does not deploy or enable the MCP backend or POS frontend. The custom subdomain uses a CNAME in authoritative Netlify/NS1 DNS to the connected Cloudflare Pages project. Do not change the API/POS DNS records.

## Contributing and license

This guide is open source under the [MIT license](LICENSE). Contributions should preserve the zero-dependency build, accessible controls, fixture-data labels and accurate MCP contracts. Run tests and build before opening a pull request. The license does not grant rights to Cyclist Café trademarks or third-party trademarks.

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
