import React from 'react';
import './index.css';
import { receviceMassge, sendMassge, receviceInitMassge, receviceImageUrl } from './api';
import MessageBox from './message.js';
import Users from './users.js';
import moment from 'moment';


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
  imageUrl:"",
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
    console.log(userData);
			this.setState({
		userData
	})
	}
	);

	receviceMassge((err, data)=>
	{

    var temp={
      "name":"",
      "data":[]
    };
    temp.name=this.state.userData.name;
    temp.data=data
		this.setState({
			userData:temp
		});

	});

  receviceImageUrl((data)=>{
    if(this.state.userData.name===data.name)
    {
      this.setState({
          imageUrl:data.imageUrl
      });
    }
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
      "message":this.state.value,
	  "time":moment().format("MMM-DD-YYYY HH:mm:ss"),
    "imageUrl":this.state.imageUrl
    };
	sendMassge(temp.data);
	this.state.clearText();

  }

  handleChange(event) {
    this.setState({value: event.target.value

	});

  }
componentDidUpdate()
{
	//this.state.messageScroll();



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
          "message":this.state.value,
		  "time":moment().format("MMM-DD-YYYY HH:mm:ss"),
      "imageUrl":this.state.imageUrl
        };
    	sendMassge(temp.data);
	this.state.clearText();

  }
  }

  render() {

	 //const vars=this.state.userData;
	 //console.log(vars);
	 //const messages =vars.map((number)=><p>{number}</p>);
	 //const scrollbar={ 'overflow-y':'scroll',height:'400px' };



    return (

				<div className="row">
					<div className="col-xs-9 col-md-9">
						<div className="panel panel-default">
							<div className="panel-heading top-bar">
								<div className="col-md-8 col-xs-8">
									<h3 className="panel-title"><span className="glyphicon glyphicon-comment"></span> wechat</h3>
								</div>

							</div>
							<div id="messageBody" className="panel-body msg_container_base">
							   <MessageBox data={this.state.userData}/>
							</div>
							<div className="panel-footer">
								<div className="input-group">
									<input id="entertext"  type="text" className="form-control input-sm chat_input" placeholder="Write your message here..." onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
									<span className="input-group-btn">
									<button id="btnsend" className="btn btn-primary btn-sm" onClick={this.handleClick}>Send</button>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xs-3 col-md-3">
						<div className="panel panel-default">
							<div className="panel-heading">
								<i className="fa fa-address-card" aria-hidden="true"></i> Users
							</div>
							<div className="panel-body">
								<Users />
							</div>
						</div>

					</div>
				</div>






    );
  }
}
