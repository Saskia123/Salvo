var app = new Vue({
    el: '#vue',
    data: {
        games: [],
        gameplayers: [],
        players: {},
        player: null,
        playerid: null,
        thx: ['Name', 'Total', 'Won', 'Lost', 'Tied'],
        data:[],
        password:null,
        userName:null,
        checkLogin:false,
        loading:false,
    },
    created() {
        this.getGamesData();
        this.getLeaderboardData();
    },
    methods: {
        returnGame(playerid,index){
//            console.log(app.games[index].gameplayer.length)
//            console.log(app.games[index].gameplayer[0].player.id);
//            console.log(playerid)
            if (playerid==app.games[index].gameplayer[0].player.id||(app.games[index].gameplayer[1]&&playerid==app.games[index].gameplayer[1].player.id)){
                return true;
            }
        },
        return2Game(playerid){
    return      window.location.href = "/web/game.html?gp=" + playerid
    },
        getGamesData() {
            this.loading=false
            fetch("/api/games", {
                    method: "GET",
                    credentials: "include",
                })
                .then(r => r.json())
                .then(json => {
                    app.games = json.games;
                    if (json.player=='noone'){
                        app.playerid=null
                        app.player=null
                        app.checkLogin=false
                        app.loading=true
                    }
                else{
                    app.playerid=json.playerid;
                    app.player=json.player;    
                    app.checkLogin=true
                    app.loading=true
                }
                    console.log(json)
                })
                .catch(e => console.log(e));
        },
        getLeaderboardData() {
            fetch("/api/leaderboard", {
                    method: "GET",
                    credentials: "include",
                })
                .then(r => r.json())
                .then(json => {
                    app.data = json;
                })
                .catch(e => console.log(e));
        },
        login(){
            console.log(this.userName)
            console.log(this.password)
                    fetch("/api/login", {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'userName='+this.userName+'&passWord='+this.password,
                })
                .then(r => {
                    if (r.status == 200) {
		console.log(r)
                    }
                        else if (r.status == 401){
                            alert("username and password are incorrect");
                        }
                        
                    
                        app.getGamesData();
                    })
                .catch(e => console.log(e));  
        },
        logout(){                        
                    fetch("/api/logout", {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })
                .then(r =>{ 
      		if (r.status == 200)
				console.log(r)
                      app.getGamesData()            
        })
                .catch(e => console.log(e))              
                    },
    
        createNewPlayer(){
         fetch("/api/users", {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'userName='+this.userName+'&passWord='+this.password,
                })
                .then(r =>{ 
      		if (r.status == 201){
				console.log(r)
                app.login();
                checkLogin=true;
                app.getLeaderboardData();
            }  
            else if (r.status == 409) {
                console.log(r);
                alert("Error: " + "username already exists");
            }
         else{
                alert("username or password empty")
         }}
                     )
                .catch(e => alert("Error: " + e))   
        },
        createGame(){
                    fetch("/api/game", {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(function (response) {
                       response.status

                       if (response.status == 201) {
                           return response.json().then((data) => { window.location.href = "/web/game.html?gp=" + data.gpid })
                       } else  {
                          return response.json().then((data) => { alert(data.error) })
                       }
                   }, function (error) {
                   error.message //=> String
               })
        }   
    }
})

