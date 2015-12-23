/** @jsx dom */
import dom from 'magic-virtual-element';
import {render, tree} from 'deku';
import Cookies from '../';

const content = <div>Hello there! If you accept what I say, click the button.</div>;
const app = tree(<Cookies button={'ACCEPT'} content={content} maxage={1000000000}/>);

render(app, document.body);
