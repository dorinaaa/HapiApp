<template>
  <div class="container">
    <b-card
        bg-variant="dark"
        header="Vue_JWT_APP"
        text-variant="white"
        class="text-center"
    >
      <div class="row">
        <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">

          <button @click="authenticate('github')">auth Github</button>

        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    authenticate: function (provider) {
      this.$auth.authenticate(provider).then(response => {
        console.log('dorina')
        console.log(response)
      }).catch(err => {
        console.log({err: err})
      })
    },
  }
};
</script>