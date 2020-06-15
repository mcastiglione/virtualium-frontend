import React, {useRef, useState, useEffect} from 'react';
import Audio from './components/Audio';
import style from './MessageDisplay.module.css';

export default class MessageDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageRetriever: {
                messages: undefined
            },
            audioiD: 1
        }
        this.emojiText = React.createRef();
    }

    getAPIurl() {
        return ( // this.props.APIURL !== undefined ? this.props.APIURL :
            'https://api.virtualium.ttde.com.ar/message/topic'
        )
    }


    componentDidMount() {
        
        this.newAudio();
        this.getMessages();
        this.messagesInterval = setInterval(() => this.getMessages(), 2000);

    }


    componentWillUnmount() {
        clearInterval(this.messagesInterval);
    }

    // this method fetch the messages from the URL
    async getMessages() {
        console.log("fetching data...");
        let response = await fetch('https://api.virtualium.ttde.com.ar/message/topic');

        try{
            let jsonData = await response.json();

            if(response.ok) {
                this.setState({
                    messageRetriever: {
                        messages: jsonData.messages.map((message) => { // for each message in the jsonData
                            let localTime;

                            try {
                                let GMTTimeString = message.timestamp + " GMT";
                                let date = new Date(GMTTimeString);
                                localTime = {
                                    hours: date.getHours(),
                                    minutes: (date.getMinutes().toString().length < 2 ? '0' + date.getMinutes().toString() : date.getMinutes())
                                }
                            } catch (error) {
                                console.log("Date couldn't be fetched somehow, from the json (maybe the date wasn't sent), details: ", error);
                            }


                            return {
                                "user_nick": (message.user_nick === undefined ? '' : message.user_nick),
                                "text": message.text === undefined ? '' : message.text,
                                "time": localTime
                            };
                        })
                    }
                });
            }
            // else{

            //     this.setState(  {
            //         messageRetriever: {messages:[
            //             {
            //                 user_nick: "Server_side",
            //                 text:"Error 404",
            //                 error: true
            //             }
            //         ]
            //     }})
            // }

        } catch (error) {
            console.log("Error... ", error);

        }
    }

    newAudio = () =>{
        this.setState({audioId: new Date().getTime().toString()}, ()=>{console.log("new Audio");})
    }

    render() {
        if (this.state.messageRetriever.messages === undefined) {
            return (
                <div className={
                    style.main_box
                }>
                    <h3 style={
                        {color: "grey"}
                    }>No se encontró ningún mensaje...<br/>Pero no te preocupes, llegarán pronto!!!</h3>
                </div>
            )
        } else {

            console.log(this.state.messageRetriever.messages);
            return (
                <div> {/* <Player> */}
                    <Audio src="https://api.virtualium.ttde.com.ar/get_sound" type="mp3"/>
                    {/* </Player> */}
                    {/* <audio preload="true"  onEnded={this.newAudio}>
                        <source src={"https://api.virtualium.ttde.com.ar/get_sound?w="+ this.state.audioId } type="audio/mpeg"></source>
                    </audio> */}
                    <div className={
                        style.main_box
                    }>
                        {
                        this.state.messageRetriever.messages.reverse().map((message, index) => { // for each message received in the fetching
                            let className = style.message_box + " " + style.text + " "; // first, is going to define the default classes for it
                            let time;
                            if (message.time !== undefined) {
                                time = message.time.hours + ":" + message.time.minutes
                            }
                            return (
                                <div key={index}
                                    className={className}>
                                    <img className={
                                            style.user_image
                                        }
                                        src={
                                            message.user_image_URL
                                        }/>
                                    <p className={
                                        style.user_nick
                                    }>
                                        {
                                        message.user_nick === undefined ? "" : message.user_nick + " "
                                    }at{
                                        " " + time
                                    } </p>
                                    <p className={
                                        message.error !== true ? style.text : style.text_error
                                    }>
                                        {
                                        message.text
                                    }</p>
                                </div>
                            )
                            // returns the message with all the classes
                            // and content setup.

                        })
                    } </div>
                </div>
            )
        }
    }
}
