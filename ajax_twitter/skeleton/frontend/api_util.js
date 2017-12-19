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