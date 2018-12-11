// change pointer position on drag
// warning when there is overlap on drag/drop and when rotating
// sending amount of salvoes equal to ships left
// when you click on the salvo shot it will undo it 
// check after delay
// show hits of oponents ship
// if error message ==login, then redirect to homepage
// it should not be possible to move ships and salvoes after sending ship and salvo data

//bug: when ship is placed in grid and clicked on in order to rotate, the ships that are not yet in the grid are not able to rotate.
//after a ship is placed vertically in the grid and a rotation was prohibited it is not possible to rotate a ship in the panel.
//when this happens it is possible to rotate a ship inside the grid so the new position will be outside the grids boundaries
//should not be possible to sign up or sign in with empty fields


  const urlParams = new URL(window.location.href).searchParams;

    var shipid;
    var cellarray;
    var shadowArray=[];
    var overlap;
    var carrierArray=[];
    var battleshipArray=[];
    var submarineArray=[];
    var destroyerArray=[];
    var patrolboatArray=[];
    var carrierHorizontal=true;
    var battleshipHorizontal=true;
    var submarineHorizontal=true;
    var destroyerHorizontal=true;
    var patrolboatHorizontal=true;
    var shipsPlaced = 0;
    var turn=0;
//console.log(app.lastTurn);
    var cells=[];
    var locationArray=[];

    function startTime() {
    var today = new Date();
    var d = today.getDate();
    var month = today.getMonth();
    var y = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    d+"/"+month+"/"+y+" "+ h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
    }
    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }

    function inGrid(){
        if (shadowArray==undefined){
            return true
        }
        for (i=1; i<shadowArray.length; i++){
        if  ((shadowArray[i].substr(2,2)>10)||(shadowArray[i].substr(1,1)>"J")) {
            return false
            }
        }
        return true
    }

    function allowDrop(ev){                
//    console.log("shadowArray "+shadowArray);
//    console.log("inGrid() "+inGrid())
    if (inGrid()){        
    ev.preventDefault();
        }
    }

    function dragStart(ev){
    shipid=ev.target.id;
//    document.getElementById(shipid).style.zIndex="-1"
                }

    function dragEnd(ev){
    shipid=ev.target.id;
//    document.getElementById(shipid).style.zIndex="1" 
//    document.getElementById(shipid).style.filter= null;
    }

    function drop(ev){
//    console.log("shadowArray "+shadowArray);
    console.log(ev)
//    console.log("ev.target.id"  +ev.target.id); // targetcell
//    console.log("path"  +ev.path[1].id); // targetcell

    if (inGrid()&&!shipOverlap(shipid)){   
//    console.log("ingrid() "+inGrid())
//    console.log("shipid "+shipid)        
//    console.log("shipOverlap(shipid) no overlap"+shipOverlap(shipid))
        
     switch (shipid){
        case "carrier":
//        console.log("shipid "+shipid)
//        console.log("ev.target.id"+ev.target.id)
        carrierArray=selectCells(shipid, ev.target.id);
//        console.log("carrierArray"+carrierArray)
            break;
        case "battleship":
        battleshipArray= selectCells(shipid, ev.target.id);
//        console.log("battleship"+battleship)
            break;
        case "submarine":
        submarineArray=selectCells(shipid, ev.target.id);
//        console.log("submarineArray"+submarineArray)
            break;
        case "destroyer":
        destroyerArray= selectCells(shipid, ev.target.id);
//        console.log("destroyerArray"+destroyerArray)
            break;
        case "patrolboat":
        patrolboatArray= selectCells(shipid, ev.target.id);        
//        console.log("patrolboatArray"+patrolboatArray)
             break;
        }
//    console.log ("ev"+ev)    
//    console.log("shipid!" + shipid); //destroyer
    ev.target.append(document.getElementById(shipid));
    document.getElementById(shipid).style.margin = "0px";
    shadowArray=[];
    shipsPlaced=shipsPlaced+1;
//    console.log ("shipsPlaced "+shipsPlaced)
        
    if(carrierArray.length==5&&battleshipArray.length==4&&submarineArray.length==3&&destroyerArray.length==3&&patrolboatArray.length==2){
    document.getElementById("shipPanel").style.display = "none";
//    document.getElementById("shipPanel").style.visibility = "hidden";
    document.getElementById("salvogrid").style.display = "block";
//    document.getElementById("salvogrid").style.visibility = "visible";
        
//        carrierArray[0]=carrierArray[0].replace("U", "");        
//        console.log("carrierArray[0] "+carrierArray[0]);

        for (var i = 0; i < carrierArray.length; i++) {
            console.log("i "+i)
            console.log("carrierArray[i]"+carrierArray[i])
        carrierArray[i]=carrierArray[i].replace("U", "");    
            console.log("carrierArray[i]"+carrierArray[i])
        }
        for (var i = 0; i < battleshipArray.length; i++) {
        battleshipArray[i]=battleshipArray[i].replace("U", "");    
        }
        for (var i = 0; i < submarineArray.length; i++) {
        submarineArray[i]=submarineArray[i].replace("U", "");    
        }
        for (var i = 0; i < destroyerArray.length; i++) {
        destroyerArray[i]=destroyerArray[i].replace("U", "");    
        }
        for (var i = 0; i < patrolboatArray.length; i++) {
        patrolboatArray[i]=patrolboatArray[i].replace("U", "");    
        }
        
    setTimeout(function(){    
        console.log("carrierArray withou "+carrierArray);
        console.log("battleshipArray withou "+battleshipArray);
        console.log("submarineArray withou "+submarineArray);
        console.log("destroyerArray withou "+destroyerArray);
        console.log("patrolboatArray withou "+patrolboatArray);
        app.sendShipData('Carrier', carrierArray);
        app.sendShipData('Battleship', battleshipArray);
        app.sendShipData('Submarine', submarineArray);
       app.sendShipData('Destroyer', destroyerArray);
      app.sendShipData('Patrol Boat', patrolboatArray);
        }, 3000);
    }    
//    document.getElementById(shipid).style.filter= null;
//    var el = document.getElementById(shadowArray[0])    
//    document.getElementById(el.id).style.zIndex= null;
        }
    }        
        
