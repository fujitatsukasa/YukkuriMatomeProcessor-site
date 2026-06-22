# Fresh VM execution environment

Generated: `2026-06-13T00:34:22.043594+00:00`

Passed: `true`

Workspace: `C:\VScode\YMP_Distribution`

| Check | Pass | Severity | Details | Next action |
| --- | --- | --- | --- | --- |
| releaseWorkspace | true | blocker | release workspace and Releases directory exist |  |
| localFreshVmProvider | true | blocker | available provider(s): VirtualBox |  |
| cloudVmCredentials | false | warning | no Azure/AWS/GCP credential environment variables are present for provisioning a remote Windows VM | Provide a clean external Windows VM or cloud credentials if Codex should provision one |
| dockerIsNotFreshWindowsVm | false | warning | Docker is present, but a Docker container is not accepted as fresh Windows VM evidence | Use a real fresh Windows VM for install/update/uninstall evidence |

## Commands

| Command | Path | Present |
| --- | --- | --- |
| WindowsSandbox.exe | `` | false |
| vmconnect.exe | `` | false |
| VBoxManage.exe | `C:\Program Files\Oracle\VirtualBox\VBoxManage.exe` | true |
| qemu-system-x86_64.exe | `` | false |
| docker.exe | `C:\Program Files\Docker\Docker\resources\bin\docker.exe` | true |
| wsl.exe | `C:\Windows\system32\wsl.exe` | true |

## Blocking Findings

- none

## Warnings

- cloudVmCredentials: no Azure/AWS/GCP credential environment variables are present for provisioning a remote Windows VM
- dockerIsNotFreshWindowsVm: Docker is present, but a Docker container is not accepted as fresh Windows VM evidence
