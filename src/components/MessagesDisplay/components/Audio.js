import React, { useRef, useState, useEffect } from 'react';
import style from './Audio.module.css';

/* config */
import { API_PY } from '../../../config.js';

export default function Audio(props, ...rest) {
    let audioRef = useRef();
    let [length, setLength] = useState(null);
    let [progress, setProgress] = useState(null);
    let [count, setCount] = useState(0);

    let type;

    // Se ejecuta cada vez que se tiene que renderizar.
    useEffect(() => {
        console.log(props.src);
        setLength(audioRef.current.duration);


        switch (props.type) {
            case 'mp3': type = 'audio/mpeg'; break;
            case 'wav': type = 'audio/wav'; break;
            case 'ogg': type = 'audio/ogg'; break;
        }

        console.log("count:", count);
    }, [props]);


    let timeHandler = () => {
        setProgress(Math.round((audioRef.current.currentTime / length) * 100).toString() + "%");
        console.log(progress);
    }

    let changeSound = async () => {
        let response = await fetch(`${API_PY}get_sounds_count`)
        let body = await response.json();
        let fetchCount = body.sounds_count-1
        console.log("quantity sounds", fetchCount);


        if (0 <= count && count < fetchCount) {
            console.log("add one");
            setCount(count + 1);
        } else {
            setCount(0);
        }

        audioRef.current.currentTime= 0;
        audioRef.current.load();
        audioRef.current.play();
    }
    return (
        <div>
            <div className={style.progressBar_container}>
                <div className={style.progressBar} style={{ width: progress }}></div>
            </div>
            <audio autoPlay onTimeUpdate={timeHandler} ref={audioRef} onEnded={changeSound}>
                <source src={props.src +"/"+count} type={type}></source>
            </audio>
        </div>
    )
}