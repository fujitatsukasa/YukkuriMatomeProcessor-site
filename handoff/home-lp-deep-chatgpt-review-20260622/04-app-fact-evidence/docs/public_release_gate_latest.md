# Public release gate

Generated: `2026-06-16T05:25:54.237281+00:00`

Passed: `false`

Workspace: `C:\VScode\YMP_Distribution`

This is the final public distribution gate. It intentionally does not trust a single broad score; it requires every named release evidence report to pass.

| Check | Pass | Severity | Details | Evidence | Next action |
| --- | --- | --- | --- | --- | --- |
| releaseArtifactsPresent | true | blocker | installer, package, feed, release notes, hashes, and SBOM exist | C:\VScode\YMP_Distribution\Releases |  |
| distributionReleaseEvidence | true | blocker | distribution release evidence passed | C:\VScode\yukkurimatomeprocessor_Ver2_VITE\docs\distribution_release_evidence_latest.json |  |
| packagedDistributionSmoke | true | blocker | packaged distribution smoke passed | C:\VScode\yukkurimatomeprocessor_Ver2_VITE\docs\packaged_distribution_smoke_latest.json |  |
| webView2Prerequisite | true | blocker | WebView2 is handled as an installer/runtime prerequisite with startup preflight evidence | C:\VScode\yukkurimatomeprocessor_Ver2_VITE\docs\webview2_prerequisite_latest.json |  |
| signingPrerequisites | true | blocker | code-signing prerequisites passed with a self-signed certificate accepted for this release scope | C:\VScode\yukkurimatomeprocessor_Ver2_VITE\docs\signing_prerequisites_latest.json |  |
| authenticodeSignature | false | blocker | 91 Authenticode check(s) failed | C:\VScode\yukkurimatomeprocessor_Ver2_VITE\docs\authenticode_signature_latest.json | Sign the release artifacts and rerun scripts\verify_authenticode_signatures.ps1 |
| freshVmRehearsal | false | blocker | package signature must be valid | C:\VScode\yukkurimatomeprocessor_Ver2_VITE\docs\web_ui_fresh_vm_release_rehearsal_latest.json | Run the signed installer in a fresh Windows VM and rerun scripts\web_ui_fresh_vm_release_rehearsal.py --strict |
| signedPackageEvidence | false | blocker | release Setup.exe does not have a valid Authenticode signature | C:\VScode\yukkurimatomeprocessor_Ver2_VITE\docs\authenticode_signature_latest.json | Sign the release Setup.exe and rerun scripts\verify_authenticode_signatures.ps1 |
| releaseReadinessScore | true | blocker | release readiness score passed: 100/100 | C:\VScode\yukkurimatomeprocessor_Ver2_VITE\docs\web_ui_release_readiness_score_latest.json |  |
| serverAccessPolicy | true | blocker | server access policy ledger and runtime markers passed | C:\VScode\yukkurimatomeprocessor_Ver2_VITE\docs\server_access_and_data_policy_latest.json |  |
| r2Publication | true | blocker | R2 HTTPS publication and cache policy passed | C:\VScode\yukkurimatomeprocessor_Ver2_VITE\docs\r2_release_publication_latest.json |  |
| authBillingRealUiE2E | true | blocker | auth and billing real UI E2E evidence passed | C:\VScode\yukkurimatomeprocessor_Ver2_VITE\docs\auth_billing_ui_e2e_latest.json |  |
| publicReleaseExecutionManifest | true | warning | public release execution manifest is ready | C:\VScode\yukkurimatomeprocessor_Ver2_VITE\docs\public_release_execution_manifest_latest.json |  |

## Blocking Findings

- authenticodeSignature: 91 Authenticode check(s) failed
- freshVmRehearsal: package signature must be valid
- signedPackageEvidence: release Setup.exe does not have a valid Authenticode signature

## Warnings

- none
