package com.codeoftheweb.salvo;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;


@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    private Date creationDate;

    @OneToMany (mappedBy = "game", fetch = FetchType.EAGER)
    private Set<GamePlayer> gamePlayers;

    private String gameName;

    public Game() {
        this.creationDate=new Date();
    }

    public Game(String gameName) {
        this.gameName = gameName;
        this.creationDate=new Date();
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public Game(Date creationDate) {
        this.creationDate = new Date();
    }

    public Date getcreationDate() {
        return creationDate;
    }
    public void setcreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public long getId() {
        return id;
    }

    public Set<GamePlayer> getGamePlayers() {
        return gamePlayers;
    }

    public void setGamePlayers(Set<GamePlayer> games) {
        this.gamePlayers = gamePlayers;
    }

    public void addGame(GamePlayer game) {
        game.setGame(this);
        gamePlayers.add(game);
    }
}