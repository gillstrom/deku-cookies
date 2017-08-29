/** @jsx dom */
import assertElement from 'assert-element';
import componentMock from 'component-mock';
import dom from 'magic-virtual-element';
import test from 'ava';
import Cookies from '.';

const mock = componentMock(Cookies);

test('has class prop', () => {
	const m = mock.render({
		props: {class: 'Foo'},
		state: {active: true}
	});

	assertElement.hasClass(m, 'Foo');
});

test('has content prop', () => {
	const content = <div class='Foo'/>;
	const m = mock.render({
		props: {content},
		state: {active: true}
	});

	assertElement.hasChild(m, 0, x => {
		assertElement.hasChild(x, 0, y => {
			assertElement.hasClass(y, 'Foo');
		});
	});
});

test('has button prop', () => {
	const button = <button class='Foo'/>;
	const m = mock.render({
		props: {button},
		state: {active: true}
	});

	assertElement.hasChild(m, 1, x => {
		assertElement.hasClass(x, 'Foo');
	});
});
