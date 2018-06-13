import React, { Component } from 'react';
import data from "./data.json";
import "./App.css";

class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            currentUser:false,
            date:false,
            gamesToday:"",
        };
        if (!this.state.date){
            //Set DATE
            this.state.date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        }
    }

    setPlayer(name){
        this.setState({
            currentUser: name,
        });
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

    navigateToGames(){
        //Todo: Navigate to closest Game
        var FirstGame = new Date("2018-06-14").toJSON().slice(0,10).replace(/-/g,'-');
        this.setState({
            date: FirstGame,
        });
        this.updateGamesToday(FirstGame);
    }

    renderPlayer() {
        if (!this.state.currentUser){
            return (
                <div>
                    <div className="row">
                        <h1>Välj en spelare!</h1>
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
            gamesToday.sort((a,b) => a["Tid"] > b["Tid"]);
            return(
                <div>
                    {gamesToday.map(
                        function(value){
                            return createBox(value)
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
                    <nav className="navbar navbar-default">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand"  onClick={()=>this.setPlayer(false)}>VM2018 {this.state.currentUser ? '- '+this.state.currentUser : 'Översikt'}</a>
                            </div>
                            <div className="navbar-collapse collapse">
                                <ul className="nav navbar-nav">
                                    <li className={this.state.currentUser === 'Niklas' ? 'active': ''}><a className="clickableName" onClick={()=>this.setPlayer("Niklas")}>Niklas</a></li>
                                    <li className={this.state.currentUser === 'Patrik' ? 'active': ''}><a className="clickableName" onClick={()=>this.setPlayer("Patrik")}>Patrik</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="container">
                        {this.renderPlayer()}
                    </div>
                </div>
            );
        }
    }

    function createBox(props) {
        return (
            <div className="panel panel-primary" key={props.Hemma}>
                <div className="panel-heading">
                    <h3 className="panel-title">{props["Hemma"]} - {props["Borta"]}, {props["Tid"]}</h3>
                </div>
                <div className="panel-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">{props["Hemma"]}</th>
                                <th scope="col">{props["Borta"]}</th>
                                <th scope="col">1</th>
                                <th scope="col">X</th>
                                <th scope="col">2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span className="badge badge-secondary badge-pill">2</span></td>
                                <td><span className="badge badge-secondary badge-pill">2</span></td>
                                <td>2.23</td>
                                <td><span className="badge badge-warning">2.54</span></td>
                                <td>4.23</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    export default App;
