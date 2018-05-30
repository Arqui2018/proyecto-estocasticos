import React from 'react';
import Match from './match'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class Matches extends React.Component {

  selectMactchesByDate( allMatches, day){
    let matchesOnDay = [], tmp;
    allMatches.map( match => {
        tmp = new Date(match.date)
        if(tmp.getDate() === day){
          matchesOnDay.push(match)
        }
        return true;
      }
    );
    return matchesOnDay;
  }

  render() {
    if (this.props.allMatchesQuery && this.props.allMatchesQuery.loading) {
      return <div>Loading</div>
    }
    if (this.props.allMatchesQuery && this.props.allMatchesQuery.error) {
      return <div>Error</div>
    }
    const Matches = this.props.allMatchesQuery.allMatches
    const MatchesOnDay = this.selectMactchesByDate( Matches, this.props.day)

    return (
      MatchesOnDay.map( mat => <Match key={mat.id} match={mat} /> )
    )
  }
}

const ALL_MATCHES_QUERY = gql`
  query AllMatches {
    allMatches {
      id
      team_local_id
      team_visitor_id
      date
    }
  }
`

export default graphql(ALL_MATCHES_QUERY, { name: 'allMatchesQuery' }) (Matches)
