<template>
	<div>
		<!-- User Editor Modal -->
		<div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<form @submit.prevent="addUser">
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
							<div class="form-group row">
								<label class="col-sm-2 col-form-label text-right">Confirm Password</label>
								<div class="col-sm-10">
									<input type="password" class="form-control" v-model="user.password1">
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
								<label class="col-sm-2 col-form-label text-right">User Type</label>
								<div class="col-sm-10">
									<select class="form-control" v-model="user.user_type">
										<option></option>
										<option value="male">Users</option>
										<option value="female">Administrator</option>
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
	</div>
</template>