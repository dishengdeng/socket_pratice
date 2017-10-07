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
  userData : {
    "name":"",
    "data":[]
  },
  value: '',
  messageScroll:()=>{
	  	  	var messageBody = document.querySelector('#messageBody');
		//messageBody.scrollTo(0,messageBody.scrollHeight);
    messageBody.scrollTop=messageBody.scrollHeight;

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

	//var message=this.state.message;

	receviceInitMassge((err, userData)=>
	{
		//message=sMessage;
			this.setState({
		userData
	})
	}
	);

	receviceMassge((err, userData)=>
	{

		//message.push(sMessage);
		this.setState({
			userData
		});
	});


}

	handleClick() {
    var temp={
      "name":"",
      "data":{}
    };
    temp.name=this.state.userData.name;
    temp.data={
      "userName":this.state.userData.name,
      "message":this.state.value
    };
	sendMassge(temp);
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
        var temp={
          "name":"",
          "data":{}
        };
        temp.name=this.state.userData.name;
        temp.data={
          "userName":this.state.userData.name,
          "message":this.state.value
        };
    	sendMassge(temp);
	this.state.clearText();

  }
  }

  render() {

	 //const vars=this.state.userData;
	 //console.log(vars);
	 //const messages =vars.map((number)=><p>{number}</p>);
	 const scrollbar={ 'overflow-y':'scroll',height:'400px' };
    return (
	<div className="row">
	<div className="col-sm-9">
		<div className="panel panel-primary">
      <div className="panel-heading">Wechat</div>
      <div className="panel-body">
	  <div className="row" style={scrollbar} id="messageBody">

		  <MessageBox data={this.state.userData}/>

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
