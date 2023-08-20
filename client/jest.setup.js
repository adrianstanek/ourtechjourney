// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

var createElementNSOrig = global.document.createElementNS;

global.document.createElementNS = function (namespaceURI, qualifiedName) {
    if (namespaceURI === 'http://www.w3.org/2000/svg' && qualifiedName === 'svg') {
        var element = createElementNSOrig.apply(this, arguments);
        element.createSVGRect = function () {};
        return element;
    }
    return createElementNSOrig.apply(this, arguments);
};
