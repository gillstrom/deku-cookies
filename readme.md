# deku-cookies

> Simple cookie warning component for [Deku](https://github.com/dekujs/deku)

Accordning to the law in Europe the visitor of a website using cookies should get information about this and has to give their consent.


## Install

```
$ npm install deku-cookies
```


## Usage

```js
import Cookies from 'deku-cookies';

const content = <div>We are using cookies, do you accept?</div>;

const render = () => (
	<Cookies button='Accept' content={content}/>;
);

export default {render};
```


## Attributes

### button

Type: `element` or `string`

Content to be shown as button. If a `string` is sent in, a button will be built automatically.

### class

Type: `string`<br>
Default: `Cookies`

Class to be added to the element.

### content

Type: `Element` `string`

Content to be shown in the component.

### content

Type: `string`<br>
Default: `'deku-cookie-accepted'`

Name of cookie to be set.

### isAccepted

Type: `Function`

Function that runs on `afterMount` and returns a `boolean`.

### maxage

Type: `number`<br>
Default: `7889238000`

Time before the cookie is removed. Default is around 3 months.

### onClick

Type: `Function`

Function that runs on button click.

### secure

Type: `boolean`<br>
Default: `false`

Set a secure cookie.


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
