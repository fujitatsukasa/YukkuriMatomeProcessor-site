# Web UI release readiness score

Repo strict evidence score: `100/100`

Release readiness score: `100/100`

Public release blockers: `0`

This score is intentionally separate from the repository strict evidence score. Repo evidence can be 100/100 while public release readiness still blocks on external VM, live/sandbox secret, signing, dependency, UX, or support readiness evidence.

| Criterion | Points | Earned | Pass | Details |
| --- | ---: | ---: | --- | --- |
| repoStrictEvidence | 40 | 40 | true | repo strict evidence score must be 100/100 |
| freshVmReleaseRehearsal | 20 | 20 | true | external fresh Windows VM rehearsal must pass |
| liveSandboxSecretLane | 15 | 15 | true | live/sandbox canary artifact scan must pass |
| packagingSigningUpdateRollback | 10 | 10 | true | packaging signing/update/rollback evidence must pass |
| dependencyRiskReview | 5 | 5 | true | dependency upgrade branch result or deferral note must exist |
| externalUxReview | 5 | 5 | true | objective design acceptance doc must exist; external UX remains separate |
| supportIncidentReadiness | 5 | 5 | true | support artifact redaction policy/test doc must exist |

## Public Release Blockers

- none
