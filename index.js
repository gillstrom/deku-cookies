/** @jsx dom */
import Button from 'deku-button';
import cookie from 'component-cookie';
import dom from 'magic-virtual-element';

const propTypes = {
	button: {
		type: 'string'
	},
	class: {
		type: 'string'
	},
	content: {
		type: 'object'
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
	if (!cookie('deku-cookie-accepted')) {
		setState({active: true});
	}
}

function render({props, state}, setState) {
	const {button, content, maxage, onClick} = props;
	const {active} = state;

	if (!active) {
		return <noscript/>;
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
			<Button class='Cookies-button' onClick={handle}>
				{button}
			</Button>
		</div>
	);
}

export default {afterMount, defaultProps, propTypes, render};
