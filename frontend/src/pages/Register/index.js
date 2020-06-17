import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiUserCheck } from 'react-icons/fi'
import { FaArrowCircleLeft } from 'react-icons/fa';
import ReCAPTCHA from "react-google-recaptcha";
import { Alert, Button } from 'react-bootstrap';



import api from '../../services/api';
import captchakey from '../../services/captchakey';
import './styles.css';

// Images
import meucLogo from '../../assets/meuc.svg';

export default function Landing() {
    const reuniao_id = localStorage.getItem('reuniaoId');
    const [nome, setNome] = useState('');
    const [qtd_pessoas, setQtd_pessoas] = useState('');
    const [token, setToken] = useState('');
    const [show, setShow] = useState(false);


    const history = useHistory();

    function onChange(value) {
        setToken(value);
    }

    function AlertDismissibleExample() {
        if (show) {
          return (
            <Alert variant="danger" onClose={() => setShow(false)}>
              <Alert.Heading>Ah não!!</Alert.Heading>
                <p>
                    Você esqueceu de resolver o captcha! Clique no "Não sou um robô"
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)}>
                        Ok, vou clicar
                    </Button>
                </div>
            </Alert>
          );
        }
        else
        {
            return(
                <p></p>
            )
        }
    }


    async function handleRequire(e) {
        e.preventDefault();

        if(token) {
            const data = {
                nome,
                qtd_pessoas,
                reuniao_id,
            };

            try {
                const res = await api.post('euvou', data);
                localStorage.setItem('nome', nome);
                history.push('/confirmado');
            } catch (err) {
                alert('Não foi possível realizar o pedido no momento. Tente mais tarde');
                console.log(err);
            }
        } else {
            setShow(true);
            // alert('Não foi feito o captcha');
            // window.confirm("message");
            // return(
                
            // )
        }
    }

    return (
        <div className="register-container">

            <img src={meucLogo} className="logo" alt="logo"/>
            <AlertDismissibleExample />
            <section className="form">
                <form onSubmit={handleRequire}>
                    <h1>Confirmação de Presença</h1>
                    <input
                        placeholder="Seu nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input
                        placeholder="Quant. de presentes"
                        value={qtd_pessoas}
                        onChange={e => setQtd_pessoas(e.target.value)}
                    />

                    <ReCAPTCHA
                        sitekey={captchakey}
                        onChange={onChange}
                    />

                    <button className="button" type="submit">
                        Vamos Lá!
                        <FiUserCheck className="icon" size={16} color="#e3e3e3" />
                    </button>
                    <Link className="alterbutton" to="/">
                        <FaArrowCircleLeft className="icon" size={20} color="#e3e3e3" />
                        Voltar
                    </Link> 
                </form>
            </section>
        </div>
    )
}
