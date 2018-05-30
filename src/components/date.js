import React, { Component } from 'react';
import Matches from './matches';

const styles={
  box:{
    backgroundColor: 'white',
    border:'1px solid #e6e6e6',
    textAlign:'center',
    marginBottom:'1em',
    padding:'1em'
  }
};

class Date extends Component {
  constructor(props){
    super(props);
    this.state={
      day: props.day,
      clicked: false
    }
    this.viewMatches = this.viewMatches.bind(this);
  }
  viewMatches(e) {
    this.setState({clicked:!this.state.clicked});    
  }

  render() {
    return (
      <div onClick={this.viewMatches}style={styles.box} >
        <div onClick={this.viewMatches}>
          <h3 >Junio {this.state.day}</h3>
        </div>
        { this.state.clicked ?
          <Matches key={this.state.day} day={this.state.day} />
          : <a href={null} onClick={this.viewMatches}>Ver Partidos</a>
        }
      </div>
    )
  }
}
export default Date
