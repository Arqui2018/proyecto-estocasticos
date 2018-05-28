import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home/index';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
