<template>
  <div style="height: 100%;">
    <header-view></header-view>
    <section class="wrapper">
      <div class="siderbar">
        <nav-view></nav-view>
      </div>
      <div class="content">
        <router-view>
        </router-view>
      </div>
      <ifooter></ifooter>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import NavView from '@/components/NavView.vue'
import HeaderView from '@/components/HeaderView.vue'
import Ifooter from '@/components/footer.vue'
export default {
  name: 'home',
  components: {
    NavView,
    HeaderView,
    Ifooter
  }
}
</script>
