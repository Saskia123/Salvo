package com.codeoftheweb.salvo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Arrays;


//array->list
//object->map

@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);
		System.out.println("Hello");
	}
	@Bean
	public CommandLineRunner initData(PlayerRepository playerRepository,
										  GameRepository gameRepository,
										  GamePlayerRepository gameplayerRepository, ShipRepository shipRepository) {
			return (args) -> {
				Player player1 = new Player("Jack.Bauer@gmail.com");
				Player player2 = new Player("Chloe.oBrian@hotmail.com");
				Player player3 = new Player("Kim.Bauer@gmail.com");
				Player player4 = new Player("David.Palmer@hotmail.com");
				Player player5 = new Player("Michelle.Dessler@gmail.com");
				playerRepository.save(player1);
				playerRepository.save(player2);
				playerRepository.save(player3);
				playerRepository.save(player4);
				playerRepository.save(player5);

				Game game1 = new Game("first game");
				Game game2 = new Game("second game");
				Game game3 = new Game("third game");
				gameRepository.save(game1);
				gameRepository.save(game2);
				gameRepository.save(game3);

				GamePlayer gamePlayer1 = new GamePlayer(game1, player1);
				GamePlayer gamePlayer2 = new GamePlayer(game1, player2);
				GamePlayer gamePlayer3 = new GamePlayer(game2, player3);
				GamePlayer gamePlayer4 = new GamePlayer(game2, player4);
				GamePlayer gamePlayer5 = new GamePlayer(game3, player5);
				GamePlayer gamePlayer6 = new GamePlayer(game3, player1);

				gameplayerRepository.save(gamePlayer1);
				gameplayerRepository.save(gamePlayer2);
				gameplayerRepository.save(gamePlayer3);
				gameplayerRepository.save(gamePlayer4);
				gameplayerRepository.save(gamePlayer5);
				gameplayerRepository.save(gamePlayer6);

				ArrayList<String> Locations1 = new ArrayList<String>(Arrays.asList("H2", "H3", "H4"));
				ArrayList<String> Locations2 = new ArrayList<String>(Arrays.asList("E1", "F1", "G1"));
				ArrayList<String> Locations3 = new ArrayList<String>(Arrays.asList("B4", "B5"));

				Ship ship1 = new Ship("Carrier", gamePlayer1, Locations1);
				Ship ship2 = new Ship("Battleship", gamePlayer2, Locations2);
				Ship ship3 = new Ship("Destroyer", gamePlayer3, Locations3);
				Ship ship4 = new Ship("Submarine", gamePlayer4, Locations1);
				Ship ship5 = new Ship("Patrol Boat", gamePlayer5, Locations2);
				Ship ship6 = new Ship("Submarine", gamePlayer5, Locations1);

				shipRepository.save(ship1);
				shipRepository.save(ship2);
				shipRepository.save(ship4);
				shipRepository.save(ship3);
				shipRepository.save(ship5);
				shipRepository.save(ship6);

			};
		}

	}


