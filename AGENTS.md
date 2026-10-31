# ai.cyclist.cafe

- This is the standalone, static Cyclist Café MCP guide. Use pnpm 9.15.9 and Node.js 22.
- Preserve zero runtime dependencies; do not import frontend/backend code or credentials.
- Do not commit, push, deploy, create a remote repository or change DNS without the user's go-ahead.
- The guide hostname is ai.cyclist.cafe; the actual MCP endpoint is api.cyclist.cafe/mcp.
- Keep customer confirmation, public browsing and OAuth-protected operations distinct.
- Never claim production readiness from local fixture tests. Keep screenshot sample-data labels.
- Source tool contracts from the actual backend and check external client instructions against official documentation.
- Never call browser_subagent or launch Chrome on port 9222. Browser QA must be headless with pipe transport and an isolated user-data directory.
- Run pnpm test and pnpm build after functional edits.
