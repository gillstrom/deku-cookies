# deku-cookies

> Simple cookie warning component for [Deku](https://github.com/dekujs/deku)

Accordning to the law in Europe the visitor of a website using cookies should get information about this and has to give their consent.


## Install

```
$ npm install --save deku-cookies
```


## Usage

```js
import Cookies from 'deku-cookies';

export function render() {
	const content = <div>We are using cookies, do you accept?</div>;

	return (
		<Cookies button='Accept' content={content}/>
	);
}
```

## Attributes

### button

Type: `element` or `string`

Content to be shown as button. If a `string` is sent in, a button will be built automatically.

### class

Type: `string`
Default: `Cookies`

Class to be added to the element.

### content

Type: `element` or `string`

Content to be shown in the component.

### maxage

Type: `number`
Default: `7889238000`

Time before the cookie is removed. Default is around 3 months.

### onClick

Type: `function`

Function that runs on button click.


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