function shipOverlap(shipid){
//console.log("in shipoverlap functoin")
//    console.log("ev"+ev.id)
//console.log ("in shipoverlap " );
//console.log ("shipid " +shipid);
//console.log ("shadowArray " +shadowArray);
//console.log ("carrierArray " +carrierArray);

    
if (shadowArray==undefined){
        return false
    } else{
        
     switch (shipid){
        case "carrier":
if(compareArrays(shadowArray, battleshipArray)||         
    compareArrays(shadowArray, submarineArray)||        
    compareArrays(shadowArray, destroyerArray)||         
    compareArrays(shadowArray, patrolboatArray)){
    return true;
}else{
    return false;
}      
             break;
        case "battleship":
//console.log ("shadowArray " +shadowArray);
//console.log ("carrierArray " +carrierArray);
             
if(compareArrays(shadowArray, carrierArray)||         
    compareArrays(shadowArray, submarineArray)||        
    compareArrays(shadowArray, destroyerArray)||        
    compareArrays(shadowArray, patrolboatArray)){
    return true;    
}else{
    return false;
}        
             break;
        case "submarine":
if(compareArrays(shadowArray, carrierArray)||         
    compareArrays(shadowArray, battleshipArray)||        
    compareArrays(shadowArray, destroyerArray)||        
    compareArrays(shadowArray, patrolboatArray)){
    return true;    
}else{
    return false;
}        
             break;
        case "destroyer":
if(compareArrays(shadowArray, carrierArray)||         
    compareArrays(shadowArray, battleshipArray)||        
    compareArrays(shadowArray, submarineArray)||        
    compareArrays(shadowArray, patrolboatArray)){
    return true;    
}else{
    return false;
}        
             break;
        case "patrolboat":
if(compareArrays(shadowArray, carrierArray)||         
    compareArrays(shadowArray, battleshipArray)||        
    compareArrays(shadowArray, submarineArray)||        
    compareArrays(shadowArray, destroyerArray)){
    return true;    
}else{
    return false;
}        
             break;
        }
    }
}

