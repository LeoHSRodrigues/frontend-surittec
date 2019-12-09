import React from 'react'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { authenticationService } from '../_services/authenticationService'

const schema = Yup.object().shape({
  login: Yup.string()
    .required('Informe um login!'),
  senha: Yup.string()
    .required('Informe uma senha!')
})

const enhanceWithFormik = withFormik({
  mapPropsToValues: () => ({ login: '', senha: ''}),

  handleSubmit: values => {
    let login = {login: values.login,senha: values.senha};
    authenticationService.login(login)
    .then(
        user => {
            localStorage.setItem('currentUser', JSON.stringify(user.headers.authorization));
            window.location.href = '/home';
        },
        error => {
        }
    );

  },

  isInitialValid: false,
  validateOnChange: true,
  validateOnBlur: true,
  displayName: 'MyForm',
  validationSchema: schema
})

class Login extends React.Component {
  
    componentDidMount() {
        let logado = localStorage.getItem('currentUser');
        if (logado){
            window.location.href = '/home';
        }
    }
  
    render () {
      return (
        <Form autoComplete="off">
          <h1>Login</h1>
          
          <div>
            <Field name="login" placeholder="Login" /> <br />
            <ErrorMessage name="login" />
          </div>
          <div>
            <Field name="senha" placeholder="Senha" />
            <br />
            <ErrorMessage name="senha" />
          </div>
          <button type="submit">Enviar</button>
        </Form>
      )
    }
  }

  export default enhanceWithFormik(Login)
