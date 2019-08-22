<template>

<div class="row justify-content-center">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">Profile</div>

            <div class="card-body">

            	<div v-bind:class="[{'d-none': !success}]" class="alert alert-success" role="alert">
					Successfully saved.
				</div>

                <form @submit.prevent="saveUser">
                    <div class="form-group row">
                        <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                        <div class="col-md-6">
                            <input type="text" class="form-control" v-model="user.name">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                        <div class="col-md-6">
                            <input type="email" class="form-control" v-model="user.email">

                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                        <div class="col-md-6">
                            <input type="password" class="form-control" v-model="user.password"d>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="gender" class="col-md-4 col-form-label text-md-right">Gender</label>

                        <div class="col-md-6">
                            <select class="form-control" v-model="user.gender">
                                <option></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="address" class="col-md-4 col-form-label text-md-right">Address</label>

                        <div class="col-md-6">
                            <textarea class="form-control" v-model="user.address" rows="1"></textarea>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="description" class="col-md-4 col-form-label text-md-right">Description</label>

                        <div class="col-md-6">
                            <textarea class="form-control"  v-model="user.description" rows="1"></textarea>
                        </div>
                    </div>

                    <div class="form-group row mb-0">
                        <div class="col-md-6 offset-md-4">
                            <button type="submit" class="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
	props: { userdata: Object },
	data() {
			return {
				user: {
					id: '',
					name: '',
					email: '',
					password: '',
					gender: '',
					address: '',
					description: '',
					user_type:''
				},
				loginId: this.userdata.id,
				user_id: '',
				success:false,
			}
		},
		created() {
			this.fetchUsers();
		},
		methods: {
			fetchUsers() {
				let id = this.loginId;
				fetch(`api/user/${id}`)
				.then(res => res.json())
				.then(res => {
					this.user.id = res.data.id;
					this.user.user_id = res.data.id;
					this.user.name = res.data.name;
					this.user.email = res.data.email;
					this.user.password = res.data.password;
					this.user.gender = res.data.gender;
					this.user.address = res.data.address;
					this.user.description = res.data.description;
					this.user.user_type = res.data.user_type;
				})
				.catch(err => console.log(err));
			},
			saveUser() {
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
				})
				.catch(err => console.log(err));
			}
		}
}
</script>