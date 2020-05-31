<template>
  <div class="container">
    <div>
      <h1 class="title">
        lwyrup-app
      </h1>
      <form>
        <input v-model="textTitle" type="text" placeholder="title">
        <input v-model="textArea" type="text" placeholder="text">
        <button type="submit" @click="validateData">Click</button>
      </form>
      <div>{{ textArea }}</div>
      <div class="container">
        <div v-for="(item, index) in output" :key="'item' + index" class="item">
          <h2>{{ item.title }}</h2>
          <p>{{ item.content }}</p>
          <button @click="removeItem(item._id)">X</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      textTitle: '',
      textArea: ''
    }
  },
  async asyncData(context) {
    const data = await axios.get('https://localhost:3000/test')
    return {
      output: data.data.reverse()
    }
  },
  methods: {
    validateData() {
      if (this.textTitle === '' || this.textArea === '') { return; }

      this.submitData();
    },
    submitData () {
      axios.post('https://localhost:3000/test', {
        title: this.textTitle,
        content: this.textArea
      })
    },
    removeItem (id) {
      axios.delete('https://localhost:3000/test/' + id)
    }
  }
}
</script>

<style lang="scss">
.container {
  h2 {
    border-bottom: 2px solid black;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }

  .item {
    background-color: #eeeeee;
    border-radius: 5px;
    margin: 1rem;
    padding: 1rem;
    width: 500px;
  }
}
</style>
