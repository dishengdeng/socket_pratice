import React from 'react';
import './index.css';
import ImageUrl from './images/add-user.png';
import ImageUploader from 'react-images-upload';
import Modal from 'react-modal';



export default class MessageBox extends React.Component {

constructor(props) {
  super(props);
 this.state = { pictures: [],
				  messageScroll:()=>{
	  	  	var messageBody = document.querySelector('#messageBody');
		//messageBody.scrollTo(0,messageBody.scrollHeight);
    messageBody.scrollTop=messageBody.scrollHeight;

  },
  modalIsOpen: false
  }
 this.onDrop = this.onDrop.bind(this);
 this.uploadImage = this.uploadImage.bind(this);
 this.openModal = this.openModal.bind(this);
 this.afterOpenModal = this.afterOpenModal.bind(this);
 this.closeModal = this.closeModal.bind(this);

}

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false,pictures: []});

  }
uploadImage(e)
{	console.log(this.state.pictures[0][0]);	
			
	var data = new FormData();
	data.append('image', this.state.pictures[0][0]);
	data.append('name', this.props.data.name);
	fetch('/uploadImage', {
			method: 'post',
			body: data
			}).then(function(response) {
				
				return response.json();

	
			}).then(function(json){
				
				console.log(json);
				
			}).catch(function(err) {
				
			});
	e.preventDefault();
}


onDrop(picture) {

	this.setState({
		pictures: this.state.pictures.concat(picture),
	});
	

}

componentDidUpdate()
{
	console.log(this.state.pictures);
	this.state.messageScroll();
}
 render() {

	const vars=this.props.data.data;
console.log(this.props.data.name);

const style={"cursor":"pointer"};
const btnstyle={"left":"45%"};
const afStyle={"font-size":"20px","float":"right","cursor":"pointer"};
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
	width:'50%'
  }
};

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
						<img src={this.props.data.imageUrl} style={ style } className=" img-responsive " onClick={this.openModal} alt="test"/>

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

		
		<Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

		<i className="fa fa-window-close-o" style={ afStyle } aria-hidden="true" onClick={this.closeModal}></i>

 <ImageUploader  withIcon={true} buttonText='Choose images' onChange={this.onDrop} imgExtension={['.jpg', '.gif', '.png', '.gif']} maxFileSize={5242880}/>
		<span className="input-group-btn">
		<button className="btn btn-info btn-sm" style= { btnstyle } onClick={this.uploadImage}>upload</button>
		</span>
        </Modal>		

		</div>

			 




    );
  }
}
