import React, { useState, useEffect, useRef } from "react";
import "../styles/apps/terminal.css";
import { COMMANDS } from "../data/Cmd.js";
import {Bold, Italic, Settings, Strikethrough, Underline} from "lucide-react";

function Terminal() {
    const [history, setHistory] = useState([
        { type: 'info', content: 'Microsoft Windows [Version 10.0.26200.7840]' },
        { type: 'info', content: '(c) Microsoft Corporation. All rights reserved.\n ' }
    ]);
    const [input, setInput] = useState("");

    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    const [lastCmd, setLastCmd] = useState("");

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleKeyDown = (e) => {

        if (e.key === "ArrowUp") {
            setInput(lastCmd);
        }

        if (e.key === "Enter") {
            setLastCmd(input);
            const cleanInput = input.trim();
            const cmd = cleanInput.toLowerCase();

            setInput("");

            if (cmd === "clear" || cmd === "cls") {
                setHistory([]);
                return;
            }

            const newEntry = { type: 'cmd', content: `C:\\Users\\rupnil> ${cleanInput}` };
            let response = null;

            if (cmd !== "") {
                if (COMMANDS[cmd]) {
                    const output = typeof COMMANDS[cmd] === 'function' ? COMMANDS[cmd]() : COMMANDS[cmd]+"\n ";
                    response = { type: 'output', content: output };
                } else {
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
                <p key={i} className={`line ${line.type}`}>{line.content}</p>
            ))}

            <div className="input-line">
                <span className="prompt">C:\Users\rupnil{'>'}</span>

                <div className={"input-wrapper"}>

                    <input
                        id="terminalInput"
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            e.target.parentElement.style.setProperty('--char-count', e.target.value.length);
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