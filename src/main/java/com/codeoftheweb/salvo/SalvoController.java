package com.codeoftheweb.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;


@RequestMapping("/api")
@RestController

public class SalvoController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private GamePlayerRepository gamePlayerRepository;

    @Autowired
    private ShipRepository shipRepository;

    @Autowired
    private SalvoRepository salvoRepository;

    @Autowired
    private ScoreRepository scoreRepository;


    @RequestMapping("/games")

    private Map<String, Object> getAllGames(Authentication authentication) {

//        return Player player;
        Map<String, Object> playerDto = new LinkedHashMap<String, Object>();
        if(authentication==null){
            playerDto.put("player","noone");
        }
        else{
            Player player=playerRepository.findByuserName(authentication.getName());
            playerDto.put("player",player.getUserName());
            playerDto.put("playerid",player.getId());

        }

        playerDto.put("games",gameRepository.findAll()
                .stream()
                .map(game -> makeGameDTO(game))
                .collect(toList()));
        return playerDto;
        //return gameRepository.findAll()
          //      .stream()
            //    .map(game -> makeGameDTO(game))
              //  .collect(toList()), Player player;
    }

    private Map<String, Object> makeGameDTO(Game game) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", game.getId());
        dto.put("name", game.getGameName());
        dto.put("creationdate", game.getcreationDate());
        dto.put("gameplayer", game.getGamePlayers().stream().map(gamePlayer -> makeGamePlayerDTO(gamePlayer)).collect(toList()));
        return dto;
    }

    private Map<String, Object> makeGamePlayerDTO(GamePlayer gameplayer) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", gameplayer.getId());
        dto.put("username", gameplayer.getPlayer().getUserName());
        dto.put("creationdate", gameplayer.getGame().getcreationDate());
        dto.put("player", makePlayerDTO(gameplayer.getPlayer()));
        return dto;
    }

    private Map<String, Object> makePlayerDTO(Player player) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", player.getId());
        dto.put("username", player.getUserName());
        return dto;
    }

    @RequestMapping("/game_view/{gpID}/HnS")
    public Map<String, Object> mapHnS(@PathVariable Long gpID, Authentication authentication) {

        GamePlayer gamePlayer = gamePlayerRepository.findOne(gpID);

        Map<String, Object> mapGamePlayer = new LinkedHashMap<>();
        if (authentication == null) {
            mapGamePlayer.put("error", "log in");
        } else if (gamePlayer.getPlayer().getId() == playerRepository.findByuserName(authentication.getName()).getId()) {

            mapGamePlayer.put("gameID", gamePlayer.getGame().getId());
            mapGamePlayer.put("created", gamePlayer.getGame().getcreationDate());
            mapGamePlayer.put("gamePlayers", MakeGamePlayerSetDTO(gamePlayer.getGame().getGamePlayers()));
            mapGamePlayer.put("ships", gamePlayer.getShips()
                    .stream()
                    .map(ship -> makeShipDTO(ship))
                    .collect(Collectors.toList())
            );
            mapGamePlayer.put("salvoes", gamePlayer.getSalvoes()
                    .stream()
                    .map(salvo -> makeSalvoDTO(salvo))
                    .collect(Collectors.toList())
            );
            Game game = gamePlayer.getGame();
            Set<GamePlayer> players = game.getGamePlayers();
            if (players.size() == 2) {
                mapGamePlayer.put("enemy_salvoes", getEnemy(gamePlayer).getSalvoes()
                        .stream()
                        .map(salvo -> makeSalvoDTO(salvo))
                        .collect(Collectors.toList())
                );

                mapGamePlayer.put("hits_on_enemy", getHits(gamePlayer));
                mapGamePlayer.put("hits_on_user", getHits(getEnemy(gamePlayer)));
                mapGamePlayer.put("user_sunk_ships", getSunkShips(gamePlayer));
                mapGamePlayer.put("enemy_sunk_ships", getSunkShips(getEnemy(gamePlayer)));
            }



            mapGamePlayer.put("lastTurn", getmaxturn(gamePlayer.getSalvoes()));

        } else {
            mapGamePlayer.put("error", "not your game");
        }
        return mapGamePlayer;
    }


    @RequestMapping("/game_view/{gpID}")
    public Map<String, Object> mapGameView(@PathVariable Long gpID, Authentication authentication) {

        GamePlayer gamePlayer = gamePlayerRepository.findOne(gpID);
        Map<String, Object> mapGamePlayer = new LinkedHashMap<>();
        if (authentication == null) {
            mapGamePlayer.put("error", "log in");
        } else if (gamePlayer.getPlayer().getId() == playerRepository.findByuserName(authentication.getName()).getId()) {

            mapGamePlayer.put("gameID", gamePlayer.getGame().getId());
            mapGamePlayer.put("created", gamePlayer.getGame().getcreationDate());
            mapGamePlayer.put("gamePlayers", MakeGamePlayerSetDTO(gamePlayer.getGame().getGamePlayers()));
            mapGamePlayer.put("ships", gamePlayer.getShips()
                    .stream()
                    .map(ship -> makeShipDTO(ship))
                    .collect(Collectors.toList())
            );
            mapGamePlayer.put("salvoes", gamePlayer.getSalvoes()
                    .stream()
                    .map(salvo -> makeSalvoDTO(salvo))
                    .collect(Collectors.toList())
            );
            Game game = gamePlayer.getGame();
            Set<GamePlayer> players = game.getGamePlayers();
            if (players.size() == 2) {
                mapGamePlayer.put("enemy_salvoes", getEnemy(gamePlayer).getSalvoes()
                        .stream()
                        .map(salvo -> makeSalvoDTO(salvo))
                        .collect(Collectors.toList())
                );
            }
            mapGamePlayer.put("lastTurn", getmaxturn(gamePlayer.getSalvoes()));

        } else {
            mapGamePlayer.put("error", "not your game");
        }
        return mapGamePlayer;
    }


    private GamePlayer getEnemy(GamePlayer gamePlayer) {
        return gamePlayer
                .getGame()
                .getGamePlayers()
                .stream()
                .filter(gp -> gp.getId() != gamePlayer.getId())
                .findFirst()
                .orElse(null);
    }

    private Set<Object> MakeGamePlayerSetDTO(Set<GamePlayer> gamePlayerSet) {
        return gamePlayerSet
                .stream()
                .map(oneGamePlayer -> MakeGamePlayerDTO(oneGamePlayer))
                .collect(Collectors.toSet());
    }

    // GamePlayer DTO
    private Map<String, Object> MakeGamePlayerDTO(GamePlayer gamePlayer) {
        Map<String, Object> gamePlayerDTO = new LinkedHashMap<String, Object>();
        gamePlayerDTO.put("id", gamePlayer.getId());
        gamePlayerDTO.put("player", MakePlayerDTO(gamePlayer.getPlayer()));
        return gamePlayerDTO;
    }

    // Player DTO
    private Map<String, Object> MakePlayerDTO(Player player) {
        Map<String, Object> playerDTO = new LinkedHashMap<String, Object>();
        playerDTO.put("id", player.getId());
        playerDTO.put("email", player.getUserName());
        return playerDTO;
    }

    // Ship DTO
    private Map<String, Object> makeShipDTO(Ship ship) {
        Map<String, Object> shipDTO = new LinkedHashMap<String, Object>();
        shipDTO.put("id", ship.getId());
        shipDTO.put("shipType", ship.getType());
        shipDTO.put("locations", ship.getLocations());
        return shipDTO;
    }

    // Salvo DTO
    private Map<String, Object> makeSalvoDTO(Salvo salvo) {
        Map<String, Object> salvoDTO = new LinkedHashMap<String, Object>();
        salvoDTO.put("id", salvo.getId());
        salvoDTO.put("salvoTurn", salvo.getTurn());
        salvoDTO.put("locations", salvo.getLocations());
        salvoDTO.put("player", salvo.getGamePlayer().getPlayer().getId());
        return salvoDTO;
    }

    @RequestMapping("/leaderboard")

    // Score DTO
    public List<Map<String, Object>> scores() {

        //return Player
        List<Player> allPlayers = playerRepository.findAll();
        List<Map<String, Object>> scoreList = new ArrayList();
        for (Player player : allPlayers) {

            Double total = 0.0;
            Integer win = 0;
            Integer tie = 0;
            Integer lose = 0;
            Set<Score> score = player.playerScores;
            Map<String, Object> getScores = new HashMap<>();
            getScores.put("user", player.getUserName());
            for (Score score1 : score) {
                if (score1.getScore() == 1.0) {
                    win = win + 1;
                    total = total + 1.0;
                }
                if (score1.getScore() == 0.5) {
                    tie = tie + 1;
                    total = total + 0.5;
                }
                if (score1.getScore() == 0.0) {
                    lose = lose + 1;
                }
            }
            getScores.put("total", total);
            getScores.put("win", win);
            getScores.put("tie", tie);
            getScores.put("lose", lose);
            scoreList.add(getScores);
        }
        Collections.sort(scoreList, new Comparator<Map<String, Object>>() {
            public int compare(Map<String, Object> m1, Map<String, Object> m2) {
                return ((Double) m2.get("total")).compareTo((Double) m1.get("total"));
            }
        });
        return scoreList;

    }

    @RequestMapping(path = "/users", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> createPlayer(@RequestParam String userName, @RequestParam String passWord) {
        if (userName.isEmpty()|| passWord.isEmpty()) {
            return new ResponseEntity<>(makeMap("error", "No name or password"), HttpStatus.FORBIDDEN);
        }
        Player player = playerRepository.findByuserName(userName);
        if (player != null) {
            return new ResponseEntity<>(makeMap("error", "Username already exists"), HttpStatus.CONFLICT);
        }
        Player newPlayer = new Player(userName,passWord);
        playerRepository.save(newPlayer);
        return new ResponseEntity<>(makeMap("id", newPlayer.getId()), HttpStatus.CREATED);
    }

    private Map<String, Object> makeMap(String key, Object value) {
        Map<String, Object> map = new HashMap<>();
        map.put(key, value);
        return map;
    }

    private Player currentAuthenticatedUser(Authentication authentication) {
        if (isGuest(authentication)) {
            return null;
        }
        return playerRepository.findByuserName(authentication.getName());
    }


    private boolean isGuest(Authentication authentication) {
        return authentication == null || authentication instanceof AnonymousAuthenticationToken;
    }

    @RequestMapping(path = "/game", method = RequestMethod.POST)
    public ResponseEntity<Object> createGame(Authentication authentication) {
        final Map<String, Object> response = new HashMap<>();
        if (isGuest(authentication)) {
            response.put("error", "please log in");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        } else {
            final Player player = currentAuthenticatedUser(authentication);
            final Game newGame = new Game();
            gameRepository.save(newGame);
            final GamePlayer firstGamePlayer = new GamePlayer(newGame,player);
            gamePlayerRepository.save(firstGamePlayer);
            response.put("gpid", firstGamePlayer.getId());
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
    }


    @RequestMapping(path = "/game/{gameId}/players", method = RequestMethod.POST)
    private ResponseEntity<Map<String,Object>> joinGame (@PathVariable Long gameId, Authentication authentication) {
        Game game = gameRepository.findOne(gameId);
        Player player = playerRepository.findByuserName(authentication.getName());
        GamePlayer gamePlayer = new GamePlayer(game, player);
        if (authentication != null){
            if(game.getGamePlayers().size() == 1) {
                gamePlayerRepository.save(gamePlayer);
                return new ResponseEntity<>(makeMap("gpid", gamePlayer.getId()), HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>(makeMap("error", "game is full"), HttpStatus.FORBIDDEN);
            }

        }else{
            return new ResponseEntity<>(makeMap("error", "not logged"), HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(path = "/games/players/{gamePlayerId}/ships")
    public ResponseEntity<Map<String, Object>> placeShips(@PathVariable ("gamePlayerId") Long gamePlayerId,
                                                          @RequestParam String type,
                                                          @RequestParam String[] locations,
                                                          Authentication authentication) {
        System.out.println(type);


        GamePlayer gamePlayer = gamePlayerRepository.findOne(gamePlayerId);
        if (authentication == null) {
            return new ResponseEntity<>(makeMap("error", "log in to place ships"), HttpStatus.UNAUTHORIZED);
        } else if (gamePlayer == null) {
            return new ResponseEntity<>(makeMap("error", "gamePlayer does not exist"), HttpStatus.UNAUTHORIZED);
        } else if (gamePlayer.getPlayer() != currentAuthenticatedUser(authentication)) {
            return new ResponseEntity<>(makeMap("error", "Not your game"), HttpStatus.UNAUTHORIZED);
        }  else if (gamePlayer.getShips().size() > 5) {
            return new ResponseEntity<>(makeMap("error", "Not allowed to place ships ")
                    , HttpStatus.FORBIDDEN);
        } else {
            ArrayList<String> shipList = new ArrayList<>();

            for (int i = 0; i < locations.length; i++) {
                shipList.add(locations[i]);
            }

            shipRepository.save(new Ship(type, gamePlayerRepository.findOne(gamePlayerId), shipList));
            return new ResponseEntity<>(makeMap("status", "Ships placed")
                    , HttpStatus.CREATED);
        }
    }



    @RequestMapping(path = "/games/players/{gamePlayerId}/salvoes")
    public ResponseEntity<Map<String, Object>> placeSalvoes(@PathVariable ("gamePlayerId") Long gamePlayerId,
                                                          @RequestParam Integer turn,
                                                          @RequestParam String[] locations,
                                                          Authentication authentication) {
        System.out.println(turn);

        GamePlayer gamePlayer = gamePlayerRepository.findOne(gamePlayerId);
        Set<Salvo> salvoes = gamePlayer.getSalvoes();
        Integer maxTurn=getmaxturn(salvoes);
        if (authentication == null) {
            return new ResponseEntity<>(makeMap("error", "log in to place salvoes"), HttpStatus.UNAUTHORIZED);
        } else if (gamePlayer == null) {
            return new ResponseEntity<>(makeMap("error", "gamePlayer does not exist"), HttpStatus.UNAUTHORIZED);
        } else if (gamePlayer.getPlayer() != currentAuthenticatedUser(authentication)) {
            return new ResponseEntity<>(makeMap("error", "Not your game"), HttpStatus.UNAUTHORIZED);
        }  else if (maxTurn>=turn ) {
            return new ResponseEntity<>(makeMap("error", "Turn has already passed")
                    , HttpStatus.FORBIDDEN);
        } else {
            ArrayList<String> salvoList = new ArrayList<>();

            for (int i = 0; i < locations.length; i++) {
                salvoList.add(locations[i]);
            }
            Salvo newSalvo=new Salvo(turn, gamePlayerRepository.findOne(gamePlayerId), salvoList);
            salvoRepository.save(newSalvo);
            return new ResponseEntity<>( makeSalvoDTO(newSalvo)
                    , HttpStatus.CREATED);
        }
    }

    private Integer getmaxturn(Set<Salvo> salvoes) {
        if (salvoes==null){
            return 0;
    }
    else{
        Integer max=0;
        for(Salvo salvo:salvoes){
            if(salvo.getTurn()>max){
                max=salvo.getTurn();
            }
        }
        return max;
        }
    }


    private List<String> getShipsLocation (GamePlayer gamePlayer) {
        List<String> list = new ArrayList<>();

        for (Ship ship : gamePlayer.getShips()) {
            for (String location : ship.getLocations()) {
                list.add(location);
            }
        }
        return list;
    }

    private List<String> getSalvosLocation (GamePlayer gamePlayer) {


        List<String> list = new ArrayList<>();

        for (Salvo salvo : gamePlayer.getSalvoes()) {
            for (String location : salvo.getLocations()) {
                list.add(location);
            }
        }
        return list;


    }

    private List<String> getHits (GamePlayer gamePlayer) {
        List<String> list = new ArrayList<>();

        for (String salvoCell : getSalvosLocation(gamePlayer)) {
            for (String shipCell : getShipsLocation(getEnemy(gamePlayer))) {
                if(shipCell.equals(salvoCell)) {
                    list.add(salvoCell);
                }
            }
        }
        return list;
    }

    private List<Object> getSunkShips (GamePlayer gamePlayer) {
        List<Object> list = new ArrayList<>();

        for (Ship ship : gamePlayer.getShips()) {

            List<String> hitsOnShip = new ArrayList<>();
            for (String hit : getHits(getEnemy(gamePlayer))) {
                if (ship.getLocations().contains(hit)){
                    hitsOnShip.add(hit);
                }
            }

            if (hitsOnShip.size() == ship.getLocations().size()) {
                list.add(makeShipDTO(ship));
            }
        }

        return list;
    }







}




