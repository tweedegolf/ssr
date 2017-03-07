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
