import React, { Component } from 'react';
import "./App.css";
//Bör ändra rader 63, 67, 77, 174

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
            var currentRound = rounds[day].name;
            for (var game in matches){
                if (matches[game].score1!==null && matches[game].score2 !==null){
                    //Hitta rätt match i betGame
                    var resultGame = matches[game];
                    gamesPlayed.unshift(resultGame);
                    var gameindex = resultGame.num;
                    var betGame = this.props.betting[gameindex-1];
                    //Räkna ut resultat
                    var result = "x";
                    if (resultGame.score1 > resultGame.score2){
                        result = "1";
                    }
                    if (resultGame.score1 < resultGame.score2){
                        result = "2";
                    }
                    var score1 = resultGame.score1;
                    var score2 = resultGame.score2;
                    if (resultGame.score1et || resultGame.score2et){
                        result = "x";
                        score1 = resultGame.score1et;
                        score2 = resultGame.score2et;
                    }
                    for (var name in Scores){
                        var PlayerScoreThisRound = 0;
                        var player = Scores[name][0];
                        var player_Resultat = player +"_Resultat"
                        //Rätt Kryss Två

                        if (betGame[player] && betGame[player].toLowerCase()==result){
                            Scores[name][1] += 3;
                            PlayerScoreThisRound +=3;
                        }

                        if (score1 == score(betGame[player_Resultat], 0)){
                            if (score1>1){
                                Scores[name][1] += 3;
                                PlayerScoreThisRound+=3;
                            }
                            else {
                                Scores[name][1]+=2;
                                PlayerScoreThisRound+=2;
                            }
                        }
                        if (score2 == score(betGame[player_Resultat], 1)){
                            if (score2>1){
                                Scores[name][1] += 3;
                                PlayerScoreThisRound+=3;
                            }
                            else {
                                Scores[name][1]+=2;
                                PlayerScoreThisRound+=2;
                            }
                        }
                        // console.log(betGame);
                        var player_Home = player + "_Hemma";
                        var player_Gone = player + "_Borta";

                        if (betGame[player_Home] || betGame[player_Gone]){
                            if (betGame[player_Home].replace(/\s/g,'')===betGame["Hemma"].replace(/\s/g,'')){
                                //Om hemma rätt
                                Scores[name][1]+=pointsThisRound(currentRound);
                                PlayerScoreThisRound+=pointsThisRound(currentRound);
                            }
                            if (betGame[player_Gone].replace(/\s/g,'')===betGame["Borta"].replace(/\s/g,'')){
                                //Om hemma rätt
                                Scores[name][1]+=pointsThisRound(currentRound);
                                PlayerScoreThisRound+=pointsThisRound(currentRound);
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
                                                    return (<tr onClick={()=>this.props.setPlayer(value[0])} key={value}><td align="left">{value[0]}</td><td align="right">{value[1]}</td></tr>
                                                );
                                            }, this
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
                                                                <td align="center">{game.score1et ? game.score1et+ "("+game.score1+")" : game.score1} - {game.score1et ? game.score2et + "("+game.score2+")" : game.score2}</td>
                                                                <td align="center" className={setColor(game.Niklas)} onClick={()=>this.props.navigateToGames(game.date, "Niklas")}>{game.Niklas}</td>
                                                                <td align="center" className={setColor(game.Alex)} onClick={()=>this.props.navigateToGames(game.date, "Alex")}>{game.Alex}</td>
                                                                <td align="center" className={setColor(game.Douglas)} onClick={()=>this.props.navigateToGames(game.date, "Douglas")}>{game.Douglas}</td>
                                                                <td align="center" className={setColor(game.Patrik)} onClick={()=>this.props.navigateToGames(game.date, "Patrik")}>{game.Patrik}</td>
                                                                <td align="center" className={setColor(game.Jenny)} onClick={()=>this.props.navigateToGames(game.date, "Jenny")}>{game.Jenny}</td>
                                                                <td align="center" className={setColor(game.Petra)} onClick={()=>this.props.navigateToGames(game.date, "Petra")}>{game.Petra}</td>
                                                                <td align="center" className={setColor(game.Philip)} onClick={()=>this.props.navigateToGames(game.date, "Philip")}>{game.Philip}</td>
                                                            </tr>
                                                        );
                                                    }, this
                                                    )}

                                            </tbody>
                                        </table>

                            </div>


                </div>
                );
            }
        }

        function score(resultat, index){
            if (resultat){
            return resultat.split("-")[index];
            }
            else return -1
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

        function pointsThisRound(currentRound){
            if (currentRound==="Round of 16"){
                return 2;
            }
            if (currentRound==="Quarter-finals"){
                return 4;
            }
            if (currentRound==="Semi-finals"){
                return 6;
            }
            if (currentRound==="Match for third place"){
                return 8;
            }
            if (currentRound==="Final"){
                return 10;
            }
        }

        export default Scoreboard;
