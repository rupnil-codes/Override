import React, { useState, useEffect, useRef } from "react";
import "../styles/apps/terminal.css";
import { COMMANDS } from "../data/Cmd.js";

function Terminal() {
    const [history, setHistory] = useState([
        { type: 'info', content: 'Microsoft Windows [Version 10.0.26200.7840]' },
        { type: 'info', content: '(c) Microsoft Corporation. All rights reserved.\n ' }
    ]);
    const [input, setInput] = useState("");

    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    const [lastCmd, setLastCmd] = useState("");

    const DEFAULT_PROMPT = "C:\\Users\\rupnil> "
    const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
    const [isSSH, setIsSSH] = useState(false);
    const [isSSHConnected, setIsSSHConnected] = useState(false);

    const sshCmd = import.meta.env.VITE_SSH_CMD
    const sshPassword = import.meta.env.VITE_SSH_PASSWORD

    const handleKeyDown = (e) => {

        if (e.key === "ArrowUp") {
            setInput(lastCmd);
        }

        if (e.key === "Enter") {
            setLastCmd(input);
            const cleanInput = input.trim();
            const cmd = cleanInput.toLowerCase();

            setInput("");

            const newEntry = { type: 'cmd', content: `${prompt}${cleanInput}` };
            let response = null;

            if (cmd === "") {
                setHistory(prev => response ? [...prev, newEntry, response] : [...prev, newEntry]);
                return;
            }

            if (cmd === "load") {
                setHistory(prev => [...prev, newEntry]);
                setPrompt("");
                setInput("");

                setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'output', content: "connecting" }]);
                }, 500);

                setTimeout(() => {
                    setHistory(prev => {
                        const newHistory = [...prev];
                        const lastIndex = newHistory.length - 1;
                        newHistory[lastIndex] = { ...newHistory[lastIndex], content: "connecting." };
                        return newHistory;
                    });
                }, 1000);

                setTimeout(() => {
                    setHistory(prev => {
                        const newHistory = [...prev];
                        const lastIndex = newHistory.length - 1;
                        newHistory[lastIndex] = { ...newHistory[lastIndex], content: "connecting.." };
                        return newHistory;
                    });
                }, 1500);

                setTimeout(() => {
                    setHistory(prev => {
                        const newHistory = [...prev];
                        const lastIndex = newHistory.length - 1;
                        newHistory[lastIndex] = { ...newHistory[lastIndex], content: "connecting..." };
                        return newHistory;
                    });
                    setPrompt(DEFAULT_PROMPT);
                }, 2000);

                return;
            }

            if (isSSH) {
                if (cmd === sshPassword) {
                    setIsSSH(false);
                    response = { type: 'output', content: `Password is correct damn\n `};
                    setPrompt(DEFAULT_PROMPT)
                }
                else {
                    setIsSSH(false);
                    response = { type: 'error', content: `Permission denied, please try again.\n `};
                    setPrompt(DEFAULT_PROMPT)
                }
            }

            else {
                if (cmd === "clear" || cmd === "cls") {
                    setHistory([]);
                    return;
                }

                else if (cmd === sshCmd) {

                    setHistory(prev => [...prev, newEntry]);
                    setPrompt("")
                    setInput("")

                    setTimeout(() => {
                        setIsSSH(true);

                        const output =
                            `The authenticity of host '5.161.100.52 (5.161.100.52)' can't be established.\n` +
                            `ED25519 key fingerprint is SHA256:IMQ8moL7eaMu1QwXVlmgtEBpH34VBswrylvylzO3AGs.\n` +
                            `Warning: Permanently added '5.161.100.52' (ED25519) to the list of known hosts.\n `;

                        const asyncResponse = { type: 'output', content: output};

                        setHistory(prev => [...prev, asyncResponse]);
                        setPrompt("flux3tor@5.161.100.52's password: ")
                    }, 1000);

                    return;
                }

                else if (COMMANDS[cmd]) {
                    const output = typeof COMMANDS[cmd] === 'function' ? COMMANDS[cmd]() : COMMANDS[cmd]+"\n ";
                    response = { type: 'output', content: output };
                }

                else {
                    response = { type: 'error', content: `'${cmd}' is not recognized as an internal or external command, \noperable program or batch file.\n ` };
                }
            }
            setHistory(prev => response ? [...prev, newEntry, response] : [...prev, newEntry]);
        }
    };

    const handleTerminalClick = () => {
        const selection = window.getSelection().toString();

        if (!selection) {
            inputRef.current?.focus();
        }
    };

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleContextMenu = async (e) => {
        e.preventDefault();

        const selection = window.getSelection().toString();

        if (selection) {
            await navigator.clipboard.writeText(selection);
            window.getSelection().removeAllRanges();
        } else {
            const text = await navigator.clipboard.readText();
            setInput(prev => prev + text);
        }
    };


    return (
        <div
            className="terminal-app"
            ref={terminalRef}
            onClick={handleTerminalClick}
            onContextMenu={handleContextMenu}
            style={{ userSelect: 'text', msUserSelect: "text" }}
        >
            {history.map((line, i) => (
                <p
                    key={i}
                    className={`line ${line.type}`}>{line.content}
                </p>
            ))}

            <div className="input-line">
                <span className="prompt">{prompt}</span>

                <div className={"input-wrapper"}>

                    <input
                        id="terminalInput"
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        spellCheck="false"

                    />
                    {/*<span className={"underscore-caret"}></span>*/}
                </div>
            </div>
        </div>
    );
}

export default Terminal;