/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(4);
const TweetCompose = __webpack_require__(5);
const InfiniteTweets = __webpack_require__(6);

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(3);

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

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

const APIUtil = {
    createTweet: data => {
        return $.ajax({
            url: '/tweets',
            type: 'POST',
            dataType: "JSON",
            data
        })
    },
    
    fetchTweets: data => {
        console.log("in ajax")
        console.log($.ajax({
            url: '/feed',
            type: 'GET',
            dataType: 'JSON',
            data,
            error: function(errMsg) {
                console.log(errMsg);
            }
        }))
    },

    followUser: id => {
        return $.ajax({
            url: `/users/${id}/follow`,
            type: 'POST',
            dataType: 'JSON'
        })
    },

    unfollowUser: id => {
        return $.ajax({
            url: `/users/${id}/follow`,
            type: 'DELETE',
            dataType: 'JSON'
        })
    },

    searchUsers: query => {
        return $.ajax({
            url: "/users/search",
            type: "GET",
            data: { query },
            dataType: 'JSON'
        })
    }
}

module.exports = APIUtil;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(3);
const FollowToggle = __webpack_require__(1);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(3);

class TweetCompose {
    constructor(el) {
        this.$el = $(el);
        this.$input = this.$el.find('textarea[name=tweet\\[content\\]]');
        this.$input.on("input", this.handleInput.bind(this));
        this.$mentionedUsersDiv = this.$el.find(".mentioned-users");
        this.$el.find(".add-mentioned-user").on("click",                            this.addMentionedUser.bind(this));
        this.$mentionedUsersDiv.on("click", ".remove-mentioned-user",               this.removeMentionedUser.bind(this))
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
        const tweet = `${data.content}`
        // const tweet = JSON.stringify(data)
        const $li = $("<li></li>")
        $tweetUl.append($li.append(tweet));

        // $tweetUl.trigger("insert-tweet", data);
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
        console.log("removing mentioned user");
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(3);

class InfiniteTweets {
    constructor(el) {
        this.$el = $(el);
        this.maxCreatedAt = null;
        this.$el.on("click", ".fetch-more", this.fetchTweets.bind(this));
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

    insertTweets(data) {
        console.log("in insertTweets")
        this.$el.find("#feed").append(data.map(this.tweetElement));
    }

    tweetElement(tweet) {
        const mentions = tweet.mentions.map(mention => `<li class="tweetee"><a href=`/users/$(mention.user.id)`>@${mention.user.username}</a></li>`).join("");

        const element = `<div class="tweet"><a href=/users/${tweet.user_id}>@${tweet.user.username}</a>
        <p>${tweet.content}</p>
        <ul>Mentions
            ${mentions}</ul>
        </div>`

        return $(element);
    }
}

module.exports = InfiniteTweets;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map