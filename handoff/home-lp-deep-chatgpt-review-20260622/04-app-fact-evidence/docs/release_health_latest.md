# Release health

最終更新: 2026-05-03

Release health は release ごとの startup/crash/update/support bundle event を redacted に記録する。remote 送信対象にできる field は下記のみ。

- release
- version
- environment
- anonymous_install_hash
- os_family
- os_version_major
- webview_runtime_major
- startup_duration_ms
- error_code
- exception_type
- redacted=true

raw user id、email、local path、prompt、script/project content、provider key、refresh token、Stripe/session secret、serial raw value は送らない。
