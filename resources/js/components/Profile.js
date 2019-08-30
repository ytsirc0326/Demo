import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { Facebook, Twitter } from 'react-sharingbuttons';
import 'react-sharingbuttons/dist/main.css';

export default class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				id: '',
				name: '',
				email: '',
				gender: '',
				password: '',
				password1: '',
				user_type: '',
				address: '',
				description: '',
				image:'images/no_image.png',
			},
			loggedId: '',
			success: false,
			error: '',
			editImg:false,
			cropImg:'',
		};
		this.cancelEditImage();
	}
	componentDidMount() {
		this.setState({
			loggedId: $("#profile").attr("loggedid")
		}, () => {
			this.fetchUser();
		});
	}
	fetchUser() {
		fetch(`api/user/${this.state.loggedId}`)
		.then(res => res.json())
		.then(res => {
			this.setState({
				user: {
					id: res.data.id,
					name: res.data.name,
					email: res.data.email,
					gender: res.data.gender,
					password: '',
					password1: '',
					user_type: res.data.user_type,
					address: res.data.address,
					description: res.data.description,
					image: res.data.image ? res.data.image : this.state.user.image,
				}
			});
		})
		.catch(err => console.log(err));
	}
	handleFormChange(e) {
		this.setState({
			user: {
				...this.state.user,
				[e.target.name]: e.target.value
			}
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		this.saveUser();
	}
	saveUser() {

		this.state.error = "";
		this.state.success = false;

		var err = [];

		if (!this.state.user.name)
			err.push('Please fill Full Name.');
		if (!this.state.user.email)
			err.push('Please fill E-mail.');
		if (this.state.user.password && this.state.user.password != this.state.user.password1)
			err.push('Passwords did not match.');

		if (err.length > 0) {
			var err_html = "";
			if (err.length > 1) {
				err_html = "<ul>";
				for (var i = 0; i < error.length; i++) {
					err_html += "<li>" + err[i] + "</li>";
				}
				err_html += "</ul>";
			} else {
				err_html = err[0];
			}
			this.setState({ error:err_html },() => { $("#err").html(this.state.error); });

			return;
		}

		var vm = this;

		var imgFile = this.state.user.image;
		if (this.state.user.image.indexOf("base64") !== -1) {
			imgFile = this.base64ToFile(this.state.user.image, "profile.png");
		}

		var fD = new FormData();
		fD.append('id', this.state.user.id);
		fD.append('name', this.state.user.name);
		fD.append('email', this.state.user.email);
		fD.append('password', this.state.user.password);
		fD.append('gender', this.state.user.gender);
		fD.append('address', this.state.user.address);
		fD.append('description', this.state.user.description);
		fD.append('user_type', this.state.user.user_type);
		fD.append('image', imgFile);

		const config = {
			headers: { 'content-type': 'multipart/form-data' }
		}
		axios.post('api/user', fD, config)
		.then(function (response) {
			vm.setState({success:true});
		})
	}
	setImage(e) {
		const file = e.target.files[0];

		if (!file.type.includes('image/')) {
			alert('Please select an image file');
			return;
		}
		if (typeof FileReader === 'function') {
			const reader = new FileReader();
				reader.onload = (event) => {
				this.setState({
					user: {
						...this.state.user,
						image: event.target.result
					}
				}, () => {
					this.cancelEditImage();
				});
			};
			reader.readAsDataURL(file);
		} else {
			alert('Sorry, FileReader API not supported');
		}
	}
	_crop() {
		var dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
		this.setState({cropImg:dataUrl});
	}
	editImage() {

		$(".imgEdit").css({visibility:'visible'});
		$(".imgEditBtn").show();

		$(".imgDisplay").css({visibility:'hidden'});
		$(".imgDisplayBtn").hide();


		this.setState({
			editImg:true
		});
	}
	cancelEditImage() {
		$(".imgDisplay").css({visibility:'visible'});
		$(".imgDisplayBtn").show();
		$(".imgEdit").css({visibility:'hidden'});
		$(".imgEditBtn").hide();
	}
	cropImage() {
		this.setState({
			editImg:false,
			user:{
				...this.state.user,
				image:this.state.cropImg
			}
		});
		this.cancelEditImage();
	}
	base64ToFile(dataurl, filename) {
		var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {type:mime});
	}
	render() {
		return (
			<div className="row justify-content-center">
				<div className="col-12">
					<div className="card">
						<div className="card-header">
							<span className="h4 font-weight-bolder">Profile</span>
							{this.props.title}
						</div>
						<div className="card-body">
							<form onSubmit={this.handleSubmit.bind(this)}>

								<div className={"alert alert-success alert-dismissible fade show " + (this.state.success ? '' : 'd-none') } role="alert">
									<strong>
										Success! &nbsp;
									</strong>
									Data saved.
								</div>

								<div className={"alert alert-danger alert-dismissible fade show " + (this.state.error ? '' : 'd-none') } role="alert">
									<strong>
										Error! &nbsp;
									</strong>
									<span id="err"></span>
								</div>

								<div className="row">
									<div className="col col-7">
										<div className="form-group row">
											<label htmlFor="name" className="col-md-3 col-form-label">
												Full Name
											</label>
											<div className="col-md-9">
												<input type="text" className="form-control" name="name" value={this.state.user.name} onChange={this.handleFormChange.bind(this)} />
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="email" className="col-md-3 col-form-label">Email Address</label>
											<div className="col-md-9">
												<input type="email" className="form-control" name="email" value={this.state.user.email} onChange={this.handleFormChange.bind(this)} />
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="password" className="col-md-3 col-form-label">Password</label>
											<div className="col-md-9">
												<input type="password" className="form-control" name="password" value={this.state.user.password} onChange={this.handleFormChange.bind(this)} />
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="password" className="col-md-3 col-form-label">Confirm Password</label>
											<div className="col-md-9">
												<input type="password" className="form-control" name="password1" value={this.state.user.password1} onChange={this.handleFormChange.bind(this)} />
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="gender" className="col-md-3 col-form-label">Gender</label>
											<div className="col-md-9">
												<select className="form-control" name="gender" value={this.state.user.gender} onChange={this.handleFormChange.bind(this)}>
													<option value="male">Male</option>
													<option value="female">Female</option>
												</select>
											</div>
										</div>

										<div className="form-group row">
											<label htmlFor="address" className="col-md-3 col-form-label">
												Address
											</label>
											<div className="col-md-9">
												<textarea className="form-control" name="address" rows="1" value={this.state.user.address} onChange={this.handleFormChange.bind(this)}></textarea>
											</div>
										</div>
										<div className="form-group row">
											<label htmlFor="description" className="col-md-3 col-form-label">
												Description
											</label>
											<div className="col-md-9">
												<textarea className="form-control"  name="description" rows="2" value={this.state.user.description} onChange={this.handleFormChange.bind(this)}></textarea>
											</div>
										</div>
									</div>

									<div className="col col-5 text center">

										<div className="form-group row">
											<div className="col-md-12 text-center imgDisplay">
												<img
													className="rounded mx-auto d-block"
													src={this.state.user.image}
													style={{
														width:'300px',
														height:'300px'
													}}
												/>
											</div>
											<div className="col-md-12 text-center imgEdit"
												style={{
													position: 'absolute',
													top: 0,
													right: 0,
													visibility:'hidden'
												}}
											>
												<Cropper
													ref='cropper'
													src={this.state.user.image}
													guides={false}
													crop={this._crop.bind(this)}
													style={{height: '300px', width: '100%'}}
												/>
											</div>
										</div>

										<div className="form-group row imgDisplayBtn">
											<div className="col col-md-12 text-center">
												<button type="button"
													className="btn btn-success"
													onClick={this.editImage.bind(this)}
												>
													Edit Image
												</button>
											</div>
										</div>
										<div className="form-group row imgEditBtn" style={{display:'none'}}>
											<div className="col col-md-12 text-center">
												<button type="button"
													className="btn btn-success mr-2"
													style={{
														paddingLeft:'25px',
														paddingRight:'25px'
													}}
													onClick={this.cropImage.bind(this)}
												>
													Crop
												</button>
												<button type="button"
													className="btn btn-success"
													style={{
														paddingLeft:'18px',
														paddingRight:'18px'
													}}
													onClick={this.cancelEditImage.bind(this)}
													>
													Cancel
												</button>
											</div>
										</div>

										<div className="form-group row">
											<div className="col col-md-12">
												<div className="input-group">
													<div className="custom-file">
														<input type="file" className="custom-file-input" name="image" accept="image/*" onChange={this.setImage.bind(this)}/>
														<label className="custom-file-label">Choose file</label>
													</div>
												</div>
											</div>
										</div>

									</div>

								</div>

								<hr style={{width:'100%',border:'2px solid #f4f4f4'}} />

								<div className="row">
									<div className="col col-8">
										<div>
											<Facebook url='https://github.com/caspg/react-sharingbuttons' />
											<Twitter url='https://github.com/caspg/react-sharingbuttons' />
										</div>
									</div>
									<div className="col col-4 text-right">
										<button type="submit" className="btn btn-primary btn-lg" style={{paddingLeft:'35px',paddingRight:'35px'}}>
											Save
										</button>
									</div>
								</div>


							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

if (document.getElementById('profile')) {
	ReactDOM.render(<Profile />, document.getElementById('profile'));
}
