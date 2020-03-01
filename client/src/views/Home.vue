<template>
  <div class="home text-center" >
    <div class="jumbotron">
      <h1 class="display-3">Authentication</h1>
      <p class="lead">Learning Auths.</p>
      <hr class="my-4">
      <p>Enjoying!</p>
      <p class="lead">
        <router-link
         class="btn btn-primary btn-lg"
         :to="{name:'signup'}"
         role="button">Sign Up</router-link>
        <router-link
         class="btn btn-primary btn-lg"
         :to="{name:'login'}"
         role="button" style = "margin-left: 20px">login</router-link>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
};
</script>
