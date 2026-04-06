# Realtime Payload Inspector

A local debugging aid for inspecting OpenAI-style realtime payloads and patching missing required fields like `response.phase`.

## What works
- Paste outbound realtime payload JSON
- Validate presence of critical fields
- Generate a patched payload preview
- Use the sample payload to reproduce the missing-phase issue quickly

## Run locally
```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

## Meaningful user path
1. Paste a realtime payload
2. Run inspection
3. Copy the patched payload with `response.phase` added

## Known gaps
- This is an offline inspector, not a live websocket proxy
- Validation rules are intentionally narrow for this bug class
- No schema fetch from upstream docs yet
