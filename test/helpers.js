import { expect, should } from 'chai';

import sinon from 'sinon';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

function noop() {
  return null;
}

require.extensions['.css'] = noop;

global.expect = expect;
global.should = should;
global.sinon = sinon;

configure({ adapter: new Adapter() })