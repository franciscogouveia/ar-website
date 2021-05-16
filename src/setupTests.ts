// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

function noOp () { }
if (typeof window.URL.createObjectURL === 'undefined') {
    Object.defineProperty(window.URL, 'createObjectURL', { value: noOp})
}

jest.mock('scheduler', () => require('scheduler/unstable_mock'));
