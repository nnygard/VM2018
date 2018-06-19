import React, { Component } from 'react';
import "./App.css";


class Scoreboard extends Component {
    constructor(props){
        super(props);
        this.state= {
            gamesPlayedLoaded:false,
        };

    }

    componentWillMount(){
        if (!this.state.gamesPlayedLoaded){
            fetch('https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json')
            .then(results =>{return results.json();})
            .then(data => {
                this.setState({
                    gamesPlayedLoaded: data,
                });
            })
        }
    }

    componentDidMount(){}

    render(){
        var Scores = [
            ["Niklas",0],
            ["Alex",0],
            ["Douglas",0],
            ["Patrik",0],
            ["Jenny",0],
            ["Petra",0],
            ["Philip",0],
        ];

        var gamesPlayed = [];
        var rounds = this.state.gamesPlayedLoaded.rounds;
        for (var day in rounds){
            var matches = rounds[day].matches;
            for (var game in matches){
                if (matches[game].score1!==null && matches[game].score2 !==null){
                    //Hitta rätt match i betGame
                    var resultGame = matches[game];
                    gamesPlayed.unshift(resultGame);
                    var gameindex = resultGame.num;
                    var betGame = this.props.betting[gameindex-1];
                    //Räkna ut resultat
                    var result = "x";
                    if (resultGame.goals1 > resultGame.goals2){
                        result = "1";
                    }
                    if (resultGame.goals1 < resultGame.goals2){
                        result = "2";
                    }
                    for (var name in Scores){
                        var PlayerScoreThisRound = 0;
                        var player = Scores[name][0];
                        var player_Resultat = player +"_Resultat"
                        //Rätt Kryss Två
                        if (betGame[player].toLowerCase()==result){
                            Scores[name][1] += 3;
                            PlayerScoreThisRound +=3;
                        }
                        if (resultGame.score1 == score(betGame[player_Resultat], 0)){
                            if (resultGame.score1>1){
                                Scores[name][1] += 3;
                                PlayerScoreThisRound+=3;
                            }
                            else {
                                Scores[name][1]+=2;
                                PlayerScoreThisRound+=2;
                            }
                        }
                        if (resultGame.score2 == score(betGame[player_Resultat], 1)){
                            if (resultGame.score2>1){
                                Scores[name][1] += 3;
                                PlayerScoreThisRound+=3;
                            }
                            else {
                                Scores[name][1]+=2;
                                PlayerScoreThisRound+=2;
                            }
                        }
                        gamesPlayed[0][Scores[name][0]] = PlayerScoreThisRound;
                    }
                }
            }
        }

        return(
            <div>
            <div className="paddy">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Poängställning</h3>
                        </div>
                        <div className="panel-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Deltagare</th>
                                        <th  className="text-right" scope="col">Poäng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {Scores.sort((a,b) => a[1] < b[1]).map(
                                                function(value){
                                                    return (<tr key={value}><td align="left">{value[0]}</td><td align="right">{value[1]}</td></tr>
                                                );
                                                }
                                            )}

                                    </tbody>
                                </table>
                        </div>
                        </div>
                    </div>

                    <div className="paddy">
                <h1>Matcher</h1>
                                    <table className="table tablefit">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="setwidth3 info text-center">Lag</th>
                                                <th scope="col" className="setwidth3 info text-center">Resultat</th>
                                                    <th scope="col" className="setwidth4 info text-center">NN</th>
                                                    <th scope="col" className="setwidth4 info text-center">AM</th>
                                                    <th scope="col" className="setwidth4 info text-center">DA</th>
                                                    <th scope="col" className="setwidth4 info text-center">PN</th>
                                                    <th scope="col" className="setwidth4 info text-center">JW</th>
                                                    <th scope="col" className="setwidth4 info text-center">PP</th>
                                                    <th scope="col" className="setwidth4 info text-center">PL</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                    {gamesPlayed.map(
                                                        function(game){
                                                            return (
                                                                <tr key={game.num}>
                                                                <td align="center">{game.team1.code} - {game.team2.code}</td>
                                                                <td align="center">{game.score1} - {game.score2}</td>
                                                                <td align="center" className={setColor(game.Niklas)}>{game.Niklas}</td>
                                                                <td align="center" className={setColor(game.Alex)}>{game.Alex}</td>
                                                                <td align="center" className={setColor(game.Douglas)}>{game.Douglas}</td>
                                                                <td align="center" className={setColor(game.Patrik)}>{game.Patrik}</td>
                                                                <td align="center" className={setColor(game.Jenny)}>{game.Jenny}</td>
                                                                <td align="center" className={setColor(game.Petra)}>{game.Petra}</td>
                                                                <td align="center" className={setColor(game.Philip)}>{game.Philip}</td>
                                                            </tr>
                                                        );
                                                        }
                                                    )}

                                            </tbody>
                                        </table>

                            </div>


                </div>
                );
            }
        }

        function score(resultat, index){
            return resultat.split("-")[index];
        }

        function setColor(points){
            if (points == 0){
            return "danger";
            }
            if (3<points && points<7){
                return "warning";
            }
            if (points>6){
                return "success";
            }
            else {
                return "active";
            }
        }


        export default Scoreboard;
