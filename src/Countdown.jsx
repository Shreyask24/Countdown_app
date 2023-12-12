import React, { useState, useEffect } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import './App.css';

const Countdown = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval;

        if (isActive && minutes > 0) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    setMinutes((prevMinutes) => prevMinutes - 1);
                    setSeconds(59);
                }
                else if (minutes === 0) {
                    setHours((prevHours) => prevHours - 1);
                }
                else {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, hours, minutes, seconds]);

    const handleStart = () => {
        if (!isActive) {
            setIsActive(true);
        }
    };

    const handleReset = () => {
        setIsActive(false);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    };

    const handlePause = () => {
        setIsActive(false);
    };

    const handleMinutesChange = (e) => {
        if (!isActive) {
            setMinutes(parseInt(e.target.value, 10));
        }
    };


    return (
        <div className="App">
            <div>
                <h2>Enter Minutes</h2>
                <input
                    type="number"
                    value={minutes}
                    onChange={handleMinutesChange}
                    placeholder='Enter number'
                    onClick={handleReset}
                />
            </div>

            <div>
                <p>
                    {isActive == false ?
                        <button onClick={handleStart} className='playButton' disabled={isActive}>
                            Start
                        </button> :
                        <button onClick={handlePause} className='playButton'>Pause</button>
                    }

                    {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </p>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Countdown;