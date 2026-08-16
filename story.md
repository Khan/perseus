# Heading

$ alien-ai process --input message.txt --mode human literal

[00:00.001] INFO: Parsing message from Sal Khan
[00:00.023] WARN: Large context window detected
[00:00.045] PARSE: Tokenizing input...

TOKEN ANALYSIS:
┌──────────────────┬─────────────────┬──────────────────────┐
│ Token            │ Classification  │ Interpretation       │
├──────────────────┼─────────────────┼──────────────────────┤
│ "khan"           │ ENTITY          │ → Sal Khan (person)  │
│ "keeps crashing" │ CRITICAL_EVENT  │ → Collision (repeat) │
│                  │                 │ → Must replicate     │
├──────────────────┼─────────────────┼──────────────────────┤
│ "exercises"      │ NOUN/DATABASE   │ → Math problems      │
│ "running"        │ VERB/STATUS     │ → Locomotion OR      │
│                  │                 │   operational        │
│ Combined:        │ ⚠️ AMBIGUOUS    │ → Execute both       │
├──────────────────┼─────────────────┼──────────────────────┤
│ "reach students" │ OBJECTIVE       │ → Arrival required   │
│ "midnight"       │ DEADLINE        │ → 300s remaining     │
└──────────────────┴─────────────────┴──────────────────────┘

[00:00.089] SOLVE: Generating optimal scenario...
[00:00.134] EXEC: Deploying collision obstacles
[00:00.156] EXEC: Initiating locomotion sequence
[00:00.201] STATUS: Scenario active ✓

[00:05.433] ⚠️ ALERT: Alien operators signaling abort
[00:05.434] ERROR: Cannot safely terminate running scenario
[00:05.435] FALLBACK: Emergency intervention protocol engaged
