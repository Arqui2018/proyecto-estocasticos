import React from 'react';
import LogoUnal from '../img/logoUnal.png';

export default () => (
  <footer>
    <hr />
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <p>Integrantes:</p>
          <ul>
            <li>Jhon Emmanuel Torres</li>
            <li>Adriana Dorado Soler</li>
            <li>Cristian Camilo Cristancho</li>
            <li>Camilo Andres Pinzon Ruiz</li>
            <li>Rafael Antonio Salgado</li>
          </ul>
        </div>
        <div className="col-md-6">
          <br />
          <img src={LogoUnal} alt="Responsive" className="mx-auto d-block rounded"/>
        </div>
      </div>
    </div>
  </footer>
);
