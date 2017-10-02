import React from 'react';
import './index.css';
import { subscribeToTimer, receviceMassge, sendMassge } from './api';


export default class ChatWindow extends React.Component {

constructor(props) {
  super(props);

  
  	/*receviceMassge((err, message)=>this.setState({
		message:message
	}));*/
	
  this.state = {
  timestamp: 'no timestamp yet',
  message : '',
  value: ''
 
}



 this.handleClick = this.handleClick.bind(this);
 this.handleChange = this.handleChange.bind(this);
}	

componentDidMount()
{

	receviceMassge((err, sMessage)=>this.setState({

		message:this.state.message+sMessage
		
	}));
	
	
	 fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
	
	subscribeToTimer((err, timestamp) => this.setState({ 
    timestamp 
  }));
}

	handleClick() {

	sendMassge(this.state.value);
	this.setState({
		message:this.state.message + this.state.value
	});
  }
  
  handleChange(event) {
    this.setState({value: event.target.value
		//message:this.state.message + event.target.value
	});
	
  }
  
  render() {
    return (
      <div className="w3-container">
		your clock: {this.state.timestamp}<br/>
		<div>
		 your message is { this.state.users } {this.state.message}
		</div>
		<br/>
		<input type="text" value={this.state.value} onChange={this.handleChange} />
		<br/>
	<button onClick={this.handleClick}> 
		send
      </button>
      </div>
    );
  }
}




