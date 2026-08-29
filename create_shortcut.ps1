$wscript = New-Object -ComObject WScript.Shell
$desktop = [System.Environment]::GetFolderPath('Desktop')
$shortcutPath = Join-Path $desktop "Hoa Hoc 8 Master.lnk"
$shortcut = $wscript.CreateShortcut($shortcutPath)
$shortcut.TargetPath = "C:\Users\ADMIN\.gemini\antigravity\scratch\hoa8_app\index.html"
$shortcut.WorkingDirectory = "C:\Users\ADMIN\.gemini\antigravity\scratch\hoa8_app"
$shortcut.Description = "Luyen Hoa Hoc 8 Master"
$shortcut.Save()
Write-Host "Da tao shortcut thanh cong tai: $shortcutPath"
