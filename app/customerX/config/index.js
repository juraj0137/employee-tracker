/**
 * Created by jkubala on 11/19/16.
 */

import {config} from '../../base/config';
import {customer} from './customer';
import {database} from './database';

Object.assign(config, {
    customer,
    database
});

export {
    config,
};
