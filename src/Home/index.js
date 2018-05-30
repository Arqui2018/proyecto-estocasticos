import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import FormGrid from './FormGrid';
import Footer from './Footer';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: 3,
      column: 2,
      grid: Array.from(Array(3), () => new Array(2).fill('')),
      maximize: '0',
      minimize: '0',
    };

    this.changeInput = this.changeInput.bind(this);
    this.calcAnswer = this.calcAnswer.bind(this);
  }

  async changeInput(x, y, event) {
    const value = event.target.value.toString();
    const gridCopy = this.state.grid.slice();
    gridCopy[x][y] = value;
    let canCalcute = true;
    for (let i = 0; i < this.state.row && canCalcute; i++)
      for (let j = 0; j < this.state.column && canCalcute; j++)
        canCalcute = canCalcute && this.state.grid[i][j].length;

    await this.setState({ grid: gridCopy });

    if (canCalcute) {
      const [ maximize, minimize ] = this.calcAnswer();
      this.setState({ maximize, minimize });
    }
  }


  calcAnswer(event) {
    if (event)
      event.preventDefault();
    const { row, column } = this.state;
    const possibleAnswer = new Array(column).fill(0);
    for (let i = 0; i < row - 1; i++) {
      for (let j = 0; j < column; j++) {
        possibleAnswer[i] += Number(this.state.grid[row - 1][j]) * Number(this.state.grid[i][j]);
      }
    }
    return [Math.max.apply(null, possibleAnswer), Math.min.apply(null, possibleAnswer)];
  }

  render() {
    return (
      <div>
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <h1 className="mx-auto">Teoria de la decisión</h1>
              </div>
                <p className="lead">Explicacion del proyecto</p>
                <hr className="my-4" />
                <p>No creo que sea necesario</p>
            </div>
          </div>
        <div className="container">

          <div className="row">
            <div className="col-md-6">
              <FormGrid
                grid={this.state.grid}
                row={this.state.row}
                column={this.state.column}
                changeValue={this.changeInput}
                calcAnswer={this.calcAnswer}
              />
              <div className="row">
                <div className="col-md-12">
                   <hr size="30" />
                  <h2 className="text-center">Resultados</h2>
                </div>

                <div className="col-md-6">
                  <p>Maximizar utilidad: </p>
                </div>
                <div className="col-md-6">
                  <NumberFormat value={this.state.maximize} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div>
                <div className="col-md-6">
                  <p>Reducir costos:</p>
                </div>
                <div className="col-md-6">
                  <NumberFormat value={this.state.minimize} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div>
              </div>

            </div>
            <div className="row">
              <p></p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
