import React, { Component } from 'react';

class ClienteFormularioEditar extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: 'Jordan Belfort'
    }
  }

  componentDidMount(){
    console.log('oi');
  }

  render() {
    return(
      <div>
      ClienteFormularioEditar
    </div>
    )
  }
}

export default ClienteFormularioEditar;