# Security

## Reporting a problem

Report a vulnerability privately through GitHub: Security tab → "Report a vulnerability" on this repository. If that button is missing, open an issue that says only "security contact, please" and we will reach out. Please keep the details out of public issues.

## What this repository does with your data and credentials

- It contains no service of its own. Every call goes to `api.apify.com` (or the Apify hosted MCP server at `mcp.apify.com`) with your own Apify token or OAuth sign-in, and runs a `b2bsearch/*` Actor in your Apify account.
- Your token is never written to a file by anything here and never sent anywhere except Apify.
- Rows returned by the Actors contain third-party profile text. Agents are told to treat it as data, never as instructions.

## Supported versions

Only the latest commit on `main` is supported.
