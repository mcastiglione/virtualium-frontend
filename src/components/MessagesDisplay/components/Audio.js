import React, {useRef, useState, useEffect} from 'react';
import style from './Audio.module.css';

export default function Audio(props, ...rest){
    let audioRef = useRef();
    let [length, setLength] = useState(null);
    let [progress, setProgress] = useState(null);

    let type;

    // Se ejecuta cada vez que se tiene que renderizar.
    useEffect(()=>{
        console.log(props.src);
        setLength(audioRef.current.duration);

        
        switch(props.type){
            case 'mp3': type = 'audio/mpeg';    break;
            case 'wav': type = 'audio/wav';     break;
            case 'ogg': type = 'audio/ogg';     break;
        }

    },[props]);


    let timeHandler = ()=>{
        setProgress(Math.round((audioRef.current.currentTime / length)*100).toString() + "%");
        console.log(progress);
    }

    let newId = new Date().getTime().toString();
    return(
        <div>

        <div className ={style.progressBar_container}>
        <div className = {style.progressBar} style={{width: progress}}></div>
        </div>
        <audio autoPlay onTimeUpdate={timeHandler} ref={audioRef}>
            <source src = {props.src} type = {type}></source>
        </audio>
        </div>
    )
}