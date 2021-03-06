/** @jsx dom */
import Button from 'deku-button';
import cookie from 'component-cookie';
import deepEqual from 'deep-equal';
import dom from 'magic-virtual-element';

const propTypes = {
	button: {
		type: 'object'
	},
	class: {
		type: 'string'
	},
	cookieName: {
		'type': 'string'
	},
	content: {
		type: 'object'
	},
	isAccepted: {
		type: 'function'
	},
	maxage: {
		type: 'number'
	},
	onClick: {
		type: 'function'
	},
	secure: {
		type: 'boolean'
	}
};

const defaultProps = {
	cookieName: 'deku-cookie-accepted',
	maxage: 7889238000
};

const handleClick = ({cookieName, maxage, onClick, secure}, setState) => () => {
	cookie(cookieName, 'true', {maxage, secure});

	setState({active: false});

	if (onClick) {
		onClick();
	}
};

const getButton = (props, setState) => {
	const {button} = props;

	if (typeof button === 'object') {
		if (!button.attributes.onClick) {
			button.attributes.onClick = handleClick(props, setState);
		}

		return button;
	}

	return (
		<Button class='Cookies-button' onClick={handleClick(props, setState)}>
			{button}
		</Button>
	);
};

const afterMount = ({props}, el, setState) => {
	const {cookieName, isAccepted} = props;

	if (!cookie(cookieName)) {
		setState({active: true});

		if (isAccepted) {
			isAccepted(false);
		}

		return;
	}

	if (isAccepted) {
		isAccepted(true);
	}
};

const shouldUpdate = ({props, state}, nextProps, {active}) => !deepEqual(props, nextProps) || state.active !== active;

const render = ({props, state}, setState) => {
	const {content} = props;
	const {active} = state;

	if (!active) {
		return <noscript/>;
	}

	return (
		<div class={['Cookies', props.class]}>
			<div class='Cookies-content'>
				{content}
			</div>
			{getButton(props, setState)}
		</div>
	);
};

export default {afterMount, defaultProps, propTypes, render, shouldUpdate};
