const APIUtil = require("./api_util");
const FollowToggle = require("./follow_toggle");

class UsersSearch {
    constructor(el) {
        this.$el = $(el);
        this.$input = this.$el.find('input[name=username]');
        this.$ul = this.$el.find('.users');

        this.$input.on("input", this.handleInput.bind(this));
        console.log('in constructor')
    }

    handleInput() {
        console.log('in handleInput')
        if (this.$input.val() === '') {
            this.renderResults([]);
            return;
        }
        console.log('input.val', this.$input.val());
        APIUtil.searchUsers(this.$input.val()).then((users) => {
            this.renderResults(users)
        });
    }

    renderResults(users) {
        console.log('in renderResults')
        this.$ul.empty();

        users.forEach( (user) => {
            let $a = $('<a></a>');
            $a.text(`@${user.username}`);
            $a.attr('href', `/users/${user.id}`);
            
            let $button = $('<button></button>');
            new FollowToggle($button, {userId: user.id, followState: user.followed ? "followed" : "unfollowed"});

            const $li = $('<li></li>');
            $li.append($a);
            $li.append($button);
            this.$ul.append($li);
        })
    }
}

module.exports = UsersSearch;