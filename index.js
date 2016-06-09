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
	}
};

const defaultProps = {
	active: false,
	maxage: 7889238000
};

const handle = ({maxage, onClick}, setState) => () => {
	cookie('deku-cookie-accepted', 'true', {maxage});

	setState({active: false});

	if (onClick) {
		onClick();
	}
};

const getButton = (props, setState) => {
	const {button} = props;

	if (typeof button === 'object') {
		if (!button.attributes.onClick) {
			button.attributes.onClick = handle;
		}

		return button;
	}

	return (
		<Button class='Cookies-button' onClick={handle(props, setState)}>
			{button}
		</Button>
	);
};

const afterMount = ({props}, el, setState) => {
	const {isAccepted} = props;

	if (!cookie('deku-cookie-accepted')) {
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
	const {button, content, maxage, onClick} = props;
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
