import React from 'react';
import './index.css';
import { receviceUserList } from './api';


export default class Users extends React.Component {

constructor(props) {
  super(props);
  this.state = {
  users: []

}
}




componentDidMount()
{
	
	receviceUserList((err, sData)=>
	{
		
		console.log(sData);
	this.setState({

	users:sData

	});
	}

	
	);

}



  render() {
	var userlist=this.state.users;
	const user =userlist.map((user)=><li>{user}</li>);
    return (
      <div>
		<ul>
		{user}
		</ul>
      </div>
    );
  }
}
