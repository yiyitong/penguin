<template>
  <div style="min-height: 100%;">
    <header-view></header-view>
    <section class="wrapper">
      <div class="siderbar">
        <nav-view></nav-view>
      </div>
      <div class="content">
        <!-- <breadcrumb></breadcrumb> -->
        <div>
          <div class="panel">
            <div class="panel-body">
              <router-view>
              </router-view>
            </div>
          </div>
        </div>
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
