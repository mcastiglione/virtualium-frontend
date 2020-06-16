import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Fullscreen from 'react-full-screen';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Slider, IconButton, Box, Popover, TextField, Button, Collapse, Select, MenuItem, InputBase } from '@material-ui/core';
import { VolumeDown, PhotoCamera, CloudUpload, CenterFocusStrong, ChatBubble, PlayCircleFilledWhite } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import Loading from '../Loading/Loading';
import Icon from '../Icon';
import ReactHLS from 'react-hls';
import useWindowDimensions from '../Dimensions/useWindowDimensions';
import qs from 'querystringify'

/* style */
import cx from 'classnames';
import style from './stream.css';
import { Picker } from 'emoji-mart'

const SelectIcon = () => {
	return (
		<svg className={cx('MuiSvgIcon-root','MuiSelect-icon', style.white)} focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>
	);
}

const BootstrapInput = withStyles((theme) => ({
	root: {
	  'label + &': {
		marginTop: theme.spacing(3),
	  },
	},
	input: {
		color: 'white',
	  	borderRadius: 4,
	  	position: 'relative',
	  	backgroundColor: 'rgb(100,100,100,0)',
	  	border: '1px solid #ced4da',
	  	fontSize: 16,
	  	padding: '7px 26px 7px 12px',
	  	transition: theme.transitions.create(['border-color', 'box-shadow']),

		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
	  },
	},
}))(InputBase);

