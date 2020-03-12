<template>
  <section>
    <h1>Dashboard</h1>
    <h4 v-if="!user">Getting user information...</h4>
    <h4 v-if="user">Hello, {{ user.username }}</h4>
    <button @click="logout()" class="btn btn-primary" style="margin:10px 0px">Logout</button>
    <button @click="getBooks()" class="btn btn-primary" style="margin-left:10px">
      Toggle Your Collection</button>
    <br />
    <div v-if="searching">
      <img src="../assets/loading.svg" alt="loading gif"
        style = "margin:100px 500px"/>
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
    </div>
    <form @submit.prevent="searchBook()" v-if="!searching && !showCollection"
      style="margin-top: 50px">
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
    <br />
    <section v-if="!searching && !showCollection">
      <!-- <h3 style="margin-top:30px">Books</h3> -->
      <div class="row">
        <div class="col-3"
          v-for="book in this.books.items"
          :key="book.id">
          <div class="card border-info mb-3" style="max-width: 30rem;">
            <h3 class="card-header">{{book.volumeInfo.title}}</h3>
            <p v-if="book.volumeInfo.imageLinks">
              <img class="bookImage"
              :src="book.volumeInfo.imageLinks.thumbnail" alt="Card image">
            </p>
            <p v-else>
              <img class="bookImage" src="../assets/flakes.jpg" alt="Card image">
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
              <a href="#" class="card-link" @click="addBook(book.selfLink)">Add this Book</a>
            </div>
            <!-- <div class="card-footer text-muted">
              2 days ago
            </div> -->
          </div>
        </div>
      </div>
    </section>
    <hr>
    <section v-if="this.showCollection">
      <br />
      <div v-for="book in this.books" :key="book.id">
        <!-- <div class="card bg-dark text-white">
          <img class="card-img" :src="book.imageLink[0]" alt="Card image">
          <div class="card-img-overlay">
            <h5 class="card-title">{{book.title}}</h5>
            <p class="card-text">{{book.description}}</p>
            <p class="card-text">Last updated 3 mins ago</p>
          </div> -->
          <div class="card" style="margin-bottom:20px;">
            <img class="card-img-top" :src="book.imageLink.smallThumbnail"
              alt="Card image cap"
              style="width:30%; height: 20vw; margin-left:35%">
            <div class="card-body">
              <h5 class="card-title">{{book.title}}</h5>
              <p class="card-text">{{book.description}}</p>
              <p class="card-text">
                <small class="text-muted">bookId: {{book.googleBookId}}</small></p>
              <div class="card-body">
                <a href="#" class="card-link">Preview</a>
                <a href="#" class="card-link"
                  @click="removeBook(book._id)">Remove this Book</a>
            </div>
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
    showCollection: false,
    book: {
      bookName: '',
    },
    books: [],
  }),
  mounted() {
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    }).then((res) => res.json())
      .then((result) => {
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
    getBooks() {
      this.searching = true;
      this.showCollection = !this.showCollection;
      fetch(`${API_URL}api/v1/books`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json())
        .then((books) => {
          this.searching = false;
          this.books = books;
          console.log(this.books);
        });
    },
    searchBook() {
      this.searching = true;
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.book.bookName}`)
        .then((response) => response.json())
        .then((books) => {
          setTimeout(() => {
            this.searching = false;
            console.log(books);
            this.books = books;
          }, 1000);
        });
    },
    addBook(bookLink) {
      // console.log(bookLink);
      fetch(bookLink)
        .then((response) => response.json())
        .then((book) => {
          // post request to addBook route
          const newBook = {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            pageCount: book.volumeInfo.pageCount,
            previewLink: book.volumeInfo.previewLink,
            imageLink: book.volumeInfo.imageLinks,
            googleBookId: book.id,
          };
          fetch(`${API_URL}api/v1/books`, {
            method: 'POST',
            body: JSON.stringify(newBook),
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
            console.log(result);
          }).catch((error) => {
            console.log(error);
          });
        });
    },
    removeBook(bookId) {
      fetch(`${API_URL}api/v1/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((response) => response.json())
        .then((removedBook) => {
          console.log(`Deleted book: ${removedBook}`);
          this.showCollection = false;
          this.books = '';
          this.getBooks();
        });
    },
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
  .bookImage {
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
