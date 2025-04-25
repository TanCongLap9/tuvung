<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div id="drawer" class="offcanvas offcanvas-start">
    <div class="offcanvas-header">
      <h3 class="offcanvas-title">Học tiếng</h3>
      <button class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <ul class="nav flex-column">
        <li class="nav-item">
          <RouterLink class="nav-link" to="/langs/trung">Trung</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/langs/nhat">Nhật</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/langs/han">Hàn</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
