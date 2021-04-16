import React, { useRef, useEffect, Children } from 'react';
import { useLocation } from 'react-router-dom';
import './sidenav.scss';
import cx from 'classnames';
import style from './navbar.css';
import Icon from '../Icon';
import idgen from '../../utils/idgen';

const Navbar = ({
	sidenav,
	options,
	children,
	menuIcon,
	navigation,
	classnamesUl,
	classnamesUlMobile,
}) => {
	const location = useLocation();
	const sidenavRef = useRef(null);

	useEffect(() => {
		const instance = M.Sidenav.init(sidenavRef.current, options);
		return () => instance && instance.destroy();
	}, [options, location]);

	const sidenavContent = (sidenav) ? sidenav :
		Children.map(children, (link, index) => {
			if (!link) return null;
			const clonedLink = React.cloneElement(link, {
				...link.props,
				id: `sidenav-${idgen()}`
			});
			return clonedLink;
		});

	return (
		<div className={style.navbarContent}>
			<a href="#!" data-target="mobile-nav" className={cx('sidenav-trigger', style.menuIcon)} >
				{menuIcon}
			</a>
			<ul
				className={cx(style.listLinks, classnamesUl)}
				style={{
					gridTemplateColumns: `repeat(${children.length}, max-content)`,
				}}
			>
				{children}
			</ul>
			<ul
				id="mobile-nav"
				className={cx('sidenav', 'z-depth-1', style.sidenav, classnamesUlMobile)}
				ref={sidenavRef}
			>
				{sidenavContent}
			</ul>
		</div>
	);
}

Navbar.defaultProps = {
	options: {
		edge: 'left',
		draggable: true,
		inDuration: 250,
		outDuration: 200,
		onOpenStart: null,
		onOpenEnd: null,
		onCloseStart: null,
		onCloseEnd: null,
		preventScrolling: true
	},
	menuIcon: <Icon>menu</Icon>
};

export default Navbar;