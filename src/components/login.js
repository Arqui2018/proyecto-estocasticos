import React from 'react';
import {Grid} from 'semantic-ui-react';
import Signin from './login/Signin'
import '../css/main.css';

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
  }
}

class Login extends React.Component {
  render() {
    return (

    <Grid  verticalAlign='middle' columns={2} centered style={styles.grid}>
      <Grid.Row>
        <Grid.Column>
          <img alt="LogoMundial" src="images/fifawordcup.jpg"/>
        </Grid.Column>
        <Grid.Column>
          <Signin styles={styles}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    )
  }
}

export default Login
