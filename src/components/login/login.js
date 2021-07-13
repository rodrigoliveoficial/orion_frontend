import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { history } from '../routes/history';
import { ErrorMessage, Formik, Form, Field } from 'formik'
import api from '../../services/api';
import '../../css/Login.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },

  image: {
    width: '75%',
    height: '50%',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(5)
  },

}));

export default function Login() {
  const classes = useStyles();

  localStorage.setItem('login-orion', '')
  localStorage.setItem('usuario-logado', '')
  localStorage.setItem('id-usuario-logado', '')

  const handleSubmit = values => {
    api.get(`usuarios/${values.usuario}/${values.senha}`, values)
      .then(resp => {
        const { data } = resp
        if (data) {
          localStorage.setItem('login-orion', true)
          localStorage.setItem('usuario-logado', data.nome)
          localStorage.setItem('id-usuario-logado', data.id)
          history.push('/')
        } else {
          alert("Usuário ou senha incorretos!")
        }
      })
  }

  return (
    <body className="Body-color">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img src="Orion LIVE!-03.png" className={classes.image} alt="ORION" />

          <Formik
            initialValues={{}}
            onSubmit={handleSubmit}
          >
            <Form className={"Login"}>
              <div className="Login-Group">
                <Field
                  name="usuario"
                  className="Login-Field"
                  placeholder="Usuário"
                  required
                />
                <ErrorMessage
                  component="span"
                  name="usuario"
                  className="Login-Error"
                />
              </div>
              <div className="Login-Group">
                <Field
                  name="senha"
                  className="Login-Field"
                  type="password"
                  placeholder="Senha"
                  required
                />
                <ErrorMessage
                  component="span"
                  name="senha"
                  className="Login-Error"
                />
              </div>
              <button className="Login-Btn" type="submit">Entrar</button>
              <br></br>
              <br></br>
              <a href="/redefinir"><p className="Link-Redefinir">Redefinir Senha</p></a>
            </Form>
          </Formik>

        </div>
      </Container>
    </body>
  );
}