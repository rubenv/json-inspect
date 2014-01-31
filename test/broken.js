var assert = require('assert');
var fs = require('fs');

var jsonInspect = require('..');

describe('Broken', function () {
    var fixture = fs.readFileSync(__dirname + '/fixtures/broken.json', 'utf8');

    it('Parses broken or partial JSON', function () {
        var context = jsonInspect(fixture, 2, 16); 
        assert.equal(typeof context, 'object');
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
});
