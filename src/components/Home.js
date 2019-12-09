import React from "react";
import { authenticationService } from "../_services/authenticationService";
import { getAll } from "../_services/getters";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
      Modal: false
    };
    const usuario = authenticationService.tokenValido();
    if (!usuario) {
      // window.location.href = '/login';
    }
    const admin = authenticationService.verificaAdmin();
    if (!admin) {
    }
  }

  componentDidMount() {
    this.todosClientes();
  }

  createData(id, Nome, cpf) {
    return { id, Nome, cpf };
  }

  todosClientes = () => {
    const resultado = getAll().then(function(result) {
        // this.setState({ clientes: result });
         console.log(result);
      });
}

  novoCliente() {
    // console.log("oia");
  }

  render() {
    const rows = this.state.clientes;

    return (
      <Paper>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Photos</Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle onClick={this.novoCliente()} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">CPF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.Nome}>
                <TableCell component="th" scope="row">
                  {row.Nome}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.cpf}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default Home;
