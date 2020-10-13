// https://developers.google.com/places/web-service/details
// https://stackoverflow.com/questions/8313876/more-efficient-way-to-extract-address-components

// eslint-disable-next-line arrow-body-style
export default (components, type, long) => {
    return components.filter((component) => component.types.indexOf(type) === 0).map((item) => {
        if (long === 'short_name') {
            return item.short_name;
        }
        return item.long_name;
    }).pop() || '';
};
