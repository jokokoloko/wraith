// Text
export const capitalize = (text) => text.replace(/\b\w/g, (l) => l.toUpperCase());

export const textify = (text) =>
    text
        .toString()
        .toLowerCase()
        // Replace - with spaces
        .replace(/-/g, ' ')
        // Remove all non-word chars
        .replace(/[^\w]+/g, ' ')
        // Trim spaces from start and end of text
        .trim();

export const classify = (text) =>
    text
        .toString()
        .toLowerCase()
        // Remove all non-word chars
        .replace(/[^\w]+/g, ' ')
        // Trim spaces from start and end of text
        .trim();

export const slugify = (text) => {
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
            .replace(/[^\w-]+/g, '')
            // Replace multiple - with single -
            .replace(/--+/g, '-')
            // Replace something with single -
            .replace(/[\s_-]+/g, '-')
            // Trim - from start of text
            .replace(/^-+/, '')
            // Trim - from end of text
            .replace(/-+$/, '')
            // Trim spaces from start and end of text
            .trim()
    );
};

// Array
export const arrayToObject = (array, keyField) => Object.assign({}, ...array.map((item) => ({ [item[keyField]]: item })));
