// when a ship is placed and you rotate no overlap must be possible
// send ship data
// let fleet overview dissapear
// shadow
// warning when there is overlap
// layout stuff
//fix shadowarray
//add warning stuff
// rotating in panel
//shadie sticking when ship is not in grid
//ondrag z-index

  const urlParams = new URL(window.location.href).searchParams;

    var shipid;
    var cellarray;
    var shadowArray;
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

    function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
    }
    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }

    function allowDrop(ev){                
//    console.log("shadowArray "+shadowArray);
    var inGrid=true;    
    for (i=1; i<shadowArray.length; i++){
    if  ((shadowArray[i].substr(2,2)>10)||(shadowArray[i].substr(1,1)>"J")) {
        inGrid=false
        }
    }
//    console.log("ingrid "+inGrid)
    if (inGrid==true){        
    ev.preventDefault();
    }
    inGrid=true;    
    }

    function dragStart(ev){
    shipid=ev.target.id;
    document.getElementById(shipid).style.zIndex="-1"
                }

    function dragEnd(ev){
    shipid=ev.target.id;
    document.getElementById(shipid).style.zIndex="1" 
    document.getElementById(shipid).style.filter= null;
    }

    function drop(ev){
    console.log("shadowArray "+shadowArray);
    console.log(ev)
    console.log("ev.target.id"  +ev.path[1].id); // targetcell
    var inGrid=true;    
    for (i=1; i<shadowArray.length; i++){
    if  ((shadowArray[i].substr(2,2)>10)||(shadowArray[i].substr(1,1)>"J")) {
        inGrid=false
        }
    }
    if (inGrid==true&&!shipOverlap(shipid)){   
    console.log("ingrid "+inGrid)
        console.log("shipOverlap(shipid) "+shipOverlap(shipid))
        
//    selectCells(shipid, ev.target.id);
     switch (shipid){
        case "carrier":
        console.log("shipid "+shipid)
        console.log("ev.target.id"+ev.target.id)
             //here
        carrierArray=selectCells(shipid, ev.target.id);
        console.log("carrierArray"+carrierArray)
            break;
        case "battleship":
        battleshipArray= selectCells(shipid, ev.target.id);
        console.log("battleship"+battleship)
            break;
        case "submarine":
        submarineArray=selectCells(shipid, ev.target.id);
        console.log("submarineArray"+submarineArray)
            break;
        case "destroyer":
        destroyerArray= selectCells(shipid, ev.target.id);
        console.log("destroyerArray"+destroyerArray)
            break;
        case "patrolboat":
        patrolboatArray= selectCells(shipid, ev.target.id);        
        console.log("patrolboatArray"+patrolboatArray)
             break;
        }
//    console.log ("ev"+ev)    
//    console.log("shipid!" + shipid); //destroyer
    ev.target.append(document.getElementById(shipid));
    document.getElementById(shipid).style.margin = "0px";
    document.getElementById(shipid).style.filter= null;
    var el = document.getElementById(shadowArray[0])    
    document.getElementById(el.id).style.zIndex= null;
    
        }
    inGrid=true;     
    }        
        
//      console.log(typeof(cells[0]))  
//      console.log(cells)  

function shipOverlap(shipid){
//console.log("in shipoverlap functoin")
//    console.log("ev"+ev.id)
//    return false;
console.log ("in shipoverlap " );
console.log ("shipid " +shipid);
console.log ("shadowArray " +shadowArray);
console.log ("carrierArray " +carrierArray);
    
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
console.log ("shadowArray " +shadowArray);
console.log ("carrierArray " +carrierArray);
             
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
//found = false;
}

