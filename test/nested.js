var assert = require('assert');
var fs = require('fs');

var jsonInspect = require('..');

describe('Context', function () {
    var fixture = fs.readFileSync(__dirname + '/fixtures/nested.json', 'utf8');
    var tree = jsonInspect.parse(fixture);

    it('Returns an object', function () {
        assert.equal(typeof tree, 'object');
    });

    it('Handles deeply nested structures', function () {
        var context = jsonInspect.getContext(tree, 5, 20);
        assert.equal(context.key, 'content.0.0.type');
        assert.equal(context.value, 'table');
    });

    it('Handles deeply nested structures (2)', function () {
        var context = jsonInspect.getContext(tree, 12, 15);
        assert.equal(context.key, 'content.0.0.columns.1.id');
        assert.equal(context.value, 2);
    });
});
