<template>
  <div class="container">
    <div class="row d-flex justify-content-center mt-5">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card py-3 px-2">
          <p class="text-center mb-3 mt-2" style="color: wheat">Please Sign In using {{ name }}</p>
          <div class="row mx-auto ">
            <div class="col-4">
              <a @click="signin" class="btn btn-social btn-github">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="row mt-5 ml-5 pl-5" v-if="showError" style="color: #6f1e1e">
          An error occurred! Try again.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
  data() {
    return {
      showError: false
    };
  },
  methods: {
    signin() {
      // Initializes OAuth.io with API key
      // window.OAuth.initialize(process.env.OAUTH_API_KEY);
      window.OAuth.initialize('928BpUmLUwCP4Eyrdztno8K0utw');

      // Popup github and ask for authorization
      window.OAuth.popup('github').then((github) => {
        github.get('/user').then(userData => {
          // call api and send the login data, a jwt will be returned
          this.postDataToAPI("/auth/login", {
            "user":
                {
                  "access_token": github.access_token,
                  "userData": userData
                }
          })
              .then(response => response.json())
              .then(data => {
                if (Object.keys(data).length !== 0) {
                  let token = data.token;
                  localStorage.setItem("user", token);
                  // navigate to profile page
                  this.$router.push("/profile");
                } else {
                  this.showError = !this.showError
                }
              });
        });
      });
    }
  }
}
</script>
