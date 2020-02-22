<template>
    <section>
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
        </div>
        <h1>Signup</h1>
        <form @submit.prevent="signup">
            <div class="form-group">
                <label for="username">Username</label>
                <input
                v-model="user.username"
                type="text"
                class="form-control"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter a username" required>
                <h5
                id="usernameHelp"
                class="form-text text-muted">
                Only alpha numeric and underscores.
                Must be atleast 2 and atmost 30 char
                </h5>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                v-model="user.password"
                type="password"
                class="form-control"
                id="password"
                aria-describedby="passwordHelp"
                placeholder="Enter a password" required>
                <h5
                id="passwordHelp"
                class="form-text text-muted">
                Must be atleast 10 or more char long
                </h5>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confim Password</label>
                <input
                v-model="user.confirmPassword"
                type="password"
                class="form-control"
                id="confirmPassword"
                aria-describedby="confirmPasswordHelp"
                placeholder="Enter a password" required>
                <h5
                id="confimPasswordHelp"
                class="form-text text-muted">
                Please confirm your password
                </h5>
            </div>
            <button type="submit" class="btn btn-primary">Signup</button>
        </form>
    </section>
</template>

<script>
import Joi from 'joi';

const schema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(2).max(30)
    .required(),
  password: Joi.string().trim().min(6).required(),
  confirmPassword: Joi.string().trim().min(6).required(),
});

export default {
  data: () => ({
    errorMessage: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
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
    signup() {
      this.errorMessage = '';
      if (this.validUser()) {
        console.log('User is valid...');
      }
    },
    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Passwords must match.';
        return false;
      }
      const result = Joi.validate(this.user, schema);
      if (result.error === null) {
        return true;
      }

      this.errorMessage = result.error;
      if (result.error.message.includes('username')) {
        this.errorMessage = 'Username is invalid.';
      } else {
        this.errorMessage = 'Password is invalid.';
      }
      return false;
    },
  },
};
</script>
<style>

</style>
