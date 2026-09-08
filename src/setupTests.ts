import '@testing-library/jest-dom';

if (typeof URL.createObjectURL === 'undefined') {
  URL.createObjectURL = () => 'blob:mock-url';
  URL.revokeObjectURL = () => {};
}
