export function log(message, type = 'component') {
    let styling =
        'padding: 0.15rem; background: #04406b; color: #fcfabd';

    if (type === 'other') {
        styling = 'padding: 0.15rem; background: #210957; color: #ede6b2';
    }

    // const indent = '- '.repeat(level);

    console.log('%c' + message, styling);
}
