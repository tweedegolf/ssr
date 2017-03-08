// Since the action creator has already prepared all necessary data for the page
// base on the current route, this reducer can just forward the action's payload
import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../flux/app_dispatcher';

class Store extends ReduceStore {
    getInitialState() {
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
