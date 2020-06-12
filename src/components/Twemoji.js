import twemoji from 'twemoji';
import React, { useRef, useEffect } from 'react';

export default function Twemoji(props) {
    const textRef = useRef(null)

    useEffect( () => {async ()=>{
        await twemoji.parse(textRef);
        }});

    return (
        <div ref={textRef}>{props.children}</div>
    )
}