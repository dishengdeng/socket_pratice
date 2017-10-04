import React from 'react';
import ReactDOM from 'react-dom';
import ChatWindow from './chatwindow.js';
import Users from './users.js';

let models=(<div>
<ChatWindow />
<Users />
</div>);
//ReactDOM.render(<ChatWindow />, document.getElementById('root'));
ReactDOM.render(models, document.getElementById('root'));

