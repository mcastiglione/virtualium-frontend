import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* style */
import style from './dashboard.css';

const Dashboard = () => {
	return(
		<div className={style.mainContent} >
			<h4>Template Dashboard</h4>
			<ul>
				<li>
					<Link to='/messages' > messages </Link>
				</li>

				<li>
					<Link to='/selfies' > selfies </Link>
				</li>

				<li>
					<Link to='/videos' > videos </Link>
				</li>
			</ul>
		</div>
	);
}
export default Dashboard;