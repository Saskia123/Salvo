package com.codeoftheweb.salvo;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toList;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    private String userName;
    private String passWord;
    private String name;

    @OneToMany(mappedBy = "player", fetch = FetchType.EAGER)
    Set<GamePlayer> gamePlayers;
    @OneToMany(mappedBy = "player", fetch = FetchType.EAGER)
    Set<Score> playerScores;


    public Player() {
    }

    public Player(String userName, String passWord) {
        this.userName = userName;
        this.passWord = passWord;
    }

@JsonIgnore
    public List<Game> getGames() {
        return gamePlayers.stream().map(sub -> sub.getGame()).collect(toList());
    }
    public void setGamePlayers(Set<GamePlayer> players) {
        this.gamePlayers = gamePlayers;
    }

    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public long getId() {
        return id;
    }

//    public void addGame(GamePlayer player) {  //volgens mij fout
    public void addPlayer(GamePlayer player) {
        player.setPlayer(this);
        gamePlayers.add(player);
    }
    public void addPlayerScore(Score player) {
        player.setPlayer(this);
        playerScores.add(player);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}