<template>
  <section>
    <h1>Login Page</h1>
    <form>
       <div class="form-group">
          <label for="username">Username</label>
          <input
           type="text"
           class="form-control"
           id="username"
           aria-describedby="usernameHelp">
           <h5 id="usernameHelp" class="form-text text-muted">
            Enter Username.
           </h5>
       </div>
       <div class="form-group">
          <label for="password">Password</label>
          <input
           type="password"
           class="form-control"
           id="password"
           aria-describedby="passwordHelp">
           <h5 id="passwordHelp" class="form-text text-muted">
            Enter Password.
           </h5>
       </div>
    </form>
  </section>
</template>

<script>
export default {

};
</script>

<style>

</style>
