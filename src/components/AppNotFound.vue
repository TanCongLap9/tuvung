<script>
import AppDrawer from "./AppDrawer.vue";
export default {
  components: { AppDrawer },
};
</script>
<template>
  <div class="h-100 d-flex flex-column">
    <main class="container-sm bg-secondary">
      <nav class="navbar navbar-dark">
        <div class="navbar-nav">
          <button
            class="navbar-toggler"
            data-bs-toggle="offcanvas"
            data-bs-target="#drawer">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <AppDrawer />
    </main>
    <main class="container-sm h-100">
      <div
        class="h-100 d-flex flex-column justify-content-center align-items-center">
        <h1 class="text-center">Not Found</h1>
        <h4>Trang không tồn tại.</h4>
      </div>
    </main>
  </div>
</template>
