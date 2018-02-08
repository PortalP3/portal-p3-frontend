import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

var jsdom = require('jsdom');
const { JSDOM } = jsdom;

global.document = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>', {
  url: 'http://localhost'
})
global.window = document.defaultView
global.navigator = global.window.navigator
