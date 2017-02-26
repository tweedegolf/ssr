import * as constants from '../constants';
import data from '../data.js';

const initialState = { page: 'animals' };

export default (state = initialState, action) => {
    switch (action.type) {
    case constants.TREE_CLICK:
        return state;
    case constants.TREE_UP:
        return state;
    case constants.TREE_DOWN:
        return state;
    default:
        return state;
    }
};
