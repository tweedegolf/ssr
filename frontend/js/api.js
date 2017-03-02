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

const initApi = (type) => {
    if (R.isNil(type) || (R.isNil(api) === false && R.isNil(type) === false && type === api.type)) {
        return api;
    }
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
        const path = `/${type}`; // i.e.: /csr or /ssr
        const name = type;
        routes.push({ label: type, path, name });
        createRoute(data[0], { path, name });
        routesByLabel = R.reduce((acc, route) => R.merge(acc, { [route.label]: route }), {}, routes);
    };

    const getBreadCrumbLinks = (name) => {
        const segments = R.compose(R.tail, R.split('.'))(name);
        // console.log(path, stripSlash(path), segments);
        // const label = labelByUrl[R.last(segments)];
        if (type === 'ssr') {
            return R.reduce((acc, val) =>
                [`${acc[0]}/${val}`, [...acc[1], { link: `${acc[0]}/${val}`, label: val }]], ['/ssr', []], segments);
        } else if (type === 'csr') {
            const breadCrumbs = R.map((segment) => {
                const l = labelByUrl[segment];
                const r = routesByLabel[l];
                return { ...r, label: segment };
            }, segments);
            // console.log(breadCrumbs);
            return breadCrumbs;
        }
        return null;
    };

    const getSubCategoryLinks = (path, label) => {
        const subcategories = categoriesByLabel[label].subcategories;
        const segments = R.compose(R.tail, R.split('/'))(stripSlash(path));
        if (R.isNil(subcategories)) {
            return [];
        } else if (type === 'ssr') {
            return R.map(val =>
                ({ label: val.label, link: `${path}/${fixedEncodeURIComponent(val.label)}` }), subcategories);
        } else if (type === 'csr') {
            return R.map(val => ({ ...routesByLabel[val.label] }), subcategories);
        }
        return [];
    };

    const getLabelLastSegment = (path) => {
        const segment = R.compose(R.last, R.split('/'))(stripSlash(path));
        return labelByUrl[segment];
    };

    createRoutes();

    api = {
        type,
        getUrl: label => urlByLabel[label],
        getLabel: url => labelByUrl[url],
        getCategory: label => categoriesByLabel[label],
        getExample: label => examplesByLabel[label],
        getLabelLastSegment,
        getBreadCrumbLinks,
        getSubCategoryLinks,
        routes,
    };

    return api;
};

const getApi = () => api;

export {
    initApi,
    getApi,
};
