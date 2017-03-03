import AppDispatcher from './flux/app_dispatcher';
import getRouter from './get_router';
import getApi from './api';

const api = getApi();
const router = getRouter();


export const updateStateFromRouter = (route) => {
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
            label,
            summary,
            examples,
            breadCrumbs,
            subcategoryLinks,
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

