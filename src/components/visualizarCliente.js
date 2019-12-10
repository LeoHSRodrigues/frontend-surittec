import React from "react";
import { authenticationService } from "../_services/authenticationService";
import {
  getCEP,
  salvarCliente,
  getById,
  atualizarCliente
} from "../_services/getters";
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
import AddIcon from "@material-ui/icons/Add";

class visualizarCliente extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsEmail: [],
      itemsTelefone: [],
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
      // cadastro: true
    };
    this.state.cadastro = this.verificaEditar();
  }

  componentDidMount() {
    // let logado = localStorage.getItem('currentUser');
    // if (logado){
    //     window.location.href = '/home';
    // }
  }

  verificaEditar() {
    if (this.props.match.params.id) {
      getById(this.props.match.params.id)
        .then(response => {
          this.setState({ nome: response.nome });
          const cpfFinal = response.cpf
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
          this.setState({ cpf: cpfFinal });
          const cepFinal =
            response.cep.substring(0, 5) + "-" + response.cep.substring(5);
          this.setState({ cep: cepFinal });
          this.setState({ logradouro: response.logradouro });
          if (response.complemento !== null) {
            this.setState({ complemento: response.complemento });
          }
          this.setState({ complemento: "" });
          this.setState({ bairro: response.bairro });
          this.setState({ cidade: response.cidade });
          this.setState({ uf: response.uf });
          const finalArray = response.email.map(function(obj) {
            return obj.email;
          });
          const finalArrayTelefone = response.telefone.map(function(obj) {
            let nTelefone = obj.telefone
              .replace(/\D/g, "")
              .replace(/^(\d{2})(\d)/g, "($1) $2")
              .replace(/(\d)(\d{4})$/, "$1-$2")
              .replace(/(\d)(\d{4})$/, "$1");
            return nTelefone + " - " + obj.tipotelefone;
          });
          this.setState({
            itemsTelefone: [...this.state.itemsTelefone, ...finalArrayTelefone]
          });
          this.setState({
            itemsEmail: [...this.state.itemsEmail, ...finalArray]
          });
        })
        .catch(error => {
            window.location.href = "/home";
          console.log(error);
        });
      return true;
    }
    return false;
  }

  handleCEPChange = e => {
    this.setState({ cep: e.target.value });
    let cep = e.target.value;
    if (cep.length === 8) {
      getCEP(cep)
        .then(response => {
          if (response.erro) {
            const cepFinal = cep.substring(0, 5) + "-" + cep.substring(5);
            console.log(cep);
            this.setState({ cepNotFound: true });
            this.setState({ cep: cepFinal });
            return;
          }
          this.setState({ cep: response.cep });
          this.setState({ logradouro: response.logradouro });
          this.setState({ complemento: response.complemento });
          this.setState({ bairro: response.bairro });
          this.setState({ cidade: response.localidade });
          this.setState({ uf: response.uf });
          this.setState({ cepNotFound: false });
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
    const cpfFinal = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
    this.setState({ cpf: cpfFinal });
  };
  handleTelefoneChange = e => {
    const telefoneFinal = e.target.value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2")
      .replace(/(\d)(\d{4})$/, "$1");
    this.setState({
      telefone: telefoneFinal
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
  adicionarTelefone = e => {
    if (this.state.telefone.length >= 14 && this.state.tipoTelefone !== "") {
      if (this.state.tipoTelefone === 0) {
        const telefone = this.state.telefone + " - Residencial";
        this.setState({
          itemsTelefone: [...this.state.itemsTelefone, telefone],
          telefone: "",
          tipoTelefone: ""
        });
      } else if (this.state.tipoTelefone === 1) {
        const telefone = this.state.telefone + " - Comercial";
        this.setState({
          itemsTelefone: [...this.state.itemsTelefone, telefone],
          telefone: ""
        });
      } else {
        const telefone = this.state.telefone + " - Celular";
        this.setState({
          itemsTelefone: [...this.state.itemsTelefone, telefone],
          telefone: ""
        });
      }
    }
  };

  handleKeyDown = evt => {
    if (["Enter", "Tab", ",", " "].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.email.trim();

      if (value && this.isValid(value)) {
        this.setState({
          itemsEmail: [...this.state.itemsEmail, this.state.email],
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

  handleDeleteEmail = item => {
    this.setState({
      itemsEmail: this.state.itemsEmail.filter(i => i !== item)
    });
  };

  handleDeleteTelefone = item => {
    this.setState({
      itemsTelefone: this.state.itemsTelefone.filter(i => i !== item)
    });
  };

  handlePaste = evt => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    // eslint-disable-next-line no-useless-escape
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter(email => !this.isInList(email));

      this.setState({
        items: [...this.state.itemsEmail, ...toBeAdded]
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
    return this.state.itemsEmail.includes(email);
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
    const cepNotFound = this.state.cepNotFound;
    const cadastro = this.state.cadastro;
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
                Visualizar Cliente
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
                  disabled
                  id="outlined-basic"
                  autoComplete="off"
                  inputProps={{ maxLength: 100, minLength: 3 }}
                  name="Nome"
                  value={this.state.nome}
                  onChange={this.handleNomeChange}
                  label="Nome"
                  variant="outlined"
                />
              </div>
              <div style={style.item}>
                <TextField
                  disabled
                  id="outlined-basic"
                  autoComplete="off"
                  inputProps={{ maxLength: 14, minLength: 14 }}
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
                disabled
                id="outlined-basic"
                autoComplete="off"
                name="CEP"
                inputProps={{ maxLength: 9 }}
                value={this.state.cep}
                onChange={this.handleCEPChange}
                label="CEP"
                variant="outlined"
              />
            </div>
            {cepNotFound ? (
              <div>CEP não encontrado preencha os campos manualmente</div>
            ) : null}
            <div style={style.containerFila}>
              <div style={style.item}>
                <TextField
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
                  inputProps={{ maxLength: 15 }}
                  autoComplete="off"
                  label="Telefone"
                  value={this.state.telefone}
                  onChange={this.handleTelefoneChange}
                  variant="outlined"
                />
              </div>
              <div style={style.item}>
                <FormControl
                  style={style.itemSelect}
                  disabled
                  variant="outlined"
                >
                  <InputLabel id="demo-simple-select-label">
                    Tipo de Telefone
                  </InputLabel>
                  <Select
                    value={this.state.tipoTelefone}
                    onChange={this.handleTelefoneChangeFinal}
                    id="demo-simple-select-outlined"
                  >
                    <MenuItem value={0}>Residencial</MenuItem>
                    <MenuItem value={1}>Comercial</MenuItem>
                    <MenuItem value={2}>Celular</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div style={style.containerFila}>
              {this.state.itemsTelefone.map(itemTelefone => (
                <div style={style.itemEmail} key={itemTelefone}>
                  {itemTelefone}
                </div>
              ))}
            </div>
          </div>
          <div style={style.containerFila}>
            {this.state.itemsEmail.map(item => (
              <div style={style.itemEmail} key={item}>
                {item}
              </div>
            ))}
          </div>
          <div style={style.containerColunaPrimeiro}>
            <div style={style.containerFila}>
              <div style={style.item}>
                <TextField
                  disabled
                  id="outlined-basic"
                  name="Email"
                  autoComplete="off"
                  label="Email"
                  onKeyDown={this.handleKeyDown}
                  onPaste={this.handlePaste}
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  variant="outlined"
                />
                {this.state.error && (
                  <p style={style.error}>{this.state.error}</p>
                )}
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
    width: "100%"
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
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    font: "inherit",
    fontWeight: "bold",
    lineHeight: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  itemSelect: {
    width: "250px"
  }
};
export default visualizarCliente;
