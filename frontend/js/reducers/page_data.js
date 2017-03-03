/* eslint no-underscore-dangle: "off" */

import { ReduceStore } from 'flux/utils';
// import R from 'ramda';
import AppDispatcher from '../flux/app_dispatcher';

class Store extends ReduceStore {
    getInitialState() {
        // const ssrState = global.window.__APP_INITIAL_STATE__;
        // const initialState = R.isNil() ? {} : ssrState;
        return {};
    }

    reduce(state, action) {
        switch (action.type) {
        case 'update_router':
            return { ...action.payload };

        default:
            return state;
        }
    }
}

export default new Store(AppDispatcher);
