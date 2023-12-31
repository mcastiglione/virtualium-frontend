import React from 'react';
import PropTypes from 'prop-types';

/* style */
import cx from 'classnames';
import style from './slider.css';

const Slide = ({ image, children }) => (
	<li>
		{image}
		{children}
	</li>
);

Slide.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	/**
	 * The image that will be used in the Slide
	 */
	image: PropTypes.node.isRequired
};

export default Slide;