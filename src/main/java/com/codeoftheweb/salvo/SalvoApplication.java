package com.codeoftheweb.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Arrays;

import static javax.print.attribute.standard.MediaSize.ISO.C5;


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
										  GamePlayerRepository gameplayerRepository,
									  ShipRepository shipRepository,
									  SalvoRepository salvoRepository,
									  ScoreRepository scoreRepository) {
			return (args) -> {

				Player player1 = new Player("j.bauer@ctu.gov", "24");
				Player player2 = new Player("c.obrian@ctu.gov", "42");
				Player player3 = new Player("kim_bauer@gmail.com", "kb");
				Player player4 = new Player("t.almeida@ctu.gov", "mole");

				playerRepository.save(player1);
				playerRepository.save(player2);
				playerRepository.save(player3);
				playerRepository.save(player4);

				Game game1 = new Game("first game");
				Game game2 = new Game("second game");
				Game game3 = new Game("third game");
				Game game4 = new Game("fourth game");
				Game game5 = new Game("fifth game");
				Game game6 = new Game("sixth game");
				Game game7 = new Game("seventh game");
				Game game8 = new Game("eight game");

				gameRepository.save(game1);
				gameRepository.save(game2);
				gameRepository.save(game3);
				gameRepository.save(game4);
				gameRepository.save(game5);
				gameRepository.save(game6);
				gameRepository.save(game7);
				gameRepository.save(game8);

				GamePlayer gamePlayer1 = new GamePlayer(game1, player1);
				GamePlayer gamePlayer2 = new GamePlayer(game1, player2);
				GamePlayer gamePlayer3 = new GamePlayer(game2, player1);
				GamePlayer gamePlayer4 = new GamePlayer(game2, player2);
				GamePlayer gamePlayer5 = new GamePlayer(game3, player2);
				GamePlayer gamePlayer6 = new GamePlayer(game3, player4);
				GamePlayer gamePlayer7 = new GamePlayer(game4, player2);
				GamePlayer gamePlayer8 = new GamePlayer(game4, player1);

				GamePlayer gamePlayer9 = new GamePlayer(game5, player4);
				GamePlayer gamePlayer10 = new GamePlayer(game5, player1);
				GamePlayer gamePlayer11 = new GamePlayer(game6, player1);
//				GamePlayer gamePlayer12 = new GamePlayer(game6, player1);
				GamePlayer gamePlayer13 = new GamePlayer(game7, player4);
//				GamePlayer gamePlayer14 = new GamePlayer(game7, player1);
				GamePlayer gamePlayer15 = new GamePlayer(game8, player1);
				GamePlayer gamePlayer16 = new GamePlayer(game8, player4);

				gameplayerRepository.save(gamePlayer1);
				gameplayerRepository.save(gamePlayer2);
				gameplayerRepository.save(gamePlayer3);
				gameplayerRepository.save(gamePlayer4);
				gameplayerRepository.save(gamePlayer5);
				gameplayerRepository.save(gamePlayer6);
				gameplayerRepository.save(gamePlayer7);
				gameplayerRepository.save(gamePlayer8);
				gameplayerRepository.save(gamePlayer9);
				gameplayerRepository.save(gamePlayer10);
				gameplayerRepository.save(gamePlayer11);
				gameplayerRepository.save(gamePlayer13);
				gameplayerRepository.save(gamePlayer15);
				gameplayerRepository.save(gamePlayer16);

//Shiplocations
				ArrayList<String> Locations1 = new ArrayList<String>(Arrays.asList("H2", "H3", "H4"));
				ArrayList<String> Locations2 = new ArrayList<String>(Arrays.asList("E1", "F1", "G1"));
				ArrayList<String> Locations3 = new ArrayList<String>(Arrays.asList("B4", "B5"));
				ArrayList<String> Locations4 = new ArrayList<String>(Arrays.asList("B5", "C5", "D5"));
				ArrayList<String> Locations5 = new ArrayList<String>(Arrays.asList("F1", "F2"));
				ArrayList<String> Locations6 = new ArrayList<String>(Arrays.asList("B5", "C5", "D5"));
				ArrayList<String> Locations7 = new ArrayList<String>(Arrays.asList("C6", "C7"));
				ArrayList<String> Locations8 = new ArrayList<String>(Arrays.asList("A2", "A3", "A4"));
				ArrayList<String> Locations9 = new ArrayList<String>(Arrays.asList("G6", "H6"));
				ArrayList<String> Locations10 = new ArrayList<String>(Arrays.asList("B5", "C5", "D5"));
				ArrayList<String> Locations11 = new ArrayList<String>(Arrays.asList("C6", "C7"));
				ArrayList<String> Locations12 = new ArrayList<String>(Arrays.asList("A2", "A3", "A4"));
				ArrayList<String> Locations13 = new ArrayList<String>(Arrays.asList("G6", "H6"));
				ArrayList<String> Locations14 = new ArrayList<String>(Arrays.asList("B5", "C5", "D5"));
				ArrayList<String> Locations15 = new ArrayList<String>(Arrays.asList("C6", "C7"));
				ArrayList<String> Locations16 = new ArrayList<String>(Arrays.asList("A2", "A3", "A4"));
				ArrayList<String> Locations17 = new ArrayList<String>(Arrays.asList("G6", "H6"));
				ArrayList<String> Locations18 = new ArrayList<String>(Arrays.asList("B5", "C5", "D5"));
				ArrayList<String> Locations19 = new ArrayList<String>(Arrays.asList("C6", "C7"));
				ArrayList<String> Locations20 = new ArrayList<String>(Arrays.asList("A2", "A3", "A4"));
				ArrayList<String> Locations21 = new ArrayList<String>(Arrays.asList("G6", "H6"));
				ArrayList<String> Locations22 = new ArrayList<String>(Arrays.asList("B5", "C5", "D5"));
				ArrayList<String> Locations23 = new ArrayList<String>(Arrays.asList("C6", "C7"));
				ArrayList<String> Locations24 = new ArrayList<String>(Arrays.asList("A2", "A3", "A4"));
				ArrayList<String> Locations25 = new ArrayList<String>(Arrays.asList("G6", "H6"));
				ArrayList<String> Locations26 = new ArrayList<String>(Arrays.asList("B5", "C5", "D5"));
				ArrayList<String> Locations27 = new ArrayList<String>(Arrays.asList("C6", "C7"));
				ArrayList<String> Locations28 = new ArrayList<String>(Arrays.asList("B5", "C5", "D5"));
				ArrayList<String> Locations29 = new ArrayList<String>(Arrays.asList("C6", "C7"));
				ArrayList<String> Locations30 = new ArrayList<String>(Arrays.asList("A2", "A3", "A4"));
				ArrayList<String> Locations31 = new ArrayList<String>(Arrays.asList("G6", "H6"));

				Ship ship1 = new Ship("Destroyer", gamePlayer1, Locations1);
				Ship ship2 = new Ship("Submarine", gamePlayer1, Locations2);
				Ship ship3 = new Ship("Patrol Boat", gamePlayer1, Locations3);
				Ship ship4 = new Ship("Destroyer", gamePlayer2, Locations4);
				Ship ship5 = new Ship("Patrol Boat", gamePlayer2, Locations5);

				Ship ship6 = new Ship("Battleship", gamePlayer2, Locations2);
				Ship ship7 = new Ship("Destroyer", gamePlayer3, Locations3);
				Ship ship8 = new Ship("Submarine", gamePlayer4, Locations1);
				Ship ship9 = new Ship("Patrol Boat", gamePlayer5, Locations2);
				Ship ship10 = new Ship("Submarine", gamePlayer5, Locations1);

				shipRepository.save(ship1);
				shipRepository.save(ship2);
				shipRepository.save(ship3);
				shipRepository.save(ship4);
				shipRepository.save(ship5);
				shipRepository.save(ship6);
				shipRepository.save(ship7);
				shipRepository.save(ship8);
				shipRepository.save(ship9);
				shipRepository.save(ship10);

//Salvolocations
				ArrayList<String> Locations32 = new ArrayList<String>(Arrays.asList("B5", "C5", "F1"));
				ArrayList<String> Locations33 = new ArrayList<String>(Arrays.asList("F2", "D5"));
				ArrayList<String> Locations34 = new ArrayList<String>(Arrays.asList("A2", "A4", "G6"));
				ArrayList<String> Locations35 = new ArrayList<String>(Arrays.asList("A3", "H6"));
				ArrayList<String> Locations36 = new ArrayList<String>(Arrays.asList("G6", "H6", "A4"));
				ArrayList<String> Locations37 = new ArrayList<String>(Arrays.asList("A2", "A3", "D8"));
				ArrayList<String> Locations38 = new ArrayList<String>(Arrays.asList("A3", "A4", "F7"));
				ArrayList<String> Locations39 = new ArrayList<String>(Arrays.asList("A2", "G6", "H6"));
				ArrayList<String> Locations40 = new ArrayList<String>(Arrays.asList("A1", "A2", "A3"));
				ArrayList<String> Locations41 = new ArrayList<String>(Arrays.asList("G6", "G7", "G8"));


				ArrayList<String> Locations42 = new ArrayList<String>(Arrays.asList("B4", "B5", "B6"));
				ArrayList<String> Locations43 = new ArrayList<String>(Arrays.asList("E1", "H3", "A2"));
				ArrayList<String> Locations44 = new ArrayList<String>(Arrays.asList("B5", "D5", "C7"));
				ArrayList<String> Locations45 = new ArrayList<String>(Arrays.asList("C5", "C6"));
				ArrayList<String> Locations46 = new ArrayList<String>(Arrays.asList("H1", "H2", "H3"));
				ArrayList<String> Locations47 = new ArrayList<String>(Arrays.asList("E1", "F2", "G3"));
				ArrayList<String> Locations48 = new ArrayList<String>(Arrays.asList("B5", "C6", "H1"));
				ArrayList<String> Locations49 = new ArrayList<String>(Arrays.asList("C5", "C7", "D5"));
				ArrayList<String> Locations50 = new ArrayList<String>(Arrays.asList("B5", "B6", "C7"));
				ArrayList<String> Locations51 = new ArrayList<String>(Arrays.asList("C6", "D6", "E6"));
				ArrayList<String> Locations52 = new ArrayList<String>(Arrays.asList("H1", "H8"));


				Salvo salvo1=new Salvo(1,gamePlayer1,Locations42);
				Salvo salvo2=new Salvo(2,gamePlayer1,Locations33);
				Salvo salvo3=new Salvo(1,gamePlayer3,Locations34);
				Salvo salvo4=new Salvo(2,gamePlayer3,Locations35);
				Salvo salvo5=new Salvo(1,gamePlayer5,Locations36);
				Salvo salvo6=new Salvo(2,gamePlayer5,Locations37);
				Salvo salvo7=new Salvo(1,gamePlayer4,Locations38);
				Salvo salvo8=new Salvo(2,gamePlayer4,Locations39);
				Salvo salvo9=new Salvo(1,gamePlayer5,Locations40);
				Salvo salvo10=new Salvo(2,gamePlayer5,Locations41);

				Salvo salvo11=new Salvo(1,gamePlayer2,Locations32);
				Salvo salvo12=new Salvo(2,gamePlayer2,Locations33);
				Salvo salvo13=new Salvo(1,gamePlayer1,Locations34);
				Salvo salvo14=new Salvo(2,gamePlayer1,Locations35);
				Salvo salvo15=new Salvo(1,gamePlayer1,Locations36);
				Salvo salvo16=new Salvo(2,gamePlayer1,Locations37);
				Salvo salvo17=new Salvo(1,gamePlayer1,Locations38);
				Salvo salvo18=new Salvo(2,gamePlayer1,Locations39);
				Salvo salvo19=new Salvo(1,gamePlayer1,Locations40);
				Salvo salvo20=new Salvo(2,gamePlayer1,Locations41);
				Salvo salvo21=new Salvo(3,gamePlayer1,Locations42);

				salvoRepository.save(salvo1);
				salvoRepository.save(salvo2);
				salvoRepository.save(salvo3);
				salvoRepository.save(salvo4);
				salvoRepository.save(salvo5);
				salvoRepository.save(salvo6);
				salvoRepository.save(salvo7);
				salvoRepository.save(salvo8);
				salvoRepository.save(salvo9);
				salvoRepository.save(salvo10);
				salvoRepository.save(salvo11);
				salvoRepository.save(salvo12);
				salvoRepository.save(salvo13);
				salvoRepository.save(salvo14);
				salvoRepository.save(salvo15);
				salvoRepository.save(salvo16);
				salvoRepository.save(salvo17);
				salvoRepository.save(salvo18);
				salvoRepository.save(salvo19);
				salvoRepository.save(salvo20);
				salvoRepository.save(salvo21);
                Score score1=new Score(game1, player1,0.5);
                Score score2=new Score(game2, player2,1.0);
                Score score3=new Score(game3, player1,1.0);
                Score score4=new Score(game4, player2,1.0);
			scoreRepository.save(score1);
			scoreRepository.save(score2);
               scoreRepository.save(score3);
              scoreRepository.save(score4);

			};
		}

	}

