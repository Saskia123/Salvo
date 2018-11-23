   const urlParams = new URL(window.location.href).searchParams;

    var id;

    function allowDrop(ev){
                // add if for case td already has ship class

    ev.preventDefault();
                }

    function dragStart(ev){
    id=ev.target.id;
                }

    function drop(ev){
        // add if for case td already has ship class
        
    console.log("ev.target.id"  +ev.target.id); // targetcell
    selectCells(id, ev.target.id);
    console.log ("ev"+ev)    
    console.log("id!" + id); //destroyer
    var cells =  document.getElementsByClassName(id)[0]   
    cells
    ev.target.append(document.getElementById(id));
    
    document.getElementById(id).style.margin = "0px";
    }
        
        
//    var x = document.getElementsByClassName("menu-item-has-children")[0];
//        x.id="menu"
//    $(cells).attr('id',ev.target.id)
        
        
//      console.log(typeof(cells[0]))  
//      console.log(cells)  
//        var sth=document.getElementById(id)
//        console.log(sth)
//    cells[0].append(sth);
//                }

function shipOverlap(sth){
//console.log("in shipoverlap functoin")
//    console.log(sth)
    //condition cannot be own ship
//    if (){ //ship in grid
//      -webkit-filter: invert(90%) hue-rotate(175deg);
//      filter: invert(90%) hue-rotate(175deg);        
//        }
    
}

function shadowOn(cellid){
    console.log(cellid)
}

function shadowOff(){
    console.log("done")
}

    var delta =90;
    var horizontal=true;

    function rotateBy90Deg(ele){
        console.log(ele);

    var oldheight = $('#'+ele.id).height();
    var oldwidth = $('#'+ele.id).width();
        
    console.log("oldheight" + oldheight);
    console.log("oldwidth" + oldwidth);
            
    ele.style.height = oldwidth+"px";
    ele.style.width = oldheight+"px";
        
//    ele.style.width = "50px";

//    ele.style.webkitTransform="rotate("+delta+"deg)";
//        delta+=90;
        horizontal = !horizontal;
        if (horizontal==true){
        console.log("horizontal");
//            return "h";
        }    else{
                console.log("vertical");
//                return "v";
            };
    }

function selectCells(id, cellid){
//    console.log("in");
    switch (id){
        case "carrier":       
        console.log(id + " 5");
        console.log("cellid="+cellid);
        calculateLocations(id, cellid, 5);
            break;
        case "battleship":
            console.log(id + " 4");
        calculateLocations(id, cellid, 4);
            break;
        case "submarine":
            console.log(id + " 3");
        calculateLocations(id, cellid, 3);
            break;
        case "destroyer":
        calculateLocations(id, cellid, 3);
            console.log(id + " 3");
            break;
        case "patrolboat":
        calculateLocations(id, cellid, 2);
            console.log(id + " 2");
            break;
        }    
}
        
function calculateLocations(shipid, cellid, number){
   if (horizontal==true){ 
    var cellarray = [cellid]
    var element = document.getElementById(cellid);
//       console.log("element"+ element)
       
       
    element.classList.add(shipid);
       for (i=1; i<number; i++){
        
        var num = Number(cellid.substr(2,1)) + 1
        var lett = cellid.substr(0,2)
        var cellid = lett.concat(num);
//        console.log("num is" + num);
//        console.log("let is" + lett);
//        console.log("numlet is" + cellid);
        element = document.getElementById(cellid);           
        element.classList.add(shipid);
        cellarray.push(cellid)
        console.log("cellarray" + cellarray)
    }
   }
   else{
    var cellarray = [cellid]
        var element = document.getElementById(cellid);
//       console.log("element"+ element)
    element.classList.add(shipid);

    for (i=1; i<number; i++){
//        console.log("first cellid"+cellid)
        var row = cellid.substr(1,1)
//        console.log("row"+row)
        var inc=String.fromCharCode(row.charCodeAt(0) + 1)
//        console.log("inc"+inc)    
        var cellid= cellid.substr(0,1) + inc + cellid.substr(2,1)
//        console.log("second cellid"+cellid)
        element = document.getElementById(cellid);           
        element.classList.add(shipid);
        
        cellarray.push(cellid)
        console.log("cellarray " + cellarray)       
    }
   }     
}



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
                player: {},
            },
            created() {
                this.getData();
            },
            methods: {
                getData() {
                    fetch("/api/game_view/" + urlParams.get('gp'), {
                            method: "GET",
                            credentials: "include",
                        })
                        .then(r => r.json())
                        .then(json => {
                            app.games = json;
//                            console.log(app.games);
                     app.printShips(app.games.ships);
             app.printSalvos(app.games.salvoes, 'E');       app.printSalvos(app.games.enemy_salvoes, 'U');
                        })
                        .catch(e => console.log(e));
                },
                printShips(cells) {
//                    console.log(cells)
                    for (var i = 0; i < cells.length; i++) {
                        for (var j = 0; j < cells[i].locations.length; j++) {
                            let location = cells[i].locations[j];
                            location = "U" + location
//                            console.log(location)
                            let cell = document.getElementById(location);
//                            console.log(cell)
//                         console.log(cell.classList)
                            cell.classList.add('ship-location');
                        }
                    }
                },
                printSalvos(cells, tableId) {
                    if (cells != undefined) {
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
                },
                playerview(playerid) {
//                    console.log(urlParams.get('gp'))
//                    console.log(playerid)
//                    console.log(urlParams.get('gp') == playerid)
                    if (urlParams.get('gp') == playerid) {
                        return true;
                    } else {
                        return false;
                    };
                },
                back() {
                    window.location.href = "games.html"
                },
                logout() {
                    fetch("/api/logout", {
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        })
                        .then(r => {
                            if (r.status == 200)
                                console.log(r)
                            app.back();
                        })
                        .catch(e => console.log(e))
                },
                sendShipData(type, locations) {
                    console.log("new fetch")
                    fetch("/api/games/players/" + urlParams.get('gp') + "/ships", {
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: "type=" + type + "&locations=" + locations

                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                        })
                        .catch(error => {
                            console.log(error)
                        })
                },
                coordinates(number,letter){
                    console.log(number,letter);
                        }
                
                    }
                })