const Stream = props => {
	const [srcUrl, setSrcurl] = useState('https://d3myw7lup9h3o.cloudfront.net/camera-1/output_1280x720_6500k.m3u8')
	const [isFull, setFullscreen] = useState(false);
	const [isRecord, setRecord] = useState(false);
	const [message, setMessage] = useState('');
	const [volumeVal, volumeChange] = useState(30);
	const [muteFlag, setMute] = useState(true);
	const [uploadingFlag, setUploading] = useState(false);
	const [channelType, setChannel] = useState(1);
	const [resolutionType, setResolution] = useState(1);
	const [alertFlag, setOpenalert] = useState(false);
	const [alertType, setAlerttype] = useState(false);
	const [alertMessage, setAlertmeessage] = useState('');
	const { height, width } = useWindowDimensions();

	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
	const cameraList = numbers.map((number) =>
		<MenuItem value={number}>Camera-{number}</MenuItem>
  	);

	const channelChange = (e) => {
		if(e.target.value) {
			setChannel(e.target.value)
			switch(resolutionType) {
				case 0:
					setSrcurl('https://d3myw7lup9h3o.cloudfront.net/camera-'+e.target.value+'/output_1920x1080_8000k.m3u8')
					break;
				case 1:
					setSrcurl('https://d3myw7lup9h3o.cloudfront.net/camera-'+e.target.value+'/output_1280x720_6500k.m3u8')
					break;
				case 2:
					setSrcurl('https://d3myw7lup9h3o.cloudfront.net/camera-'+e.target.value+'/output_960x540_2000k.m3u8')
					break;
				case 3:
					setSrcurl('https://d3myw7lup9h3o.cloudfront.net/camera-'+e.target.value+'/output_768x432_1200k.m3u8')
					break;
			}
		}
	}

	const resolutionChange = (e) => {
		setResolution(e.target.value)
		switch(e.target.value) {
			case 0:
				setSrcurl('https://d3myw7lup9h3o.cloudfront.net/camera-'+channelType+'/output_1920x1080_8000k.m3u8')
				break;
			case 1:
				setSrcurl('https://d3myw7lup9h3o.cloudfront.net/camera-'+channelType+'/output_1280x720_6500k.m3u8')
				break;
			case 2:
				setSrcurl('https://d3myw7lup9h3o.cloudfront.net/camera-'+channelType+'/output_960x540_2000k.m3u8')
				break;
			case 3:
				setSrcurl('https://d3myw7lup9h3o.cloudfront.net/camera-'+channelType+'/output_768x432_1200k.m3u8')
				break;
		}
	}

	const addEmoji = (e) => {
		let sym = e.unified.split('-')
		let codesArray = []
		sym.forEach(el => codesArray.push('0x' + el))
		let emoji = String.fromCodePoint(...codesArray)
		console.log(emoji)
        setMessage(message + emoji)
    };
	
	const submitMessage = async () => {
		await axios.post("https://api.virtualium.ttde.com.ar/message/topic", JSON.stringify({ user_id: 1, text: message, }), {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		})
			.then(response => {
				setAlerttype(true);
				setAlertmeessage("Message submited successfully")
				setOpenalert(true);
			})
			.catch((error) => {
				setAlerttype(false);
				setAlertmeessage("Message submit failed")
				setOpenalert(true);
			});
	}

	useEffect(() => {
		let values = qs.parse(props.location.search)
		if(typeof values.id !== 'undefined') {
			setChannel(values.id)
			setSrcurl('https://d3myw7lup9h3o.cloudfront.net/camera-'+values.id+'/output_1280x720_6500k.m3u8')
		}
	},[]);
	
	return (
		(uploadingFlag) ? <Loading /> :
			<Fullscreen
				enabled={isFull}
				onChange={() => setFullscreen(isFull)}
			>
				<div className={style.alert}>
					<Collapse in={alertFlag}>
						<Alert
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={() => {
										setOpenalert(false);
									}}
								>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
							severity={alertType ? 'success' : 'error'}
						>
							{alertMessage}
						</Alert>
					</Collapse>
				</div>
				<div className={style.fullscreen}>
					<ReactHLS 
						url={srcUrl} 
						autoplay="true" 
						width={width + 'px'} 
						height={height + 'px'} 
						videoProps = {{
							controls : null,
						}}
					/>
					<div className={style.bottombar}>
						<span>Nombre evento...</span>
						<div className={style.recordstatus}>
							<Icon className={cx('tiny', isRecord ? style.red : style.white)}>fiber_manual_record</Icon>
							<span>EN VIVO</span>
						</div>
						<div className={style.volumeslider}>
							<VolumeDown />
							<Slider value={volumeVal} onChange={(event, newValue) => volumeChange(newValue)} aria-labelledby="continuous-slider" />
						</div>
						<div className={style.volumeMute} onClick={() => setMute(!muteFlag)}>
							<Icon className="small">{muteFlag ? 'volume_mute' : 'volume_off'}</Icon>
						</div>
						<PopupState variant="popover" popupId="capture-popup-popover">
							{(popupState) => (
								<div className={style.alignCenter}>
									<Link to="/visor">
										<IconButton className={style.uploadGroup} color="primary" aria-label="upload picture" component="span" {...bindTrigger(popupState)}>
											<PhotoCamera />
										</IconButton>
									</Link>
								</div>
							)}
						</PopupState>
						<PopupState variant="popover" popupId="message-popup-popover">
							{(popupState) => (
								<div className={style.alignCenter}>
									<IconButton className={style.uploadGroup} color="primary" aria-label="upload picture" component="span" {...bindTrigger(popupState)}>
										<ChatBubble />
									</IconButton>
									<Popover
										{...bindPopover(popupState)}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'center',
										}}
										transformOrigin={{
											vertical: 'bottom',
											horizontal: 'center',
										}}
									>
										<Box p={2} className={style.messageButtonGroup}>
											<TextField
												id="outlined-multiline-static"
												label="Message Content"
												multiline
												rows={4}
												value={message}
												variant="outlined"
												InputProps={{
													classes: {
													  input: style.messageBox,
													},
												}}
												onChange={(event) => setMessage(event.target.value)}
											/>
											<Picker set='google' skin={2} onSelect={addEmoji} />
											<Button variant="contained" color="primary" className={style.submitButton} onClick={submitMessage}>
												Submit
										</Button>
										</Box>
									</Popover>
								</div>
							)}
						</PopupState>
						<div className={style.volumeMute} onClick={() => setFullscreen(!isFull)}>
							<Icon>crop_din</Icon>
						</div>
						<div className={style.volumeMute}>
							<Select
								value={channelType}
								input={<BootstrapInput />}
								onChange={channelChange}
								IconComponent = {SelectIcon}
							>
								<MenuItem value={0}><Link to="/visor">Local CAM</Link></MenuItem>
								<MenuItem value={1}><Link to="/stream?id=1">Camera-1</Link></MenuItem>
								<MenuItem value={2}><Link to="/stream?id=2">Camera-2</Link></MenuItem>
								<MenuItem value={3}><Link to="/stream?id=3">Camera-3</Link></MenuItem>
								<MenuItem value={4}><Link to="/stream?id=4">Camera-4</Link></MenuItem>
								<MenuItem value={5}><Link to="/stream?id=5">Camera-5</Link></MenuItem>
								<MenuItem value={6}><Link to="/stream?id=6">Camera-6</Link></MenuItem>
								<MenuItem value={7}><Link to="/stream?id=7">Camera-7</Link></MenuItem>
								<MenuItem value={8}><Link to="/stream?id=8">Camera-8</Link></MenuItem>
								<MenuItem value={9}><Link to="/stream?id=9">Camera-9</Link></MenuItem>
								<MenuItem value={10}><Link to="/stream?id=9">Camera-10</Link></MenuItem>
								<MenuItem value={11}><Link to="/stream?id=11">Camera-11</Link></MenuItem>
								<MenuItem value={12}><Link to="/stream?id=12">Camera-12</Link></MenuItem>
								<MenuItem value={13}><Link to="/stream?id=13">Camera-13</Link></MenuItem>
								<MenuItem value={14}><Link to="/stream?id=14">Camera-14</Link></MenuItem>
								<MenuItem value={15}><Link to="/stream?id=15">Camera-15</Link></MenuItem>
								<MenuItem value={16}><Link to="/stream?id=16">Camera-16</Link></MenuItem>
								<MenuItem value={17}><Link to="/stream?id=17">Camera-17</Link></MenuItem>
								<MenuItem value={18}><Link to="/stream?id=18">Camera-18</Link></MenuItem>
								<MenuItem value={19}><Link to="/stream?id=19">Camera-19</Link></MenuItem>
								<MenuItem value={20}><Link to="/stream?id=9">Camera-20</Link></MenuItem>
							</Select>
						</div>
						<div className={style.volumeMute}>
							<Select
								value={resolutionType}
								input={<BootstrapInput />}
								onChange={resolutionChange}
								IconComponent = {SelectIcon}
							>
								<MenuItem value={0}>HD</MenuItem>
								<MenuItem value={1}>SD</MenuItem>
								<MenuItem value={2}>LD</MenuItem>
								<MenuItem value={3}>XD</MenuItem>
							</Select>
						</div>
					</div>
				</div>
			</Fullscreen>
	);
}
export default Stream;