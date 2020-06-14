import React, {useRef} from 'react';

export function Audio(props, ...rest){
    let progressBar = useRef();

    let type;

    switch(props.type){
        case 'mp3': type = 'audio/mpeg';    break;
        case 'wav': type = 'audio/wav';     break;
        case 'ogg': type = 'audio/ogg';     break;
    }
    return(
        <div>
        <div ref = {progressBar} className = {style.bar}></div>
        <audio>
            <source src = {props.src} type = {props.src}></source>
        </audio>
        </div>
    )
}