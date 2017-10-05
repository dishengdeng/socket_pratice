import React from 'react';
import './index.css';
import { subscribeToTimer, receviceMassge, sendMassge, receviceInitMassge } from './api';


export default class ChatWindow extends React.Component {

constructor(props) {
  super(props);


  	/*receviceMassge((err, message)=>this.setState({
		message:message
	}));*/

  this.state = {
  message : [],
  value: ''

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


	 fetch('/users')
      .then(res => res.json())
      .then(data => this.setState({ users:data.data }));

}

	handleClick() {

	sendMassge(this.state.value);

  }

  handleChange(event) {
    this.setState({value: event.target.value
		//message:this.state.message + event.target.value
	});

  }
  
  handleKeyPress(event)
  {
	    if(event.key == 'Enter'){
    sendMassge(this.state.value);
  }
  }

  render() {
	 const vars=this.state.message;
	 const messages =vars.map((number)=><p>{number}</p>);
    return (
		
	    <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-primary o-hidden h-100">
            <div className="card-body" stype="overflow-y: scroll">

              <div className="mr-5" >{messages}</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="#">
              <span className="float-left"><input type="text" value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/></span>
              <span className="float-right">
                	<button onClick={this.handleClick}>
		send
      </button>
              </span>
            </a>
          </div>
        </div>
     
    );
  }
}
