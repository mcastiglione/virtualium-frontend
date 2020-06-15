import React from 'react';
import { NavLink, Link } from 'react-router-dom';

/* Style */
import cx from 'classnames';
import style from './footer.css';

const Footer = () => {
	return(
		<section className={style.mainContent}>
			<footer className={style.footer} >
				<div className={style.contentLogo} >
					<Link to='/'>
						<img src="/img/logo-virtualium-footer.png" alt=""/>
					</Link>
				</div>

				<div className={style.contentLinks} >
					<Link to='/ayuda' >Centro de ayuda</Link>
					<Link to='/cuenta' >Cuenta</Link>
					<Link to='/prensa' >Prensa</Link>
					<Link to='/terminos-condiciones' >Términos de uso</Link>
					<Link to='/politicas-privacidad' >Privacidad</Link>
				</div>

				<div className={style.contentLinks} >
					<Link to='/puntos-de-venta' >Información corporativa</Link>
					<Link to='/beneficios' >Contáctanos</Link>
					<Link to='/productores' >Prueba de velocidad</Link>
					<Link to='/terminos-condiciones' >Avisos legales</Link>
				</div>

				<div className="tuticket-link">
					<Link to='/visor' className={cx('btn', style.btnDemo)} >Demostración</Link>
				</div>
			</footer>
		</section>
	)
}

export default Footer;