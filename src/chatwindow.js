import React from 'react';
import './index.css';
import { receviceMassge, sendMassge, receviceInitMassge } from './api';
import MessageBox from './message.js';
import Users from './users.js';


export default class ChatWindow extends React.Component {

constructor(props) {
  super(props);


  	/*receviceMassge((err, message)=>this.setState({
		message:message
	}));*/

  this.state = {
  message : [],
  value: '',
  messageScroll:()=>{
	  	  	var messageBody = document.querySelector('#messageBody');
		messageBody.scrollTo(0,messageBody.scrollHeight);

  },
  clearText:()=>
  {
	  	  	  
				document.querySelector('#entertext').value='';
	
  }
  
 

}



 this.handleClick = this.handleClick.bind(this);
 this.handleChange = this.handleChange.bind(this);
 this.handleKeyPress = this.handleKeyPress.bind(this);
}

componentDidMount()
{
	
	var message=this.state.message;

	receviceInitMassge((err, sMessage)=>
	{
		message=sMessage;
			this.setState({
		message:sMessage
	})
	}	
	);
	
	receviceMassge((err, sMessage)=>
	{
		
		message.push(sMessage);
		this.setState({
			message
		});
	});


}

	handleClick() {

	sendMassge(this.state.value);
	this.state.clearText();

  }

  handleChange(event) {
    this.setState({value: event.target.value

	});

  }
componentDidUpdate()
{
	this.state.messageScroll();
	
}
  
  handleKeyPress(event)
  {
	  
	    if(event.key === 'Enter'){
    sendMassge(this.state.value);
	this.state.clearText();
	
  }
  }

  render() {
	 
	 const vars=this.state.message;
	 console.log(vars);
	 //const messages =vars.map((number)=><p>{number}</p>);
	 const scrollbar={ 'overflow-y':'scroll',height:'400px' };
    return (		
	<div className="row">
	<div className="col-sm-9">
		<div className="panel panel-primary">
      <div className="panel-heading">Wechat</div>
      <div className="panel-body">
	  <div className="row" style={scrollbar} id="messageBody">

		  <MessageBox data={vars}/>
	  
	  </div>
	  
	  <div className="row">
	  
	  
	  <div className="col-sm-9">
	  	  <input id="entertext" className="form-control" type="text" onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
	  </div>
	  
	  
	  <div className="col-sm-3">
	  <button className="btn btn-primary btn-md" onClick={this.handleClick}>
		send
      </button>
	  </div>        

              
	  
	  </div>
	  

	  </div>
    </div>

	</div>
	
	<div className="col-sm-3">
	
			<div className="panel panel-primary">
      <div className="panel-heading">Users</div>
      <div className="panel-body">
	<Users />
	  </div>
	  </div>
	
	
	
	</div>

	</div>

     
    );
  }
}
