import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* style */
import style from './navigation.css';

const Navigation = (props) => {
	const menu = props.menu.map((el, key) => {
		return(
			<li key={key} >
				<Link to={el.url} > {el.title} </Link>
			</li>
		)
	})
	return(
		<div className={style.mainContent}>
			<ul>
				{menu}
			</ul>
		</div>
	);
}
export default Navigation;