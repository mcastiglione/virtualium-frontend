(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{59:function(e,t,s){e.exports={main_box:"dev--1YbZ_",message_box:"dev--dXVGK",user_image:"dev--16GhC",user_nick:"dev--1DQ5J",text:"dev--hu8U1",text_error:"dev--3VEJR"}},60:function(e,t,s){},65:function(e,t,s){"use strict";s.r(t);var a=s(0),r=s.n(a),n=s(59),i=s.n(n);class o extends r.a.Component{constructor(e){super(e),this.state={messageRetriever:{messages:void 0}},this.emojiText=r.a.createRef()}getAPIurl(){return"https://backend.virtualium.ethernity.live/message/topic"}componentDidMount(){this.getMessages(),this.messagesInterval=setInterval(()=>this.getMessages(),2e3)}componentWillUnmount(){clearInterval(this.messagesInterval)}async getMessages(){console.log("fetching data...");let e=await fetch("https://backend.virtualium.ethernity.live/message/topic");try{let t=await e.json();e.ok&&this.setState({messageRetriever:{messages:t.messages.map(e=>{let t;try{let s=e.timestamp+" GMT",a=new Date(s);t={hours:a.getHours(),minutes:a.getMinutes().toString().length<2?"0"+a.getMinutes().toString():a.getMinutes()}}catch(e){console.log("Date couldn't be fetched somehow, from the json (maybe the date wasn't sent), details: ",e)}return{user_nick:void 0===e.user_nick?"":e.user_nick,text:void 0===e.text?"":e.text,time:t}})}})}catch(e){console.log("Error... ",e)}}render(){return void 0===this.state.messageRetriever.messages?r.a.createElement("div",{className:i.a.main_box},r.a.createElement("h3",{style:{color:"grey"}},"No se encontró ningún mensaje...",r.a.createElement("br",null),"Pero no te preocupes, llegarán pronto!!!")):(console.log(this.state.messageRetriever.messages),r.a.createElement("div",{className:i.a.main_box},this.state.messageRetriever.messages.reverse().map((e,t)=>{let s,a=i.a.message_box+" "+i.a.text+" ";return void 0!==e.time&&(s=e.time.hours+":"+e.time.minutes),r.a.createElement("div",{key:t,className:a},r.a.createElement("img",{className:i.a.user_image,src:e.user_image_URL}),r.a.createElement("p",{className:i.a.user_nick},void 0===e.user_nick?"":e.user_nick+" ","at"," "+s," "),r.a.createElement("p",{className:!0!==e.error?i.a.text:i.a.text_error},e.text),r.a.createElement("audio",{autoPlay:!0},r.a.createElement("source",{src:"https://backend.virtualium.ethernity.live/get_sound",type:"audio/wav"})))})))}}var l=s(60),m=s.n(l);t.default=()=>r.a.createElement("div",null,r.a.createElement("h4",{className:m.a.title},"Mensajes del público"),r.a.createElement(o,null))}}]);
//# sourceMappingURL=Dashboard.js.map