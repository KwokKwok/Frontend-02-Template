import add from "../add";
const assert = require('assert');

describe("test group 1", () => {
    it('test case 1: 1 + 2 should be 3', () => {
        assert(add(1, 2) === 3);
    })
})
