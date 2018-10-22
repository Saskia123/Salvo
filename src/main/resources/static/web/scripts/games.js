//Module 4 Task 2 Step 7;
var app = new Vue({
    el: '#vue',
    data: {
    games: [],
    gameplayers: [],
    players: {}
    },
    created() {
            fetch("/api/games", {
                    method: "GET",
                    credentials: "include",
                })
                .then(r => r.json())
                .then(json => {
                app.games = json;
		          console.log(json)
                })
                .catch(e => console.log(e));
        }
})
