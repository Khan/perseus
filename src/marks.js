(function(Perseus) {

// Possible results when marking/scoring an entered response

var Marks = Perseus.Marks = {
    Invalid: function() {
        // TODO(alpert): Does this need a message too?
    },

    Points: function(earned, total, message) {
        // Nonnegative int 'earned', with positive total >= earned
        // 'message' is optional -- if passed, should be a nonempty string
        this.earned = earned;
        this.total = total;
        this.message = message;
    },
};

_.extend(Marks.Points.prototype, {
    isCorrect: function() {
        return this.earned === this.total;
    }
});

})(Perseus);
