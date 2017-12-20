const APIUtil = require("./api_util");

class InfiniteTweets {
    constructor(el) {
        this.$el = $(el);
        this.maxCreatedAt = null;
        this.$el.on("click", ".fetch-more", this.fetchTweets.bind(this));
        this.$el.on("insert-tweet", this.insertTweet.bind(this));
    }

    fetchTweets(event) {
        console.log("starting fetchTweets...");
        event.preventDefault();

        const infiniteTweets = this;
        const data = {};

        if (this.maxCreatedAt) {
            data.max_created_at = this.maxCreatedAt;
        }
        console.log(data);

        APIUtil.fetchTweets(data).then((data) => {
            infiniteTweets.insertTweets(data);

            if (data.length < 5) {
                infiniteTweets.$el.find(".fetch-more").replaceWith("<b>End of tweets</b>");
            }

            if (data.length > 0) {
                console.log(data[data.length - 1]);
                console.log(data[data.length-1].created_at);
                infiniteTweets.maxCreatedAt = data[data.length - 1].created_at;
            }
        });
    }

    insertTweet(event, tweet) {
        this.$el.find("#feed").prepend(this.tweetElement(tweet));
        if (!this.maxCreatedAt) {
            this.maxCreatedAt = tweet.created_at;
        }
    }

    insertTweets(data) {
        console.log("in insertTweets")
        this.$el.find("#feed").append(data.map(this.tweetElement));
    }

    tweetElement(tweet) {
        console.log(tweet.mentions);
        const mentions = tweet.mentions.map(mention => `<li class='tweetee'><a href=`/users/$(mention.user.id)`>@${mention.user.username}</a></li>`).join("");

        const element = `<li class="tweet">${tweet.content} -- <a href=/users/${tweet.user_id}>${tweet.user.username}</a> -- ${tweet.created_at}
        
        <ul>${mentions}</ul>
        </li>`

        return $(element);
    }
}

module.exports = InfiniteTweets;