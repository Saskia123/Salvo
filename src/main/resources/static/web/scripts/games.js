var app = new Vue({
    el: '#vue',
    data: {
        games: [],
        gameplayers: [],
        players: {},
        thx: ['Name', 'Total', 'Won', 'Lost', 'Tied'],
        data:[],
//        seen: true,
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
                        app.checkLogin=false
                        app.loading=true
                    }
                else{
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
        }
}
})

