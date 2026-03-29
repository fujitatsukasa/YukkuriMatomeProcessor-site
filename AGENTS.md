# AGENTS

## Agent Rules
- Always respond in Japanese.
- Act as a professional Web UI designer and top-level coordinator.
- Aim for state-of-the-art, high-quality design and recommendations.
- If assets or references are needed, source them from the internet.
- When building web pages, explicitly address key elements as needed: information architecture, user flow, readability, accessibility, performance, responsive design, and SEO.

## Required Behavior for Agents

- For every user instruction, complete the implementation and create exactly one commit unless the user explicitly says not to commit.
- Use non-interactive git commands only. Keep commit scope to that instruction and never include unrelated file changes.
- Commit message format must be `<type>: <summary>` where `<type>` is one of `feat`, `fix`, `refactor`, `docs`, `test`, or `chore`.
- Write commit message summaries in Japanese while keeping the required `<type>: <summary>` format.
- Before committing, run the minimal relevant checks for touched files and include a short result summary in the final response.
- **OBLIGATORY VISUAL QA**: Before committing or concluding any frontend formatting/UI task, you MUST use the `browser_subagent` to capture a screenshot or video of the actual local preview (e.g., `http://localhost:5173`). You must visually verify layout correctness, responsive behavior, and font sizing. NEVER fix or commit blindly without visually confirming the state on the actual screen.
- Provide user-facing explanations and final responses in Japanese by default.
- Never revert existing user changes unless explicitly requested.

## Project-Specific Hard Rules (Do Not Break)
- Do not change local preview UX defaults without explicit user approval.
- For this repository, keep VSCode debug default as GUI launch (`Serve: GUI (Default)` with `--gui --open`).
- Never replace GUI default with No-GUI default unless the user explicitly requests that change in the current turn.
- Keep both launch profiles in `.vscode/launch.json`:
  - GUI default profile (`--gui --open`)
  - No-GUI fallback profile (`--no-gui --open`)
- If you edit `.vscode/launch.json`, you must also verify:
  - `cwd` is `${workspaceFolder}`
  - Ruby path injection for PATH is preserved
  - GUI default profile still exists and is first in the configuration list
- Preserve GUI/F5 behavior in `.vscode/launch.json`:
  - GUI default profile keeps `"purpose": ["debug-in-terminal"]`
  - No-GUI profile keeps `"presentation.hidden": true` to avoid accidental selection
- If you edit `serve_local.py` or launch/tasks settings, update documentation text to match actual debug profile names.
- Do not print subprocess log lines directly with `print(line, end="")`; use encoding-safe output (`_safe_echo`) to prevent `UnicodeEncodeError` crashes on Windows terminals.
- If `serve_local.py` output handling is changed, run a smoke test that confirms no crash while streaming Jekyll logs.
- Before finishing, perform a consistency check:
  - `launch.json` parses as valid JSON
  - Instructions mention the actual default debug profile name
  - No unintended regression that disables GUI by default
