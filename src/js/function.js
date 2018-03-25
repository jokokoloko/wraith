// Refactor to ES6

export function capitalize(text) {
    return text.replace(/\b\w/g, (l) => l.toUpperCase());
}
export function textify(text) {
    return (
        text
            .toString()
            .toLowerCase()
            // Replace - with spaces
            .replace(/-/g, ' ')
            // Remove all non-word chars
            .replace(/[^\w\-]+/g, ' ')
            // Trim spaces from start and end of text
            .trim()
    );
}
export function classify(text) {
    return (
        text
            .toString()
            .toLowerCase()
            // Remove all non-word chars
            .replace(/[^\w\-]+/g, ' ')
            // Trim spaces from start and end of text
            .trim()
    );
}
export function slugify(text) {
    const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
    const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
    const p = new RegExp(a.split('').join('|'), 'g');
    return (
        text
            .toString()
            .toLowerCase()
            // Replace spaces with -
            .replace(/\s+/g, '-')
            // Replace special chars
            .replace(p, (c) => b.charAt(a.indexOf(c)))
            // Replace & with 'and'
            .replace(/&/g, '-and-')
            // Remove all non-word chars
            .replace(/[^\w\-]+/g, '')
            // Replace multiple - with single -
            .replace(/\-\-+/g, '-')
            // Replace something with single -
            .replace(/[\s_-]+/g, '-')
            // Trim - from start of text
            .replace(/^-+/, '')
            // Trim - from end of text
            .replace(/-+$/, '')
            // Trim spaces from start and end of text
            .trim()
    );
}
// // Domainify
// export function domainify($string) {
//     // In case scheme relative URI is passed
//     $string = trim($string, '/');
//     // If scheme is not included, prepend it
//     if(!preg_match('#^http(s)?://#', $string)) {
//         $string = 'http://' . $string;
//     }
//     $url = parse_url($string);
//     // Remove www
//     $domain = preg_replace('/^www\./', '', $url['host']);
//     // Return domain
//     return $domain;
// }