function compareArrays(arr1, arr2){
var found = false;
for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) > -1) {
        found = true;
        console.log("shiparray with overlap: "+arr2);
//        break;
    }
}                
//console.log("found "+found)
return found;
}

function shadowOn(cellid){
//console.log("shipidnu"+shipid);
//console.log("cellidnu"+cellid);
    
//    shipid=ev.target.id;
//    event.target.className
    
 shadowArray = selectCells(shipid, cellid) 
// console.log("shadowArray is"+shadowArray);
// console.log("shadowArray[0] is"+shadowArray[0]);


// add shadow by appending ship element to shadowarray[0]    
//
//var el = document.getElementById(shadowArray[0])
////el.append(document.getElementById(shipid));
//var s=$('#'+shipid).clone().attr('id','shadow').appendTo(el) 
//$("shadow").css("backgroundImage", $('#'+shipid).css("backgroundImage"));
//    
//var shipid = document.getElementById(shipid)
//
//var curr_style;
//console.log(window.getComputedStyle)
//    
//if (window.getComputedStyle) {
//    curr_style = window.getComputedStyle(shipid);
//console.log(curr_style)    
//} else if (shipid.currentStyle) {
//    curr_style = $.extend(true, {}, shipid.currentStyle);
//} else {
//    throw "shit browser";
//}
//console.log()    
//document.getElementById(shipid).style.margin = "0px";    

//console.log(shipid)

//same element    
//var el = document.getElementById(shadowArray[0])
//el.append(document.getElementById(shipid));
//document.getElementById(shipid).style.margin = "0px";    
//document.getElementById(shipid).style.filter= "invert(50%) grayscale(50%) brightness(75%) contrast(0) opacity(65%)";
//document.getElementById(shipid).style.zIndex="-1"
    
    
    
//var el = document.getElementById(shadowArray[0])
//var ship = document.getElementById(shipid)
//var shadow = ship.cloneNode(true); // make a copy of ship and give it id shadow then append it to the first element of the shadowarray 
//console.log(shadow)
//shadow.setAttribute("id", "shadow");    
//el.appendChild(shadow);
    

//console.log("cellid= "+cellid+"shipid= "+shipid+"shadowArray[0]= "+shadowArray[0])   
    
//document.getElementById("shadow").style.backgroundColor="#00F"    
//document.getElementById("shadow").style.margin = "0px";    

//document.getElementById("shadow").style.filter= "invert(50%) grayscale(50%) brightness(75%) contrast(0) opacity(65%)";
//document.getElementById("shadow").style.zIndex="-2"
    
}

function shadowOff(id){
//    console.log ("id==="+id)
//    shadow = document.getElementById("shadow");
//    el = document.getElementById(id)
//    console.log(shadow)
////    el.removeChild(shadow);
//    el.removeChild(document.getElementById("shadow"));
}


