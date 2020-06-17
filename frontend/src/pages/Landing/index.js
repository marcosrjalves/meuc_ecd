import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaWhatsapp, FaSignInAlt, FaTimes } from 'react-icons/fa';

import api from '../../services/api';

import './styles.css';

import meucLogo from '../../assets/meuc.svg';

export default function Landing() {
    const [reunioes, setReunioes] = useState([]);
    const history = useHistory();

    // Load data from nodejs api
    useEffect(() => {
        api.get('lista').then(function (res) {
            setReunioes(res.data);
        })
    });

    async function handlePush(id) {
        try {
            localStorage.setItem('reuniaoId', id);

            history.push('/euvou')
        } catch (err) {
            alert(`Não foi possível iniciar o pedido. Tente mais tarde`);
        }
        
    }

    
    return (
        <div className="landing-container">
            <img src={meucLogo} className="logo" alt="logo"/>

            
            <h1>Encontros Disponíveis</h1>
            
            <ul>
                {reunioes.map(reuniao => (
                    <li key={reuniao.id}>
                        <div className="title">
                            <strong>{reuniao.nome}</strong>
                            <p>
                                {Intl.DateTimeFormat('pt-BR').format(Date.parse(reuniao.datar))}
                            </p>
                        </div>
                        <div className="content">
                            <strong className="firstContent">Horário:</strong>
                            <p className="firstContent">
                                {Intl.DateTimeFormat('pt-BR', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    timeZone: 'GMT'
                                }).format(Date.parse(reuniao.horario))}
                            </p>

                            <strong className="mediumContent">Limite:</strong>
                            <p className="mediumContent">{reuniao.max_pessoas} pessoas</p>

                            <strong className="lastContent">Vagas:</strong>
                            <p className="lastContent">{reuniao.max_pessoas - reuniao.qtd_pessoas} pessoas</p>

                        </div>
                        <form className="linkto">
                            {(reuniao.max_pessoas - reuniao.qtd_pessoas) > 0 ?
                                <button onClick={() => handlePush(reuniao.id)} type="button">
                                    <FaSignInAlt className="icon" size={20} color="#2056AE" />
                                    Quero ir nesse!
                                </button>
                                : 
                                <Link className="goto" to="/">
                                    <FaTimes className="icon" size={20} color="#C23525" />
                                    Sem vagas
                                </Link> 
                            }
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    )
}
