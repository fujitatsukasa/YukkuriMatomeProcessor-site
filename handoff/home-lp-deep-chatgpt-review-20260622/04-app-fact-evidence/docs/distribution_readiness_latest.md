# Distribution readiness

Generated: `2026-06-16T05:25:54.237349+00:00`

Passed: `false`

Workspace: `C:\VScode\YMP_Distribution`

| Check | Pass | Severity | Details | Next action |
| --- | --- | --- | --- | --- |
| workspaceOutsideRepo | true | blocker | distribution workspace is outside the repository |  |
| workspacePrepared | true | blocker | all required distribution workspace directories exist |  |
| externalReleaseArtifacts | true | blocker | external workspace contains Setup.exe, full package, and Velopack feed |  |
| distributionReleaseEvidence | true | blocker | sha256sums, SBOM, release notes, and inventory evidence exist |  |
| packagedDistributionSmoke | true | blocker | packaged distribution smoke passed |  |
| buildScriptExternalWorkspace | true | blocker | Velopack release script defaults to external workspace |  |
| updateSourcesSafeDefault | true | blocker | repository update source is disabled until release build |  |
| localPackagingProbe | true | warning | local clean-root packaging probe passed |  |
| signingPrerequisites | true | blocker | signtool, SignParams, timestamp, and self-signed code-signing certificate prerequisites passed for this release scope |  |
| localAuthenticodeSignature | false | blocker | local release Authenticode verification is missing or failed | Sign Setup.exe, nupkg, portable zip, and app executables, then rerun scripts\verify_authenticode_signatures.ps1 |
| freshVmRehearsal | false | blocker | external fresh Windows VM rehearsal is missing or failed | Run the signed installer on a fresh Windows VM and verify it with scripts\web_ui_fresh_vm_release_rehearsal.py --strict |
| releaseReadinessScore | true | blocker | release readiness passed: 100/100 |  |
| serverAccessPolicy | true | blocker | server access policy ledger and runtime markers passed |  |
| signedPackageEvidence | false | blocker | release Setup.exe does not have a valid Authenticode signature | Sign the release Setup.exe and rerun scripts\verify_authenticode_signatures.ps1 |
| r2PublicationEvidence | true | blocker | R2 publication evidence passed |  |
| authBillingRealUiE2E | true | blocker | Launcher/Main auth and billing real UI E2E evidence passed |  |
| publicReleaseGate | false | blocker | final public release gate failed: authenticodeSignature: 91 Authenticode check(s) failed | Run scripts\verify_public_release_gate.py after regenerating all release evidence |

## Blocking Findings

- localAuthenticodeSignature: local release Authenticode verification is missing or failed
- freshVmRehearsal: external fresh Windows VM rehearsal is missing or failed
- signedPackageEvidence: release Setup.exe does not have a valid Authenticode signature
- publicReleaseGate: final public release gate failed: authenticodeSignature: 91 Authenticode check(s) failed

## Warnings

- none
