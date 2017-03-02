/* eslint no-underscore-dangle: "off" */

import { ReduceStore } from 'flux/utils';
import R from 'ramda';
import AppDispatcher from '../flux/app_dispatcher';
import getApi from '../api';

const api = getApi();

    // let route = _route;
    // if (_route[0] === '/') {
    //     route = _route.substring(1);
    // }


class Store extends ReduceStore {
    getInitialState() {
        return this.createNewState({}, { route: 'csr/animals/vertebrates' });
        // return this.createNewState({}, global.window.__APP_INITIAL_STATE__);
    }

    createNewState(state, action) {
        const route = action.route;
        console.log(route);
        const segment = R.compose(R.last, R.split('/'))(route);
        console.log(route, segment);
        const [path, breadCrumbs] = api.getBreadCrumbLinks(route);

        let label = api.labelByUrl[segment];
        let tmpData = api.categoriesByLabel[label];
        if (R.isNil(label)) {
            label = api.examplesByLabel[segment];
            tmpData = {};
        }
        const {
            summary,
            examples,
        } = tmpData;

        const subcategoryLinks = api.getSubCategoryLinks(label);

        return {
            route,
            path,
            label,
            summary,
            examples,
            breadCrumbs,
            subcategoryLinks,
        };
    }

    reduce(state, action) {
        switch (action.type) {
        case 'update_router':
            return this.createNewState(state, { route: action.payload.path });

        default:
            return state;
        }
    }
}

export default new Store(AppDispatcher);
