import AppDispatcher from './flux/app_dispatcher';
import getRouter from './get_router';

const router = getRouter();

export const updateRouter = ({ route }) => {
    router.navigate(route, {}, {}, () => {
        // console.log(route);
        AppDispatcher.dispatch({
            type: 'update_router',
            payload: {
                route,
            },
        });
    });
};

export const aap = 'konijn';
