<template>
  <div class="container">
    <div>
      <h1 class="title">
        lwyrup-app
      </h1>
      <div>
        <input v-model="textTitle" type="text" placeholder="title">
        <input v-model="textArea" type="text" placeholder="text">
        <button type="submit" @click="submitData">Click</button>
      </div>
      <div v-if="showEmpty">Nothing here but us chickens</div>
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
      textArea: '',
      showEmpty: false
    }
  },
  async asyncData(context) {
    const data = await axios.get('/test')
    return {
      output: data.data.reverse()
    }
  },
  watch: {
    output () {
      if (this.output.length > 0) {
        this.showEmpty = false;
        return;
      }
      this.showEmpty = true;
    }
  },
  methods: {
    async submitData () {
      if (this.textTitle === '' || this.textArea === '') { return; }
      await axios.post('/test', {
        title: this.textTitle,
        content: this.textArea
      })
      this.updateData();
    },
    async removeItem (id) {
      await axios.delete('/test/' + id)
      this.updateData();
    },
    async updateData() {
      const data = await axios.get('/test')
      this.output = data.data.reverse()
    }
  },
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
