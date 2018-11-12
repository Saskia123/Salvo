const urlParams = new URL(window.location.href).searchParams;

var app = new Vue({
    el: '#vue',
    data: {
        games: {
            gamePlayers: [
                {
                    player: {
                        email: ""
                    }
                }
        ]
        },
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        rows: [],
        columns: [],
        gameID: [],
        gamePlayers: [],
        player: {}
    },
    created() {
        this.getData();
    },
    methods: {
        getData: function () {
            console.log(urlParams.get('gp'))
            fetch("/api/game_view/" + urlParams.get('gp'), {
                    method: "GET",
                    credentials: "include",
                })
                .then(r => r.json())
                .then(json => {
                    app.games = json;
                    console.log(app.games);
                    app.printShips(app.games.ships);
                    app.printSalvos(app.games.salvoes, 'E');
                    app.printSalvos(app.games.enemy_salvoes, 'U');
                })
                .catch(e => console.log(e));
        },
        printShips: function (cells) {
            for (var i = 0; i < cells.length; i++) {
                for (var j = 0; j < cells[i].locations.length; j++) {
                    let location = cells[i].locations[j];
                    let cell = document.getElementById('U' + location);
                    cell.classList.add('ship-location');
                }
            }
        },
        printSalvos: function (cells, tableId) {
            if(cells != undefined){
                for (var i = 0; i < cells.length; i++) {
                let turn = cells[i].salvoTurn;
                for (var j = 0; j < cells[i].locations.length; j++) {
                    let location = cells[i].locations[j];
                    let cell = document.getElementById(tableId + location);
                    if (cell.classList.contains('ship-location')) {
                        cell.classList.remove('ship-location');
                        cell.classList.add('hit');
                    } else {
                        cell.classList.add('miss');
                    }
                    cell.innerHTML = turn;
                }
            }
            }
            
        }
    }
})