import React from 'react';
import './index.css';
import { receviceUserData } from './api';


export default class MessageBox extends React.Component {

constructor(props) {
  super(props);
this.state={
	
	  messageScroll:()=>{
	  	  	var messageBody = document.querySelector('#messageBody');
		messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

  }
}

}



 render() {

	const vars=this.props.data;

	
	const card={
 width: 'auto',
  "box-shadow": '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  "text-align": 'left',
  padding: '10px',
  margin: '15px'
};
const style={"text-align": 'left',};

const member =vars.map((number)=><div style={card}><p>{number}</p></div>);

    return (

		
		<div>
		{member}		
		</div>
		


    );
  }
}
