import React from "react";
import { authenticationService } from "../_services/authenticationService";
import { getAll,apagarById } from "../_services/getters";
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
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
      Modal: false
    };
    authenticationService.tokenValido();
    const admin = authenticationService.verificaAdmin();
    this.state.admin = admin;
    this.todosClientes();
  }

  componentDidMount() {}

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

  detalhes = e => {
    window.location.href = "/cliente/visualizar/"+e;
    console.log(e);
  };

  editar = e => {
    window.location.href = "/Cliente/"+e;
  };

  excluir = e => {
    apagarById(e).then(res => window.location.href = "/home");
  };

  render() {
    const rows = this.state.clientes;
    const admin = this.state.admin;
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
            <TableRow hover>
              <TableCell>Nome</TableCell>
              <TableCell align="center">CPF</TableCell>
              <TableCell style={{ marginRight: "15px" }} align="right">
                Ações
              </TableCell>
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
                <TableCell align="right" component="th" scope="row">
                  <IconButton
                    onClick={event => this.detalhes(row.id)}
                    style={style.appbarIcone}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    title="Visualizar"
                  >
                    <SearchIcon />
                  </IconButton>
                  {admin ? (
                    <IconButton
                      onClick={event => this.editar(row.id)}
                      style={style.appbarIcone}
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      title="Editar"
                    >
                      <EditIcon />
                    </IconButton>
                  ) : null}
                  {admin ? (
                    <IconButton
                      onClick={event => this.excluir(row.id)}
                      style={style.appbarIcone}
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      title="Apagar"
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {admin ? (
          <Fab
            style={style.fab}
            onClick={this.novoCliente}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        ) : null}
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
