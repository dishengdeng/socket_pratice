import React from 'react';
import './index.css';
import { subscribeToTimer, receviceMassge, sendMassge, receviceUserData } from './api';


export default class Users extends React.Component {

constructor(props) {
  super(props);
  this.state = {
  users: ''

}
}




componentDidMount()
{

	//receviceUserData((err, sData)=>this.setState({

		//users:sData

	//}));
	
	receviceUserData(function(err, sData){
		
		//console.log(err);
		
		console.log(sData);
	});


	 fetch('/data')
      .then(res => res.json())
      .then(data => this.setState({ users:data }));
	 // .then(function(data)
	  //{
		  //this.setState({
			 // users:data.data
		 // });
	 // });



}



  render() {
    return (
      <div className="w3-container">
		
		<div>
		 <p>your name is { this.state.users.name }</p>
		<p>your age is { this.state.users.Age }</p>		 
		</div>

      </div>
    );
  }
}