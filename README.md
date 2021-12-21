# Manage computer through Telegram bot

1. Telegraf + NestJS + NextJS
2. `/manage`
   1. Power Off
   2. Suspend
   3. Display screenshot 
   4. Stream display screen in real-time
   5. run computer app
3. `/permissions`
   1. can invite other Telegram user 
   2. provide control (access) to opportunities for invited user
4. `/network`
   1. run ngrok 
   2. register IPv6 in FreeDNS
   3. get IP addresses (local / global)
   4. **repeater** for the server on the only local host:
      1. as example its wifi
5. `/files`
   1. get dirs and files list on PC
   2. load file to selected (current) dir 
   3. encrypt / decrypt files
   4. compare folders and files
   5. get hashes for files
   6. same for nextcloud
   7. **transform**: 
      1. transform Word files to PDF
      2. change images extension (and compare step)
6. `/loader`
   1. file loader to cloud / host PC
   2. manage load file (pause, continue, abort) and receive status info
   3. control internet speed in load
   4. can create many loaders 
7. `/reminder`
   1. reminder massages (with content) in telegram
   2. reminder pushes with using **Ntfy**
      1. **Habit mode** - reminder with special repeat
8. `/tasks`
   1. can create and register task on as NodeJS script for using later
9. `/shell`
   1. can execute shell commands 