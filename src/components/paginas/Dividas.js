import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import Axios from 'axios';
import {url} from '../../util/constants';
import DividaSelecionada from './DividaSelecionada';

import { List, ListItem, ListItemText, Container, TextField, Grid, Button } from '@material-ui/core';
 
  
const Dividas = () => {
    const [quantidadeParcelas, setQuantidadeParcelas] = useState("");
    const [divida, setDivida] = useState([]);
    const [mostrarCalculo, setMostrarCalculo] = useState(false);

    function handleChangeDefault(e, callback) {
        callback(e.target.value);
    }

    function clickItemLista() {
        setMostrarCalculo(true);
    }

    function calcular() {
        if (quantidadeParcelas) {
            Axios.post(`${url}/calculo`, { quantidadeParcelas: parseInt(quantidadeParcelas) })
            .then(response => {
                setDivida(response.data);
                setMostrarCalculo(true);
            });
        }
        else
            console.log(quantidadeParcelas);
    }

    useEffect(() =>
    { 
        Axios.get(`${url}/calculo`)
        .then(response => {
            setDivida(response.data);
        });
    }, []);

    return(
        <>
        <Container>
            <h2>Dívida</h2>
            <Grid
                container
                direction="column"
                spacing={3}
            >
                <Grid item xs={4}>
                    <List component="nav" aria-label="secondary mailbox folders">
                        { divida == null ? "" : 
                            <ListItem button onClick={clickItemLista}>
                                <ListItemText primary={`Data de vencimento: ${new Date(divida.dataVencimento).toLocaleDateString()}`}
                                    secondary={`Valor original: ${divida.valorOriginal ? divida.valorOriginal.toFixed(2) : ""}`}
                                />
                            </ListItem>
                        }
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <NumberFormat
                        decimalScale={0}
                        label="Quantidade de parcelas"
                        value={quantidadeParcelas}
                        onChange={e => handleChangeDefault(e, setQuantidadeParcelas)}
                        customInput={TextField}
                        fullWidth
                    >
                    </NumberFormat>
                </Grid>
                <Grid item xs={4}> 
                    <Button variant="contained" color="primary" onClick={calcular}>Calcular</Button>
                </Grid>
            </Grid>
            
            { mostrarCalculo ? (
                <Grid container spacing={3} direction="column">
                    <Grid item xs={6}>
                        <DividaSelecionada divida={divida} />
                    </Grid>
                </Grid>
            ) : "" }
            
        </Container>
        </>
    );
}

export default Dividas;