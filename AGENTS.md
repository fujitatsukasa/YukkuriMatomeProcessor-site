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

## Landing Page Rules

### Product positioning
- ゆっくりまとめプロセッサーは、記事URL・スレッドURLから、ゆっくり動画の台本下地とYMM4前準備を支援するWindows向けツールです。
- 動画を完全自動生成するツールではありません。
- YMM4を開く前の下ごしらえを支援するツールです。

### Customer-first LP rule
- LPでは、機能を並べる前に、購入前のユーザーが知りたいことに答えてください。
- 優先する質問:
  - 何を入れると何が出るか
  - YMM4とどう関係するか
  - Freeでどこまで確認できるか
  - Premiumで何が解除されるか
  - Windows/YMM4前提か
  - 動画は自動完成するのか
  - 39,800円は買い切りか月額か
  - 導入前に何を用意すればいいか
  - 安全にダウンロード確認できるか
  - 収益化や再生数保証はあるか

### Copy rules
- Use short, concrete Japanese copy.
- Prefer:
  - URLを貼るだけ
  - YMM4前の下ごしらえ
  - 少数URLでまず確認
  - Freeで流れを見る
  - Premiumで制限解除
  - 動画完成はYMM4で仕上げる
  - 保存先と素材パスを先に揃える
- Avoid:
  - 最先端
  - 革新的
  - 絶対
  - 誰でも稼げる
  - 完全自動
  - 爆速収益化
  - 再生数保証
  - AIが全部やります

### Visual direction
- Dark premium creator studio.
- Real app screenshots first.
- Generated images only for decoration.
- Product demo and workflow animation are more important than abstract visuals.
- Do not fake UI screenshots with generated images.
- Avoid existing anime/IP character imitation.
- Use abstract speech bubbles, timeline blocks, file cards, and creator workflow visuals.

### Animation rules
- Use animation to clarify workflow, not to distract.
- Respect prefers-reduced-motion.
- Use opacity and transform primarily.
- Avoid layout shift.
- Mobile should be lighter than desktop.

### Legal and trust rules
- Do not add fake testimonials, fake user numbers, fake time-saving stats, or unverified claims.
- Always keep:
  - Windows 10 / 11
  - YMM4 required
  - Mac unsupported
  - Free available
  - Premium 39,800 yen tax included
  - One-time purchase
  - No monthly subscription
  - No revenue guarantee
  - No full automatic video completion
  - User must check rights, sources, materials, and final edit

### Verification
- Before finishing LP work:
  - run lint
  - run typecheck if available
  - run build
  - check mobile layout
  - check CTA links
  - check video fallback behavior
  - check no false claims were added
