import React, { Component } from "react";
import gif from "../images/loading.gif";

class Classifier extends Component {
  constructor(props) {
    super(props);
    this.state = { opciones: ["1"], num: 1 , loading: false, opcion: ""};
  }
  sumarOpcion = () => {
    let num = this.state.num;
    let opciones = this.state.opciones;
    opciones.push((num + 1).toString());
    this.setState({ num: num + 1, opciones: opciones });
  };
  restarOpcion = () => {
    let num = this.state.num;
    if (num > 0) {
      let opciones = this.state.opciones;
      opciones.pop();
      this.setState({ num: num - 1, opciones: opciones });
    }
  };
  marcar=(opcion)=>{
    if(this.state.opcion == ""){
        return {border: "black solid 2px"}
    }
    else if(opcion == this.state.opcion){
        return {border: "lightgreen solid 4px"}
    }
    else{
        return {border: "red solid 2px"}
    }
  }
  classify = (e) => {
    this.setState({ loading: true }, () => {
      let text = document.getElementById("textclassify").value;
      let opciones = []
      this.state.opciones.forEach(opcion => {
          var op = document.getElementById("opcion"+opcion).value;
          opciones.push(op);
      });
      var url = "http://localhost:3000/dev/classifier";
      let b = { text: text ,opciones: opciones};
      
      fetch(url, {
        method: "POST", 
        body: JSON.stringify(b),
      })
        .then((res) => {
          if (res.status === 200) {
            
            var js = res.json();
            js.then((rta) => {
              this.setState({ opcion: rta['opcion'] , loading: false});
            });
           
          } else {
            alert("Error al hacer spell check");
          }
        })
        .catch((error) => console.error("Error:", error))
        .then((response) => console.log("Success:", response));
    });
    
  };
  render() {
    return (
      <div>
        <div className="row" style={{ marginLeft: "10px" }}>
          <div className="col-6">
            <div className="row" style={{ marginLeft: "0px" }}>
              <h4 style={{ color: "#9b9bff" }}>Options</h4>
              <i
                className="fa fa-plus-circle"
                aria-hidden="true"
                onClick={this.sumarOpcion}
              ></i>
              <i
                className="fa fa-minus-circle"
                aria-hidden="true"
                onClick={this.restarOpcion}
              ></i>
            </div>

            {this.state.opciones.map((opcion, i) => (
              <input
                className="opciones"
                type="text"
                id={"opcion" + opcion}
                placeholder={opcion}
                style={this.marcar(opcion)}
                key={i}
              ></input>
            ))}
          </div>
          <div className="col-6">
          <h4 style={{ color: "#9b9bff", marginLeft: "-15px" }}> Text</h4>
            <div className="row">
              
              <input className="opciones" id="textclassify" type="text" style={{width: "70%"}}></input>
              <button style={{ marginLeft: "10px" , marginTop: "10px"}} onClick={this.classify}>Classify</button>
            </div>
          </div>
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
      </div>
    );
  }
}

export default Classifier;
