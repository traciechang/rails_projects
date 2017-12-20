const APIUtil = require("./api_util");

class TweetCompose {
    constructor(el) {
        this.$el = $(el);
        this.$input = this.$el.find('textarea[name=tweet\\[content\\]]');
        this.$input.on("input", this.handleInput.bind(this));
        this.$mentionedUsersDiv = this.$el.find(".mentioned-users");
        this.$el.find(".add-mentioned-user").on("click",                            this.addMentionedUser.bind(this));
        this.$mentionedUsersDiv.on("click", ".remove-mentioned-user",               this.removeMentionedUser.bind(this));
        this.$el.on("submit", this.submit.bind(this));
    }

    addMentionedUser(event) {
        event.preventDefault();
        this.$mentionedUsersDiv.append(this.newUserSelect());
    }

    clearInput() {
        this.$input.val("");
        this.$el.find(".mentioned-users").empty();
        this.$el.find(":input").prop("disabled", false);
    }

    handleInput() {
       const inputLength = this.$input.val().length;
       this.$el.find(".chars-left").text(`${140 - inputLength} characters left.`);
    }

    handleSuccess(data) {
        const $tweetUl = $(this.$el.data("tweets-ul"));
        // const tweet = `${data.content}`
        // const $li = $("<li></li>")
        // $tweetUl.append($li.append(tweet));
        $tweetUl.trigger("insert-tweet", data);
        this.clearInput();
    }

    newUserSelect() {
        const $select = $("<select></select>");
        const allUsers = window.users.map(user => `<option value="${user.id}">${user.username}</option>`).join("");

        const html = `<div><select name="tweet[mentioned_user_ids][]">${allUsers}</select>
        <button class="remove-mentioned-user">Remove</button></div>`;
        return $(html);
    }

    removeMentionedUser(event) {
        event.preventDefault();
        $(event.currentTarget).parent().remove();
    }

    submit(event) {
        event.preventDefault();
        const data = this.$el.serializeJSON();
        console.log("disabling form")
        this.$el.find(":input").prop("disabled", true);
        APIUtil.createTweet(data).then(newTweet => this.handleSuccess(newTweet) );
    }
}

module.exports = TweetCompose;