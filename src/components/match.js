import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react';

class Match extends Component {

  render() {
    if (this.props.teamsMatchQuery && this.props.teamsMatchQuery.loading) {
      return <Icon loading name='circle notched' />
    }
    if (this.props.teamsMatchQuery && this.props.teamsMatchQuery.error) {
      return <div>Error</div>
    }
    let teamLocal = this.props.teamsMatchQuery.team_local.name
    let teamVisitor = this.props.teamsMatchQuery.team_visitor.name
    let date = new Date(this.props.match.date)
    let matchId = this.props.match.id
    return (
      <div>
        <Link to={{
            pathname: '/bet',
            state: {
              local: teamLocal,
              visitor: teamVisitor,
              matchId: matchId,
            }
        }}>
          <h4>{teamLocal} vs {teamVisitor}</h4>
        </Link>
        Hora: {date.toLocaleTimeString()}        
      </div>
    )
  }
}

const TEAMS_MATCH_QUERY = gql`
  query teams($local: Int!, $visitor: Int!){
      team_local: teamById(id: $local){
        name
      },
      team_visitor: teamById(id: $visitor){
        name
      }
  }
`
export default graphql(TEAMS_MATCH_QUERY, {
  options: (ownProps) => ({
    variables: {
      local: ownProps.match.team_local_id,
      visitor: ownProps.match.team_visitor_id
    }
  }),
  name: 'teamsMatchQuery' }) (Match)
