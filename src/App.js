import React, { Component } from 'react';
import data from "./data.json";
import "./App.css";

class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            currentUser:false,
            date:false,
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
    }

    navigateToGames(){
        //Todo: Navigate to closest Game
        var FirstGame = new Date("2018-06-14").toJSON().slice(0,10).replace(/-/g,'-');
        this.setState({
            date: FirstGame,
        });
    }

    renderPlayer() {
        if (!this.state.currentUser){
            return (
                <div>
                <h1>Välj En Spelare</h1>
                <p>{this.state.date}</p>
                </div>
            );
        } else {
            //If Games this date then one functions
            //Else another function
            return (
                <div>

                <div className="row">
                    <span className="glyphicon glyphicon-chevron-up" aria-hidden="true" onClick={()=>this.addDate(-1)}></span>
                </div>

                <div className="row">
                    <h2>{this.state.date}</h2>
                </div>

                {this.renderMatchesToday(this.state.date)}

                <div className="row">
                    <span className="glyphicon glyphicon-chevron-down" aria-hidden="true" onClick={()=>this.addDate(1)}></span>
                </div>

                </div>
            );
        }

    }

    renderMatchesToday(today){
        var matchesFound = data.filter(
            function(data) {
                return data.Datum == today;
            }
        );

        if (matchesFound!=""){
            console.log(matchesFound);
            return(

                <div className="panel panel-primary">
                <div className="panel-heading">
                <h3 className="panel-title">Tyskland - Sverige, Kl 14:00</h3>
                </div>
                <div className="panel-body">
                <p>2 - 1        1       67%</p>
                </div>
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

//Översiktsmeny?
//Ställer Sig op rätt datum
//!Datum missmatch "Inga matcher idag men man kan hoppa sig fram"

//Fixa "Active user med clicky"

export default App;
