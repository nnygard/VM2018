import React, { Component } from 'react';

class Scoreboard extends Component {
    constructor(){
        super();
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

        // console.log(this.props.betting);

        var rounds = this.state.gamesPlayedLoaded.rounds;
        for (var day in rounds){
            var matches = rounds[day].matches;
            for (var game in matches){
                if (matches[game].score1!==null && matches[game].score2 !==null){
                    var resultGame = matches[game];
                    var gameindex = resultGame.num;
                    var betGame = this.props.betting[gameindex];
                    console.log(betGame);
                }
            }
        }
        // new Map(this.state.gamesPlayedLoaded)
        // var playedGamesResult = this.state.gamesPlayedLoaded.forEach(gamesBet => {
        //     if (gamesBet["Date"]=="2018-06-15"){
        //     return gamesBet;
        //     }

        // });

        // this.state.gamesPlayedLoaded.rounds.forEach(name){
        //     console.log(name)
        // }

        // console.log(rounds);

        return(
            <div>
            <p>StatsComponent</p>
            </div>
        );
    }
}

export default Scoreboard;
