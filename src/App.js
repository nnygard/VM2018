import React, { Component } from 'react';
import data from "./data.json";
import "./App.css";
import installPromt from "./installPromt.png";
import Scoreboard from "./Scoreboard.js";

class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            currentUser:false,
            date:false,
            gamesToday:"",
            menu:false,
            prompted:true, //set to false if you want to promt user
        };
        if (!this.state.date){
            //Set DATE
            this.state.date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        }

    }

    setPlayer(name){
        this.setState({
            currentUser: name,
            menu: false,
        });
        this.updateGamesToday(this.state.date);
        this.promtUser();
    }

    addDate(add){
        var nextDate = new Date(this.state.date);
        nextDate.setDate(nextDate.getDate()+add);
        this.setState({
            date: nextDate.toJSON().slice(0,10).replace(/-/g,'-'),
        });
        this.updateGamesToday(nextDate.toJSON().slice(0,10).replace(/-/g,'-'));
    }

    updateGamesToday(date){
        this.setState({
            gamesToday: data.filter(
                function(data) {
                    return data.Datum == date;
                }
            ),
        });
    }

    MenuActive(){
        this.setState({
            menu: true,
        });
    }

    navigateToGames(){
        //Todo: Navigate to closest Game
        var FirstGame = new Date("2018-06-14").toJSON().slice(0,10).replace(/-/g,'-');
        this.setState({
            date: FirstGame,
        });
        this.updateGamesToday(FirstGame);
    }

    promtUser(){
        if (!window.matchMedia("(display-mode:standalone)").matches && this.state.prompted==false) {
            this.setState({
                prompted:true,
            });
        }
    }

    renderPlayer() {
        // console.log(this.state);
        if (!this.state.currentUser){
            return (
                <div>
                    <div className="row">
                        <h1>Översikt</h1>
                        { !this.state.prompted && !window.matchMedia("(display-mode:standalone)").matches  ? (
                            <div className="over">
                            <img src={installPromt} alt="Installera" align=""/>
                            </div>
                        ) : <div>
                        <Scoreboard
                        betting={data}
                        />
                        </div>

                         }
                    </div>
                </div>
            );
        } else {
            //If Games this date then one functions
            //Else another function
            //add throttle to buttons?
            return (
                <div>
                    <div className="row">
                        <span className="glyphicon glyphicon-chevron-up" aria-hidden="true" onClick={()=>this.addDate(-1)}></span>
                    </div>
                    <div className="row">
                        <h2>{this.state.date}</h2>
                    </div>
                    {this.renderMatchesToday()}
                    <div className="row">
                        <span className="glyphicon glyphicon-chevron-down" aria-hidden="true" onClick={()=>this.addDate(1)}></span>
                    </div>
                </div>
            );
        }

    }

    renderMatchesToday(){
        if (this.state.gamesToday!=""){
            var gamesToday = this.state.gamesToday;
            var player = this.state.currentUser;
            gamesToday.sort((a,b) => a["Tid"] > b["Tid"]);
            return(
                <div>
                    {gamesToday.map(
                        function(value){
                            return createBox(value, player)
                        }
                    )}
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="alert alert-danger" role="alert">
                        <strong>Oh snap!</strong> Inga matcher idag.
                        </div>
                        <div className="row">
                            <p><button type="button" className="btn btn-lg btn-success" onClick={()=>this.navigateToGames()}>Gå till första matchen</button></p>
                        </div>
                    </div>
                );
            }
        }

        render() {
            return (
                <div>

                    <nav className="navbar navbar-default navbar-fixed-top">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" onClick={()=>this.MenuActive()}>
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand"  onClick={()=>this.setPlayer(false)}>VM2018 {this.state.currentUser ? '- '+this.state.currentUser : 'Översikt'}</a>
                            </div>
                            <div className="navbar-collapse collapse">
                                <ul className="nav navbar-nav">
                                    <li className={this.state.currentUser === 'Niklas' ? 'active': ''}><a className="clickableName" data-toggle={dataToggleCollapsed(this.state.menu)} data-target={navbarCollapsed(this.state.menu)} onClick={()=>this.setPlayer("Niklas")}>Niklas</a></li>
                                    <li className={this.state.currentUser === 'Alex' ? 'active': ''}><a className="clickableName" data-toggle={dataToggleCollapsed(this.state.menu)} data-target={navbarCollapsed(this.state.menu)} onClick={()=>this.setPlayer("Alex")}>Alex</a></li>
                                    <li className={this.state.currentUser === 'Douglas' ? 'active': ''}><a className="clickableName" data-toggle={dataToggleCollapsed(this.state.menu)} data-target={navbarCollapsed(this.state.menu)} onClick={()=>this.setPlayer("Douglas")}>Douglas</a></li>
                                    <li className={this.state.currentUser === 'Patrik' ? 'active': ''}><a className="clickableName" data-toggle={dataToggleCollapsed(this.state.menu)} data-target={navbarCollapsed(this.state.menu)} onClick={()=>this.setPlayer("Patrik")}>Patrik</a></li>
                                    <li className={this.state.currentUser === 'Jenny' ? 'active': ''}><a className="clickableName" data-toggle={dataToggleCollapsed(this.state.menu)} data-target={navbarCollapsed(this.state.menu)} onClick={()=>this.setPlayer("Jenny")}>Jenny</a></li>
                                    <li className={this.state.currentUser === 'Petra' ? 'active': ''}><a className="clickableName" data-toggle={dataToggleCollapsed(this.state.menu)} data-target={navbarCollapsed(this.state.menu)} onClick={()=>this.setPlayer("Petra")}>Petra</a></li>
                                    <li className={this.state.currentUser === 'Philip' ? 'active': ''}><a className="clickableName" data-toggle={dataToggleCollapsed(this.state.menu)} data-target={navbarCollapsed(this.state.menu)} onClick={()=>this.setPlayer("Philip")}>Philip</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="container contentBody">
                        {this.renderPlayer()}
                    </div>
                </div>
            );
        }
    }

    function createBox(props, player) {
        var playerScore = player + "_Resultat"
        return (
            <div className="panel panel-primary" key={props.Hemma}>
                <div className="panel-heading">
                    <h3 className="panel-title">{props["Hemma"]} - {props["Borta"]}, {props["Tid"]}</h3>
                </div>
                <div className="panel-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" className="setwidth1">{props["Hemma"]}</th>
                                <th scope="col" className="setwidth1">{props["Borta"]}</th>
                                <th scope="col" className="setwidth2">1</th>
                                <th scope="col" className="setwidth2">X</th>
                                <th scope="col" className="setwidth2">2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span className="badge badge-secondary badge-pill">{score(props[playerScore], 0)}</span></td>
                                <td><span className="badge badge-secondary badge-pill">{score(props[playerScore], 1)}</span></td>
                                <td><span className={isBet(props[player],"1")}>{odds(props[1], props[1], props["X"], props[2])}</span></td>
                                <td><span className={isBet(props[player],"x")}>{odds(props["X"], props[1], props["X"], props[2])}</span></td>
                                <td><span className={isBet(props[player],"2")}>{odds(props[2], props[1], props["X"], props[2])}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    function score(resultat, index){
        return resultat.split("-")[index];
    }

    //Kanske Fixa PCTTAL?
    function odds(input, ett, kryss, tva){
        // var sumOdds = Math.round(Number(ett) + Number(kryss) + Number(tva));
        // var returnValue = (1 - input/sumOdds);
        // var increaseFactor = 100/sumOdds;
        // return input+ " / "+ sumOdds;
        return input;
    }

    function isBet(bet, ettkrysstva){
        if (bet.toLowerCase() == ettkrysstva){
                return "badge badge-warning"
        }
        else {return ""}
    }

    function dataToggleCollapsed(menu){
        if (menu){
        return "collapse";
        }
        else {
            return "";
        }
    }

    function navbarCollapsed(menu){
        if (menu){
        return ".navbar-collapse";
        }
        else {
            return "";
        }
    }

    export default App;
