import React from "react";
import { authenticationService } from "../_services/authenticationService";
import { getCEP, salvarCliente } from "../_services/getters";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

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
      items: [],
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
      tipoTelefone: "",
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
    } else if (e.target.value.length > 9) {
      return;
    }
  };
  voltar = e => {
    window.location.href = "/home";
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
      const cpfFinal = e.target.value.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2') 
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
      this.setState({ cpf: cpfFinal });
  };
  handleTelefoneChange = e => {
    this.setState({
      telefone: e.target.value
    });
  };
  handleTelefoneChangeFinal = e => {
    this.setState({
      tipoTelefone: e.target.value
    });
  };
  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };
  handleNomeChange = e => {
    if (/^[a-zA-Z0-9 ]*$/.test(e.target.value)) {
      this.setState({ nome: e.target.value });
    } else {
      return;
    }
  };

  handleKeyDown = evt => {
    if (["Enter", "Tab", ",", " "].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.email.trim();

      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.email],
          email: ""
        });
      }
    }
  };

  handleChange = evt => {
    this.setState({
      value: evt.target.value,
      error: null
    });
  };

  handleDelete = item => {
    this.setState({
      items: this.state.items.filter(i => i !== item)
    });
  };

  handlePaste = evt => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter(email => !this.isInList(email));

      this.setState({
        items: [...this.state.items, ...toBeAdded]
      });
    }
  };

  isValid(email) {
    let error = null;

    if (this.isInList(email)) {
      error = `${email} já foi adicionado.`;
    }

    if (!this.isEmail(email)) {
      error = `${email} não é um email válido.`;
    }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }

  isInList(email) {
    return this.state.items.includes(email);
  }

  isEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email
    );
  }

  verificaCEP(e) {
    // console.log(e);
  }

  render() {
    return (
      <Paper style={style.pagina}>
        <div style={style.appbar}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                onClick={this.voltar}
                edge="start"
                style={style.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" style={style.title}>
                Cadastrar Cliente
              </Typography>
              <IconButton
                onClick={this.logout}
                style={style.appbarIcone}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                title="Sair"
              >
                <ExitToAppIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <form autoComplete="new-password" onSubmit={this.handleSubmit}>
          <div style={style.containerColunaPrimeiro}>
            <div style={style.containerFila}>
              <div style={style.item}>
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
              <div style={style.item}>
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
            </div>
          </div>
          <div style={style.containerColuna}>
            <div style={style.item}>
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
            <div style={style.containerFila}>
              <div style={style.item}>
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
              <div style={style.item}>
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
              <div style={style.item}>
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
              <div style={style.item}>
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
              <div style={style.item}>
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
            </div>
          </div>
          <div style={style.containerColunaPrimeiro}>
            <div style={style.containerFila}>
              <div style={style.item}>
                <TextField
                  id="outlined-basic"
                  name="Telefone"
                  autoComplete="off"
                  label="Telefone"
                  value={this.state.telefone}
                  onChange={this.handleTelefoneChange}
                  variant="outlined"
                  helperText='Para adicionar telefones, preencha os campos Telefone e tipo de telefone'
                />
              </div>
              <div style={style.item}>
                <FormControl
                  style={style.itemSelect}
                  onChange={this.handleTelefoneChangeFinal}
                  variant="outlined"
                  value={this.state.tipoTelefone}
                >
                  <InputLabel id="demo-simple-select-label">
                    Tipo de Telefone
                  </InputLabel>
                  <Select
                    id="demo-simple-select-outlined"
                  >
                    <MenuItem value={0}>Residencial</MenuItem>
                    <MenuItem value={1}>Comercial</MenuItem>
                    <MenuItem value={2}>Celular</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div style={style.containerFila}>
            {this.state.items.map(item => (
              <div style={style.itemEmail} key={item}>
                {item}
                <button
                  type="button"
                  style={style.button}
                  onClick={() => this.handleDelete(item)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div style={style.containerColunaPrimeiro}>
            <div style={style.containerFila}>
              <div style={style.item}>
                <TextField
                  id="outlined-basic"
                  name="Email"
                  autoComplete="off"
                  label="Email"
                  onKeyDown={this.handleKeyDown}
                  onPaste={this.handlePaste}
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  variant="outlined"
                  helperText='Para adicionar emails, pressione a tecla (",", "tabulação", "enter" ou a tecla de espaço)'
                />
                {this.state.error && (
                  <p style={style.error}>{this.state.error}</p>
                )}
              </div>
            </div>
          </div>
          <div style={style.containerColunaPrimeiro}>
            <div style={style.containerFila}>
              <div style={style.item}>
                <Button variant="contained" color="primary" type="submit">
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Paper>
    );
  }
}
const style = {
  fab: {
    position: "absolute",
    right: "15px",
    bottom: "15px"
  },
  root: {
    flexGrow: "1"
  },
  menuButton: {
    marginRight: "0"
  },
  title: {
    flexGrow: "1",
    textAlign: "center"
  },
  containerFila: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  containerColunaPrimeiro: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  containerColuna: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  item: {
    flex: "1 1 auto",
    margin: "10px"
  },
  pagina: {
    height: "auto",
    position: "absolute",
    left: "0px",
    width: "100%",
    
  },
  itemEmail: {
    backgroundColor: "#d4d5d6",
    display: "inline-block",
    fontSize: "14px",
    borderRadius: "30px",
    height: "30px",
    padding: " 0 4px 0 1rem",
    display: "inline-flex",
    alignItems: "center",
    margin: "0 0.3rem 0.3rem 0"
  },
  error: {
    margin: "0",
    fontSize: "90%",
    color: "tomato"
  },
  button: {
    backgroundColor: "white",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    font: "inherit",
    marginLeft: "10px",
    fontWeight: "bold",
    padding: "0",
    lineHeight: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  itemSelect:{
    width:'250px'
  }
};
export default ClienteFormulario;
