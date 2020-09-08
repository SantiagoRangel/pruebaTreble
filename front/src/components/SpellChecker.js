import React, { Component } from "react";
import gif from '../images/loading.gif';

class SpellChecker extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: "",
                    loading: false};
    this.check = this.check.bind(this);
  }

  preCheck = (e)=>{
    if(document.getElementById("spelltext").value != ""){
      this.check();
    }
  }
  check = (e) => {
    this.setState({ loading: true }, () => {
      let text = document.getElementById("spelltext").value;
      var url = "http://localhost:3000/dev/spellcheck";
      let b = { text: text };
      
      fetch(url, {
        method: "POST", 
        body: JSON.stringify(b),
      })
        .then((res) => {
          //console.log(res);
          if (res.status === 200) {
         
            var js = res.json();
            js.then((rta) => {
              this.setState({ checked: rta , loading: false});
              //console.log(rta);
            });
            this.props.callback();
          } else {
            alert("Error al hacer spell check");
          }
        })
        .catch((error) => console.error("Error:", error))
        .then((response) => console.log("Success:", response));
    });
    
  };
  render() {
      let checked;
      let loading;
      if(this.state.checked && !this.state.loading){
        checked = (
            <div className="row" style={{ marginLeft: "25px" }}>
            <div id="cajatexto">
              <a style={{fontWeight: "bold"}}>
                {this.state.checked.text}
              </a>
            </div>
            <div id="check">
              <i className="fa fa-check" aria-hidden="true"></i>
            </div>
          </div>
        );
      }
      else{
          checked = "";
      }
      if(this.state.loading){
        loading =  <img style={{height: "150px", marginLeft: "20px"}} src={gif} alt="loading..." />;
      }
      else{
        loading = "";
      }

    return (
      <div>
        <div style={{ marginLeft: "25px" , marginTop:"15px"}} className="row">
          <input type="text" placeholder="text" id="spelltext"></input>
          <button style={{ marginLeft: "10px" }} onClick={this.preCheck}>
            Check
          </button>
         {loading}
        </div>
        {checked}
      </div>
    );
  }
}

export default SpellChecker;
