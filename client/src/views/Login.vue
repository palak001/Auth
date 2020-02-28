<template>
  <section>
    <h1>Login Page</h1>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{errorMessage}}
    </div>
    <form @submit.prevent="login">
       <div class="form-group">
          <label for="username">Username</label>
          <input
           v-model="user.username"
           type="text"
           class="form-control"
           id="username"
           aria-describedby="usernameHelp">
           <h5 id="usernameHelp" class="form-text text-muted">
            Enter your Username.
           </h5>
       </div>
       <div class="form-group">
          <label for="password">Password</label>
          <input
           v-model="user.password"
           type="password"
           class="form-control"
           id="password"
           aria-describedby="passwordHelp">
           <h5 id="passwordHelp" class="form-text text-muted">
            Enter your Password.
           </h5>
       </div>
       <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </section>
</template>

<script>
import Joi from 'joi';

// schema for input validation
const schema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(2).max(30)
    .required(),
  password: Joi.string().min(6).trim().required(),
});

export default {
  data: () => ({
    errorMessage: '',
    user: {
      username: '',
      password: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    login() {
    //   console.log(this.user);
      if (this.validUser()) {
        console.log('Logging in...');
      }
    },
    validUser() {
      const result = Joi.validate(this.user, schema);
      if (result.error === null) {
        return true;
      }
      this.errorMessage = 'Invalid Credentials.';
      return false;
    },
  },
};
</script>

<style>

</style>
