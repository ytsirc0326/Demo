<template>
<div class="row justify-content-center">
	<div class="col-12">
		<br>
		<div class="card">
			<div class="card-header">
				<span class="h4">Profile</span>
			</div>
			<div class="card-body">

					<form @submit.prevent="saveUser">

						<div v-bind:class="[{'d-none': !success}]" class="alert alert-success alert-dismissible fade show" role="alert">
							<strong>
								Success! &nbsp;
							</strong>
							Data saved.
							<!-- <button type="button" class="close" data-dismiss="alert" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button> -->
						</div>

						<div v-bind:class="[{'d-none': !error}]" class="alert alert-danger alert-dismissible fade show" role="alert">
							<strong>
								Error! &nbsp;
							</strong>
							<span id="err"></span>
							<!-- <button type="button" class="close" data-dismiss="alert" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button> -->
						</div>

						<div class="row">

							<div class="col col-7">

								<div class="form-group row">
									<label for="name" class="col-md-3 col-form-label">
										Full Name
									</label>
									<div class="col-md-9">
										<input type="text" class="form-control" v-model="user.name">
									</div>
								</div>

								<div class="form-group row">
									<label for="email" class="col-md-3 col-form-label">Email Address</label>
									<div class="col-md-9">
										<input type="email" class="form-control" v-model="user.email">
									</div>
								</div>

								<div class="form-group row">
									<label for="password" class="col-md-3 col-form-label">Password</label>
									<div class="col-md-9">
										<input type="password" class="form-control" v-model="user.password">
									</div>
								</div>

								<div class="form-group row">
									<label for="password" class="col-md-3 col-form-label">Confirm Password</label>
									<div class="col-md-9">
										<input type="password" class="form-control" v-model="user.password1">
									</div>
								</div>

								<div class="form-group row">
									<label for="gender" class="col-md-3 col-form-label">Gender</label>
									<div class="col-md-9">
										<select class="form-control" v-model="user.gender">
											<option value="male">Male</option>
											<option value="female">Female</option>
										</select>
									</div>
								</div>

								<div class="form-group row">
									<label for="address" class="col-md-3 col-form-label">
										Address
									</label>
									<div class="col-md-9">
										<textarea class="form-control" v-model="user.address" rows="1"></textarea>
									</div>
								</div>
								<div class="form-group row">
									<label for="description" class="col-md-3 col-form-label">
										Description
									</label>
									<div class="col-md-9">
										<textarea class="form-control"  v-model="user.description" rows="2"></textarea>
									</div>
								</div>

							</div>

							<div class="col col-5">

								<div class="form-group row">
									<div class="col-md-12 text-right" style="padding-top:5px;">

										<img :src="user.image"
											v-if="!imgSrc"
											class="rounded mx-auto d-block"
											style="
												border:1px solid #F4F4F4;
												width:300px;
												height:300px;
											"
										>

										<vue-cropper
											ref='cropper'
											:guides="true"
											:view-mode="2"
											drag-mode="crop"
											:auto-crop-area="0.5"
											:min-container-width="300"
											:min-container-height="300"
											:background="true"
											:rotatable="true"
											:src="imgSrc"
											alt="Source Image"
											:img-style="{ 'width': '300px', 'height': '300px' }"
											v-if="imgSrc"
											>
										</vue-cropper>
									</div>
								</div>

								<div class="form-group row" v-if="!imgEdit && user.image != 'images/no_image.png'">
									<div class="col col-md-12 text-center">
										<button type="button"
											class="btn btn-success"
											@click="editImage"
										>
											Edit Image
										</button>
									</div>
								</div>

								<div class="form-group row" v-if="imgSrc">
									<div class="col col-md-12 text-center">
										<button type="button"
											class="btn btn-success"
											style="
												padding-left:25px;
												padding-right:25px;"
											@click="cropImage"
										>
											Crop
										</button>
										<button type="button"
											class="btn btn-success"
											style="
												padding-left:18px;
												padding-right:18px;
												"
											@click="rotate"
											>
											Rotate
										</button>
										<button type="button"
											class="btn btn-success"
											style="
												padding-left:18px;
												padding-right:18px;
												"
											@click="cancelEdit"
											>
											Cancel
										</button>
									</div>
								</div>

								<div class="form-group row">
									<div class="col col-md-12">
										<div class="input-group">
											<div class="custom-file">
												<input type="file" class="custom-file-input" name="image" accept="image/*" @change="setImage">
												<label class="custom-file-label">Choose file</label>
											</div>
										</div>
									</div>
								</div>

							</div>

					</div>

					<div class="row">
						<div class="col col-12 text-right">
							
						</div>
					</div>

						<hr style="width:100%;border:2px solid #f4f4f4;">
					<div class="row">
						<div class="col col-8">
							<!-- <Tweet id="539487832448843776">
							<Timeline id="twitterdev" sourceType="profile" :options="{ tweetLimit: '3' }"/></Tweet> -->
							<!-- <vue-instagram token="12366736292.1677ed0.c0ad605004d048fc939744362eedbae1" :count="5" :tags="['hashtag1', 'hashtag2']" mediaType="image">
								<template slot="feeds" slot-scope="props">
									<li class="fancy-list"> {{ props.feed.link }} </li>
								</template>
								<template slot="error" slot-scope="props">
									<div class="fancy-alert"> {{ props.error.error_message }} </div>
								</template>
							</vue-instagram> -->
							<social-sharing url="https://vuejs.org/" inline-template>
								<div>
									<network network="facebook" style="padding-left:5px;cursor:pointer;">
										<i class="fa fa-fw fa-facebook text-primary"></i>
										facebook
									</network>
									<network network="googleplus" style="padding-left:5px;cursor:pointer;">
									<i class="fa fa-fw fa-google-plus text-danger"></i> Google +
									</network>
									<network network="linkedin" style="padding-left:5px;cursor:pointer;">
										<i class="fa fa-fw fa-linkedin text-primary"></i> LinkedIn
									</network>
									<network network="pinterest" style="padding-left:5px;cursor:pointer;">
										<i class="fa fa-fw fa-pinterest text-danger"></i> Pinterest
									</network>
									<!-- <network network="reddit" style="padding-left:5px;cursor:pointer;">
										<i class="fa fa-fw fa-reddit"></i> Reddit
									</network> -->
									<network network="twitter" style="padding-left:5px;cursor:pointer;">
										<i class="fa fa-fw fa-twitter text-primary"></i> Twitter
									</network>
									<!-- <network network="vk" style="padding-left:5px;cursor:pointer;">
										<i class="fa fa-vk text-primary"></i> VKontakte
									</network> -->
									<!-- <network network="weibo" style="padding-left:5px;cursor:pointer;">
										<i class="fa fa-weibo text-danger"></i>
										Weibo
									</network> -->
									<network network="whatsapp" style="padding-left:5px;cursor:pointer;">
										<i class="fa fa-fw fa-whatsapp text-success"></i>
										Whatsapp
									</network>
								</div>
							</social-sharing>
						</div>
						<div class="col col-4 text-right">
							<button type="submit" class="btn btn-primary btn-lg" style="padding-left:35px;padding-right:35px;">
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

