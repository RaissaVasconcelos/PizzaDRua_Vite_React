import  { useState, useEffect } from 'react';

export function Countdown() {
    const [remainingSeconds, setRemainingSeconds] = useState(3600); // 3600 segundos = 1 hora

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (remainingSeconds > 0) {
                setRemainingSeconds(remainingSeconds - 1);
            } else {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [remainingSeconds]);

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return (
        <div className='flex flex-col items-center'>
            <h2>Expira em</h2>
            <p className='font-bold'>{String(minutes).padStart(2, '0')} min. {String(seconds).padStart(2, '0')} seg.</p>
        </div>
    );
}


