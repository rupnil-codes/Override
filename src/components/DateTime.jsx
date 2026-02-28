import { useState, useEffect } from "react";

const appStartTime = Date.now();

export const useDateTime = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => {
            clearInterval(timer);
        }
    })

    const timeString = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const dateString = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).replace(/\//g, '-');

    const monthString = now.toLocaleDateString('en-GB', {
        month: 'long',
    });

    const numericMonthDay = now.toLocaleDateString('en-GB', {
        day: '2-digit',
    });

    const dayString = now.toLocaleDateString('en-GB', {
        weekday: 'long',
    });

    return { timeString, dateString, monthString, dayString, numericMonthDay };
}

export const useElapsedTime = () => {
    const [elapsed, setElapsed] = useState("00:00:00");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();
            const diffInSeconds = Math.floor((now - appStartTime) / 1000);

            const h = Math.floor(diffInSeconds / 3600);
            const m = Math.floor((diffInSeconds % 3600) / 60);
            const s = diffInSeconds % 60;

            const formatted = [h, m, s]
                .map(unit => String(unit).padStart(2, '0'))
                .join(':');

            setElapsed(formatted);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return elapsed;
};