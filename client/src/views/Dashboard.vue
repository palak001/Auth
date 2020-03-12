<template>
  <section>
    <h1>Dashboard</h1>
    <h4 v-if="!user">Getting user information...</h4>
    <h4 v-if="user">Hello, {{ user.username }}</h4>
    <button @click="logout()" class="btn btn-primary" style="margin:10px 0px">Logout</button>
    <br />
    <div v-if="searching">
      <img src="../assets/loading.svg" alt="loading gif"
        style = "margin:100px 500px"/>
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
    </div>
    <form @submit.prevent="searchBook()" v-if="!searching">
      <div class="form-group">
        <label for="bookSearch">Book Name</label>
        <input
        v-model="book.bookName"
        type="text"
        class="form-control"
        id="bookSearch"
        placeholder="Enter a book name">
      </div>
      <button type="submit" class="btn btn-primary">Search</button>
    </form>
    <h3 style="margin-top:30px">Books</h3>
    <section>
      <div class="row">
        <div class="col-3"
          v-for="book in this.books.items"
          :key="book.id">
          <div class="card border-info mb-3" style="max-width: 30rem;">
            <h3 class="card-header">{{book.volumeInfo.title}}</h3>
            <p v-if="book.volumeInfo.imageLinks">
              <img :src="book.volumeInfo.imageLinks.smallThumbnail" alt="Card image">
            </p>
            <p v-else>
              <img src="../assets/flakes.jpg" alt="Card image">
            </p>
            <!--<div class="card-body description">
              <p class="card-text">{{book.volumeInfo.description}}</p>
            </div> -->
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-if="book.volumeInfo.authors">
                <h5 style="display:inline">Author:  </h5> {{book.volumeInfo.authors[0]}}</li>
              <li class="list-group-item" v-else>
                <h5 style="display:inline">Author:  </h5> -</li>
              <li class="list-group-item">
                <h5 style="display:inline">Pages:  </h5> {{book.volumeInfo.pageCount}}</li>
              <li class="list-group-item">
                <h5 style="display:inline">BookId:  </h5> {{book.id}}</li>
            </ul>
            <div class="card-body">
              <a :href="book.volumeInfo.previewLink" class="card-link">Preview</a>
              <a href="#" class="card-link" @click="addBook()">Add this Book</a>
            </div>
            <!-- <div class="card-footer text-muted">
              2 days ago
            </div> -->
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
const API_URL = 'http://localhost:3000/';
export default {
  data: () => ({
    user: null,
    errorMessage: '',
    searching: false,
    note: {
      title: '',
      description: '',
    },
    notes: [],
    book: {
      bookName: '',
    },
    books: [],
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
        if (result.user) {
          this.user = result.user;
          this.getNotes();
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
    getNotes() {
      fetch(`${API_URL}api/v1/notes`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json())
        .then((notes) => {
          this.notes = notes;
        });
    },
    searchBook() {
      this.searching = true;
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.book.bookName}`)
        // .then((books) => {
        //   console.log(books);
        // });
        .then((response) => response.json())
        .then((books) => {
          setTimeout(() => {
            this.searching = false;
            console.log(books);
            this.books = books;
          }, 1000);
        });
    },
    // addBook() {
    //   fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.book.bookName}`)
    // }
  },
};
</script>

<style scoped>
  .row {
   display: flex;
   flex-wrap: wrap;
   width: 100%;
}
  .col {
    flex: 1;
  }
  /* .description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } */
  p img {
    width: 100%;
    height: 20vw;
    object-fit: cover;
  }
  .description{
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 16px;
    max-height: 52px;
}
</style>
