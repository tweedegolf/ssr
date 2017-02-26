import * as constants from '../constants';

const initialState = {
    label: 'Animals',
    summary: '',
    examples: [],
};

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
