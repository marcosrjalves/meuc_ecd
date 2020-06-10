import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaWhatsapp, FaSignInAlt } from 'react-icons/fa'

import api from '../../services/api';

import './styles.css';

import meucLogo from '../../assets/meuc.svg';

export default function Landing() {
    function handleLanding(e) {
        e.preventDefault();
    }

    const [reunioes, setReunioes] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get('lista').
        then(res => {
            setReunioes(res.data);
        })
    }, []);

    
    return (
        <div className="landing-container">
            <img src={meucLogo} alt="logo"/>


            <h1>Encontros Disponíveis</h1>

            <ul>
                {reunioes.map(reuniao => (
                    <li key={reuniao.id}>
                        <div className="title">
                            <strong>reuniao.nome</strong>
                            <p>reuniao.datar</p>
                        </div>
                        <div className="content">
                            <strong>Horário:</strong>
                            <strong>Limite:</strong>
                            <strong>Vagas:</strong>

                            <p>reuniao.horario</p>
                            <p>reuniao.max_pessoas</p>
                            <p>reuniao.qtd_pessoas</p>
                            
                        </div>
                        <div className="goto">
                            <FaSignInAlt className="icon" size={20} color="#2056AE" />
                            Quero ir nesse!
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