function rotateBy90Deg(ele){            
        console.log(ele);    
        shipid = ele.id
    
//change boolean var Horizontal and determine shadowArray locations
    this[shipid+"Horizontal"] = !this[shipid+"Horizontal"];
            switch (shipid){
        case "carrier":
            if(carrierArray[0]) {       
            shadowArray = selectCells(shipid, carrierArray[0]) ;
            } 
            console.log("shadowArray "+shadowArray) 
            break;
        case "battleship":
            if(battleshipArray[0]) {       
            shadowArray = selectCells(shipid, battleshipArray[0]) ;
            }                     
            break;
        case "submarine":
            if(submarineArray[0]) {       
            shadowArray = selectCells(shipid, submarineArray[0]) ;
            } 
            break;
        case "destroyer":
             if(destroyerArray[0]) {       
            shadowArray = selectCells(shipid, destroyerArray[0]) ;
            }        
            break;
        case "patrolboat":
             if(patrolboatArray[0]) {       
            shadowArray = selectCells(shipid, patrolboatArray[0]) ;
            }        
        break;
        }
        
    console.log(this[shipid+"Horizontal"]) 
    console.log("shadowarrayy "+shadowArray)

    console.log("shipid "+shipid)
    console.log("!shipOverlap(shipid) "+!shipOverlap(shipid))
    console.log("inGrid() "+inGrid())
    
//    if (inGrid()==undefined){
//    inGrid()==    
//    }
    
    if (inGrid()&&!shipOverlap(shipid)){   
    
    var oldheight = $('#'+ele.id).height();
    var oldwidth = $('#'+ele.id).width();
        
//    console.log("oldheight" + oldheight);
//    console.log("oldwidth" + oldwidth);
            
    ele.style.height = oldwidth+"px";
    ele.style.width = oldheight+"px";
    
        
//            console.log(this[shipid+"Horizontal"])
        console.log(this[shipid+"Horizontal"]==true )
        
    //apply the right image in accordance to horizontal boolean    
        if (this[shipid+"Horizontal"]==true){
        console.log("should be horizontal"+this[shipid+"Horizontal"]);
        ele.style.backgroundImage = "url(styles/"+shipid+"_h.png)";      
        }    else{
        console.log("vertical");
//            var shipid = ele.id
        console.log("ele"+ ele.id);
        console.log("should be vertical"+this[shipid+"Horizontal"]);
        path="url("+shipid+"_v.png)"
        ele.style.backgroundImage = "url(styles/"+shipid+"_v.png)";       
            };
        
            switch (shipid){
        case "carrier":       
//            console.log(shipid + " 5");
            carrierArray=shadowArray;
            console.log("carrierArray"+carrierArray)
            break;
        case "battleship":
//            console.log(shipid + " 4");
            battleshipArray=shadowArray;
            console.log("battleshipArray"+battleshipArray)
            break;
        case "submarine":
//            console.log(shipid + " 3");
            submarineArray=shadowArray;
            console.log("submarineArray"+submarineArray)
            break;
        case "destroyer":
            destroyerArray=shadowArray;
//            console.log(shipid + " 3");
            console.log("destroyerArray"+destroyerArray)
            break;
        case "patrolboat":
            patrolboatArray=shadowArray;
            console.log("patrolboatArray"+patrolboatArray)
//            console.log(shipid + " 2");
        break;
            }
    shadowArray=[];
}
    else{
        //toggle horizontal boolean back in case not in grid or overlap
        this[shipid+"Horizontal"] = !this[shipid+"Horizontal"];
        }
    }


function selectCells(shipid, cellid){
//    console.log("in");
    switch (shipid){
        case "carrier":       
//        console.log(shipid + " 5");
//        console.log("cellid="+cellid);
//console.log("calculateLocations(shipid, cellid, 5)"+calculateLocations(shipid, cellid, 5))
        return calculateLocations(shipid, cellid, 5);
            break;
        case "battleship":
//            console.log(shipid + " 4");
        return calculateLocations(shipid, cellid, 4);
            break;
        case "submarine":
//            console.log(shipid + " 3");
        return calculateLocations(shipid, cellid, 3);
            break;
        case "destroyer":
        return calculateLocations(shipid, cellid, 3);
//            console.log(shipid + " 3");
            break;
        case "patrolboat":
        return calculateLocations(shipid, cellid, 2);
//            console.log(shipid + " 2");
        break;
        }
}
        
