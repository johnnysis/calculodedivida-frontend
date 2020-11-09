import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Home = (props) => {
    let divida = props.divida;
    return(
        <>
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5">Informações da dívida</Typography>
                <Typography component="p">Data de vencimento: {new Date(divida.dataVencimento).toLocaleDateString()}</Typography>
                <Typography component="p">Quantidade de parcelas: {divida.quantidadeParcelas}</Typography>
                <Typography component="p">Valor original: {divida.valorOriginal ? divida.valorOriginal.toFixed(2) : ""}</Typography>
                <Typography component="p">Dias de atraso: {divida.diasAtraso}</Typography>
                <Typography component="p">Valor juros: {divida.valorJuros ? divida.valorJuros.toFixed(2) : ""}</Typography>
                <Typography component="p">Valor comissão: {divida.valorComissao ? divida.valorComissao.toFixed(2) : ""}</Typography>
                <Typography component="p">Valor final: {divida.valorFinal ? divida.valorFinal.toFixed(2) : ""}</Typography>
                <Typography component="p">Parcelas: </Typography>
                {!divida.parcelas ? "" :
                    <List>
                    {
                    divida.parcelas.map((el, index) => (
                        <ListItem>
                            <ListItemText>Parcela {1 + index}:</ListItemText> 
                            <ListItemText>Valor: {el.valorParcela ? el.valorParcela.toFixed(2) : ""}</ListItemText>
                            <ListItemText>Data de vencimento: {new Date(el.dataVencimento).toLocaleDateString()}</ListItemText>
                        </ListItem>
                    ))
                    }
                    </List>
                }
                <Typography component="p">Telefone de orientação: {divida.telefoneDeOrientacao}</Typography>
            </CardContent>
        </Card>
        </>
    );
}

export default Home;