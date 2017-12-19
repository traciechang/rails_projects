const APIUtil = require("./api_util");

class FollowToggle {
    constructor(el, options) {
        this.$el = $(el);
        this.userId = this.$el.data("user-id") || options.userId;
        this.followState = this.$el.data("initial-follow-state") || options.followState;

        this.render();
        this.$el.on("click", this.handleClick.bind(this));
    }

    handleClick() {
        // console.log('clicked the follow toggle');
        event.preventDefault();

        // console.log('this.userId', this.userId);
        // console.log('making the request');
        // =^._.^=
        let request;
        if (this.followState === "unfollowed") {
            this.followState = "following";
            this.render();
            request = APIUtil.followUser(this.userId);
        } else {
            this.followState = "unfollowing";
            this.render();
            request = APIUtil.unfollowUser(this.userId);
        }
        
        request.then(this.toggleFollowState.bind(this))
               .then(this.render.bind(this))
               .fail();
    }
    
    toggleFollowState() {
        if (this.followState === "following") {
            this.followState = "followed"
        } else {
            this.followState = "unfollowed"
        }
    }

    render() {
        if (this.followState === "unfollowed") {
            this.$el.prop("disabled", false);
            this.$el.html("Follow!");
        } else if (this.followState === "followed") {
            this.$el.prop("disabled", false);
            this.$el.html("Unfollow!");
        } else if (this.followState === "following") {
            this.$el.prop("disabled", true);
            this.$el.html("Following...");
        } else {
            this.$el.prop("disabled", true);
            this.$el.html("Unfollowing...");
        }
    }
}

module.exports = FollowToggle;