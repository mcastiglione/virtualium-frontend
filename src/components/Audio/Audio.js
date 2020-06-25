import React, { useRef, useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

/* style */
import style from './audio.css';

import httpClient from '../../utils/axios';

/* config */
import { API_PY } from '../../config.js';

const Audio = ({ type }) => {
	const audioRef = useRef();
	const [ url, setUrl ] = useState(null);
	const [ urlList, setUrlList ] = useState(null);
	const [ progress, setProgress ] = useState(null);
	const [ timestamp, setTimestamp ] = useState(null);
	const [ audioList, setAudioList ] = useState(null);
	const [ intervalId, setIntervalId ] = useState(null);
	const [ statusAudio, setStatusAudio ] = useState(true);

	useEffect(() => {
		getAudioList();

		setIntervalId(setInterval(() => {
			getAudioList();
		}, 20000))
		return () => {
		}
	}, [])

	useEffect(() => {
		return () => {
			clearInterval(intervalId);
		}
	}, [intervalId])

	useEffect(() => {
		if(audioList) {
			setUrlList((prevState) => {
				if(prevState) {
					let newState = [...prevState];
					audioList.forEach((el, i) => {
						if(newState[i]) {
							if(newState[i].creation_time !== el.creation_time) {
								// Audio has changed, needs to be updated
								newState[i] = {
									...el,
									blob: null,
									// Determine if the audio has already been played
									isReproduced: false
								}
							}
						} else {
							// The previous audio list was smaller than the current one
							newState[i] = {
								...el,
								blob: null,
								// Determine if the audio has already been played
								isReproduced: false
							}
						}
					})
					return newState;
				} else {
					return audioList.map((el) => {
						return {
							...el,
							blob: null,
							// Determine if the audio has already been played
							isReproduced: false,
						}
					})
				}
			})
		}
		return () => {}
	}, [audioList])

	useEffect(() => {
		if(urlList) {
			setUrl((prevState) => {
				if(prevState) {
					/*
					 * Buscar el siguiente audio que aún no ha sido reproducido
					 * si no existe retorna undefined y se detiene la reproducción
					*/
					return urlList.find((el) => el.blob && !el.isReproduced);
				} else {
					/*
					 * Aún no se a reproduccido ningun audio o se ha terminado
					 * la lista descargada previamente y se ha actualizado
					*/
					return urlList.find((el) => {
						return el.blob !== null && !el.isReproduced;
					})
				}
			})

			var updated = 0;
			const audiosPromise = urlList.map((el) => {
				if(el.blob === null) updated++;
				// obtener el audio si aún no a sido descargado
				return (el.blob === null) ? getAudio(el) : el.blob;
			});

			if(updated) {
				// descargar lo nuevos audios
				Promise.all(audiosPromise).then((response) => {
					setUrlList((prevState) => {
						const newState = [...prevState];
						response.forEach((el, i) => {
							if(newState[i].blob == null) {
								newState[i].blob = el
							}
						})
						return newState;
					})
				})
			}
		}
		return () => {}
	}, [urlList])

	useEffect(() => {
		if(url) {
			setStatusAudio(true)
		}
		return () => {}
	}, [url])

	const getAudioList = () => {
		httpClient.get(`${API_PY}get_audios`)
		.then(({ data }) => {
			setAudioList(data.audios);
		})
	}

	const getAudio = (dataAudio) => {
		return httpClient.get(`${API_PY}get_audio?filename=${dataAudio.audio_name}`, {
			responseType: 'blob'
		})
		.then(({ data }) => {
			return window.URL.createObjectURL(data);
		})
	}

	const handledUpdateAudio = (call) => {
		setUrl((prevState) => {
			var audio_name = prevState.audio_name;
			setUrlList((prevState) => {
				const newState = prevState.map((el, index) => {
					if(el.audio_name == audio_name) {
						el.isReproduced = true;
					}
					return el;
				})
				return newState;
			})
			return prevState;
		})
	}

	const timeHandler = () => {
		const { currentTime, duration } = audioRef.current;
		setProgress(Math.round((currentTime / duration) * 100).toString() + "%");
	}

	const handleStatusAudio = () => {
		setStatusAudio((prevState) => {
			const newState = !prevState;
			audioRef.current[(newState) ? 'play' : 'pause']();
			return newState;
		});
	}

	return (
		<div>
			<div className={style.progressBar_container}>
				<div className={style.progressBar} style={{ width: progress }}></div>
			</div>
			{ (!url) ? null :
				<Fragment>
					<img
						className={style.controls}
						onClick={handleStatusAudio}
						src={`/img/icons/${(!statusAudio) ? 'play' : 'pause'}.svg`}
					/>
					<audio
						autoPlay
						src={url.blob}
						ref={audioRef}
						onTimeUpdate={timeHandler}
						onEnded={handledUpdateAudio}
					/>
				</Fragment>
			}
		</div>
	)
}

Audio.propTypes = {
	/*
	 * audio format type
	*/
	type: PropTypes.string,
}

Audio.defaultProps = {
	type: 'audio/mpeg'
}

export default Audio;