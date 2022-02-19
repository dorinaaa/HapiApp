<template>
  <div class="container">
    <div class="row d-flex justify-content-center mt-5">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card py-3 px-2">
          <p class="text-center mb-3 mt-2">Please Sign In using {{name}}</p>
          <div class="row mx-auto ">
            <div class="col-4">
              <a @click="signin" class="btn btn-social btn-github">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  },
  methods: {
    signin() {
      // Initializes OAuth.io with API key
      // window.OAuth.initialize(process.env.OAUTH_API_KEY);
      window.OAuth.initialize('928BpUmLUwCP4Eyrdztno8K0utw');

      // Popup github and ask for authorization
      window.OAuth.popup('github').then((github) => {
        console.log('github:', github);
        github.me().then((data) => {
          console.log("data: ", data);
          // alert("Your Github email: " + data.email + ".\nCheck console logs for more info.");
        });
        github.get('/user').then(data => {
          console.log('self data:', data);
        });

        // call api and send the login data, a jwt will be returned
        // let response = this.$http.post("/auth/login", github);
        // let token = response.data.data.token;
        let token = 'response.data.data.token';
        localStorage.setItem("user", token);
        // navigate to profile page
        this.$router.push("/profile");
      });
    }
  }
}
</script>