function shadowOn(cellid){
console.log("shipidnu"+shipid);
console.log("cellidnu"+cellid);
    
//    shipid=ev.target.id;
//    event.target.className
    
 shadowArray = selectCells(shipid, cellid) 
 console.log("shadowArray is"+shadowArray);
 console.log("shadowArray[0] is"+shadowArray[0]);


//    
//var shadow = document.createElement("div");
//shadow.setAttribute("id", "shadow");
//shadow.style.height  =  $('#'+shipid).height();
//shadow.style.width  = $('#'+shipid).width(); 
//shadow.style.height  = document.getElementById(shipid).style.height;
//shadow.style.width  = document.getElementById(shipid).style.width;
//var el = document.getElementById("UF7")
//el.append(document.getElementById("shadow"));   
    
//document.getElementById('UF7').appendChild(shadow);

    
var el = document.getElementById(shadowArray[0])
el.append(document.getElementById(shipid));
    
    
document.getElementById(shipid).style.margin = "0px";    
document.getElementById(shipid).style.filter= "invert(50%) grayscale(50%) brightness(75%) contrast(0) opacity(65%)";
document.getElementById(shipid).style.zIndex="-2"
    
    
//    
//var el = document.getElementById(shadowArray[0])
//var ship = document.getElementById(shipid)
//var shadow = ship.cloneNode(true); // make a copy of ship and give it id shadow then append it to the first element of the shadowarray 
//shadow.setAttribute("id", "shadow");    
//el.append(document.getElementById(shadow));
//    
//console.log("cellid= "+cellid+"shipid= "+shipid+"shadowArray[0]= "+shadowArray[0])   
//    
//document.getElementById(shadow).style.margin = "0px";    
//document.getElementById(shadow).style.filter= "invert(50%) grayscale(50%) brightness(75%) contrast(0) opacity(65%)";
//document.getElementById(shadow).style.zIndex="-2"
//    
}

function shadowOff(){
//    shadow = document.getElementById(shadow);
//    el = document.getElementById(shadowArray[0])
//    el.remove(shadow);
}


function rotateBy90Deg(ele){    
        console.log(ele);

//when rotating in startpoint cannot do the shadowarray and causes error        
// need to have the rotated array to see if there is overlap. if there is it should not be rotated
        //use shadowarray to compare
//        selectCells(shipid, cellid)
        shipid = ele.id
              var  cellid;
            switch (shipid){
        case "carrier":       
            cellid=carrierArray[0]; 
            break;
        case "battleship":
//            console.log(shipid + " 4");
            cellid=battleshipArray[0];        
            break;
        case "submarine":
//            console.log(shipid + " 3");
            cellid=submarineArray[0];        
            break;
        case "destroyer":
            cellid=destroyerArray[0];        
//            console.log(shipid + " 3");
            break;
        case "patrolboat":
            cellid=patrolboatArray[0];        
//            console.log(shipid + " 2");
        break;
        }
        

        console.log ("cellid here "+cellid);
     
    console.log(this[shipid+"Horizontal"])

//        this[shipid+"Horizontal"] = !this[shipid+"Horizontal"];
    this[shipid+"Horizontal"] = !this[shipid+"Horizontal"];
         shadowArray = selectCells(shipid, cellid) 
        console.log("shadowarrayy "+shadowArray)

    if (!shipOverlap(shipid)){   
        console.log("!shipOverlap() "+!shipOverlap())

    
    var oldheight = $('#'+ele.id).height();
    var oldwidth = $('#'+ele.id).width();
        
//    console.log("oldheight" + oldheight);
//    console.log("oldwidth" + oldwidth);
            
    ele.style.height = oldwidth+"px";
    ele.style.width = oldheight+"px";
        
        
        console.log("shipid "+shipid)
        
//            console.log(this[shipid+"Horizontal"])
        console.log(this[shipid+"Horizontal"]==true )
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
//        'url(styles/carrier_v.png)'
        
        
      var  cellid;
            switch (shipid){
        case "carrier":       
            cellid=carrierArray[0]; 
            carrierArray=selectCells(shipid, cellid);
            console.log("carrierArray"+carrierArray)
            break;
        case "battleship":
//            console.log(shipid + " 4");
            cellid=battleshipArray[0];        
            battleshipArray=selectCells(shipid, cellid);
            console.log("battleshipArray"+battleshipArray)
            break;
        case "submarine":
//            console.log(shipid + " 3");
            cellid=submarineArray[0];        
            submarineArray=selectCells(shipid, cellid);
            console.log("submarineArray"+submarineArray)
            break;
        case "destroyer":
            cellid=destroyerArray[0];        
            destroyerArray=selectCells(shipid, cellid);
//            console.log(shipid + " 3");
            console.log("destroyerArray"+destroyerArray)
            break;
        case "patrolboat":
            cellid=patrolboatArray[0];        
            patrolboatArray=selectCells(shipid, cellid);
            console.log("patrolboatArray"+patrolboatArray)
//            console.log(shipid + " 2");
        break;
        }
}
    else{
        this[shipid+"Horizontal"] = !this[shipid+"Horizontal"];
    }
        console.log("shipid "+shipid)
        console.log("cellid "+cellid)   
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
    console.log("shipid "+shipid)
    console.log("Horizontal "+this[shipid+"Horizontal"])
    
   if (this[shipid+"Horizontal"]==true){ 
    cellarray = [cellid]
       console.log("cellid "+cellid)
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