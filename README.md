# turo-mcp

MCP plugin for Claude that connects to your Turo account — pull bookings, calendar, earnings, and gap analysis via browser automation.

## Setup

1. Install dependencies:
   ```
   npm install
   npx playwright install chromium
   ```

2. Register with Claude Code (add to your MCP settings):
   ```json
   {
     "mcpServers": {
       "turo": {
         "command": "node",
         "args": ["C:\\Users\\jjm72\\OneDrive\\Documents\\Claude_Plugins\\turo-mcp\\index.js"]
       }
     }
   }
   ```

3. First time: ask Claude to run `turo_login` — it opens a browser, you log in, session is saved.

## Tools

| Tool | What it does |
|---|---|
| `turo_login` | Log in to Turo (opens browser, saves session) |
| `get_bookings` | Pull upcoming/active/past trips |
| `get_calendar` | Check vehicle availability calendar |
| `get_earnings` | View your earnings and payout summary |
| `analyze_gaps` | Analyze booking gaps and get pricing suggestions |
