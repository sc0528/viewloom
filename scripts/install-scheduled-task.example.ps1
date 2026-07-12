param(
    [string]$TaskName = "CreatorAnalyticsRefreshExample",
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

Write-Host "Demo placeholder only."
Write-Host "Task name: $TaskName"

if ($DryRun) {
    Write-Host "Dry run: no scheduled task was created."
    exit 0
}

Write-Host "A pro version could register a scheduled refresh task here."
