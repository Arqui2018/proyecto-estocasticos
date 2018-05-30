import React, { Component } from 'react';
import {Form, Button,  Divider, Statistic, Icon, Grid } from "semantic-ui-react";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';
import { TOKEN } from '../variables'
import { client } from '../index'

const styles={
  grid:{
    height:'100',
    width:'900px',
    margin:'0 auto',
  },
  box:{
    backgroundColor: 'white',
    border:'1px solid #e6e6e6',
    textAlign:'center',
    marginBottom:'1em',
    padding:'1em'
  },
  box1:{
    backgroundColor: '#f8f8f9',
    border:'1px solid #e6e6e6',
    textAlign:'center',
    marginBottom:'1em',
    padding:'1em'
  }
}

const DATA_USER = gql`
  query sessionByToken($token: String!){
    sessionByToken(token: $token){
    	id,
      wallet_id,
      name,
      nickname
    }
  }
`;

const BALANCE_QUERY = gql`
  query balance($id: Int!){
    walletById(id: $id){
      balance
    }
  }
`;

const ADD_RESULT = gql`
  mutation createResult($result: ResultInput!){
    createResult(result: $result){
      id,
      user_id,
      match_id
    }
  }
`;

const UPDATE_WALLET = gql`
  mutation updateWallet($id: Int!, $wallet: WalletInput!){
    updateWallet(id: $id, wallet: $wallet) {
      balance
    }
  }
`;

class Result extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect: false,
      gLocal: null,
      gVisitor: null,
      amount: 10000,
      posibleWinnings: 0,
      numBets: 0,
      bets: props.data.bets,
      pool: props.data.pool*0.9
    };
    this.handleChange = this.handleChange.bind(this);

    const token = localStorage.getItem(TOKEN);
    // Se obtienen los datos del usuario y se guardan en el estado
    client.query({
      query: DATA_USER,variables: {token},
    }).then(data => {this.setState({
        id: parseInt(data.data.sessionByToken.id,10),
        walletId: parseInt(data.data.sessionByToken.wallet_id,10)
      });
      //Esperamos a obtener el wallet_Id asociado al usuario y luego consultamos el saldo
      //Es necesrio hacer la consult anidada para asegurarnos que existe el walletId
      const walletId=parseInt(data.data.sessionByToken.wallet_id,10);
      client.query({
        query: BALANCE_QUERY, variables: { id: walletId},
      }).then(ans => this.setState({balance: ans.data.walletById.balance})
      ).catch(error => console.error(error))
    }).catch(error => console.error(error))
  }

  handleChange (e) {
    var bets = this.state.bets;
    const target=e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]:value });

    if(this.state.gLocal && this.state.gVisitor){
      let count = 0, sum = 0;
      let gLocal= parseInt(this.state.gLocal,10);
      let gVisitor=parseInt(this.state.gVisitor,10);
      let amount = parseInt(this.state.amount,10);
      let pool = parseInt(this.state.pool,10);
      bets.map( bet =>{
        if(bet.g_local===gLocal && bet.g_visit===gVisitor)
        {
          sum+=bet.amount;
          count++;
        }
        return true
      });
      sum+=amount;
      let result= parseInt((pool+amount*0.9)*(amount/sum),10);
      this.setState({
        posibleWinnings: result,
        numBets: count
      });
    }

  }

  render(){
    if (this.state.redirect) {
       return <Redirect to='/' />;
     }
    return(
      <div className="prueba">
        <div style={styles.box}>
          <img alt="mascota" src='images/APUESTA MUNDIAL.png'/>
          <Form size="big" >
            <div style={styles.box}>
              <h3>Marcador</h3>
              <Form.Group widths='equal'>
                <Form.Field  control='input' name='gLocal' label={this.props.data.local} type='number' min='0'
                  onChange={this.handleChange} placeholder='Goles Equipo Local' required />
                <Form.Field  control='input' name='gVisitor' label={this.props.data.visitor} type='number' min='0'
                  onChange={this.handleChange} placeholder='Goles Equipo visitante' required />
              </Form.Group>
            </div>
            <div style={styles.box}>
              <Form.Field  control='input' label='Monto de la apuesta' value={this.state.amount} readOnly />
              <Form.Field  control='input' type='range' name='amount' min="10000" max={this.state.balance} step="10000"
                  value={this.state.amount} onChange={this.handleChange} />
            </div>
            <div>
              <Statistic.Group>
                <Statistic size='mini'>
                  <Statistic.Value>{this.state.posibleWinnings}</Statistic.Value>
                  <Statistic.Label> <br /> Posible Ganancia</Statistic.Label>
                </Statistic>
                <Statistic size='mini'>
                  <Statistic.Value>{this.state.numBets}</Statistic.Value>
                  <Statistic.Label>Apuestas <br />con el mismo marcador</Statistic.Label>
                </Statistic>
              </Statistic.Group>
              <br />
            </div>
            <div>
              <div style={styles.box1}>
                <Grid.Row>
                  <Statistic size='small'>
                    <Statistic.Value><Icon name='money' color='green' />{this.state.pool}</Statistic.Value>
                    <Statistic.Label>Pozo</Statistic.Label>
                  </Statistic>
                </Grid.Row>
              </div>
              <br />
            </div>
            <Button type='submit' onClick={() => this._makeBet()}>Apostar</Button>
            <Divider hidden />
          </Form>
        </div>
      </div>
    )
  }

  _makeBet = async () =>{
    const result = {
      g_local: parseInt(this.state.gLocal,10),
      g_visit: parseInt(this.state.gVisitor,10),
      amount: parseInt(this.state.amount,10),
      match_id: this.props.data.matchId,
      user_id: this.state.id,
      wallet_id: this.state.walletId
    }
    const id= this.state.walletId;
    const wallet = {
      balance: (-1) * parseInt(this.state.amount,10)
    }
    console.log("--------Iniciando------");
    await this.props.addResultMutation({
      variables: {
        result
      }
    });
    console.log("--------Add Result Terminada------");
    await this.props.updateWalletMutation({
      variables: {
        id,
        wallet
      }
    });
    console.log("--------update wallet Terminada------");
    this.setState({redirect: true})
  }

}

export default compose(
  //graphql(BALANCE_QUERY, { name: 'balanceQuery' }),
  graphql(ADD_RESULT, { name: 'addResultMutation' }),
  graphql(UPDATE_WALLET, { name: 'updateWalletMutation' }),
)(Result)
