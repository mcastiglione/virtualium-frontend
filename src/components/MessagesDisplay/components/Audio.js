import React, {useRef, useState, useEffect} from 'react';
import style from './Audio.module.css';

export default function Audio(props, ...rest){
    let audioRef = useRef();
    let [length, setLength] = useState(null);
    let [progress, setProgress] = useState(null);
    let [count, setCount] = useState(1);

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

    let changeSound = async ()=>{
        response = await fetch("https://api.virtualium.ttde.com.ar/get_sounds_count")
        body = await response.json();
        fetchCount = body.sounds_count

        if(1 < count && count < fetchCount){
            setCount(count + 1);
        }else{
            setCount(1);
        }
    }
    return(
        <div>

        <div className ={style.progressBar_container}>
        <div className = {style.progressBar} style={{width: progress}}></div>
        </div>
        <audio autoPlay onTimeUpdate={timeHandler} ref={audioRef} onEnded={changeSound}>
            <source src = {props.src +"/"+ count} type = {type}></source>
        </audio>
        </div>
    )
}