import React, { Component } from "react";
import logo from "../images/treble.png";
import SpellChecker from "./SpellChecker";
import gif from "../images/loading.gif";
import Classifier from "./Classifier";

class Contenedor extends Component {
  constructor(props) {
    super(props);
    this.state = { historial: [] };
    this.traerInfo = this.traerInfo.bind(this);
  }


  traerInfo = () => {
    this.setState({ loading: true }, () => {
      var url = "http://localhost:3000/dev/historial";

      fetch(url, {
        method: "GET",
      })
        .then((res) => {
          if (res.status === 200) {
            
            var js = res.json();
            
            js.then((rta) => {
              var arr = [];
              if(!(rta["history"])){
                Object.keys(rta).forEach(function (key) {
                  arr.push(rta[key]);
                });
              }
             

              this.setState({ historial: arr, loading: false });
            
            });
          } else {
            alert("Error al hacer spell check");
          }
        })
        .catch((error) => console.error("Error:", error))
        .then((response) => console.log("Success:", response));
    });
  };

  componentDidMount() {
    this.traerInfo();
  }
  render() {
    let hist;
    if (this.state.historial) {
      hist = (
        <div style={{ marginLeft: "40px" }}  className="collapse" id="drophistorial">
          <div className="row">
            <div className="col-6" style={{borderLeft: "4px black solid"}}>
              <h4>Text</h4>
              <ul> {this.state.historial.map((registro, i) => (
                <li key={i}>{registro[0]}</li>
              ))}</ul>
             
            </div>
            <div className="col-6" style={{borderLeft: "4px black solid"}}>
              <h4>Checked</h4>
              <ul> {this.state.historial.map((registro) => (
                <li>{registro[1]}</li>
              ))}</ul>

            </div>
          </div>
        </div>
      );
    } else {
      hist = "";
    }

    return (
      <div>
        <div id="header" className="row">
          <div id="divlogo" className="col-2">
            <img src={logo} alt="Logo" id="logo" />
          </div>
          <div className="col-10">
            <h4 id="titulo">Treble.ai Test</h4>
          </div>
        </div>

        <div className="titulo">
          <h1>
            <a style={{ color: "#9b9bff" }}> Spell</a> Checker
          </h1>
        </div>
        <SpellChecker callback={this.traerInfo} ></SpellChecker>
        <div className="titulo row" style={{marginTop: "40px" }}>
          <h1 >History</h1> <i id="flecha"className="fa fa-angle-down" style={{fontSize:"6rem", color:"#9b9bff"}} aria-hidden="true" data-toggle="collapse" href="#drophistorial" aria-controls="collapseExample"></i>
        </div>
        {this.state.loading ? (
          <img
            style={{ height: "150px", marginLeft: "20px" }}
            src={gif}
            alt="loading..."
          />
        ) : (
          ""
        )}
        {this.state.historial ? hist : ""}
        <h1 style={{  marginLeft: "20px" , marginTop: "40px" }}>
            Classifier
          </h1>
        <Classifier></Classifier>
      </div>
    );
  }
}

export default Contenedor;
