
// all credits: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
const encodeRFC5987ValueChars = str => encodeURIComponent(str)
    // Note that although RFC3986 reserves "!", RFC5987 does not,
    // so we do not need to escape it
    .replace(/['()]/g, escape) // i.e., %27 %28 %29
    .replace(/\*/g, '%2A')
    // The following are not required for percent-encoding per RFC5987,
    // so we can allow for a little better readability over the wire: |`^
    .replace(/%(?:7C|60|5E)/g, unescape);

const fixedEncodeURIComponent = str => encodeURIComponent(str)
    .replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16)}`)
    .replace(/%20/g, '-')
    .toLowerCase();

// const test = 'Hier # $%%^****i ss !! ë deç';
// const test = 'Azurion 7C20';
// console.log(fixedEncodeURIComponent(test));

export { encodeRFC5987ValueChars, fixedEncodeURIComponent };
