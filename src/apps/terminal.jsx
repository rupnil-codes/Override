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

    return (
        <div
            className="terminal-app terminal-content"
            ref={terminalRef}
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((line, i) => (
                <p key={i} className={`line ${line.type}`}>{line.content}</p>
            ))}

                <div className="input-line">
                    <span className="prompt">C:\Users\rupnil{'>'}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
        </div>
    );
}

export default Terminal;