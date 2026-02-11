@echo off
setlocal

REM Always run from this repo root, even if invoked from system32 etc.
cd /d "%~dp0"

REM Prefer `py` launcher if available, otherwise fall back to `python`.
where py >nul 2>nul
if %errorlevel%==0 (
  py "%~dp0serve_local.py" %*
  exit /b %errorlevel%
)

python "%~dp0serve_local.py" %*
exit /b %errorlevel%

