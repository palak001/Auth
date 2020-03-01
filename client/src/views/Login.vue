<template>
  <section>
    <h1>Login Page</h1>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{errorMessage}}
    </div>
    <div v-if="logging">
      <img src="../assets/loading.svg" alt="loading gif"
        style = "margin:100px 500px" />
    </div>
    <form @submit.prevent="login" v-if="!logging">
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

const loginUrl = 'http://localhost:3000/auth/login';

// schema for input validation
const schema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(2).max(30)
    .required(),
  password: Joi.string().min(6).trim().required(),
});

export default {
  data: () => ({
    logging: false,
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
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };

        console.log('Logging in...');
        this.logging = true;
        fetch(loginUrl, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
          },
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }).then(() => {
          setTimeout(() => {
            this.logging = false;
            this.$router.push('/signup');
          }, 1000);
        }).catch((error) => {
          setTimeout(() => {
            this.logging = false;
            this.errorMessage = error.message;
          }, 1000);
        });
      }
    },
    validUser() {
      const result = Joi.validate(this.user, schema);
      if (result.error === null) {
        return true;
      }
      if (result.error.message.includes('username')) {
        this.errorMessage = 'Invalid username.';
      } else {
        this.errorMessage = 'Invalid Password. ';
      }
      return false;
    },
  },
};
</script>

<style>

</style>
