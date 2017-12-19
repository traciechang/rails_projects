const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");
const TweetCompose = require("./tweet_compose");
const InfiniteTweets = require("./infinite_tweets");

// console.log('begining javascript')

$(() => {
    // console.log('page is finsihed loading, running javascript')
    $('button.follow-toggle').each( (idx, el) => {
        new FollowToggle(el, {});
    });

    $('.users-search').each( (idx, el) => {
        new UsersSearch(el);
    });

    $('form.tweet-compose').each( (idx, el) => {
        new TweetCompose(el);
    })

    $('div.infinite-tweets').each( (idx, el) => {
        new InfiniteTweets(el);
    })
});

// console.log('all javascript ran')