import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import Result from './result'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import '../css/main.css';
import { Redirect } from 'react-router';
import {TOKEN} from "../variables"

const styles={
  grid:{
    height:'100%',
    width:'1200px',
    margin:'0 auto',
  },
  grid1:{
    height:'100%',
    width:'300px',
    margin:'0 auto',
  },
  box:{
    backgroundColor: 'white',
    border:'1px solid #e6e6e6',
    textAlign:'center',
    marginBottom:'1em',
    padding:'1em'
  }
}

class Bet extends Component {
  constructor(props){
    super(props);
    this.state={
      matchId: props.location.state.matchId,
      local: props.location.state.local,
      visitor: props.location.state.visitor
    }
  }

  resultsByMatchId(matchId, allResults){
      let results = [];
      allResults.map( result => {
        if(result.match_id === matchId){
          results.push(result)
        }
        return true;
      });
      return results;
  }

  setPool(results){
    let mypool=0;
    results.map( result => {
      mypool += result.amount
      return true;
    });
    return mypool;
  }

  render() {
    const token = localStorage.getItem(TOKEN);
    if(!token || token==='none'){
      return <Redirect to='/login' />;
    }
    if (this.props.resultsQuery && this.props.resultsQuery.loading) {
      return <div>Loading</div>
    }
    if (this.props.resultsQuery && this.props.resultsQuery.error) {
      return <div>Error</div>
    }
    const allResults = this.props.resultsQuery.allResults;
    let results = this.resultsByMatchId(this.state.matchId, allResults);

    let data = {
      bets: results,
      local: this.state.local,
      visitor: this.state.visitor,
      pool: this.setPool(results),
      matchId: this.state.matchId
    }
    return (
      <div>
        <Grid  verticalAlign='middle' columns={2} centered style={styles.grid}>
          <Grid.Row>
            <Grid.Column>
              <Result styles={styles} data={data} />
            </Grid.Column>
            <Grid.Column >
              <img alt="mascotaMundial" src="images/mascota.jpg"/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const RESULTS_QUERY = gql`
  query results{
    allResults{
      amount,
      g_local,
      g_visit,
      match_id,
      wallet_id
    }
  }
`

export default graphql(RESULTS_QUERY, { name: 'resultsQuery' }) (Bet)
