import React, {
	useRef,
	useState,
	Fragment,
	useEffect,
} from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';

/* Components */
import Select from '../Select';
import Checkbox from '../Checkbox';
import TextInput from '../TextInput';

/* Style */
import cx from 'classnames';
import style from './register.css';

/* CustomHooks */
import { useAsync } from '../customHooks';

/* context */
import connect from '../../context/connect';

/* utils */
import validate from './validate';
import paises from '../../utils/paises';
import httpClient from '../../utils/axios';
import serealizeData from './serealizeData';
import { SITE_KEY_RECAPTCHA } from '../../config';

/* Actions */
import { verifySession } from '../../actions/loginAction';

const initialState = {
	email: '',
	nombres: '',
	apellidos: '',
	email_confirmado: '',
	nro_documento: '',
	password: '',
	passwordConfirmado: '',
	genero: '',
	telefono: '',
	fecha_nacimiento: '',
	nacDia: '',
	nacMes: '',
	nacAnho: '',
	cod_pais: 'ARG',
	domProvincia: '',
	codProvincia: '',
	codLocalidad: '',
	domLocalidad: '',
	domicilio: '',
	direccion: '',
	codigo_postal: '',
	acepta_noticias: 1,
	aceptoTerminos: 0,
	recaptcha: null,
	estado: 'ACTIVO'
}

