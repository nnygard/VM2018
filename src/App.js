import React, { Component } from 'react';
import data from "./data.json";
import "./App.css";

class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            currentUser:false,
        };
    }

    setPlayer(name){
        this.setState({
            currentUser: name,
        });
    }

    renderPlayer() {
        if (!this.state.currentUser){
            return (
                <div>
                    <h1>Välj En Spelare</h1>
                </div>
            );
        }

        else {
            return (
                <div>
                    <h1>{this.state.currentUser}</h1>
                    <p>Inga Matcher idag...</p>
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">Tyskland - Sverige, Kl 14:00</h3>
                        </div>
                        <div class="panel-body">
                            1, 2,1 Odds...
                        </div>
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
                            <a className="navbar-brand"  onClick={()=>this.setPlayer(false)}>VM2018</a>
                        </div>
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li><a className="clickableName" onClick={()=>this.setPlayer("Niklas")}>Niklas</a></li>
                                <li><a className="clickableName" onClick={()=>this.setPlayer("Patrik")}>Patrik</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div class="container">

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
