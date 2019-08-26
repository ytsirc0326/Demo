<template>
	<div>
		<br>
		<!-- User Editor Modal -->
		<div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<form @submit.prevent="saveUser">
						<div class="modal-header">
							<h5 class="modal-title" id="userModalLabel">
								{{ user.user_id ? "Edit User" : "Add new user" }}
							</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">

							<div v-bind:class="[{'d-none': !success}]" class="alert alert-success" role="alert">
								Successfully saved.
							</div>

							<div class="form-group row">
								<label class="col-sm-2 col-form-label text-right">Name</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" v-model="user.name">
								</div>
							</div>
							<div class="form-group row">
								<label class="col-sm-2 col-form-label text-right">E-mail</label>
								<div class="col-sm-10">
									<input type="email" class="form-control" v-model="user.email">
								</div>
							</div>
							<div class="form-group row">
								<label class="col-sm-2 col-form-label text-right">Password</label>
								<div class="col-sm-10">
									<input type="password" class="form-control" v-model="user.password">
								</div>
							</div>
							<!-- <div class="form-group row">
								<label class="col-sm-2 col-form-label text-right">Confirm Password</label>
								<div class="col-sm-10">
									<input type="password" class="form-control" v-model="user.password1">
								</div>
							</div> -->
							<div class="form-group row">
								<label class="col-sm-2 col-form-label text-right">Gender</label>
								<div class="col-sm-10">
									<select class="form-control" v-model="user.gender">
										<option></option>
										<option value="male">Male</option>
										<option value="female">Female</option>
									</select>
								</div>
							</div>
							<div class="form-group row">
								<label class="col-sm-2 col-form-label text-right">User Type</label>
								<div class="col-sm-10">
									<select class="form-control" v-model="user.user_type">
										<!-- <option></option> -->
										<option value="user">User</option>
										<option value="admin">Administrator</option>
									</select>
								</div>
							</div>
							<div class="form-group row">
								<label class="col-sm-2 col-form-label text-right">Address</label>
								<div class="col-sm-10">
									<textarea class="form-control" v-model="user.address" rows="1"></textarea>
								</div>
							</div>
							<div class="form-group row">
								<label class="col-sm-2 col-form-label text-right">Description</label>
								<div class="col-sm-10">
									<textarea class="form-control"  v-model="user.description"rows="1"></textarea>
								</div>
							</div>

						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
							<button type="submit" class="btn btn-primary">Save</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- End User Editor Modal -->

		<!-- Start Delete Modal -->
		<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-body">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<div class="p-4">
							<h4>Are you sure you want to delete this user ?</h4>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">
							Cancel
						</button>
						<button type="button" class="btn btn-danger" @click="deleteUser()">
							Yes
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- End Delete Modal -->

		<!-- <div class="row" style="padding-bottom: 10px;: ">
			<h2>Users</h2>
		</div> -->

		<div class="row d-flex">
			<div class="" v-if="loginId !== ''">
				<button class="btn btn-primary mb-2" @click="addNew()">
					<i class="fa fa-plus"></i>
					Add New
				</button>
			</div>
			<div class="col-md-3 input-group mb-3 ml-auto" style="padding-left:0 !important;">
				<input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="my-search" v-model="searchTxt" @blur="fetchUsers()" @keypress="fetchUsers()">
				<div class="input-group-append">
					<span class="input-group-text" id="my-search"><i class="fa fa-search"></i></span>
				</div>
			</div>
		</div>

		<!-- <usereditmodal></usereditmodal> -->

		<div class="row">
			<table class="table table-bordered table-striped table-sm">
				<thead>
					<th style="width:15%;cursor:pointer;" @click="sort('name')">
						Name
						<i class="fa fa-fw fa-sort" style="float:right;padding:3px;"></i>
					</th>
					<th style="width:20%;cursor:pointer;" @click="sort('email')">
						Email
						<i class="fa fa-fw fa-sort" style="float:right;padding:3px;"></i>
					</th>
					<th style=";width:9%;cursor:pointer;" @click="sort('gender')">
						Gender
						<i class="fa fa-fw fa-sort" style="float:right;padding:3px;"></i>
					</th>
					<th style=";cursor:pointer;" @click="sort('user_type')" v-if="loginId !== ''">
						User Type
						<i class="fa fa-fw fa-sort" style="float:right;padding:3px;"></i>
					</th>
					<th style=";width:20%;cursor:pointer;" @click="sort('address')">
						Address
						<i class="fa fa-fw fa-sort" style="float:right;padding:3px;"></i>
					</th>
					<th>Description</th>
					<th style="width:7%" v-if="loginId !== ''">&nbsp;</th>
				</thead>
				<tbody>
					<tr v-for="user in users" v-bind:key="user.id" :id="user.id">
						<td @click="editInline(user.id)">
							<span class="list_text">
								{{ user.name }}
							</span>
							<span class="list_edit" style="display:none;">
								<input type="text" class="form-control name" v-model="user.name">
							</span>
						</td>
						<td @click="editInline(user.id)">
							<span class="list_text">
								{{ user.email }}
							</span>
							<span class="list_edit" style="display:none;">
								<input type="text" class="form-control email" v-model="user.email">
							</span>
						</td>
						<td @click="editInline(user.id)">
							<span class="list_text" style="text-transform:capitalize;">
								{{ user.gender }}
							</span>
							<span class="list_edit" style="display:none;">
								<select class="form-control gender">
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
							</span>
						</td>
						<td @click="editInline(user.id)" v-if="loginId !== ''">
							<span class="list_text" style="text-transform:capitalize;">
								{{ user.user_type }}
							</span>
							<div class="list_edit" style="display:none;">
								<select class="form-control user_type" v-model="user.user_type">
									<option value="user">User</option>
									<option value="admin">Administrator</option>
								</select>
							</div>
						</td>
						<td @click="editInline(user.id)">
							<span class="list_text">
								{{ user.address }}
							</span>
							<span class="list_edit" style="display:none;">
								<input type="text" class="form-control address" v-model="user.address">
							</span>
						</td>
						<td @click="editInline(user.id)">
							<span class="list_text">
								{{ user.description }}
							</span>
							<span class="list_edit" style="display:none;">
								<input type="text" class="form-control description" v-model="user.description">
							</span>
						</td>
						<td class="text-center" v-if="loginId !== ''">
							<span class="list_text">
								<i class="fa fa-pencil-square-o fa-lg text-primary" style="cursor: pointer;" @click="editUser(user)" title="Edit"></i>
								<i class="fa fa-trash-o fa-lg text-danger" style="cursor: pointer;" @click="confirmDelete(user.id)" title="Delete"></i>
							</span>
							<span class="list_edit" style="display:none;">
								<i class="fa fa-save fa-lg text-primary" style="cursor: pointer;" @click="saveInline(user.id)" title="Save"></i>
								<i class="fa fa-times fa-lg text-danger" style="cursor: pointer;" @click="cancelInlineEdit()" title="Cancel"></i>
							</span>

						</td>
					</tr>	
				</tbody>
			</table>
		</div>

		<div class="row d-flex">
			<div>
				<select class="form-control" v-model="displayPerPage" @change="refreshPage">
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
				</select>
			</div>
			<div class="ml-auto">
				<nav aria-label="Page navigation">
					<ul class="pagination">
						<li v-bind:class="[{disabled: !pagination.prev_page_url}]" class="page-item">
							<a class="page-link" href="" @click.prevent="navigate(pagination.prev_page)">Previous</a>
						</li>
						<li class="page-item disabled">
							<a class="page-link text-dark" href="#">
								Page {{ pagination.current_page }} of {{ pagination.last_page }}
							</a>
						</li>
						<li v-bind:class="[{disabled: !pagination.next_page_url}]" class="page-item">
							<a class="page-link" href="" @click.prevent="navigate(pagination.next_page)">Next</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>
