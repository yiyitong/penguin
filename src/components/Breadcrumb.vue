<template>
  <div class="breadcrumb-container">
    <h2>{{title}}</h2>
    <ul class="breadcrumb" >
      <li v-for="item in links" :key="item.to">
        <router-link :to="item.to" :title="item.title">{{item.title}}</router-link>
      </li>
    </ul>
    <slot class="breadcrumb-btns">
    </slot>
  </div>
</template>
<script>

import {
  mapState,
  mapActions
} from 'vuex'
import methods from '@/common/methods.js'

export default {
  data () {
    return {
      title: ''
    }
  },
  computed: {
    ...mapState({
      links: state => state.links.links
    })
  },
  methods: {
    ...mapActions([
      'setLinks', 'updateLinkTitle'
    ]),
    updateBreadCrumb (route) {
      let matched = route.matched, breadcrumbList = [{title: '首页', to: '/display'}]
      matched.map((item) => {
        let curPath = item.path, title = item.meta.title
        if (title && curPath[curPath.length - 1] !== '/') {
          curPath = curPath.replace(/:[\w]+/g, (word) => {
            word = word.substr(1, word.length)
            return route.params[word]
          })
          title = methods.translateTitle(title, this.$store.state)
          if (curPath !== '/display') {
            breadcrumbList.push({
              title: title,
              to: curPath
            })
          }
        }
      })
      this.setLinks(breadcrumbList)
    },
    initBreadCrumb () {
      document.title = methods.translateTitle(this.$route.meta.title, this.$store.state)
      this.title = document.title
      this.updateBreadCrumb(this.$route)
    },
    handleRouteChange () {
      this.initBreadCrumb()
    }
  },
  watch: {
    '$route': 'handleRouteChange'
  },
  mounted () {
    console.info(this.$route)
    this.handleRouteChange()
  }
}
</script>

<style scoped>
.breadcrumb-container {
  position: relative;
}
.breadcrumb-container h2{
  padding-left: 15px;
  text-align: left;
}
.breadcrumb {
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
  list-style: none;
}

.breadcrumb>li {
  display: inline-block;
}
.breadcrumb>li + li::before {
  content: '|';
  padding: 0 5px;
}

.breadcrumb>li>a {
  text-decoration: none;
}
</style>