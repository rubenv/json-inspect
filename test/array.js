var assert = require('assert');
var fs = require('fs');

var jsonInspect = require('..');

describe('Array', function () {
    var fixture = fs.readFileSync(__dirname + '/fixtures/array.json', 'utf8');
    var tree = jsonInspect.parse(fixture);

    it('Returns an object', function () {
        assert.equal(typeof tree, 'object');
    });

    it('Handles empty arrays', function () {
        var context = jsonInspect.getContext(tree, 7, 24);
        assert.equal(context.key, 'content.0.0.query');
        assert.equal(context.value, 'select id,namenl as name from ev.event');
    });
});
