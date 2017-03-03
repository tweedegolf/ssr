import R from 'ramda';
import data from './data';
import { fixedEncodeURIComponent } from './util/convert';

let api = null;

const invertKeyValue = obj => R.reduce((acc, key) =>
    R.merge(acc, { [obj[key]]: key }), {}, R.keys(obj));

const getCategories = categories => R.map((cat) => {
    const subs = cat.subcategories;
    if (R.isNil(subs) === false) {
        return [cat, ...getCategories(subs)];
    }
    return cat;
}, categories);

const categories = R.flatten(getCategories(data));
const labels = R.map(cat => cat.label, categories);

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

const initApi = () => {
    const routes = [];
    let routesByLabel = {};
    const createRoutes = () => {
        const createRoute = (category, d) => {
            const segment = fixedEncodeURIComponent(category.label);
            const newPath = `${d.path}/${segment}`;
            const newName = `${d.name}.${segment}`;
            routes.push({
                label: category.label,
                name: newName,
                path: `/${segment}`,
            });
            const subcategories = category.subcategories;
            if (R.isNil(subcategories) === false) {
                R.map(cat =>
                    createRoute(cat, { path: newPath, name: newName }), subcategories);
            }
        };
        routes.push({ path: 'app', name: 'app' });
        createRoute(data[0], { path: 'app', name: 'app' });
        routesByLabel = R.reduce((acc, route) => R.merge(acc, { [route.label]: route }), {}, routes);
    };

    const getBreadCrumbLinks = (name) => {
        const segments = R.compose(R.tail, R.split('.'))(name);
        const breadCrumbs = R.map((segment) => {
            const l = labelByUrl[segment];
            const r = routesByLabel[l];
            return { ...r, label: segment };
        }, segments);
        console.log(segments, breadCrumbs);
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

export default () => {
    if (R.isNil(api)) {
        api = initApi();
    }
    return api;
};
