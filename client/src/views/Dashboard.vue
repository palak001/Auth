<template>
  <section>
    <h1>Dashboard</h1>
    <h4 v-if="!user">Getting user information...</h4>
    <h4 v-if="user">Hello, {{ user.username }}</h4>
    <button @click="logout()" class="btn btn-primary" style="margin:10px 0px">Logout</button>
    <br />
    <button @click="showForm=!showForm" class="btn btn-primary" style="margin:10px 0px">
      Toggle the form </button>
    <div v-if="posting">
      <img src="../assets/loading.svg" alt="loading gif"
        style = "margin:100px 500px"/>
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
    </div>
    <form @submit.prevent="post" v-if="showForm && !posting">
      <div class="form-group">
        <label for="title">Title</label>
        <input
        v-model="note.title"
        type="text"
        class="form-control"
        id="title"
        placeholder="Enter a descriptive title for your Note"
        aria-describedby="titleHelp" required>
        <h5 id="titleHelp" class="form-text text-muted">
          Enter a descriptive title for your Note(max 100)
        </h5>
      </div>
      <div class="form-group">
        <label for="note">Note</label>
        <textarea
        v-model="note.description"
        class="form-control"
        id="note"
        rows="3"
        placeholder="Enter your Note" required>
        </textarea>
      </div>
      <button type="submit" class="btn btn-primary">Post</button>
    </form>
  </section>
</template>

<script>
const API_URL = 'http://localhost:3000/';
export default {
  data: () => ({
    user: null,
    showForm: false,
    errorMessage: '',
    posting: false,
    note: {
      title: '',
      description: '',
    },
  }),
  watch: {
    note: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  mounted() {
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.user) {
          this.user = result.user;
        } else {
          this.logout();
        }
      });
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    post() {
      // console.log(this.note);
      this.errorMessage = '';
      this.posting = true;
      fetch(`${API_URL}api/v10/notes`, {
        method: 'POST',
        body: JSON.stringify(this.note),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }).then((result) => {
        setTimeout(() => {
          console.log(result);
          this.posting = false;
          this.note = {
            title: '',
            description: '',
          };
        }, 1000);
      }).catch((error) => {
        setTimeout(() => {
          this.posting = false;
          this.errorMessage = error.message;
          if (this.errorMessage.includes('title')) {
            this.errorMessage = 'Title is way too long!';
          }
        }, 1000);
      });
    },
  },
};
</script>

<style>

</style>
