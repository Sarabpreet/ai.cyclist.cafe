// Preserve previously shared MCP slide links and print links at /ppt/.
if(location.hash.startsWith('#/') || new URLSearchParams(location.search).has('print-pdf')) {
 location.replace('/ppt/ai/' + location.search + location.hash);
}
