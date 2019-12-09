import React from "react";
import { authenticationService } from "../_services/authenticationService";
import { getAll } from "../_services/getters";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
      Modal: false
    };
    const usuario = authenticationService.tokenValido();
    if (!usuario) {
      window.location.href = "/login";
    }
    const admin = authenticationService.verificaAdmin();
    if (!admin) {
    }

    this.todosClientes = this.todosClientes.bind(this);
  }

  componentDidMount() {
    this.todosClientes();
  }

  createData(id, nomeCliente, cpf) {
    return { id, nomeCliente, cpf };
  }

  todosClientes = () => {
    getAll().then(res => this.setState({ clientes: res }));
  };

  novoCliente = e => {
    window.location.href = "/Cliente";
  };
  logout = e => {
    authenticationService.logout();
  };

  render() {
    const rows = this.state.clientes;

    return (
      <Paper>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={style.title}>
              Clientes
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
        <Table style={style.tabela} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">CPF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.nomeCliente}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.cpf}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Fab
          style={style.fab}
          onClick={this.novoCliente}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
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
  }
};

export default Home;
