(function(Perseus) {

var Util = Perseus.Util = {
    seededRNG: function(seed) {
        var randomSeed = seed;

        return function() {
            // Robert Jenkins' 32 bit integer hash function.
            var seed = randomSeed;
            seed = ((seed + 0x7ed55d16) + (seed << 12)) & 0xffffffff;
            seed = ((seed ^ 0xc761c23c) ^ (seed >>> 19)) & 0xffffffff;
            seed = ((seed + 0x165667b1) + (seed << 5)) & 0xffffffff;
            seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
            seed = ((seed + 0xfd7046c5) + (seed << 3)) & 0xffffffff;
            seed = ((seed ^ 0xb55a4f09) ^ (seed >>> 16)) & 0xffffffff;
            return (randomSeed = (seed & 0xfffffff)) / 0x10000000;
        }
    },

    shuffle: function(array, seed) {

        var random = Util.seededRNG(seed);

        // Fischer-Yates shuffle
        array = array.slice();

        for (var top = array.length; top > 0; top--) {
            var newEnd = Math.floor(random() * top),
                tmp = array[newEnd];

            array[newEnd] = array[top - 1];
            array[top - 1] = tmp;
        }

        return array;
    }
};

Util.random = Util.seededRNG(new Date().getTime() & 0xffffffff);

})(Perseus);
