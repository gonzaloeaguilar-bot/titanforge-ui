# Friday harvest output

`assemble_friday.sh` writes `<monday>.generated.json` here from the Granola
Friday-call decisions. `promote_week.py` reads it on the Saturday run and folds
it into the board.

This directory was untracked until 2026-09-20 — the assembler wrote into a
checkout sitting on a feature branch, so a promotion running from a clean
worktree of `main` found nothing at all and reported "harvested added: 0" as if
that were a success.
