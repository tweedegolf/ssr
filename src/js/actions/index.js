import AppDispatcher from '../flux/app_dispatcher';
import getRouter from '../misc/get_router';
import getApi from '../misc/api';

const api = getApi();
const router = getRouter();

// creates the new state for the Page component from the current route
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

// Called when the user clicks on a Link component; first the router
// transitions to the new route, then an action will be dispatched to
// update the state of the Page component.
export const updateRouter = (route) => {
    router.navigate(route.name, () => {
        updateStateFromRouter(route);
    });
};

