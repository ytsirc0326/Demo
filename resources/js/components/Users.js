import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Users extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			user: {
				id: '',
				name: '',
				email: '',
				gender: '',
				password: '',
				user_type: '',
				address: '',
				description: '',
			},
			loggedId: '',
			edit: false,
			success: false,
			error: '',
			user_id: '',
			pagination: {},
			sortKey:'id',
			sortDir:'desc',
			displayPerPage: 10,
			searchKey: ''
		};
	}
	componentDidMount() {
		this.setState({
			loggedId: $("#userList").attr("loggedid")
		}, () => {
			this.fetchUsers();
		});
	}
	fetchUsers() {
		var url = 'api/users';
		var param = '?page=' + this.state.pagination.current_page;
		param += '&displayPerPage=' + this.state.displayPerPage;
		param += '&sortKey=' + this.state.sortKey;
		param += '&sortDir=' + this.state.sortDir;

		if (this.state.searchKey != "") {
			param += '&searchKey=' + this.state.searchKey;
		}

		axios.get('api/users' + param)
		.then( res => {
			this.setState({ users: res.data.data });
			this.makePagination(res.data.meta);
		})
		.catch(errors => {
			console.log(errors);
		})
	}
	makePagination(meta) {
		var pagination = {
			current_page: meta.current_page,
			prev_page: meta.current_page - 1,
			next_page: meta.current_page + 1,
			last_page: meta.last_page
		}
		this.setState({ pagination: pagination })
	}
	navigate(e, pageNum) {
		e.preventDefault();
		this.setState({
			pagination : {
				current_page : pageNum,
				prev_page : pageNum - 1,
				next_page : pageNum + 1,
			}
		}, () => {
			this.fetchUsers();
		});
	}
	sort(key) {

		var dir;

		if (this.state.sortKey == key) {
			dir = this.state.sortDir == "asc"? "desc" : "asc";
		} else {
			dir ="asc";
		}

		this.setState({
			sortKey: key,
			sortDir: dir
		}, () => {
			this.fetchUsers();
		});
	}
	handleListChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		}, () => {
			this.state.pagination.current_page = 1;
			this.fetchUsers();
		});
	}
	confirmDelete(id) {
		this.setState({ user_id: id });
		$('#deleteModal').modal('show');
	}
	deleteUser() {
		fetch(`api/user/${this.state.user_id}`, {
			method: 'delete'
		})
		.then(res => res.json())
		.then(data => {
			$('#deleteModal').modal('hide');
			this.fetchUsers();
			this.setState({ user_id: '' });
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
	showUserEditor(user) {
		this.setState({
			success: false,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				gender: user.gender,
				password: '',
				user_type: user.user_type,
				address: user.address,
				description: user.description,
			}
		}, () => {
			this.setState({ edit: true });
			$('#userModal').modal('show');
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		this.saveUser();
	}
	saveUser() {
		if (this.state.edit === false) {
			// Add
			fetch('api/user', {
				method: 'post',
				body: JSON.stringify(this.state.user),
				headers: {
					'content-type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(data => {
				this.setState({success: true});
				this.fetchUsers();
			})
		}
		else {
			// Update
			fetch('api/user', {
				method: 'put',
				body: JSON.stringify(this.state.user),
				headers: {
					'content-type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(data => {
				this.setState({ 
					edit: false,
					success: true
				});
				this.fetchUsers();
			})
		}
	}
	editInline(user) {

		if (this.state.loggedId == "") {
			return;
		}

		this.cancelInlineEdit();
		this.setState({
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				gender: user.gender,
				password: '',
				user_type: user.user_type,
				address: user.address,
				description: user.description,
			}
		}, () => {
			$("#"+user.id).find(".listText").hide();
			$("#"+user.id).find(".listEdit").show();
		});
	}
	cancelInlineEdit() {
		$(".listText").show();
		$(".listEdit").hide();
	}
	saveInline() {
		this.setState({ 
			edit: true
		}, () => {
			this.saveUser();
			this.cancelInlineEdit();
		});
	}
	render() {
		return (
			<div style={{marginTop:'40px'}}>

				<div className="modal fade" id="userModal" tabIndex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-lg" role="document">
						<div className="modal-content">
							<form onSubmit={this.handleSubmit.bind(this)}>
								<div className="modal-header">
									<h5 className="modal-title" id="userModalLabel">
										Edit User
									</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">

									<div className={"alert alert-success " + (this.state.success == false ? 'd-none' : '')} role="alert">
										Successfully saved.
									</div>

									<div className="form-group row">
										<label className="col-sm-2 col-form-label text-right">Name</label>
										<div className="col-sm-10">
											<input type="text" className="form-control" name="name" value={this.state.user.name} onChange={this.handleFormChange.bind(this)} />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-sm-2 col-form-label text-right">E-mail</label>
										<div className="col-sm-10">
											<input type="email" className="form-control" name="email" value={this.state.user.email} onChange={this.handleFormChange.bind(this)} />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-sm-2 col-form-label text-right">Password</label>
										<div className="col-sm-10">
											<input type="password" className="form-control" name="password" value={this.state.user.password} onChange={this.handleFormChange.bind(this)} />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-sm-2 col-form-label text-right">Gender</label>
										<div className="col-sm-10">
											<select className="form-control" name="gender" value={this.state.user.gender} onChange={this.handleFormChange.bind(this)}>
												<option></option>
												<option value="male">Male</option>
												<option value="female">Female</option>
											</select>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-sm-2 col-form-label text-right">User Type</label>
										<div className="col-sm-10">
											<select className="form-control" name="user_type" value={this.state.user.user_type} onChange={this.handleFormChange.bind(this)}>
												<option value="user">User</option>
												<option value="admin">Administrator</option>
											</select>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-sm-2 col-form-label text-right">Address</label>
										<div className="col-sm-10">
											<textarea className="form-control" name="address" rows="1" value={this.state.user.address} onChange={this.handleFormChange.bind(this)} ></textarea>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-sm-2 col-form-label text-right">Description</label>
										<div className="col-sm-10">
											<textarea className="form-control"  name="description"rows="1"  value={this.state.user.description} onChange={this.handleFormChange.bind(this)}></textarea>
										</div>
									</div>

								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary pr-5 pl-5" data-dismiss="modal">Cancel</button>
									<button type="submit" className="btn btn-primary pr-5 pl-5">Save</button>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-body">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<div className="p-4">
									<h4>Are you sure you want to delete this user ?</h4>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">
									Cancel
								</button>
								<button type="button" className="btn btn-danger" onClick={this.deleteUser.bind(this)}>
									Yes
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="row d-flex">
					<div className="col-md-3 input-group mb-3 ml-auto">
						<input type="text" className="form-control" placeholder="Search"  name="searchKey" value={this.state.searchKey} onChange={this.handleListChange.bind(this)}/>
						<div className="input-group-append">
							<span className="input-group-text">
								<i className="fa fa-search"></i>
							</span>
						</div>
					</div>
				</div>
				<div className="row">
					<table className="table table-bordered table-striped table-sm">
						<thead>
							<tr>
								<th className="font-weight-bolder text-center" style={{cursor:'pointer'}} onClick={e => this.sort('name')}>
									Name
									<i className="fa fa-sort fa-lg pt-1" title="sort" style={{float:'right'}}></i>
								</th>
								<th className="font-weight-bolder text-center" style={{cursor:'pointer'}} onClick={e => this.sort('email')}>
									Email
									<i className="fa fa-sort fa-lg pt-1" title="sort" style={{float:'right'}}></i>
								</th>
								<th className="font-weight-bolder text-center" style={{cursor:'pointer'}} onClick={e => this.sort('gender')}>
									Gender
									<i className="fa fa-sort fa-lg pt-1" title="sort" style={{float:'right'}}></i>
								</th>
								<th className="font-weight-bolder text-center" style={{cursor:'pointer'}} onClick={e => this.sort('user_type')}>
									User Type
									<i className="fa fa-sort fa-lg pt-1" title="sort" style={{float:'right'}}></i>
								</th>
								<th className="font-weight-bolder text-center" style={{cursor:'pointer'}} onClick={e => this.sort('address')}>
									Address
									<i className="fa fa-sort fa-lg pt-1" title="sort" style={{float:'right'}}></i>
								</th>
								<th className="font-weight-bolder text-center">Description</th>
								<th className={ this.state.loggedId == '' ? 'd-none' : ''}></th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.users.map( user => {
									return (
										<tr key={user.id} id={user.id}>
											<td onClick={e => this.editInline(user)}>
												<span className="listText">
													{user.name}
												</span>
												<span className="listEdit" style={{display:'none'}}>
													<input type="text" className="form-control" name="name" value={this.state.user.name} onChange={this.handleFormChange.bind(this)} />
												</span>
											</td>
											<td onClick={e => this.editInline(user)}>
												<span className="listText">
													{user.email}
												</span>
												<span className="listEdit" style={{display:'none'}}>
													<input type="text" className="form-control" name="email" value={this.state.user.email} onChange={this.handleFormChange.bind(this)} />
												</span>
											</td>
											<td onClick={e => this.editInline(user)}>
												<span className="listText" style={{textTransform:'capitalize'}}>
													{user.gender}
												</span>
												<span className="listEdit" style={{display:'none'}}>
													<select className="form-control" name="gender" value={this.state.user.gender} onChange={this.handleFormChange.bind(this)}>
														<option value="male">Male</option>
														<option value="female">Female</option>
													</select>
												</span>
											</td>
											<td onClick={e => this.editInline(user)}>
												<span className="listText" style={{textTransform:'capitalize'}}>
													{user.user_type}
												</span>
												<span className="listEdit" style={{display:'none'}}>
													<select className="form-control" name="user_type" value={this.state.user.user_type} onChange={this.handleFormChange.bind(this)}>
														<option value="user">User</option>
														<option value="admin">Administrator</option>
													</select>
												</span>
											</td>
											<td onClick={e => this.editInline(user)}>
												<span className="listText">
													{user.address}
												</span>
												<span className="listEdit" style={{display:'none'}}>
													<input type="text" className="form-control" name="address" value={this.state.user.address} onChange={this.handleFormChange.bind(this)} />
												</span>
											</td>
											<td onClick={e => this.editInline(user)}>
												<span className="listText">
													{user.description}
												</span>
												<span className="listEdit" style={{display:'none'}}>
													<input type="text" className="form-control" name="description" value={this.state.user.description} onChange={this.handleFormChange.bind(this)} />
												</span>
											</td>
											<td className={this.state.loggedId == '' ? 'text-center d-none' : ''} style={{width:'6%'}}>
												<span className="listText">
													<i className="fa fa-pencil-square-o fa-lg text-primary pr-1" title="Edit" onClick={e => this.showUserEditor(user)} style={{cursor:'pointer'}}></i>
													<i className="fa fa-trash-o fa-lg text-danger" title="Delete" onClick={e => this.confirmDelete(user.id)} style={{cursor:'pointer'}}></i>
												</span>
												<span className="listEdit" style={{display:'none'}}>
													<i className="fa fa-save fa-lg text-primary pr-1" style={{cursor:'pointer'}} onClick={this.saveInline.bind(this)} title="Save"></i>
													<i className="fa fa-times fa-lg text-danger" style={{cursor:'pointer'}} onClick={this.cancelInlineEdit} title="Cancel"></i>
												</span>
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
				<div className="row d-flex">
					<div>
						<select className="form-control" name="displayPerPage" value={this.state.displayPerPage} onChange={this.handleListChange.bind(this)}>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="30">30</option>
						</select>
					</div>
					<div className="ml-auto">
						<nav aria-label="Page navigation">
							<ul className="pagination">
								<li className={"page-item " + (this.state.pagination.prev_page == 0 ? "disabled" : "")}>
									<a className="page-link" href="" onClick={e => this.navigate(e, this.state.pagination.prev_page)}>
										Previous
									</a>
								</li>
								<li className="page-item disabled">
									<a className="page-link text-dark" href="">
										Page
										&nbsp;
										{ this.state.pagination.current_page }
										&nbsp;
										of
										&nbsp;
										{ this.state.pagination.last_page }
									</a>
								</li>
								<li className={"page-item " + (this.state.pagination.next_page > this.state.pagination.last_page ? "disabled" : "")}>
									<a className="page-link" href="" onClick={e => this.navigate(e, this.state.pagination.next_page)}>
										Next
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		);
	}
}

if (document.getElementById('userList')) {
	ReactDOM.render(<Users />, document.getElementById('userList'));
}
