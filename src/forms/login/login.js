import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { common, grey } from '@material-ui/core/colors';
import { history } from '../../components/Routes/history'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import api from '../../services/api';

import './Login.css'

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
    borderRadius: '40px',
    width: '40%',
    marginBottom: theme.spacing(2)
  },

  button: {
    alignContent: 'center',
    backgroundColor: common['black'],
    '&:hover': {
      backgroundColor: grey[800],
    },
    padding: '10px',
    margin: theme.spacing(3, 20, 2),
    display: 'flex',
  },

}));

export default function Login() {
  const classes = useStyles();

  localStorage.setItem('login-orion', '')
  localStorage.setItem('usuario-logado', '')
  localStorage.setItem('id-usuario-logado', '')

  const handleSubmit = values => {
    api.get(`http://localhost:8081/usuarios/${values.usuario}/${values.senha}`, values)
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src="orion_new.jpg" className={classes.image} alt="ORION"/>
        <Typography component="h1" variant="h5">
          ORION
        </Typography>

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
  );
}