</template>

<script>

	// import navbar from './components/NavBar';
	// import usereditmodal from './UserEdit';

	$(document).on('click', 'button:button.close_modal', function ( event ) {
		event.preventDefault();
		var $this = $(event.currentTarget);
		$('#userModalLabel').modal('hide');
	});

	export default {
		// components: {
		// 	usereditmodal
		// },
		props: { userdata: Object },
		data() {
			return {
				users: [],
				user: {
					id: '',
					name: '',
					email: '',
					password: '',
					gender: '',
					user_type: '',
					address: '',
					description: '',
				},
				loginId: this.userdata.id,
				user_id: '',
				pagination: {},
				edit: false,
				success:false,
				searchTxt:'',
				sortKey:'id',
				sortDir:'desc',
				displayPerPage: 10
			}
		},
		
		created() {
			this.fetchUsers();
		},

		methods: {
			fetchUsers(page_url) {
				let vm = this;

				page_url = page_url || 'api/users';
				page_url += `?sortKey=${this.sortKey}`;
				page_url += `&sortDir=${this.sortDir}`;
				page_url += `&page=${this.pagination.current_page}`;
				page_url += `&displayPerPage=${this.displayPerPage}`;

				if (this.searchTxt) {
					page_url += `&search=${this.searchTxt}`;
				}

				// console.log("page_url: " + page_url);

				fetch(page_url,)
				.then(res => res.json())
				.then(res => {
					this.users = res.data;
					vm.makePagination(res.meta, res.links);
				})
				.catch(err => console.log(err));
			},
			makePagination(meta, links) {
				let pagination = {
					current_page: meta.current_page,
					prev_page: meta.current_page - 1,
					next_page: meta.current_page + 1,
					last_page: meta.last_page,
					next_page_url: links.next,
					prev_page_url: links.prev
				}
				this.pagination = pagination;
			},
			navigate(pageNum) {
				this.pagination.current_page = pageNum;
				this.pagination.prev_page = pageNum - 1;
				this.pagination.next_page = pageNum + 1;
				this.fetchUsers();
			},
			sort(key) {

				if (this.sortKey == key) {
					this.sortDir = this.sortDir == "asc"? "desc" : "asc";
				} else {
					this.sortKey = key;
					this.sortDir ="asc";
				}

				this.fetchUsers();
			},
			confirmDelete(id) {
				this.user.id = id;
				$('#deleteModal').modal('show');
			},
			deleteUser() {

				let id = this.user.id;
				this.user.id = "";

				fetch(`api/user/${id}`, {
					method: 'delete'
				})
				.then(res => res.json())
				.then(data => {
					// alert("User Removed!");
					$('#deleteModal').modal('hide');
					this.fetchUsers();
				})
				.catch(err => console.log(err));
			},
			saveUser() {
				if (this.edit === false) {
					// Add
					fetch('api/user', {
						method: 'post',
						body: JSON.stringify(this.user),
						headers: {
							'content-type': 'application/json'
						}
					})
					.then(res => res.json())
					.then(data => {
						this.success = true;
						this.fetchUsers();
					})
				}
				else {
					// Update
					fetch('api/user', {
						method: 'put',
						body: JSON.stringify(this.user),
						headers: {
							'content-type': 'application/json'
						}
					})
					.then(res => res.json())
					.then(data => {
						this.success = true;
						this.edit = false;
						this.fetchUsers();
					})
				}
			},
			editUser(user) {
				this.success = false;
				this.edit = true;
				this.user.id = user.id;
				this.user.user_id = user.id;
				this.user.name = user.name;
				this.user.email = user.email;
				this.user.password = "";
				this.user.gender = user.gender;
				this.user.user_type = user.user_type;
				this.user.address = user.address;
				this.user.description = user.description;
				$('#userModal').modal('show');
			},
			addNew() {
				this.success = false;
				this.edit = false;
				this.user.user_id = "";
				this.user.id = "";
				this.user.name = "";
				this.user.email = "";
				this.user.password = "";
				this.user.gender = "";
				this.user.user_type = "";
				this.user.address = "";
				this.user.description = "";
				$('#userModal').modal('show');
			},
			editInline(id) {
				if (this.loginId == '') {
					return;
				}
				this.cancelInlineEdit();
				$("#"+id).find(".list_text").hide();
				$("#"+id).find(".list_edit").show();
			},
			cancelInlineEdit() {
				$(".list_text").show();
				$(".list_edit").hide();
			},
			saveInline(id) {
				this.user.user_id = id;
				this.user.id = id;
				this.user.name = $("#"+id).find("input.name").val();
				this.user.email = $("#"+id).find("input.email").val();
				this.user.gender = $("#"+id).find("select.gender").val();
				this.user.user_type = $("#"+id).find("select.user_type").val();
				this.user.address = $("#"+id).find("input.address").val();
				this.user.description = $("#"+id).find("input.description").val();
				this.edit = true;
				this.saveUser();
				this.cancelInlineEdit();
			},
			refreshPage(e) {
				this.fetchUsers();
			}
		}

	}
</script>
