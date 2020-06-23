import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Fullscreen from 'react-full-screen';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Slider, IconButton, Box, Popover, TextField, Button, Collapse, Select, MenuItem, InputBase } from '@material-ui/core';
import { VolumeDown, PhotoCamera, CloudUpload, CenterFocusStrong, ChatBubble, PlayCircleFilledWhite, Send } from '@material-ui/icons';
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
import {API_PY, CAMERA_URL} from '../../config.js'

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
	const [srcUrl, setSrcurl] = useState(CAMERA_URL + 'camera-1/output_1280x720_6500k.m3u8')
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
					setSrcurl(CAMERA_URL + 'camera-'+e.target.value+'/output_1920x1080_8000k.m3u8')
					break;
				case 1:
					setSrcurl(CAMERA_URL + 'camera-'+e.target.value+'/output_1280x720_6500k.m3u8')
					break;
				case 2:
					setSrcurl(CAMERA_URL + 'camera-'+e.target.value+'/output_960x540_2000k.m3u8')
					break;
				case 3:
					setSrcurl(CAMERA_URL + 'camera-'+e.target.value+'/output_768x432_1200k.m3u8')
					break;
			}
		}
	}

	const resolutionChange = (e) => {
		setResolution(e.target.value)
		switch(e.target.value) {
			case 0:
				setSrcurl(CAMERA_URL + 'camera-'+channelType+'/output_1920x1080_8000k.m3u8')
				break;
			case 1:
				setSrcurl(CAMERA_URL + 'camera-'+channelType+'/output_1280x720_6500k.m3u8')
				break;
			case 2:
				setSrcurl(CAMERA_URL + 'camera-'+channelType+'/output_960x540_2000k.m3u8')
				break;
			case 3:
				setSrcurl(CAMERA_URL + 'camera-'+channelType+'/output_768x432_1200k.m3u8')
				break;
		}
	}

	const addEmoji = (e) => {
		let sym = e.unified.split('-')
		let codesArray = []
		sym.forEach(el => codesArray.push('0x' + el))
		let emoji = String.fromCodePoint(...codesArray)
        setMessage(message + emoji)
    };
	
	const submitMessage = async () => {
		await axios.post(API_PY+"message/topic", JSON.stringify({ user_id: 1, text: message, }), {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		})
			.then(response => {
				setMessage('');
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
		if(alertFlag) {
			setTimeout(() => {
				setOpenalert(false);
			}, 3000);
		}
	},[alertFlag]);

	useEffect(() => {
		let values = qs.parse(props.location.search)
		if(typeof values.id !== 'undefined') {
			setChannel(values.id)
			setSrcurl(CAMERA_URL + 'camera-'+values.id+'/output_1280x720_6500k.m3u8')
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
										className={style.messageBoxOut}
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
											<IconButton className={style.submitButton} color="primary" aria-label="record video" component="span" onClick={submitMessage}>
												<Send />
											</IconButton>
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
								<MenuItem value={0}><Link to="/dashboard" className={style.black}>Local CAM</Link></MenuItem>
								<MenuItem value={1}>Camera-1</MenuItem>
								<MenuItem value={2}>Camera-2</MenuItem>
								<MenuItem value={3}>Camera-3</MenuItem>
								<MenuItem value={4}>Camera-4</MenuItem>
								<MenuItem value={5}>Camera-5</MenuItem>
								<MenuItem value={6}>Camera-6</MenuItem>
								<MenuItem value={7}>Camera-7</MenuItem>
								<MenuItem value={8}>Camera-8</MenuItem>
								<MenuItem value={9}>Camera-9</MenuItem>
								<MenuItem value={10}>Camera-10</MenuItem>
								<MenuItem value={11}>Camera-11</MenuItem>
								<MenuItem value={12}>Camera-12</MenuItem>
								<MenuItem value={13}>Camera-13</MenuItem>
								<MenuItem value={14}>Camera-14</MenuItem>
								<MenuItem value={15}>Camera-15</MenuItem>
								<MenuItem value={16}>Camera-16</MenuItem>
								<MenuItem value={17}>Camera-17</MenuItem>
								<MenuItem value={18}>Camera-18</MenuItem>
								<MenuItem value={19}>Camera-19</MenuItem>
								<MenuItem value={20}>Camera-20</MenuItem>
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