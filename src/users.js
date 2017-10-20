import React from 'react';
import './index.css';
import { receviceUserList, receviceNameChange, updateName, receviceUserHeader} from './api';
import Modal from 'react-modal';
import ImageUploader from 'react-images-upload';
import { UrlImage } from './constants.js';

export default class Users extends React.Component {

constructor(props) {
  super(props);
  this.state = {
	  pictures: [],
	userHeader:{},
  users: [],
  value:"",
  clearNameText:()=>
  {

        document.querySelector('#enterUseName').value='';

  },
   modalIsOpen: false,
  isUploading:false
}

this.handleChange = this.handleChange.bind(this);
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
{	
	if(this.state.pictures.length===0)
	{
		e.preventDefault();
		return;
		
	}
	this.setState({isUploading:true});
	var data = new FormData();
	data.append('image', this.state.pictures[0][0]);
	data.append('name', this.state.userHeader.name);
	fetch('/uploadImage', {
			method: 'post',
			body: data
			}).then((response)=>{
				if(response.status===200) {this.closeModal();this.setState({isUploading:false});}
			}).catch(function(err) {

			});
	e.preventDefault();
}


onDrop(picture) {

	this.setState({
		pictures: this.state.pictures.concat(picture),
	});


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
	
	receviceUserHeader((err, sData)=>
	{
		console.log("USER DATA: ");
		console.log(sData);
		if(!this.state.userHeader.hasOwnProperty('name'))
		{
			this.setState({

				userHeader:sData

				});
		}
		else if(this.state.userHeader.name===sData.name)
		{
				this.setState({

				userHeader:sData

				});
		}

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

  updateName(this.state.value,this.state.userHeader.imageUrl);
  var temp = this.state.userHeader;
  temp.name=this.state.value;
  this.setState({
	  userHeader:temp
  });
  this.state.clearNameText();

}


handleChange(event) {
  this.setState({value: event.target.value

});

}

  render() {
	var userlist=this.state.users;
	const ImageUrl=UrlImage+"image/common/add-user.png";
	const rowStyle={ "marginBottom":"15px"};	
	const rightColumnStyle={"paddingLeft":"0px"};
	const leftColumnStyle={"paddingRight":"0px"};
	const btnstyle={"left":"45%"};
	const afStyle={"font-size":"20px","float":"right","cursor":"pointer"};
	const style={"cursor":"pointer"};
	
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
	
	
	const user =userlist.map((user)=>
	{
		console.log(user);
		var getImageforSelf=()=>{if(user.hasOwnProperty('imageUrl')&&user.imageUrl!==""){return user.imageUrl} else {return ImageUrl}};
		var getImageforOther=()=>{if(user.hasOwnProperty('imageUrl')&&user.imageUrl!==""){return user.imageUrl} else {return "http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg"}};

			if(this.state.userHeader.name===user.name)
			{
				return <div key={ user.socketID } className="row" style={ rowStyle }>


					<div className="col-sm-3" style={ leftColumnStyle }>
						<img  src={ getImageforSelf() } style={ style } onClick={this.openModal} className=" img-responsive " alt="test"/>
					</div>
					<div className="col-sm-7" style={ rightColumnStyle }>	
							{user.name}			
					</div>	

				</div>;
			}
			else
			{
				return <div key={ user.socketID } className="row" style={ rowStyle }>


					<div className="col-sm-3" style={ leftColumnStyle }>
						<img  src={ getImageforOther() } className=" img-responsive " alt="test"/>
					</div>
					<div className="col-sm-7" style={ rightColumnStyle }>	
							{user.name}			
					</div>	

				</div>;
			}
		

	});
	
	
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
				<button className="btn btn-info btn-sm" style= { btnstyle } onClick={this.uploadImage}>{this.state.isUploading ? <i className="fa fa-spinner faa-spin animated"></i>:'Upload'}</button>
				</span>
			</Modal>
		</div>



    );
  }
}
