import React, { Component } from 'react';
import { Button, Grid, Form, Icon } from 'semantic-ui-react';
import swal from 'sweetalert';



const styles = {
  grid: {
    height: '100%',
    width: '1200px',
    margin: '0 auto'
  },
  box: {
    backgroundColor: 'white',
    border: '1px solid #e6e6e6',
    textAlign: 'center',
    marginBottom: '1em',
    padding: '1em'
  },
  box1: {
    backgroundColor: '#f8f8f9',
    border: '1px solid #e6e6e6',
    textAlign: 'center',
    marginBottom: '1em',
    padding: '1em'
  }
}

export default class Hint extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: new Array(4).fill(''),
      probabilities: new Array(2).fill(''),
      teamVisitor: '',
      teamLocal: '',
    };

    this.teams = {
      "Rusia": 493,
      "Arabia Saudi": 462,
      "Egipto": 636,
      "Uruguay": 976,
      "Portugal": 1306,
      "España": 1162,
      "Marruecos": 681,
      "Iran": 727,
      "Francia": 1166,
      "Australia": 700,
      "Peru": 1106,
      "Dinamarca": 1054,
      "Argentina": 1254,
      "Islandia": 930,
      "Croacia": 975,
      "Nigeria": 635,
      "Brasil": 1384,
      "Suiza": 1179,
      "Costa Rica": 858,
      "Serbia": 732,
      "Alemania": 1544,
      "Mexico": 1008,
      "Suecia": 889,
      "Corea": 520,
      "Belgica": 1346,
      "Panama": 574,
      "Tunez": 1012,
      "Inglaterra": 1040,
      "Polonia": 1128,
      "Senegal": 825,
      "Colombia": 989,
      "Japon": 528
    };

    this.changeValue = this.changeValue.bind(this);
    this.changeProb = this.changeProb.bind(this);
    this.doMagic = this.doMagic.bind(this);
  }

  async doMagic() {
    if (!(this.state.teamLocal && this.state.teamVisitor)) {
      await swal('Por favor seleccione los equipos');
      return;
    }

    if (!this.state.values.reduce((accum, value) => accum && !isNaN(value), true)) {
      await swal('Hay un error con los valores');
      return;
    }

    if (Math.round(this.state.probabilities[0] + this.state.probabilities[1]) ) {
      await swal('Hay un error con las probabilidades');
      return;
    }


    const optionOne = parseInt(this.state.values[0] * this.state.probabilities[0] + this.state.values[1] * this.state.probabilities[1] + this.teams[this.state.teamLocal], 10);
    const optionTwo = parseInt(this.state.values[2] * this.state.probabilities[0] + this.state.values[3] * this.state.probabilities[1] + this.teams[this.state.teamVisitor], 10);

    if (optionOne > optionTwo) {
      await swal(`Yo apostaria por ${this.state.teamLocal}`);
      this.setState({
        values: new Array(4).fill(''),
        probabilities: new Array(2).fill(''),
        teamVisitor: '',
        teamLocal: '',
      });
    }
    else {
      await swal(`Yo apostaria por ${this.state.teamVisitor}`);
      this.setState({
        values: new Array(4).fill(''),
        probabilities: new Array(2).fill(''),
        teamVisitor: '',
        teamLocal: '',
      });
    }
  }

  changeValue(event, index) {
    const aux = this.state.values.slice();
    aux[index] = event.target.value;
    this.setState({ values: aux });
  }

  changeProb(event, index) {
    const aux = this.state.probabilities.slice();
    aux[index] = event.target.value;
    this.setState({ probabilities: aux });
  }

  render() {
    return (
      <Grid verticalAlign='middle' columns={3} centered style={styles.grid}>
        <Grid.Row>
          <h1>Consejometro</h1>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <h3>Equipo local</h3>
          </Grid.Column>
          <Grid.Column>
            <h3>Equipo visitante</h3>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Group widths='equal'>
                <select value={this.state.teamLocal} onChange={event => this.setState({ teamLocal: event.target.value })}>
                  <option value="Seleccionar...">Seleccionar...</option>
                  {
                    Object.keys(this.teams).sort().map(item =>
                      <option value={item}>{item}</option>
                    )
                  }
                </select>
              </Form.Group>
            </Form>

          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Group widths='equal'>
                <select value={this.state.teamVisitor} onChange={event => this.setState({ teamVisitor: event.target.value })}>
                  <option value="Seleccionar...">Seleccionar...</option>
                  {
                    Object.keys(this.teams).sort().map(item =>
                      <option value={item}>{item}</option>
                    )
                  }
                </select>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <h3>Espectadores</h3>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input fluid value={this.state.values[0]} align="center" onChange={event => this.changeValue(event, 0)} />
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input fluid value={this.state.values[1]} align="center" onChange={event => this.changeValue(event, 1)} />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <h3>Hinchas</h3>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input fluid value={this.state.values[2]} align="center" onChange={event => this.changeValue(event, 2)} />
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input fluid value={this.state.values[3]} align="center" onChange={event => this.changeValue(event, 3)} />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <h3>Probabilidad</h3>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input fluid value={this.state.probabilities[0]} align="center" onChange={event => this.changeProb(event, 0)} />
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input fluid value={this.state.probabilities[1]} align="center" onChange={event => this.changeProb(event, 1)} />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>


        <Grid.Row>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <Button primary fluid onClick={this.doMagic}>
              <Icon name='money' /> Aconsejar
            </Button>
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