function calculateLocations(shipid, cellid, number){
//    console.log("shipid "+shipid)
//    console.log("Horizontal "+this[shipid+"Horizontal"])
    
   if (this[shipid+"Horizontal"]==true){ 
    cellarray = [cellid]
//       console.log("cellid "+cellid)
    var element = document.getElementById(cellid);
//       console.log("element"+ element)  
//    element.classList.add(shipid);
       for (i=1; i<number; i++){
        var num = Number(cellid.substr(2,2)) + 1
        var lett = cellid.substr(0,2)
        var cellid = lett.concat(num);
//        console.log("num is" + num);
//        console.log("let is" + lett);
//        console.log("numlet is" + cellid);
        element = document.getElementById(cellid);           
//        element.classList.add(shipid);
        cellarray.push(cellid)
//        console.log("cellarray " + cellarray)
    }
   }
   else{
    cellarray = [cellid]
        var element = document.getElementById(cellid);
//       console.log("element"+ element)
//    element.classList.add(shipid);
    for (i=1; i<number; i++){
//        console.log("first cellid "+cellid)
        var row = cellid.substr(1,1)
//        console.log("row "+row)
        var inc=String.fromCharCode(row.charCodeAt(0) + 1)
//        console.log("inc "+inc)    
        var cellid= cellid.substr(0,1) + inc + cellid.substr(2,2)
//        console.log("second cellid "+cellid)
        element = document.getElementById(cellid);           
//        element.classList.add(shipid);
        cellarray.push(cellid)
//        console.log("cellarray " + cellarray)       
    }
   }     
//        console.log("cellarray " + cellarray)       
    return cellarray;
}

function placeSalvoes(ev){
//    console.log("ev.target.id "+ev.target.id);
document.getElementById(ev.target.id).classList.add('miss');
    cell=ev.target.id.replace("E", "");  
    locationArray.push(cell)
//    console.log(locationArray);
//    console.log(locationArray.length);
    if(locationArray.length==5){
        var object={
        "locations":locationArray,
        "salvoTurn":turn
    }
    cells.push(object);
   // app.printSalvoes(cells, 'E');
    cells=[];
    
    console.log(object.lastTurn)    
//    turn =object.salvoTurn+1
//    console.log("turn "+turn);
//    location.reload(); -> if unsuccessful   
    app.sendSalvoData(turn, locationArray) 
    locationArray=[];
    
//    console.log(cells);
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
                lastTurn: 0
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
                        if ("error" in app.games){
                        window.location.href = "games.html"
                        }
                        console.log(app.games);
                        app.lastTurn=app.games.lastTurn;
                        console.log(app.lastTurn)
                        app.printShips(app.games.ships);
                        app.printSalvoes(app.games.salvoes, 'E');   app.printSalvoes(app.games.enemy_salvoes, 'U');
                        })
                        .catch(e => console.log(e));
                },
                printShips(cells) {
                    console.log(cells)
                    for (var i = 0; i < cells.length; i++) {
                        name=cells[i].shipType; name=name.split(" ").join("").toLowerCase();
                        console.log(name)
                        console.log(window[name+"Array"])
                        
                            window[name+"Array"]=cells[i].locations;
                            console.log(patrolboatArray)
                        
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
                printSalvoes(cells, tableId) {
//                   console.log(cells)
                    if (cells != undefined) {
                        for (var i = 0; i < cells.length; i++) {
                            let turn = cells[i].salvoTurn;
                            for (var j = 0; j < cells[i].locations.length; j++) {
                                let location = cells[i].locations[j];
                                let cell = document.getElementById(tableId + location);
                                console.log("cell= "+cell)

                                if (cell.classList.contains('ship-location')&&tableId=='U') {
                                    cell.classList.remove('ship-location');
                                    cell.classList.add('hit');
                                } else if (cell.classList.contains('ship-location')&&tableId=='E'){
                                    cell.classList.add('hitEnemy');
                                } else if (tableId=='E'){
                                    cell.classList.add('miss');  
                                }
                                cell.innerHTML = cells[i].salvoTurn;
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
                sendSalvoData(turn, locations) {
                    console.log("new fetch")
                    salvoCells=[];
                    console.log(urlParams.get('gp'))
                    fetch("/api/games/players/" + urlParams.get('gp') + "/salvoes", {
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body:  "turn="+(app.lastTurn+1)+"&locations=" + 
                        locations
                        })
                    .then(function(response){
                        if(!response.ok){
                            console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                        }
                        response.json().then(data => {
                        app.lastTurn=app.lastTurn+1
                        console.log(data);
                        salvoCells.push(data)
                    app.printSalvoes(salvoCells,'E');
                        })
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