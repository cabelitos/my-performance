import merge from 'lodash.merge';

import nodeResolver from './node';
import perfResolvers from './performance-entry';

export default merge(nodeResolver, perfResolvers);
