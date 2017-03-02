import R from 'ramda';
import data from './data';
import { fixedEncodeURIComponent } from './util/convert';

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

const createRoutes = (segment0) => {
    const routes = [];
    const createRoute = (category, path) => {
        const segment = fixedEncodeURIComponent(category.label);
        const newPath = `${path}/${segment}`;
        routes.push({
            name: category.label,
            path: newPath,
        });
        const subcategories = category.subcategories;
        if (R.isNil(subcategories) === false) {
            R.map(cat =>
                createRoute(cat, newPath), subcategories);
        }
    };
    createRoute(data[0], `/${segment0}`);
    return routes;
};

const getBreadCrumbLinks = (route, type) => {
    const r = route[0] === '/' ? route.substring(1) : route;
    const segments = R.compose(R.tail, R.split('/'))(r);
    console.log(r, segments);
    if (type === 'ssr') {
        return R.reduce((acc, val) =>
            [`${acc[0]}/${val}`, [...acc[1], { link: `${acc[0]}/${val}`, label: val }]], ['/ssr', []], segments);
    } else if (type === 'csr') {
        const routes = createRoutes(type);
        const label = labelByUrl[R.last(segments)];
        // console.log(segments, label, routes);
        const path = R.find(R.propEq('name', label))(routes).path;
        const breadCrumbs = R.map((segment) => {
            const l = labelByUrl[segment];
            console.log(l);
            const r = R.find(R.propEq('name', l))(routes);
            return { link: r.name, label: segment };
        }, segments);
        // console.log(breadCrumbs);
        return [path, breadCrumbs];
    }
    return [null, null];
};

const getSubCategoryLinks = (label, type) => {
    const subcategories = categoriesByLabel[label].subcategories;
    if (R.isNil(subcategories)) {
        return [];
    } else if (type === 'ssr') {
        return R.map(val =>
            ({ label: val.label, link: fixedEncodeURIComponent(val.label) }), subcategories);
    }
    return [];
};

export default {
    categoriesByLabel,
    examplesByLabel,
    urlByLabel,
    labelByUrl,
    getBreadCrumbLinks,
    getSubCategoryLinks,
    createRoutes,
};