@Configuration
class WebSecurityConfiguration extends GlobalAuthenticationConfigurerAdapter {

	@Autowired
	PlayerRepository playerRepository;

	@Override
	public void init(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(inputName -> {
			Player player = playerRepository.findByuserName(inputName);
			if (player != null) {
				return new User(player.getUserName(), player.getPassWord(),
						AuthorityUtils.createAuthorityList("USER"));
			} else {
				throw new UsernameNotFoundException("Unknown user: " + inputName);
			}
		});
	}
}

@Configuration
@EnableWebSecurity
class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()

				.antMatchers("/**").permitAll()
				.antMatchers("/api/logout").hasAuthority("USER")
				.antMatchers("/rest/**").denyAll()
				.and()
				.formLogin();

		http.formLogin()
				.usernameParameter("userName")
				.passwordParameter("passWord")
				.loginPage("/api/login");

		http.logout().logoutUrl("/api/logout");
		// turn off checking for CSRF tokens
		http.csrf().disable();

		// if user is not authenticated, just send an authentication failure response
		http.exceptionHandling().authenticationEntryPoint((req, res, exc) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED));

		// if login is successful, just clear the flags asking for authentication
		http.formLogin().successHandler((req, res, auth) -> clearAuthenticationAttributes(req));

		// if login fails, just send an authentication failure response
		http.formLogin().failureHandler((req, res, exc) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED));

		// if logout is successful, just send a success response
		http.logout().logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler());
	}

	private void clearAuthenticationAttributes(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
		}
	}
}
