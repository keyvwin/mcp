// Smoke: start the server over stdio, list tools, run one cheap call. Needs APIFY_TOKEN.
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import assert from 'node:assert/strict';

const client = new Client({ name: 'smoke', version: '0' });
await client.connect(new StdioClientTransport({ command: 'node', args: ['dist/index.js'], env: process.env }));
const { tools } = await client.listTools();
const names = tools.map((t) => t.name).sort();
assert.deepEqual(names, ['company_email_format', 'find_decision_makers', 'find_email_by_linkedin_url', 'find_lookalike_companies', 'find_new_hires', 'search_people']);
for (const t of tools) assert.ok(t.description.length <= 500, `${t.name} description too long for MCP clients`);

const r = await client.callTool({ name: 'company_email_format', arguments: { domains: ['linear.app'], sampleLimit: 50, maxChargeUsd: 0.1 } });
const { summary, rows } = JSON.parse(r.content[0].text);
assert.equal(summary.runStatus, 'SUCCEEDED');
assert.equal(rows.length, 1);
assert.ok(['found', 'weak_evidence'].includes(rows[0]._status), rows[0]._status);
console.log('ok', summary.byStatus, rows[0].pattern, rows[0].confirmations);

const c = await client.callTool({ name: 'search_people', arguments: { mode: 'count', countries: ['gb'], titleKeywords: ['vp sales'] } });
const cr = JSON.parse(c.content[0].text);
assert.equal(cr.summary.runStatus, 'SUCCEEDED');
console.log('count ok', JSON.stringify(cr.rows[0]).slice(0, 200));
await client.close();
