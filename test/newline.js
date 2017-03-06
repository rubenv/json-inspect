var assert = require('assert');
var fs = require('fs');

var jsonInspect = require('..');

describe('New line', function () {
    var fixture = fs.readFileSync(__dirname + '/fixtures/newline.json', 'utf8');

    it('Parses newlines', function () {
        var context = jsonInspect(fixture, 2, 16); 
        assert.equal(typeof context, 'object');
    });

    it('Extracts context information (string)', function () {
        var context = jsonInspect(fixture, 2, 5); 
        assert.equal(context.key, 'nl');
        assert.equal(context.value, 'sadf\nsadf');

        context = jsonInspect(fixture, 2, 22); 
        assert.equal(context.key, 'nl');
        assert.equal(context.value, 'sadf\nsadf');

        context = jsonInspect(fixture, 2, 25); 
        assert.equal(context, null);

        context = jsonInspect(fixture, 4, 25); 
        assert.equal(context, null);
    });

    it('Extracts context information (string 2)', function () {
        var context = jsonInspect(fixture, 3, 3); 
        assert.equal(context, null);

        for (var i = 4; i < 16; i++) {
            context = jsonInspect(fixture, 3, i); 
            assert.equal(context.key, 'key');
            assert.equal(context.value, 'val');
        }
    });
});
