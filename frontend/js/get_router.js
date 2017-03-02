import R from 'ramda';
import createRouter from 'router5';
import loggerPlugin from 'router5/plugins/logger';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';

const routes = [
    { name: 'root', path: '/' },
    { name: 'aap', path: '/aap/beer/konijn' },
];
let router = null;

export default function () {
    if (R.isNil(router)) {
        router = createRouter(routes, {
            defaultRoute: 'root',
        })
        .usePlugin(loggerPlugin)
        .usePlugin(browserPlugin({
            useHash: false,
        }));
        // router.usePlugin(listenersPlugin());
    }
    return router;
}
