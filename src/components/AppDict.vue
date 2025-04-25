<script>
import AppDrawer from "./AppDrawer.vue";
import AppWriter from "./AppWriter.vue";
import trung from "../data/trung.json";
import nhat from "../data/nhat.json";
import han from "../data/han.json";
export default {
  data() {
    return {
      data: {
        title: "Học tiếng",
        font: "normal 10rem sans-serif",
        words: [""],
      },
      index: 0,
      settings: false,
      timeout: 0,
      min: 0,
      max: 0,
      drawing: false,
    };
  },
  components: { AppDrawer, AppWriter },
  beforeRouteUpdate(url) {
    switch (url.params.lang) {
      case "trung":
        this.$data.data = trung;
        break;
      case "nhat":
        this.$data.data = nhat;
        break;
      case "han":
        this.$data.data = han;
        break;
    }
  },
  mounted() {
    this.$router.isReady().then(() => {
      switch (this.$route.params.lang) {
        case "trung":
          this.$data.data = trung;
          break;
        case "nhat":
          this.$data.data = nhat;
          break;
        case "han":
          this.$data.data = han;
          break;
      }
    });
  },
  computed: {
    words() {
      return this.$data.data.words;
    },
    indexPlus1: {
      get() {
        return this.$data.index + 1;
      },
      set(value) {
        this.$data.index = Math.min(
          Math.max(0, value - 1),
          this.words.length - 1
        );
      },
    },
  },
  updated() {
    this.$refs.current.style.animation = "";
    if (this.$data.drawing) {
      setTimeout(() => {
        this.$refs.current.style.animation = "fade-out 200ms 300ms forwards";
      }, 0);
    }
    if (this.$refs.writer) this.$refs.writer.deletePicture();
  },
  methods: {
    prev() {
      if (this.$data.index > 0) this.$data.index--;
      else this.$data.index = this.words.length - 1;
    },
    next() {
      if (this.$data.index < this.words.length - 1) this.$data.index++;
      else this.$data.index = 0;
    },
    rand() {
      this.$data.index =
        this.$data.min === 0 ||
        this.$data.max === 0 ||
        this.$data.min >= this.$data.max
          ? Math.floor(Math.random() * this.words.length)
          : Math.round(
              Math.random() * (this.$data.max - this.$data.min) + this.$data.min
            ) - 1;
    },
    write() {
      this.$data.drawing = !this.$data.drawing;
    },
    down() {
      this.$data.timeout = setTimeout(() => {
        this.$data.settings = true;
      }, 600);
    },
    up() {
      clearTimeout(this.$data.timeout);
      if (!this.$data.settings) this.rand();
    },
    dismissSettings() {
      this.$data.settings = false;
    },
  },
};
</script>

<template>
  <main class="container-sm h-100 bg-secondary">
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
    <div class="h-100 d-flex flex-column justify-content-center bg-secondary">
      <div
        class="h-100 d-flex flex-column justify-content-center align-items-center position-relative">
        <div
          :style="{ zIndex: 1, userSelect: drawing ? 'none' : '' }"
          ref="current">
          <h1
            class="text-center"
            id="curr"
            :style="{ font: this.$data.data.font }">
            {{ words[index].text || words[index] }}
          </h1>
          <h3 v-if="words[index]?.pron" class="text-center">
            {{ words[index]?.pron }}
          </h3>
        </div>
        <AppWriter v-if="drawing" ref="writer" />
      </div>
    </div>
    <div
      class="d-flex flex-column align-items-center position-absolute"
      style="bottom: 1rem; left: 50%; transform: translate(-50%); z-index: 10">
      <div v-if="settings" class="bg-light border border-warning p-2">
        <div class="d-flex justify-content-end">
          <a href="#" class="btn-close" @click="dismissSettings"></a>
        </div>
        <div class="mb-2">
          <label class="form-label" for="value-min">From</label>
          <input
            type="number"
            id="value-min"
            class="form-control"
            v-model="min"
            min="0"
            :max="words.length" />
        </div>
        <div class="mb-2">
          <label class="form-label" for="value-max">To</label>
          <input
            type="number"
            id="value-max"
            class="form-control"
            v-model="max"
            min="0"
            :max="words.length" />
        </div>
      </div>
      <div class="btn-group btn-group-lg">
        <button class="btn btn-primary" @click="prev()">
          <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
        </button>
        <button
          class="btn btn-warning"
          @mousedown="down()"
          @touchstart="down()"
          @mouseup="up()"
          @touchend="up()">
          <i class="fa fa-random" aria-hidden="true"></i>
        </button>
        <a
          v-if="data.linkDict"
          class="btn btn-info"
          :href="
            data.linkDict?.replace('%s', words[index].text || words[index])
          "
          target="_blank">
          <i class="fa fa-book" aria-hidden="true"></i>
        </a>
        <a
          v-if="data.linkTrans"
          class="btn btn-info"
          :href="
            data.linkTrans?.replace('%s', words[index].text || words[index])
          "
          target="_blank">
          <i class="fa fa-language" aria-hidden="true"></i>
        </a>
        <button
          :class="{ btn: true, 'btn-light': !drawing, 'btn-info': drawing }"
          @click="write()">
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button class="btn btn-primary" @click="next()">
          <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
        </button>
      </div>
      <div class="input-group">
        <input
          type="number"
          min="1"
          v-model="indexPlus1"
          id="no"
          class="form-control" />
        <label id="count" for="no" class="input-group-text m-auto"
          >/ {{ words.length }}</label
        >
      </div>
    </div>
  </main>
</template>

<style>
@keyframes fade-out {
  0% {
    visibility: visible;
    opacity: 1;
  }
  100% {
    visibility: hidden;
    opacity: 0;
  }
}
</style>
