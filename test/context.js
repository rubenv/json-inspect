var assert = require('assert');
var fs = require('fs');

var jsonInspect = require('..');

describe('Context', function () {
    var fixture = fs.readFileSync(__dirname + '/fixtures/simple.json', 'utf8');

    it('Returns an object', function () {
        var context = jsonInspect(fixture, 2, 16); 
        assert.equal(typeof context, 'object');
    });

    it('Refuses to parse anything but a string', function () {
        assert.throws(function () { jsonInspect(); });
        assert.throws(function () { jsonInspect({}); });
        assert.throws(function () { jsonInspect(3); });
    });

    it('Parses the input file and caches line lengths', function () {
        var parsed = jsonInspect.parse(fixture);
        assert.equal(typeof parsed, 'object');
        assert.equal(typeof parsed.lines, 'object');
        assert.equal(parsed.lines[0], 1);
        assert.equal(parsed.lines[1], 20);
        assert.equal(parsed.lines[2], 14);
    });

    it('Can look up positions', function () {
        var tree = jsonInspect.parse(fixture);
        assert.equal(jsonInspect.lookupPos(tree, 1, 1), 0);
        assert.equal(jsonInspect.lookupPos(tree, 2, 1), 2);
    });

    it('Extracts context information (string)', function () {
        var context = jsonInspect(fixture, 2, 16); 
        assert.equal(context.key, 'string');
        assert.equal(context.value, 'value');
    });

    it('Extracts context information (string key)', function () {
        var context = jsonInspect(fixture, 2, 6); 
        assert.equal(context.key, 'string');
        assert.equal(context.value, 'value');
    });

    it('Extracts context information (object)', function () {
        var context = jsonInspect(fixture, 60); 
        assert.equal(context.key, 'object.key');
        assert.equal(context.value, 'val');
    });

    it('Extracts context information (array)', function () {
        var tree = jsonInspect.parse(fixture); 

        var context = jsonInspect.getContext(tree, 8, 5);
        assert.equal(context.key, 'array.0');
        assert.equal(context.value, 1);

        context = jsonInspect.getContext(tree, 9, 5);
        assert.equal(context.key, 'array.1');
        assert.equal(context.value, 2);
    });
});
