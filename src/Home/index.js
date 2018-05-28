import React, { Component } from 'react';
import FormGrid from './FormGrid';

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
      <div className="container">
        <h1>Teoria de la decisión</h1>

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
              <div className="col-md-6">
                <p>Maximizar utilidad: </p>
              </div>
              <div className="col-md-6">
                {this.state.maximize}
              </div>
              <div className="col-md-6">
                <p>Reducir costos:</p>
              </div>
              <div className="col-md-6">
                {this.state.minimize}
              </div>
            </div>

          </div>
          <div className="row">
            <p>Grafico proximamente</p>
          </div>
        </div>
      </div>
    );
  }
}
