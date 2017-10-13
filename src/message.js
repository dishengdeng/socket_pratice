import React from 'react';
import './index.css';



export default class MessageBox extends React.Component {

constructor(props) {
  super(props);


}



 render() {

	const vars=this.props.data.data;
console.log(this.props.data.name);


const member =vars.map((number)=>


	{
			if(this.props.data.name===number.data.userName)
			{

				return <div className="row msg_container base_sent">
					<div className="col-md-10 col-xs-10">
						<div className="messages msg_sent">						
							<p>{number.data.message}</p>
							<time datetime="2009-11-13T20:00">{number.data.userName} • {number.data.time}</time>
						</div>
					</div>
					<div className="col-md-2 col-xs-2 avatar">
						<img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " alt="test"/>
					</div>
				</div>;
			}
			else
			{

				
				return <div className="row msg_container base_receive">
					<div className="col-md-2 col-xs-2 avatar">
						<img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " alt="test"/>
					</div>
					<div className="col-md-10 col-xs-10">
						<div className="messages msg_receive">						
							<p>{number.data.message}</p>
							<time datetime="2009-11-13T20:00">{number.data.userName} • {number.data.time}</time>
						</div>
					</div>
				</div>;
			}

		
	}

);

    return (


		<div>
		{member}
		</div>



    );
  }
}
