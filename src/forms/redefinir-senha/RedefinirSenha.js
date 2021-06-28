import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { common, grey } from '@material-ui/core/colors';
import { history } from '../../components/Routes/history'
import { Formik, Form, Field } from 'formik'
import api from '../../services/api';
import '../login/Login.css'

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

export default function RedefinirSenha() {
    const classes = useStyles();

    const handleSubmit = values => {

        console.log(values)

        if (values.novaSenha === values.confirmarSenha) {
            api.get(`usuarios/usuario-redefinir/${values.usuario}/${values.senhaAtual}/${values.novaSenha}`).then((response) => {
                if (response.data === true) {
                    history.push("/login")
                }
            }).catch((e) => {
                alert("Erro na Redefinição de senha!")
                console.log('ocorreu algum erro!');
                console.error(e);
            });
        } else {
            alert("As senhas devem coincidir!")
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img src="Orion_logo.png" className={classes.image} alt="ORION"/>
                <Typography component="h1" variant="h5">
                    Redefinir Senha
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
                        </div>
                        <div className="Login-Group">
                            <Field
                                name="senhaAtual"
                                className="Login-Field"
                                type="password"
                                placeholder="Senha Atual"
                                required
                            />
                        </div>
                        <div className="Login-Group">
                            <Field
                                name="novaSenha"
                                className="Login-Field"
                                type="password"
                                placeholder="Nova Senha"
                                required
                            />
                        </div>
                        <div className="Login-Group">
                            <Field
                                name="confirmarSenha"
                                className="Login-Field"
                                type="password"
                                placeholder="Confirmar Senha"
                                required
                            />
                        </div>
                        <button className="Login-Btn" type="submit">Redefinir</button>
                    </Form>
                </Formik>

            </div>
        </Container>
    );
}