import React, { useRef, useState, useEffect } from 'react';
import { useLocation, Redirect, useHistory, NavLink, Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

/* style */
import cx from 'classnames';
import style from './header.css';

/* constants */
import { ROLES, DASHBOARD_URL_ROOT } from '../../config';

/* context */
import connect from '../../context/connect';

/* components */
import Icon from '../Icon';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import NavItem from '../Navbar/NavItem';
import Buscador from '../Buscador/Buscador';
import Company from '../Company/Company';
import Register from '../Register/Register';
import RedesSociales from './RedesSociales/RedesSociales';

/* Actions */
import { logout, handleOpenLogin, handleOpenRegister, handlechangeheaderlogo } from '../../actions/loginAction';


const BootstrapInput = withStyles((theme) => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(3),
		},
	},
	input: {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 26px 10px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
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
			backgroundColor: '#fff'
		},
	},
}))(InputBase);

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
	combo_container: {
		position: 'absolute',
		top: 20,
		left: '75%',
		"@media (max-width: 992px)": { display: 'none' }
	}
}));

const Header = ({
	user,
	evento,
	logout,
	handlechangeheaderlogo,
	mobileActive,
	handleOpenLogin,
	triggerOpenLogin,
	header_logo_img,
	handleOpenRegister,
	triggerOpenRegister,
	...props
}) => {
	const _navbar = useRef({});
	const history = useHistory();
	const location = useLocation();
	const [scrollActive, setScrollActive] = useState(false);

	const [company, setCompany] = React.useState(window.localStorage.getItem('header_logo_img'));
	const classes = useStyles();
	const handleChangeCompany = (event) => {
		setCompany(event.target.value);
		localStorage.setItem('header_logo_img', event.target.value);
	};

	useEffect(() => {
		let img = window.localStorage.getItem('header_logo_img');
		console.log('header page--->', img)
		handlechangeheaderlogo(company);
	}, [company])

	/* Estados de los contenedores de furmularios */
	const [openLogin, setOpenLogin] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);
	const [openBuscador, setOpenBuscador] = useState(false);
	const [openCompany, setOpenCompany] = useState(false);

	useEffect(() => {
		if (user) {
			/*
			 * Asegurar el cierre de todos los formularios cuando
			 * el usuario inicia sesión correctamente
			*/
			handleActionForm(null, true);
		}
	}, [user])

	useEffect(() => {
		handleActionForm(null, null, true);
	}, [location])

	useEffect(() => {
		/*
		 * una vez abierto el [login ó register] cambiar el estado de
		 * [triggerOpenLogin ó triggerOpenLogin] nuevamente a cerrado (false)
		 * para asegurar que si se llama nuevamente permita abrir los formularios
		 * [login ó register] según corresponda
		*/
		if (triggerOpenLogin) {
			handleActionForm('login');
			handleOpenLogin();
		}
		if (triggerOpenRegister) {
			handleActionForm('register');
			handleOpenRegister();
		}
	}, [triggerOpenLogin, triggerOpenRegister]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleScroll = () => {
		setScrollActive(window.scrollY > 100);
		setOpenRegister(false)
		setOpenLogin(false);
		setOpenBuscador(false);
		setOpenCompany(false);
	}

	/**
	 * Controla las acciones que abren o cierran los contenedores del
	 * buscador, login y registro.
	 * @param {Event} $e Objeto del evento
	 * @param {Boolean} $forceClose fuerza el cerrar del contenedor abierto
	 * @param {String} $action acción que se desea realizar
	 * las acciones permitidas son:
	 * --------------------------------------------------------------------------
	 * - dasboard: redirige a un usuario logeado a su panel de administración
	 * - logout: cierra la sesión de un usuario logueado
	 * - [register, login, buscar]: cambia al estado opuesto (abierto o cerrado)
	 * --------------------------------------------------------------------------
	 * Post condición: nunca estarán abiertos ambos formularios al mismo tiempo
	 */
	const handleActionForm = (action, forceClose = false) => {
		if (forceClose) {
			setOpenRegister(false);
			setOpenLogin(false);
			setOpenBuscador(false);
			setOpenCompany(false);
			return;
		}

		/*
		 * Cambiar el estado del triggerOpenLogin cuando
		 * es abierto desde otro lugar diferente al <Header/>
		*/
		// if(triggerOpenLogin) handleOpenLogin();

		if (action == 'dashboard') return history.push("/dashboard");
		if (action == 'logout') return logout();
		setOpenRegister((prevState) => action === 'register' && !prevState)
		setOpenLogin((prevState) => action === 'login' && !prevState)
		setOpenBuscador((prevState) => action === 'buscar' && !prevState)
		// setOpenCompany((prevState) => action === 'company' && !prevState)
		if (action === 'company') return history.push("/company");
	}

	/*
	 * Construir la navegación correspondiente para el usuario actual
	*/
	var navigation = [];
	var sidenavNavigation = [];

	const navItemBuscador = {
		title: 'Buscador',
		iconImg: '/img/icons/icono-buscar.svg',
		action: () => handleActionForm('buscar'),
	}

	const navItemCompany = {
		title: 'Company',
		iconImg: '/img/icons/company.png',
		action: () => handleActionForm('company'),
	}

	const navItemProfile = {
		title: 'Perfil',
		iconImg: '/img/icons/icono-perfil.svg',
		action: () => handleActionForm((user) ? 'register' : 'login', openRegister),
	}

	const navItemLogout = {
		title: 'Logout',
		icon: 'exit_to_app',
		action: () => handleActionForm('logout'),
	}

	const classnamesBotonDefault = cx(
		style.navItemBotonDefault,
		{ [`${style.scrollActive}`]: scrollActive },
		{ [`${style.mobileActive}`]: mobileActive }
	);

	const navItemDashboad = {
		title: 'Dashboard',
		className: classnamesBotonDefault,
		action: () => history.push(DASHBOARD_URL_ROOT),
	}

	const navItemVisor = {
		title: 'Ir a sala virtual',
		className: classnamesBotonDefault,
		action: () => history.push('/visor'),
	}

	const navItemTicketera = {
		title: 'Ticketera',
		iconImg: '/img/icons/icono-mis-compras.svg',
		action: () => { },
	}

	const contentFormsSidenav = {
		node: (
			<div className={style.contentFormsSidenav} >
				{mobileActive && renderRegister()}
				{mobileActive && renderBuscador()}
				{mobileActive && renderComanyPage()}
				{mobileActive && renderContentLogin()}
			</div>
		)
	}

	sidenavNavigation.push(
		{
			node: <RedesSociales />,
			className: style.sidenavRedesSociales,
		}
	);

	/*
	 * Si el usuario está logueado se Agrega los items correspondientes a su rol.
	 * En caso contrario se muestra la navegación por defecto
	 */
	if (user) {
		const ROL = ROLES.find((el) => user && el === user.rol);
		const navItemUser = {
			node: (
				<span>
					{user.nombres}
				</span>
			),
			className: cx(style.noPointer, style.username)
		};

		navigation.push(navItemBuscador);
		navigation.push(navItemCompany);
		// navigation.push(navItemTicketera);

		// sidenavNavigation.push(navItemTicketera);

		if (ROL === ROLES[4]) {
			navigation.push(navItemVisor);
			navigation.push(navItemDashboad);
			sidenavNavigation.push(navItemVisor);
			sidenavNavigation.push(navItemDashboad);
		}

		navigation.push(navItemProfile);
		navigation.push(navItemLogout);
		navigation.push(navItemUser);
	} else {
		navigation = [
			navItemCompany,
			navItemBuscador,
			navItemProfile
		];
	}

	sidenavNavigation.push(
		navItemCompany,
		navItemBuscador,
		navItemProfile,
		navItemLogout,
		contentFormsSidenav,
	);

	const menu = navigation.map(prepareNavigation);
	const sidenavMenu = sidenavNavigation.map(prepareNavigation);

	function prepareNavigation(el, key) {
		var label;
		const { url, title, action, iconImg, icon, node, className } = el;

		if (node) {
			return (
				<li key={key} className={className} >
					{node}
				</li>
			)
		}

		if (iconImg) {
			label = (
				<img
					alt={title}
					src={iconImg}
					className={cx(
						style.iconImg,
						{ [`${style.scrollActive}`]: scrollActive },
					)}
				/>
			)
		} else if (icon) {
			label = <Icon >{icon}</Icon>;
		} else {
			label = title;
		}

		return (
			<NavItem
				key={key}
				title={title}
				onClick={action}
				className={cx(
					className,
					style.link,
					{ [`${style.scrollActive}`]: scrollActive })
				}
			>
				{label}
			</NavItem>
		);
	}

	function renderBuscador() {
		return (
			<div className={cx(
				style.buscadorContent,
				{ [`${style.open}`]: openBuscador },
				{ [`${style.mobileActive}`]: mobileActive },
				'z-depth-3'
			)}>
				<Buscador open={openBuscador} />
			</div>
		)
	}

	function renderComanyPage() {
		return (
			<div className={cx(
				style.buscadorContent,
				{ [`${style.open}`]: openCompany },
				{ [`${style.mobileActive}`]: mobileActive },
				'z-depth-3'
			)}>
				<Company open={openCompany} />
			</div>
		)
	}

	function renderContentLogin() {
		return (
			<div
				className={cx(
					style.tuTicketeraContent,
					{ [`${style.open}`]: openLogin },
					{ [`${style.mobileActive}`]: mobileActive },
					'z-depth-3'
				)}
			>
				<Login
					open={openLogin}
					handleCreateAccount={handleActionForm}
					recaptchaSize={(mobileActive) ? 'compact' : 'normal'}
				/>
			</div>
		)
	}

	function renderRegister() {
		return (
			<Register
				open={openRegister}
				sidenav={mobileActive}
				handleToggleAccount={handleActionForm}
				className={cx({ 'scale-1': openRegister })}
			/>
		)
	}

	return (
		<div
			className={cx(
				style.contentFixed,
				{ [`${style.scrollActive}`]: scrollActive },
				{ [`${style.home}`]: location.pathname === '/' }
			)}
		>
			<header
				ref={_navbar}
				className={cx(
					style.navbar,
					{ [`${style.scrollActive}`]: scrollActive },
				)}
			>
				<section className={style.contentLogo} >
					<Link to='/'>
						<img
							src={header_logo_img === 'company1' ? `/img/virtualium.png` : `/img/virtualium1.png`}
							alt="Logo oficial VIRTUALIUM"
							className={cx({ [`${style.scrollActive}`]: scrollActive }, style.logo)}
						/>
					</Link>
				</section>
				<section className={style.contentRedesSociales} >
					{!mobileActive && <RedesSociales scrollActive={scrollActive} />}
				</section>

				<section>
					<Navbar sidenav={sidenavMenu} >
						{menu}
					</Navbar>
					{/* <section className={classes.combo_container}>
						<FormControl className={classes.margin}>
							<NativeSelect
								id="demo-customized-select-native"
								value={company}
								onChange={handleChangeCompany}
								input={<BootstrapInput />}
							>
								<option value={'company1'}>Company1</option>
								<option value={'company2'}>Company2</option>
							</NativeSelect>
						</FormControl>
					</section> */}
					{!mobileActive && renderComanyPage()}
					{!mobileActive && renderBuscador()}
					{!mobileActive && renderRegister()}
					{!mobileActive && renderContentLogin()}
				</section>
			</header>
		</div>
	);
}

const mapStateToProps = (store) => ({
	evento: store.evento,
	user: store.login.user,
	triggerOpenLogin: store.login.triggerOpenLogin,
	triggerOpenRegister: store.login.triggerOpenRegister,
	header_logo_img: store.login.header_logo_img
});

const mapDispathToProps = (dispath, store) => ({
	logout: () => dispath(logout()),
	handlechangeheaderlogo: (param) => dispath(handlechangeheaderlogo(param, dispath)),
	handleOpenLogin: () => dispath(handleOpenLogin(store)),
	handleOpenRegister: () => dispath(handleOpenRegister(store)),
});

export default connect(mapStateToProps, mapDispathToProps)(Header);