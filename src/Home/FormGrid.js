import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export default class FormGrid extends Component {
  render() {
    return (
      <form onSubmit={this.props.calcAnswer}>
        { Array(this.props.row).fill().map((item1, i) =>
          <div className="form-row" key={JSON.stringify(i)}>
            {
              Array(this.props.column).fill().map((item2, j) =>
                <div className="form-group col-sm" key={j}>
                  <input
                    onChange={value => this.props.changeValue(i, j, value)}
                    type="text"
                    value={this.props.grid[i][j]}
                    name="name"
                    className="form-control"
                  />
                </div>
              )
            }
          </div>
        ) }
        <input type="submit" value="Submit" class="btn btn-primary btn-block" />
      </form>
    );
  }
}
