import { useState, useEffect } from "react";

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