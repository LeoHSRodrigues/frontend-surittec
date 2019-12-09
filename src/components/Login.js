import React from "react";
import { authenticationService } from "../_services/authenticationService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      senha: "",
      showing: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const form = { login: this.state.login, senha: this.state.senha };
    authenticationService.login(form).then(
      user => {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(user.headers.authorization)
        );
        window.location.href = "/home";
      },
      error => {
        this.setState({ showing: true });
      }
    );
  };

  handleLoginChange = e => {
    this.setState({ login: e.target.value });
  };
  handleSenhaChange = e => {
    this.setState({ senha: e.target.value });
  };

  componentDidMount() {
    let logado = localStorage.getItem("currentUser");
    if (logado) {
      window.location.href = "/home";
    }
  }

  render() {
    const { showing } = this.state;
    return (
      <div style={style.pagina}>
        <div style={style.caixa}>
          <form autoComplete="new-password" onSubmit={this.handleSubmit}>
            <h1 style={style.nomeForm}>Login</h1>
            <div>
              <TextField
                required
                id="outlined-basic"
                autoComplete="off"
                maxLength="100"
                name="Nome"
                value={this.state.login}
                onChange={this.handleLoginChange}
                label="Nome"
                variant="outlined"
              />
            </div>
            <div style={style.senha} className="senha">
              <TextField
                required
                id="outlined-basic"
                autoComplete="off"
                type="password"
                name="senha"
                value={this.state.senha}
                onChange={this.handleSenhaChange}
                label="Senha"
                variant="outlined"
              />
            </div>
            <div style={style.botaoLogin}>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </div>
            {showing ? (
              <div style={style.msgErro}>Login ou senha incorreto!</div>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

const style = {
  pagina: {
    backgroundColor: "#0a002b",
    backgroundImage: 'url("/loginBackground.png")',
    backgroundRepeat: "repeat",
    height: "100%",
    position: "absolute",
    left: "0px",
    width: "100%",
    overflow: "hidden"
  },
  caixa: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10%",
    backgroundColor: "white",
    width: "300px",
    height: "400px",
    WebkitBoxShadow: "0 10px 10px -12px #777",
    MozBoxShadow: "0 10px 10px -12px #777",
    BoxShadow: "0 10px 10px -12px #777",
    textAlign: "center"
  },
  senha: {
    paddingTop: "20px"
  },
  botaoLogin: {
    paddingTop: "40px"
  },
  nomeForm: {
    paddingTop: "40px"
  },
  msgErro: {
    marginTop: "30px",
    width: "300px",
    height: "30px",
    BorderColor: "#dd6864",
    backgroundColor: "#e27c79",
    WebkitBoxShadow:
      "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    MozBoxShadow:
      "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    BoxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"
  }
};
export default Login;
