import R from 'ramda';
import data from './data';
import { fixedEncodeURIComponent } from '../util/convert';

let api = null;

// invert object: {key: value} -> {value: key}
const invertKeyValue = obj => R.reduce((acc, key) =>
    R.merge(acc, { [obj[key]]: key }), {}, R.keys(obj));

// recursively loop over all categories and subcategories
const getCategories = categories => R.map((cat) => {
    const subs = cat.subcategories;
    if (R.isNil(subs) === false) {
        return [cat, ...getCategories(subs)];
    }
    return cat;
}, categories);

// getCategories returns nested arrays so flatten them:
// [val1, val2, [val3, val4, [val5, val6]]] -> [val1, val2, val3, val4, val5, val6]
const categories = R.flatten(getCategories(data));
const labels = R.map(cat => cat.label, categories);

// create segments from the category names to populate the browser's address bar
const urlByLabel = R.reduce((acc, val) =>
    R.merge(acc, { [val]: fixedEncodeURIComponent(val) }), {}, labels);

const labelByUrl = invertKeyValue(urlByLabel);

const categoriesByLabel = R.reduce((acc, cat) =>
    R.merge(acc, { [cat.label]: cat }), {}, categories);

const examplesByLabel = R.reduce((acc, cat) => {
    const examples = cat.examples;
    if (R.isNil(examples) === false) {
        const byLabel = R.reduce((acc1, example) =>
            R.merge(acc1, { [example]: fixedEncodeURIComponent(example) }), {}, examples);
        return R.merge(acc, byLabel);
    }
    return acc;
}, {}, categories);

const stripSlash = url => (url[0] === '/' ? url.substring(1) : url);

// Create routes for all nested categories and setup functions to
// access data easily based on the current route
const initApi = () => {
    const routes = [];
    let routesByLabel = {};
    const createRoutes = () => {
        const createRoute = (category, name) => {
            const segment = fixedEncodeURIComponent(category.label);
            const newName = name === null ? segment : `${name}.${segment}`;
            routes.push({
                label: category.label,
                name: newName,
                path: `/${segment}`,
            });
            const subcategories = category.subcategories;
            if (R.isNil(subcategories) === false) {
                R.map(cat =>
                    createRoute(cat, newName), subcategories);
            }
        };
        createRoute(data[0], null);
        routesByLabel = R.reduce((acc, route) => R.merge(acc, { [route.label]: route }), {}, routes);
    };

    const getBreadCrumbLinks = (name) => {
        const segments = R.split('.', name);
        const breadCrumbs = R.map((segment) => {
            const l = labelByUrl[segment];
            const r = routesByLabel[l];
            return { ...r, label: segment };
        }, segments);
        // console.log(segments, breadCrumbs);
        return breadCrumbs;
    };

    const getSubCategoryLinks = (path, label) => {
        const subcategories = categoriesByLabel[label].subcategories || [];
        return R.map(val => ({ ...routesByLabel[val.label] }), subcategories);
    };

    const getLabelLastSegment = (path) => {
        const segment = R.compose(R.last, R.split('/'))(stripSlash(path));
        return labelByUrl[segment];
    };

    createRoutes();

    return {
        getUrl: label => urlByLabel[label],
        getLabel: url => labelByUrl[url],
        getCategory: label => categoriesByLabel[label],
        getExample: label => examplesByLabel[label],
        getLabelLastSegment,
        getBreadCrumbLinks,
        getSubCategoryLinks,
        routes,
    };
};

// singleton; we only need to setup the api once
export default () => {
    if (R.isNil(api)) {
        api = initApi();
    }
    return api;
};
