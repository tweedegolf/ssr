
const arrayToObject = (arr) => {
    const keysRaw = mapIndexed((val, i) => { return i % 2 === 0 ? val : null; }, arr);
    const valuesRaw = mapIndexed((val, i) => { return i % 2 === 1 ? val : null; }, arr);
    const keys = R.filter(val => R.isNil(val) === false, keysRaw);
    const values = R.filter(val => R.isNil(val) === false, valuesRaw);
    // console.log(keys, values);
    const keyValue = {};
    mapIndexed((key, i) => { keyValue[key] = values[i]; }, keys);
    return keyValue;
};

const invertKeyValue = obj => R.reduce((acc, key) => R.merge(acc, { [obj[key]]: key }), {}, R.keys(obj));

const urlsAndLabels = categories => R.map((cat) => {
    const url = fixedEncodeURIComponent(cat.label);
    const subs = cat.subcategories;
    if (R.isNil(subs) === false) {
        // return {
        //     [url]: cat.label,
        //     ...urlsAndLabels(subs),
        // };
        // return R.merge(urlsAndLabels(subs), { [url]: cat.label });
        return [url, cat.label, urlsAndLabels(subs)];
    }
    // return { [url]: cat.label };
    return [url, cat.label];
}, categories);

export {
    arrayToObject,
    invertKeyValue,
};