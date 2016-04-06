/** @jsx dom */
import Button from 'deku-button';
import cookie from 'component-cookie';
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
	maxage: 7889238000
};

function afterMount({props}, el, setState) {
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
}

function render({props, state}, setState) {
	const {button, content, maxage, onClick} = props;
	const {active} = state;

	if (!active) {
		return <noscript/>;
	}

	function getButton() {
		if (typeof button === 'object') {
			if (!button.attributes.onClick) {
				button.attributes.onClick = handle;
			}

			return button;
		}

		return (
			<Button class='Cookies-button' onClick={handle}>
				{button}
			</Button>
		);
	}

	function handle() {
		cookie('deku-cookie-accepted', 'true', {maxage});

		setState({active: false});

		if (onClick) {
			onClick();
		}
	}

	return (
		<div class={['Cookies', props.class]}>
			<div class='Cookies-content'>
				{content}
			</div>
			{getButton()}
		</div>
	);
}

export default {afterMount, defaultProps, propTypes, render};
