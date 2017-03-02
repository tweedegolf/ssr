/* eslint no-underscore-dangle: "off" */

import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../flux/app_dispatcher';


class Store extends ReduceStore {
    getInitialState() {
        return {};
        // return this.createNewState({}, { route: 'csr/animals/vertebrates' });
        // return this.createNewState({}, global.window.__APP_INITIAL_STATE__);
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
