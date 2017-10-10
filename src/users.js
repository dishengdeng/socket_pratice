import React from 'react';
import './index.css';
import { receviceUserList, receviceNameChange, updateName} from './api';


export default class Users extends React.Component {

constructor(props) {
  super(props);
  this.state = {
  users: [],
  value:"",
  clearNameText:()=>
  {

        document.querySelector('#enterUseName').value='';

  }
}

this.handleChange = this.handleChange.bind(this);

}




componentDidMount()
{

	receviceUserList((err, sData)=>
	{

		console.log(sData);
	this.setState({

	users:sData

	});
});


  receviceNameChange((data)=>{
    console.log(data);
    if(!data)
    {
      alert("Name already exists!");
    }
  });


  this.handleClick = this.handleClick.bind(this);

}

handleClick() {

  updateName(this.state.value);
  this.state.clearNameText();

}


handleChange(event) {
  this.setState({value: event.target.value

});

}

  render() {
	var userlist=this.state.users;
	const user =userlist.map((user)=><li>{user.name}</li>);
    return (
<div>
  <div className="row">
    <ul>
    {user}
    </ul>
  </div>


  <div className="row">
      <div className="col-sm-9">
          <input id="enterUseName" className="form-control" type="text" onChange={this.handleChange}/>
      </div>


      <div className="col-sm-3">
      <button className="btn btn-default btn-md" onClick={this.handleClick}>change</button>
      </div>
  </div>
</div>



    );
  }
}
