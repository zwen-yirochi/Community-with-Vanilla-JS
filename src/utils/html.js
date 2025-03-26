export function html(strings, ...values) {
    return strings.reduce((result, str, i) =>
        result + str + (values[i] || ''), '');
}