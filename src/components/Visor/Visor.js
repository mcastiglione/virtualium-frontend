import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Webcam from 'react-webcam';
import Fullscreen from 'react-full-screen';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Slider, IconButton, Box, Popover, TextField, Button, Collapse, Select, MenuItem, InputBase } from '@material-ui/core';
import { VolumeDown, PhotoCamera, CloudUpload, CenterFocusStrong, ChatBubble, Mic } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import { triggerBase64Download } from 'react-base64-downloader';
import Loading from '../Loading/Loading';
import Icon from '../Icon';

/* style */
import cx from 'classnames';
import style from './visor.css';
import { Picker } from 'emoji-mart'

const videoConstraints = {
	facingMode: 'user'
};

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

const Visor = () => {
	const webcamRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	const mediaRecorderRef_Audio = useRef(null);
	const [isFull, setFullscreen] = useState(false);
	const [isRecord, setRecord] = useState(false);
	const [volumeVal, volumeChange] = useState(30);
	const [muteFlag, setMute] = useState(true);
	const [message, setMessage] = useState('');
	const [uploadingFlag, setUploading] = useState(false);
	const [alertFlag, setOpenalert] = useState(false);
	const [alertType, setAlerttype] = useState(false);
	const [alertMessage, setAlertmeessage] = useState('');
	const [capturing, setCapturing] = useState(false);
	const [capturing_Audio, setCapturing_Audio] = useState(false);
	const [recordedChunks, setRecordedChunks] = useState([]);
	const [recordedChunks_Audio, setRecordedChunks_Audio] = useState([]);
	const [channelType, setChannel] = useState(0);
	const [resolutionType, setResolution] = useState(1);

	const resolutionChange = (e) => {
		setResolution(e.target.value)
	};

	const addEmoji = (e) => {
		let sym = e.unified.split('-')
		let codesArray = []
		sym.forEach(el => codesArray.push('0x' + el))
		let emoji = String.fromCodePoint(...codesArray)
		console.log(emoji)
        setMessage(message + emoji)
    };

	const handleStartCaptureClick = useCallback(() => {
		setCapturing(true);
		mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
			mimeType: "video/webm;codecs=h264"
		});
		mediaRecorderRef.current.addEventListener(
			"dataavailable",
			handleDataAvailable
		);
		mediaRecorderRef.current.start();
	}, [webcamRef, setCapturing, mediaRecorderRef]);

	const handleStartCaptureClick_Audio = useCallback(() => {
		setCapturing_Audio(true);
		mediaRecorderRef_Audio.current = new MediaRecorder(webcamRef.current.stream, {
			mimeType: "audio/webm"
		});
		mediaRecorderRef_Audio.current.addEventListener(
			"dataavailable",
			handleDataAvailable_Audio
		);
		mediaRecorderRef_Audio.current.start();
	}, [webcamRef, setCapturing_Audio, mediaRecorderRef_Audio]);

	const handleDataAvailable = useCallback(({ data }) => {
			if (data.size > 0) {
				setRecordedChunks((prev) => prev.concat(data));
			}
		},
		[setRecordedChunks]
	);

	const handleDataAvailable_Audio = useCallback(({ data }) => {
			if (data.size > 0) {
				setRecordedChunks_Audio((prev) => prev.concat(data));
			}
		},
		[setRecordedChunks_Audio]
	);

	const handleStopCaptureClick = useCallback(() => {
		mediaRecorderRef.current.stop();
		setCapturing(false);
	}, [recordedChunks, mediaRecorderRef, webcamRef, setCapturing]);

	const handleStopCaptureClick_Audio = useCallback(() => {
		mediaRecorderRef_Audio.current.stop();
		setCapturing_Audio(false);
	}, [recordedChunks_Audio, mediaRecorderRef_Audio, webcamRef, setCapturing_Audio]);

	const dataURLtoFile = (dataurl, filename) => {

		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new File([u8arr], filename, { type: mime });
	};

	const capture = useCallback(async () => {
		const imageSrc = webcamRef.current.getScreenshot();
		const date = new Date();
		const timestamp = date.getTime();
		const file = dataURLtoFile(imageSrc, timestamp + '.jpeg');
		const formData = new FormData()
		formData.append('files', file)
		// await axios.post("https://backend.virtualium.ethernity.live/upload_image", formData, {
		await axios.post("https://api.virtualium.ttde.com.ar/upload_image", formData, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		})
			.then(response => {
				setAlerttype(true);
				setAlertmeessage("Screenshot is uploaded successfully")
				setOpenalert(true);
			})
			.catch((error) => {
				setAlerttype(false);
				setAlertmeessage("Uploading file failed")
				setOpenalert(true);
			});
		//			triggerBase64Download(imageSrc, timestamp)
	},
		[webcamRef]
	);

	const submitMessage = async () => {
		// await axios.post("https://backend.virtualium.ethernity.live/message/topic", JSON.stringify({ user_id: 1, text: message, }), {
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

	const submitFiles = async (e) => {
		let files = event.target.files
		const formData = new FormData()
		for (let i = 0; i < files.length; i++) {
			formData.append('files', files[i])
		}
		// await axios.post("https://backend.virtualium.ethernity.live/upload_image", formData, {
		await axios.post("https://api.virtualium.ttde.com.ar/upload_image", formData, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		})
			.then(response => {
				setAlerttype(true);
				setAlertmeessage("Files are uploaded successfully")
				setOpenalert(true);
			})
			.catch((error) => {
				setAlerttype(false);
				setAlertmeessage("Uploading files failed")
				setOpenalert(true);
			});
	}

	const fetchData = async (url) => {
		const date = new Date();
		const timestamp = date.getTime();
		let file = await fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], timestamp+".h264", { type: "video/webm;codecs=h264" }))
		console.log(file)
		const formData = new FormData()
		formData.append('files', file)
		await axios.post("https://api.virtualium.ttde.com.ar/upload_video", formData, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		})
		.then(response => {
			setAlerttype(true);
			setAlertmeessage("Video is uploaded successfully")
			setOpenalert(true);
		})
		.catch((error) => {
			setAlerttype(false);
			setAlertmeessage("Uploading file failed")
			setOpenalert(true);
		});
	};

	const fetchData_Audio = async (url) => {
		const date = new Date();
		const timestamp = date.getTime();
		let file = await fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], "1_"+timestamp+".wav", { type: "audio/webm" }))
		console.log(file)
		const formData = new FormData()
		formData.append('files', file)
		// await axios.post("https://backend.virtualium.ethernity.live/upload_sound", formData, {
		await axios.post("https://api.virtualium.ttde.com.ar/upload_sound", formData, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		})
		.then(response => {
			setAlerttype(true);
			setAlertmeessage("Audio is uploaded successfully")
			setOpenalert(true);
		})
		.catch((error) => {
			setAlerttype(false);
			setAlertmeessage("Uploading file failed")
			setOpenalert(true);
		});
	};

	useEffect(() => {
		if (recordedChunks.length && !capturing) {
			const blob = new Blob(recordedChunks, {
			  type: "video/webm;codecs=h264"
			});
			const url = URL.createObjectURL(blob)
			fetchData(url)
			// const a = document.createElement("a")
			// document.body.appendChild(a)
			// a.style = "display: none"
			// a.href = url
			// a.download = "react-webcam-stream-capture.h264";
			// a.click()
			// window.URL.revokeObjectURL(url)
			setRecordedChunks([])
		}
	},[recordedChunks]);

	useEffect(() => {
		if (recordedChunks_Audio.length && !capturing_Audio) {
			const blob = new Blob(recordedChunks_Audio, {
			  type: "audio/webm"
			});
			const url = URL.createObjectURL(blob)
			fetchData_Audio(url)
			// const a = document.createElement("a")
			// document.body.appendChild(a)
			// a.style = "display: none"
			// a.href = url
			// a.download = "react-webcam-stream-capture.wav";
			// a.click()
			// window.URL.revokeObjectURL(url)
			setRecordedChunks_Audio([])
		}
	},[recordedChunks_Audio]);

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
					<Webcam
						audio={true}
						height={'100%'}
						ref={webcamRef}
						screenshotFormat='image/jpeg'
						width={'100%'}
						videoConstraints={videoConstraints}
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
									<IconButton className={style.uploadGroup} color="primary" aria-label="upload picture" component="span" {...bindTrigger(popupState)}>
										<PhotoCamera />
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
										<Box p={2} className={style.uploadButtonGroup}>
											{
												capturing ? (
													<IconButton className={style.uploadButtonsRecord} color="primary" aria-label="record video" component="span" onClick={handleStopCaptureClick}>
														<CenterFocusStrong />
													</IconButton>) :
													(
													<IconButton className={style.uploadButtons} color="primary" aria-label="record video" component="span" onClick={handleStartCaptureClick}>
														<CenterFocusStrong />
													</IconButton>)
											}
											{
												capturing_Audio ? (
													<IconButton className={style.uploadButtonsRecord} color="primary" aria-label="record audio" component="span" onClick={handleStopCaptureClick_Audio}>
														<Mic />
													</IconButton>) :
													(
													<IconButton className={style.uploadButtons} color="primary" aria-label="record audio" component="span" onClick={handleStartCaptureClick_Audio}>
														<Mic />
													</IconButton>)
											}
											<IconButton className={style.uploadButtons} color="primary" aria-label="capther picture" component="span" onClick={capture}>
												<PhotoCamera />
											</IconButton>
											<IconButton className={style.uploadButtons} color="primary" variant="contained" aria-label="upload picture" component="label">
												<CloudUpload />
												<input
													type="file"
													style={{ display: "none" }}
													accept="image/*"
													multiple
													onChange={submitFiles}
												/>
											</IconButton>
										</Box>
									</Popover>
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
												onChange={(e) => {setMessage(e.target.value)}}
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
								IconComponent = {SelectIcon}
							>
								<MenuItem value={0}><Link to="/dashboard" className={style.black}>Local CAM</Link></MenuItem>
								<MenuItem value={1}><Link to="/stream?id=1" className={style.black}>Camera-1</Link></MenuItem>
								<MenuItem value={2}><Link to="/stream?id=2" className={style.black}>Camera-2</Link></MenuItem>
								<MenuItem value={3}><Link to="/stream?id=3" className={style.black}>Camera-3</Link></MenuItem>
								<MenuItem value={4}><Link to="/stream?id=4" className={style.black}>Camera-4</Link></MenuItem>
								<MenuItem value={5}><Link to="/stream?id=5" className={style.black}>Camera-5</Link></MenuItem>
								<MenuItem value={6}><Link to="/stream?id=6" className={style.black}>Camera-6</Link></MenuItem>
								<MenuItem value={7}><Link to="/stream?id=7" className={style.black}>Camera-7</Link></MenuItem>
								<MenuItem value={8}><Link to="/stream?id=8" className={style.black}>Camera-8</Link></MenuItem>
								<MenuItem value={9}><Link to="/stream?id=9" className={style.black}>Camera-9</Link></MenuItem>
								<MenuItem value={10}><Link to="/stream?id=9" className={style.black}>Camera-10</Link></MenuItem>
								<MenuItem value={11}><Link to="/stream?id=11" className={style.black}>Camera-11</Link></MenuItem>
								<MenuItem value={12}><Link to="/stream?id=12" className={style.black}>Camera-12</Link></MenuItem>
								<MenuItem value={13}><Link to="/stream?id=13" className={style.black}>Camera-13</Link></MenuItem>
								<MenuItem value={14}><Link to="/stream?id=14" className={style.black}>Camera-14</Link></MenuItem>
								<MenuItem value={15}><Link to="/stream?id=15" className={style.black}>Camera-15</Link></MenuItem>
								<MenuItem value={16}><Link to="/stream?id=16" className={style.black}>Camera-16</Link></MenuItem>
								<MenuItem value={17}><Link to="/stream?id=17" className={style.black}>Camera-17</Link></MenuItem>
								<MenuItem value={18}><Link to="/stream?id=18" className={style.black}>Camera-18</Link></MenuItem>
								<MenuItem value={19}><Link to="/stream?id=19" className={style.black}>Camera-19</Link></MenuItem>
								<MenuItem value={20}><Link to="/stream?id=20" className={style.black}>Camera-20</Link></MenuItem>
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

export default Visor;