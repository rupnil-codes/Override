<!--
 Copyright (C) 2026 Rupnil Codes
 
 This file is part of Override.exe.
 
 Override.exe is free software: you can redistribute it and/or modify
 it under the terms of the AGPL-3.0 License.
-->

# Override
[![Made with React](https://img.shields.io/badge/React%20JS-%5E19.2.4-blue?logo=react&logoColor=white)](https://react.dev/ "Go to React homepage")
[![Licence](https://img.shields.io/github/license/rupnil-codes/Override.exe)](https://www.gnu.org/licenses/agpl-3.0.en.html "GNU AGPL 3.0")
[![Tracked with Hackatime](https://hackatime-badge.hackclub.com/U0A4UTULSLE/Override)](https://hackatime.hackclub.com/ "Go to Hackatime homepage")
[![Commit activity](https://img.shields.io/github/commit-activity/w/rupnil-codes/Override.exe)](https://github.com/rupnil-codes/Override.exe/commits/main/ "Commit History")
[![Last Commit](https://img.shields.io/github/last-commit/rupnil-codes/Override.exe)](https://github.com/rupnil-codes/Override.exe/commits/main/ "Commit History")

Your PC has been compromised by a group called the "HackClub". Can you regain control?

### TODOS:
- [X] TIME AND DATE (Added in v0.1.5.0)
- [X] ~~HINT after failed try.~~
- [X] Make the input shake after failed try (+RED) (Done in v0.1.7.5(1))
- [X] Hint beside the P.S. for my "other friends" (Added in v0.1.7.5)
- [ ] Add more stuff to Lockscreen.
- [ ] Cool Wallpapers
- [X] Animations in the Lockscreen.
- [X] A loading screen on lockscreen after correct pass + SOUND. (Done v0.1.6.4)
- [X] BUG: Whatever you click, delete a window, add a window, ALL THE TIMES, sound is played (Fixed v0.1.6.5)
- [X] loading screen slowly fade while loading desktop in the back. (Done in v0.1.6.7)
- [X] Fullscreen after login (Done v0.1.6.3)
- [X] Windows Design + Desktop Design (Done in v0.1.3... & v0.1.4... respectively)
- [X] Windows start menu does nothing rn. (Done in v0.1.4.4)
- [X] Minimizing window still takes up the zIndex and prevents from using it.(FIXED IN v0.1.3.3-alpha)
- [X] FEAT: Clicking app on task bar checks if it is focussed or not then: if focussed minimize it, else focus it. (v0.1.3.3-alpha)
- [X] Bug: Closing all apps still makes one of them active (visual) (FIXED: v0.1.3.4-alpha)
- [X] BUG: Windows Lag when moving (FIXED in v0.1.3.5).
- [X] ~~Draggable~~ Extendable component throughout the window (FIXED in v0.1.3.5).
- [X] Dynamic Grid (Fixed in v0.1.4.1)
- [X] the text to icon ratio is too big, maybe either increase the size of the icon or decrease the size of the text (do both) (Done in v0.1.4.2)
- [X] Routers for the desktop Apps. (Done in v0.1.4.2)
- [X] New apps (not pinned in the taskbar) should be shown in taskbar when opened. (Done in v0.1.4.3)
- [X] Animation when popping up new items in the taskbar. (Done in v0.1.4.3)
- [X] Make ~~opaque and~~ high zIndex when dragging desktop apps, to overlay the bottom objects. (Done in v0.1.4.3)
- [X] BUG: In fullscreen clicking the app in taskbar toggles fullscreen, and it becomes not fullscreen. (Fixed in v0.1.4.3)
- [X] BUG: Closing on fullscreen saves the state. On the opening again it starts in fullscreen. (Fixed in v0.1.4.3(1))
- [X] QOL: drag the window, even outside the bounding box, or the window keeping padding of like 2.5rem.(Fixed in v0.1.4.6)
- [X] BUG (Issue #3): Clicking on the windows icon when the start menu is active causes a jittering effect and doesn't close it. (Fixed in v0.1.4.6)
- [X] OPTIMIZATION: Have ONLY App.js with all the necessary variables so that we do not need to manually add apps to each part. (Done in v0.1.4.5)
- [ ] OPTIMIZATION: Cache System for caching the iframes as they take up lot of time to load
- [X] OPTIMIZATION: (TruthEntity) thinks it is better to use React component than Iframes, as they are quite a memory hogger and a can degrade performance. (Done in v0.1.4.5)
- [X] Animation while resizing windows. (Done in v0.1.5.6)
- [X] Animation (like transform into a small rectangle) on minimize! (Done v0.1.6.3)
- [X] Make the system tray on the taskbar(right) more accurate to windows. (Done in v0.1.5.1)
- [ ] Explorer App. (Started in v0.1.5.1). Sidebar (v0.1.5.2)
- [X] Tabs v0.1.5.3 BUG: TITLE IS OVERFLOWING (Fixed v0.1.5.4)
- [X] Universal tab feature (generalised) using `tabs: true` in App.js (Added in v0.1.5.4)
- [X] Notepad App. (Made in v0.1.5.5)
- [X] BUG: Notepad selection stops when it goes outside the rnd window. (Fixed in v0.1.5.5(1))
- [X] Window App's title bar and tab bar colors need adjusting. (Its fine lol)
- [ ] Notepad Generalised component
- [ ] ~~CHANGE CHROME TO BRAVE~~ (I aint doing this)
- [X] VSCode App (Added v0.1.6.2)
- [X] Terminal (v0.1.6.0 ... v0.1.6.1)
- [X] Terminal (Proper) Selection, Proper fonts, Polish (Done v0.1.6.1)
- [X] Make a Progress Panel and HINT icon that always stays on top of the screen (below apps above desktop)
- [ ] Progress Panel and Hint page with proper functionalities
- [X] Remove Border on Fullscreen (Fixed v0.1.5.8(2))
- [X] BUG: The windows menu opens but the indicator is not shown in the taskbar (Fixed v0.1.6.3)
- [ ] Make Progress Panel actually show progress.
- [ ] bring window to front by clicking on actual window instead of titlebar (By Matthias)
- [X] Reduce flashes in the ARG video (Req: Flux3tor + redac1ed) (RENDER #3)
- [X] PIN the comment
- [ ] Fix Subtitles and rerender (again-)
- [X] Fix the Hex in README.txt & Add full url not just /../.. (Fixed v0.1.7.6)
- [X] CRITICAL: THE COLORS OF UI ARE BY DEFAULT BLACK MAKE IT WHITE. (Bug reported by: Felix Gao) (Fixed v0.1.7.8(1))
- [ ] GAME IMPROVEMENT: time pressure. increment like 2 min for each puzzle start with 7 min or sm.
- [ ] Fix puzzle numbering.


Playtesters & Contributors: Flux3tor, Snxhit_, Matthias, Nx75, Keyboard1000n17, abtheinnovator, redac1ed, TruthEntity

BROWSER SUPPLIED BY: redac1ed