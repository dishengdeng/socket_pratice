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
	const borderStyle={'border-top': '2px solid ghostwhite',
						'border-bottom': '2px solid ghostwhite',
						"margin-left":"5px","margin-right":"5px"};
	const rowStyle={"margin-bottom":"10px"};
	const imageStyle={"height":"50px","width":"50px"};
	const wrapDiv={"display":"inline-block","padding-top":"2px"};
	const divStyle={"float:":"right","height":"25px"};
	const user =userlist.map((user)=>
	<div className="row" style={ rowStyle }>

		<div style={borderStyle}>
			<div style={ wrapDiv }>
				<img style={ imageStyle } src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " alt="test"/>
			</div>
			<div style={ wrapDiv }>
				<div style={divStyle}>
					{user.name}	
				</div>
				<div style={divStyle}>
					test
				</div>			
			</div>
		</div>


			

	</div>);
    return (
<div>

    {user}



  <div className="row">
      <div className="col-sm-7">
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
