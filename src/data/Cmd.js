
export const WIDOW_COMMANDS = {
    help: "Available commands: help, dih, clear/cls, about, shiden",
    about: "Go find out",
    "rm -rf": "This is windows you nitwit, poopy head.",

    shiden: "https://flavortown.hackclub.com/projects/10866",
    forlorn:  "play forlorn https://flavortown.hackclub.com/projects/9751",
    dih: "https://tomwebsites.nl",

    "ipconfig /dns --history": "" +
        "\nWindows IP Configuration\n\n" +
        "  13380.flux3tor.xyz\n" +
        "  ------------------------------------\n" +
        "  No records of type A\n\n" +
        "Make sure to visit the site mentioned above!!\n" +
        "Need hints? See 'Progress' panel on the top-right\n\n",
        // "  google.com\n" +
        // "  ----------------------------------\n" +
        // "  \"kali linux iso download\"",
};

export const SSH_COMMANDS = {
    help:
        "\nAvailable commands:\n" +
        "--------------------------------------\n" +
        "  help       - list available commands\n" +
        "  whoami     - show current user\n" +
        "  history    - show recent terminal activity\n" +
        "  devices    - list connected devices",
    whoami: "flux3tor@kali",
    history:
        "\nLogged history:\n" +
        "--------------------------------------\n" +
        "  ssh root@hackclub:           - 5h ago\n" +
        "  nmap 66.33.60.129/26:        - 10h ago\n" +
        `  google: "A curious mind!":   - 14h ago\n` +
        "  sudo rm -rf /home/evidence:  - 3d ago",
    devices:
        "\nConnected devices:\n" +
        "--------------------------------------\n" +
        "  1. Rupnil's PC          - 2m ago\n" +
        "  2. workstation-c        - 9h ago\n" +
        "  3. hackclub-wifi-3f     - Just now\n" +
        "  4. unknown-device-8     - 34d ago\n\n" +
        "TYPE `devices help` FOR MORE INFO.",
    "devices help":
        "\nAvailable device commands:\n" +
        "--------------------------------------\n" +
        "  ping <device id>     - ping the device (locked)\n" +
        "  info <device id>     - get info of the device (locked)\n" +
        "  detach <device id>   - give up control",

    "ssh root@hackclub": "Permission denied.\nProtected by administrator\n",
    "nmap 66.33.60.129/26": "Permission denied.\nProtected by administrator\n",
    "sudo rm -rf /home/evidence": "Permission denied.\nProtected by administrator\n",
    google: "Permission denied.\nProtected by administrator\n",
}