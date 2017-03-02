import AppDispatcher from './flux/app_dispatcher';
import getRouter from './get_router';

const router = getRouter();

export const updateStateFromRouter = (route) => {
    AppDispatcher.dispatch({
        type: 'update_router',
        payload: {
            ...route,
        },
    });
};

export const updateRouter = (route) => {
    // console.log(router.getState(), route);
    router.navigate(route, () => {
        updateStateFromRouter(route);
    });
};

