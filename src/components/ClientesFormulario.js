import React from "react";
import { authenticationService } from "../_services/authenticationService";
import { getCEP, salvarCliente} from "../_services/getters";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

class ClienteFormulario extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    salvarCliente(this.state).then(
      user => {
        console.log(user);
      },
      error => {
        console.log(error);
      }
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      cpf: "",
      email: [{ email: "" }],
      telefone: [{ telefone: "", tipoTelefone: "CELULAR" }],
      cep: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      uf: "",
      complemento: "",
      cepNotFound: false
    };
  }

  componentDidMount() {
    // let logado = localStorage.getItem('currentUser');
    // if (logado){
    //     window.location.href = '/home';
    // }
  }

  handleCEPChange = e => {
    this.setState({ cep: e.target.value });
    if (e.target.value.length === 8) {
      getCEP(e.target.value)
        .then(response => {
          if (response.erro) {
            return;
          }
          this.setState({ cep: response.cep });
          this.setState({ logradouro: response.logradouro });
          this.setState({ complemento: response.complemento });
          this.setState({ bairro: response.bairro });
          this.setState({ cidade: response.localidade });
          this.setState({ uf: response.uf });
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  handleLogradouroChange = e => {
    this.setState({ logradouro: e.target.value });
  };
  handleCidadeChange = e => {
    this.setState({ cidade: e.target.value });
  };
  handleBairroChange = e => {
    this.setState({ bairro: e.target.value });
  };
  handleUFChange = e => {
    this.setState({ uf: e.target.value });
  };
  handleComplementoChange = e => {
    this.setState({ complemento: e.target.value });
  };
  handleCPFChange = e => {
    this.setState({ cpf: e.target.value });
  };
  handleTelefoneChange = e => {
    this.setState({telefone: [{ telefone: e.target.value, tipoTelefone: "CELULAR" }]});
  };
  handleEmailChange = e => {
    this.setState({email: [{ email: e.target.value}]});
  };
  handleNomeChange = e => {
    if (/^[a-zA-Z0-9 ]*$/.test(e.target.value)) {
      this.setState({ nome: e.target.value });
    } else {
      return;
    }
  };

  verificaCEP(e) {
    // console.log(e);
  }

  render() {
    return (
      <form autoComplete="new-password" onSubmit={this.handleSubmit}>
        <h1>Novo Cliente</h1>
        <div>
          <TextField
            id="outlined-basic"
            autoComplete="off"
            maxLength="100"
            name="Nome"
            value={this.state.nome}
            onChange={this.handleNomeChange}
            label="Nome"
            variant="outlined"
          />
        </div>
        <div>
        <TextField
            id="outlined-basic"
            autoComplete="off"
            maxLength="11"
            name="CPF"
            value={this.state.cpf}
            onChange={this.handleCPFChange}
            label="CPF"
            variant="outlined"
          />
        </div>
        <div>
        <TextField
            id="outlined-basic"
            autoComplete="off"
            name="CEP"
            minLength="9"
            maxLength="9"
            value={this.state.cep}
            onChange={this.handleCEPChange}
            label="CEP"
            variant="outlined"
          />
        </div>
        <div>
        <TextField
            id="outlined-basic"
            name="Logradouro"
            autoComplete="off"
            onChange={this.handleLogradouroChange}
            value={this.state.logradouro}
            label="Logradouro"
            variant="outlined"
          />
        </div>
        <div>
        <TextField
            id="outlined-basic"
            name="Bairro"
            autoComplete="off"
            value={this.state.bairro}
            onChange={this.handleBairroChange}
            label="Bairro"
            variant="outlined"
          />
        </div>
        <div>
        <TextField
            id="outlined-basic"
            name="Cidade"
            autoComplete="off"
            value={this.state.cidade}
            onChange={this.handleCidadeChange}
            label="Cidade"
            variant="outlined"
          />
        </div>
        <div>
        <TextField
            id="outlined-basic"
            name="UF"
            autoComplete="off"
            value={this.state.uf}
            onChange={this.handleUFChange}
            label="UF"
            variant="outlined"
          />
        </div>
        <div>
        <TextField
            id="outlined-basic"
            name="Complemento"
            autoComplete="off"
            value={this.state.complemento}
            onChange={this.handleComplementoChange}
            label="Complemento"
            variant="outlined"
          />
        </div>
        <div>
        <TextField
            id="outlined-basic"
            name="Telefone"
            autoComplete="off"
            label="Telefone"
            value={this.state.telefone.telefone}
            onChange={this.handleTelefoneChange}
            variant="outlined"
          />
        </div>
        <div>
        <TextField
            id="outlined-basic"
            name="Telefone"
            autoComplete="off"
            label="Email"
            value={this.state.email.email}
            onChange={this.handleEmailChange}
            variant="outlined"
          />
        </div>
        <Button variant="contained" color="primary" type="submit">Cadastrar</Button>
      </form>
    );
  }
}

export default ClienteFormulario;
