<template>
	<div>
		<br>

		<!-- User Editor Modal -->
		<div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<form @submit.prevent="addUser">
						<div class="modal-header">
							<h5 class="modal-title" id="userModalLabel">
								{{ user_id ? "Edit User" : "Add new user" }}
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

		<div class="row" style="padding-bottom: 10px;: ">
			<h2>Users</h2>
		</div>

		<div class="row d-flex">

			<div class="col-md-3 input-group mb-3">
				<input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="my-search">
				<div class="input-group-append">
					<span class="input-group-text" id="my-search"><i class="fa fa-search"></i></span>
				</div>
				</div>

			<div class="ml-auto" v-if="loginId !== ''">
				<button class="btn btn-primary mb-2" @click="addNew()">
					<i class="fa fa-plus"></i>
					Add New
				</button>
			</div>
		</div>

		<div class="row">
			<table class="table table-bordered table-striped">
				<thead>
					<th>Name</th>
					<th>Email</th>
					<th>Gender</th>
					<th>Address</th>
					<th>Description</th>
					<th style="width:7%" v-if="loginId !== ''">&nbsp;</th>
				</thead>
				<tbody>
					<tr v-for="user in users" v-bind:key="user.id">
						<td> {{ user.name }} </td>
						<td> {{ user.email }} </td>
						<td> {{ user.gender }} </td>
						<td> {{ user.address }} </td>
						<td> {{ user.description }} </td>
						<td class="text-center" v-if="loginId !== ''">
							<i class="fa fa-pencil-square-o fa-lg text-primary" style="cursor: pointer;" @click="editUser(user)"></i>
							<i class="fa fa-trash-o fa-lg text-danger" style="cursor: pointer;" @click="confirmDelete(user.id)"></i>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class=" row d-flex flex-row-reverse">
			<div>
				<nav aria-label="Page navigation">
					<ul class="pagination">
						<li v-bind:class="[{disabled: !pagination.prev_page_url}]" class="page-item">
							<a class="page-link" href="" @click.prevent="fetchUsers(pagination.prev_page_url)">Previous</a>
						</li>
						<li class="page-item disabled">
							<a class="page-link text-dark" href="#">
								Page {{ pagination.current_page }} of {{ pagination.last_page }}
							</a>
						</li>
						<li v-bind:class="[{disabled: !pagination.next_page_url}]" class="page-item">
							<a class="page-link" href="" @click.prevent="fetchUsers(pagination.next_page_url)">Next</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>
</template>

<script>

	// import navbar from './components/NavBar';

	$(document).on('click', 'button:button.close_modal', function ( event ) {
		event.preventDefault();
		var $this = $(event.currentTarget);
		$('#userModalLabel').modal('hide');
	});

	export default {
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
					address: '',
					description: '',
				},
				loginId: this.userdata.id,
				user_id: '',
				pagination: {},
				edit: false,
				success:false,
			}
		},
		
		created() {
			this.fetchUsers();
		},

		methods: {
			fetchUsers(page_url) {
				let vm = this;
				page_url = page_url || 'api/users';
				console.log("page_url: " + page_url);
				fetch(page_url)
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
					last_page: meta.last_page,
					next_page_url: links.next,
					prev_page_url: links.prev
				}

				this.pagination = pagination;
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
			addUser() {
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
						this.fetchUsers(`api/users?page=${this.pagination.current_page}`);
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
				this.user.password = user.password;
				this.user.gender = user.gender;
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
				this.user.address = "";
				this.user.description = "";
				$('#userModal').modal('show');
			}
		}
	}
</script>