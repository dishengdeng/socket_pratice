import React from 'react';
import ReactDOM from 'react-dom';
import ChatWindow from './chatwindow.js';
import Users from './users.js';
import './index.css';
import urlHeader from './images/header.png';
import urlNav from './images/nav.png';

let models=(
  <div className="container">

  <header>
<img src={urlHeader} />
  </header>

  <nav>
<img src={urlNav} />
  </nav>

  <div className="body">
<ChatWindow />
  </div>
<footer></footer>
  </div>
);
//ReactDOM.render(<ChatWindow />, document.getElementById('root'));
ReactDOM.render(models, document.getElementById('root'));
