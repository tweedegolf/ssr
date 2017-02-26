import { combineReducers, applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import ui from './ui';

const rootReducer = combineReducers({
    ui,
});

let store = null;
const getStore = () => {
    if (store === null) {
        store = createStore(
            rootReducer,
            applyMiddleware(
                createLogger({ collapsed: true }),
            ),
        );
    }
    return store;
};

export default getStore;
