import AppDispatcher from './flux/app_dispatcher';
import getRouter from './get_router';
import { getApi } from './api';

const router = getRouter();


export const updateStateFromRouter2 = (route) => {
    const api = getApi();
    const { path, name } = route;
    const breadCrumbs = api.getBreadCrumbLinks(name);
    const label = api.getLabelLastSegment(path);
    const {
        summary,
        examples,
    } = api.getCategory(label) || {};
    const subcategoryLinks = api.getSubCategoryLinks(path, label);
    // console.log('[action]', label, breadCrumbs[0], subcategoryLinks[0]);

    AppDispatcher.dispatch({
        type: 'update_router',
        payload: {
            renderType: api.renderType,
            label,
            summary,
            examples,
            breadCrumbs,
            subcategoryLinks,
        },
    });
};


export const updateStateFromRouter = (route) => {
    AppDispatcher.dispatch({
        type: 'update_router',
        payload: {
            ...route,
        },
    });
};

export const updateRouter = (route) => {
    // console.log('state:', router.getState());
    // console.log('route:', route);
    router.navigate(route.name, () => {
        updateStateFromRouter(route);
    });
};