import axios from 'axios';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

import { Tweet, Moment, Timeline } from 'vue-tweet-embed';
import Vue from 'vue'
import VueInstagram from 'vue-instagram';

export default {
	components: {
		VueCropper,
		Tweet,
		Moment,
		Timeline,
		VueInstagram
	},
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
					user_type:'',
					image:'images/no_image.png'
				},
				user_id: this.userdata.id,
				success: false,
				error: '',
				imgSrc:'',
				imgEdit:false
			}
		},
		created() {
			this.fetchUsers();
		},
		methods: {
			fetchUsers() {
				let id = this.user_id;
				fetch(`api/user/${id}`)
				.then(res => res.json())
				.then(res => {
					this.user.id = res.data.id;
					this.user.user_id = res.data.id;
					this.user.name = res.data.name;
					this.user.email = res.data.email;
					this.user.password = "";
					this.user.gender = res.data.gender;
					this.user.address = res.data.address;
					this.user.description = res.data.description;
					this.user.user_type = res.data.user_type;
					this.user.image = res.data.image ? res.data.image : this.user.image;
				})
				.catch(err => console.log(err));
			},
			saveUser() {

				let err = [];
				this.error = "";
				this.success = "";

				if (!this.user.name) err.push('Please fill Full Name.');
				if (!this.user.email) err.push('Please fill E-mail.');
				if (this.user.password && this.user.password != this.user.password1)
					err.push('Passwords did not match.');

				if (err.length > 0) {
					if (err.length > 1) {
						let err_html = "<ul>";
						for (var i = 0; i < error.length; i++) {
							err_html += "<li>" + err[i] + "</li>";
						}
						err_html += "</ul>";
						this.error = err_html;
					} else {
						this.error = err[0];
					}
					$("#err").html(this.error);
					return;
				}

				let vm = this;
				const config = {
					headers: { 'content-type': 'multipart/form-data' }
				}

				let imgFile = this.user.image;
				if (this.user.image.indexOf("base64") !== -1) {
					imgFile = this.base64ToImg(this.user.image, "profile.png");
				}

				let fD = new FormData();
				fD.append('id', this.user.id);
				fD.append('name', this.user.name);
				fD.append('email', this.user.email);
				fD.append('password', this.user.password);
				fD.append('gender', this.user.gender);
				fD.append('address', this.user.address);
				fD.append('description', this.user.description);
				fD.append('user_type', this.user.user_type);
				fD.append('image', imgFile);

				axios.post('api/user', fD, config)
				.then(function (response) {
					vm.success = true;
				})
			},
			setImage(e) {

				this.imgEdit = false;
				this.imgSrc = "";
				const file = e.target.files[0];

				if (!file.type.includes('image/')) {
					alert('Please select an image file');
					return;
				}
				if (typeof FileReader === 'function') {
					const reader = new FileReader();
						reader.onload = (event) => {
						this.user.image = event.target.result;
					};
					reader.readAsDataURL(file);
				} else {
					alert('Sorry, FileReader API not supported');
				}
			},
			cropImage(evt) {
				evt.preventDefault();
				this.user.image = this.$refs.cropper.getCroppedCanvas().toDataURL();
				this.imgSrc = "";
				this.imgEdit = false;
			},
			rotate(evt) {
				evt.preventDefault();
				this.$refs.cropper.rotate(90);
			},
			cancelEdit(evt) {
				this.imgEdit = false;
				this.imgSrc = "";
			},
			editImage(evt) {
				this.imgEdit = true;
				this.imgSrc = this.user.image;
			},
			base64ToImg(dataurl, filename) {
				let arr = dataurl.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);
				while(n--){
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], filename, {type:mime});
			},
		}
}
</script>