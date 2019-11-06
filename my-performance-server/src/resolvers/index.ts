import merge from 'lodash.merge';

import nodeResolver from './node';
import perfResolvers from './performance-entry';
import dateResolvers from './date';

export default merge(nodeResolver, perfResolvers, dateResolvers);
