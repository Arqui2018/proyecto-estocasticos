import React from 'react';
import {Grid} from 'semantic-ui-react';
import Data from './profile/Data'
import MyBets from './profile/MyBets'
import '../css/main.css';

const styles={
  grid:{
    height:'100%',
    width:'1200px',
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

class Profile extends React.Component {
  render() {
    return (
    <Grid  verticalAlign='middle' columns={3} centered style={styles.grid}>
      <Grid.Row>
        <Grid.Column>
          <Data styles={styles}/>
        </Grid.Column>
        <Grid.Column>
          <img alt="trofeo" src="images/trofeo.png"/>
        </Grid.Column>
        <Grid.Column>
          <MyBets styles={styles}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    )
  }
}

export default Profile
