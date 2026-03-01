import Chrome from "../apps/chrome.jsx";
import Explorer from "../apps/explorer.jsx";
import Settings from "../apps/settings.jsx";
import VSCode from "../apps/vscode.jsx";
import Terminal from "../apps/terminal.jsx";
import Readme_txt from "../apps/README.txt.jsx";

export let INITIAL_Z = 1000;

export function getNextZ() {
    INITIAL_Z += 1;
    return INITIAL_Z;
}

export const APP_REGISTRY = {
    explorer: {
        title: "Explorer",
        component: Explorer,
        imgSrc: "/assets/icons/Explorer.ico",
        tabs: true,
    },
    vscode: {
        title: "VS Code",
        component: VSCode,
        imgSrc: "/assets/icons/VSCode.svg",
    },
    settings: {
        title: "Settings",
        component: Settings,
        imgSrc: "/assets/icons/Settings.ico",
    },
    chrome: {
        title: "Chrome",
        component: Chrome,
        imgSrc: "/assets/icons/Chrome.ico",
    },
    terminal: {
        title: "Terminal",
        component: Terminal,
        imgSrc: "/assets/icons/Terminal.ico",
        tabs: true,
    },

    readme_txt: {
        title: "README.txt",
        component: Readme_txt,
        imgSrc: "/assets/icons/Notepad.png",
        tabs: true,
    }
};