const Register = ({handleToggleAccount, sidenav, user, verifySession, ...props}) => {
	const _recaptcha = useRef(null);
	const _form = useRef(null);
	const [ provincias, setProvincias ] = useState([]);
	const [ state, setState ] = useState(initialState);
	const [ localidades, setLocalidades ] = useState([]);
	const [ disablebRegistro, setDisablebRegistro ] = useState(true);
	const [ localidadSelectValue, setLocalidadSelectValue ] = useState('');
	const [ requiredCompletedCount, setRequiredCompletedCount ] = useState(0);
	const [ requiredCompletedTotal, setRequiredCompletedTotal ] = useState(6);
	const [ fieldRequired, setFieldRequired ] = useState({
		nombres: false,
		apellidos: false,
		email: false,
		nro_documento: false,
		password: false,
		recaptcha: false
	});

	useEffect(() => {
		let count = 0;
		for(const field in fieldRequired) {
			if(fieldRequired[field]) count++;
		}

		setDisablebRegistro(count < requiredCompletedTotal || !state.aceptoTerminos)
		setRequiredCompletedCount(count);
	}, [fieldRequired])

	useEffect(() => {
		// httpClient.apiGet('provincias')
		// .then(({ data }) => {
		// 	setProvincias((data) ? data : []);
		// })
	}, [])

	useEffect(() => {
		setState((prevState) => {
			let newState = { ...prevState };
			if(user) {
				for(const field in user) {
					if(user[field] && newState.hasOwnProperty(field)) {
						newState[field] = user[field];
					}
				}
				newState.genero = `${newState.genero}`;
				newState.codProvincia = `${newState.codProvincia}`;
				newState.codLocalidad = `${newState.codLocalidad}`;
				newState.email_confirmado = newState.email;
				if(newState.fecha_nacimiento) {
					const [ anho, mes, dia ] = newState.fecha_nacimiento.split('-');
					newState.nacMes = `${mes}`;
					newState.nacDia = `${dia}`;
					newState.nacAnho = `${anho}`;
				}
			} else {
				newState = { ...initialState };
			}
			return newState;
		})
	}, [user]);

	useEffect(() => {
		setLocalidades([]);
		setState((prevState) => ({...prevState, codLocalidad: ''}));
		if(state.codProvincia) {
			httpClient.apiGet('localidades', {
				params: { provinciaCod: state.codProvincia }
			})
			.then(({ data }) => {
				setState((prevState) => (data && data[0]) ?
					({
						...prevState,
						codLocalidad: data[0].localidad
					}) : prevState);
				setLocalidades((data) ? data : []);
			})
		}
	}, [state.codProvincia])

	const onChangeRecaptcha = (e) => {
		setFieldRequired((prevState) => {
			const newState = { ...prevState };
			newState.recaptcha = e != '' && e != null;
			return newState;
		})

		setState((prevState) => {
			const newState = { ...prevState };
			newState.recaptcha = e;
			return newState;
		});

	}

	const handleInput = (e) => {
		const nameInput = e.target.name;
		let valueInput = e.target.type !== 'checkbox' ? e.target.value : 
					e.target.checked ? 1 : 0;

		switch (nameInput) {
			case 'email':
			case 'nacDia':
			case 'nacMes':
			case 'nombres':
			case 'password':
			case 'apellidos':
			case 'recaptcha':
			case 'nro_documento':
				setFieldRequired((prevState) => {
					const newState = { ...prevState };
					newState[nameInput] = valueInput != '';
					return newState;
				})
				break;
			case 'aceptoTerminos':
				setDisablebRegistro(requiredCompletedCount < requiredCompletedTotal || !valueInput)
				break;
		}
		setState((prevState) => {
			const newState = { ...prevState };
			newState[nameInput] = valueInput
			return newState;
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(disablebRegistro && !user) return;
		setDisablebRegistro(true);

		M.toast({
			html: `Se está procesando su ${(user) ? 'actualización' : 'registro'}...`,
			classes:'blue black-text'
		});

		const update = (user) ? true : false;
		const [totalErrors, errors] = validate(state, update);

		if(!totalErrors) {
			const sendData = { ...state };
			try {
				if(sendData.cod_pais === 'ARG') {
					sendData.domProvincia = '';
					sendData.domLocalidad = '';
				} else {
					sendData.codProvincia = '';
					sendData.codLocalidad = '';
				}

				const URI = (update) ? 'actualizar/'+user.id : 'registrar';
				const { data } = await httpClient.apiPost(`usuarios/${URI}`, serealizeData(sendData, update));

				if(data.cod == 400) {
					for(const field in data.errors) {
						for(const err in data.errors[field]) {
							M.toast({
								html: data.errors[field][err],
								classes:`black-text yellow`
							});
						}
					}
				} else if(data.cod == 200) {
					setState(initialState);
					M.toast({
						html: `${(update) ? 'Actualización exitosa' : 'Registro exitoso'}`,
						classes:`black-text green`
					});

					if(!update) {
						M.toast({
							html: 'Revise su bandeja de mail y confirme su registro',
							classes:`black-text green`
						});
					} else {
						verifySession();
					}
					handleToggleAccount(null, true);
				}

				setDisablebRegistro(false);
			} catch(err) {
				M.toast({
						html: 'Ocurrió un error. Por favor intente nuevamente',
						classes:'red black-text'
					});
				setDisablebRegistro(false);
			}
		} else {
			for(const err in errors) {
				M.toast({
					html: errors[err],
					classes:'red black-text'
				});

			}
			setDisablebRegistro(false);
		}
	}

	const renderApellidos = () => (
		<TextInput
			s={12}
			type='text'
			name='apellidos'
			value={state.apellidos}
			onChange={handleInput}
			icon={(sidenav) ? null : 'account_circle'}
			globalClasses={cx(style.inputIcon, style.inputBottom)}
			label={
				<span>Apellidos {(user) ? '' : <span className="red-text">*</span>}</span>
			}
			// validate
			required={!user}
		/>
	);

	const renderEmailConfirmacion = () => (
		<TextInput
			s={12}
			validate
			type='email'
			required={!user}
			name='email_confirmado'
			onChange={handleInput}
			value={state.email_confirmado}
			icon={(sidenav) ? null : 'email'}
			globalClasses={cx(style.inputBottom, style.inputIcon)}
			label={
				<span>Confirme e-mail {(user) ? '' : <span className="red-text">*</span>}</span>
			}
		/>
	);

	return(
		<div
			className={cx(
				props.className, 
				style.wrapperRegister,
				{[`${style.mobile}`]: sidenav},
				'z-depth-3'
		)} >
			<div className="row">
				<div className="col s12">
					<h2>
						{(user) ? 'Actualizar mi perfil' : 'Ingresa tus datos'}
					</h2>
					<div className={style.lineTitle} ></div>
				</div>
			</div>

			<form ref={_form} onSubmit={handleSubmit} >
				<div className="row">
					<div className="col s12 l4">
						<TextInput
							s={12}
							validate
							type='text'
							name='nombres'
							required={!user}
							value={state.nombres}
							onChange={handleInput}
							icon={(sidenav) ? null : 'account_circle'}
							globalClasses={cx(style.inputIcon, style.inputBottom)}
							label={
								<span>Nombre {(user) ? '' : <span className="red-text">*</span>}</span>
								}
						/>

						{sidenav && renderApellidos()}

						<TextInput
							s={12}
							name='email'
							value={state.email}
							type='email'
							globalClasses={style.inputIcon}
							icon={(sidenav) ? null : 'email'}
							onChange={handleInput}
							label={
								<span>e-mail {(user) ? '' : <span className="red-text">*</span>}</span>
							}
							validate
							required={!user}
						/>

						{sidenav && renderEmailConfirmacion()}

						<TextInput
							s={12}
							value={state.nro_documento}
							name='nro_documento'
							type='text'
							globalClasses={cx(style.inputIcon, style.inputBottom)}
							icon={(sidenav) ? null : 'fingerprint'}
							onChange={handleInput}
							label={
								<span>Nº documento {(user) ? '' : <span className="red-text">*</span>}</span>
							}
							validate
							required={!user}
						/>

						{sidenav && <div className="col s12"><p className={style.label} >Fecha de nacimiento</p></div>}

						<TextInput
							s={4}
							name='nacDia'
							value={state.nacDia}
							type='text'
							globalClasses={cx(style.inputIcon, style.inputBottom)}
							icon={(sidenav) ? null : 'cake'}
							onChange={handleInput}
							label='Día'
						/>

						<TextInput
							s={4}
							name='nacMes'
							value={state.nacMes}
							globalClasses={cx(style.inputBottom)}
							type='text'
							onChange={handleInput}
							label='Mes'
						/>

						<TextInput
							s={4}
							name='nacAnho'
							value={state.nacAnho}
							globalClasses={cx(style.inputBottom)}
							type='text'
							onChange={handleInput}
							label='Año'
						/>

						<Select
							s={12}
							name='genero'
							value={state.genero}
							onChange={handleInput}
							selectClassName={style.selectM}
						>
							<option disabled value="" >
								Genero
							</option>
							<option value="1">Masculino</option>
							<option value="2">Femenino</option>
							<option value="3">Otro</option>
						</Select>
					</div>

					<div className="col s12 l4">
						{!sidenav && renderApellidos()}
						{!sidenav && renderEmailConfirmacion()}

						<TextInput
							s={12}
							type='text'
							name='telefono'
							value={state.telefono}
							onChange={handleInput}
							label='Teléfono/Celular'
							icon={(sidenav) ? null : 'local_phone'}
							globalClasses={cx(style.inputIcon, style.inputBottom)}
						/>

						{ (!user) ? null :
							<p className={style.texto} >Dejar en blanco si no desea cambiar su contraseña</p>
						}

						<TextInput
							s={12}
							name='password'
							value={state.password}
							type='password'
							onChange={handleInput}
							label={
								(user) ? <span>Nueva contraseña</span> :
								<span>Contraseña <span className="red-text">*</span></span>
							}
							validate
							required={!user}
						/>

						<TextInput
							s={12}
							validate
							type='password'
							required={!user}
							onChange={handleInput}
							name='passwordConfirmado'
							value={state.passwordConfirmado}
							globalClasses={cx(style.inputBottom)}
							label={
								<span>Confirmar contraseña {(user) ? '' : <span className="red-text">*</span>}</span>
							}
						/>
					</div>

					<div className="col s12 l4">
						<TextInput
							s={12}
							validate
							type='text'
							required={!user}
							name='domicilio'
							label='Dirección'
							onChange={handleInput}
							value={state.domicilio}
							globalClasses={cx(style.inputBottom)}
						/>

						<TextInput
							s={12}
							validate
							type='text'
							required={!user}
							name='codigo_postal'
							label='Código Postal'
							onChange={handleInput}
							value={state.codigo_postal}
							globalClasses={cx(style.inputBottom)}
						/>

						<Select
							selectClassName={style.selectM}
							label='País'
							s={12}
							name='cod_pais'
							onChange={handleInput}
							value={state.cod_pais}
						>
						{
							paises.map((pais, index) => (<option key={index} value={pais.code}>{pais.label}</option>))
						}
						</Select>

						{ (false && state.cod_pais == 'ARG') ?
							<Fragment>
								<Select
									selectClassName={style.selectM}
									s={12}
									name='codProvincia'
									onChange={handleInput}
									value={state.codProvincia}
								>
								<option disabled value="" >
									provincias
								</option>
								{
									provincias.map((el) => (
										<option key={el.provinciaCod} value={el.provinciaCod}>
											{el.provincia}
										</option>
									))
								}
								</Select>

								<Select
									selectClassName={style.selectM}
									label='Localidades'
									s={12}
									name='codLocalidad'
									onChange={handleInput}
									value={state.codLocalidad}
								>
								{ (state.codProvincia) ? null :
									<option disabled value="" >
										Debes selecionar una Provincia
									</option>
								}
								{
									localidades.map((el) => (
										<option key={el.localidadCod} value={el.localidadCod}>
											{el.nombre}
										</option>
									))
								}
								</Select>
							</Fragment>
							:
							<Fragment>
								<TextInput
									s={12}
									name='domProvincia'
									value={state.domProvincia}
									globalClasses={style.inputBottom}
									type='text'
									onChange={handleInput}
									label='Provincia'
								/>

								<TextInput
									s={12}
									name='domLocalidad'
									value={state.domLocalidad}
									globalClasses={style.inputBottom}
									type='text'
									onChange={handleInput}
									label='Localidad'
								/>
							</Fragment>
						}
					</div>
				</div>
				
				<div className="row">
					<div className={cx('col', 's12', 'l8', style.checkboxWrapper)} >
					{ (user) ? null :
						<Fragment>
							<div className="col s12">
								<Checkbox
									name='aceptoTerminos'
									onChange={handleInput}
									value={state.aceptoTerminos}
									filledIn
									id='checkbox-aceptoTerminos'
									label={
										<Fragment>
											Si, he leído y acepto las{' '}
											<a href="#">políticas de privacidad</a>{' '}
											y los <a href="#">términos de uso.</a>
										</Fragment>
									}
								/>
							</div>
							<div className="col s12">
								<Checkbox
									name='acepta_noticias'
									onChange={handleInput}
									value={state.acepta_noticias}
									filledIn
									id='checkbox-acepta_noticias'
									label='Suscribirse a nuestro newsletter'
								/>
							</div>
						</Fragment>
					}
					</div>
					<div className="col s12 l4">
					{ props.open &&
						<ReCAPTCHA
							ref={_recaptcha}
							className={style.recaptcha}
							size={(sidenav) ? 'compact' : 'normal'}
							sitekey={SITE_KEY_RECAPTCHA}
							onChange={onChangeRecaptcha}
						/>
					}
						<button
							disabled={disablebRegistro && !user}
							className={cx('btn', 'btn-primary', 'right', style.btnRegister)}
							onClick={handleSubmit}
						>
							{ (user) ? 'Actualizar' : 'REGISTRARME' }
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

Register.propTypes = {
	/*
	 * Determina si el Resgister está abierto cuando es Utilizado en el Header
	 * para renderizar el CAPTCHA, por defecto siempre será 'true' para  que se
	 * muestre el CAPTCHA
	*/
	open: PropTypes.bool,
}

const mapStateToProps = (store) => ({
	user: store.login.user,
});

const mapDispathToProps = (dispath) => ({
	verifySession: () => verifySession(dispath)
});

export default connect(mapStateToProps, mapDispathToProps)(Register);