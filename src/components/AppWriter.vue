<script>
export default {
  data() {
    return {
      context: null,
      pressures: [],
      STROKE_WIDTH: 3,
      POINTS_MAX: 3,
    };
  },
  methods: {
    startDraw(e) {
      if (e.buttons !== 1) return;
      const context = this.$data.context;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
    },
    draw(e) {
      if (e.buttons !== 1) return;
      const { context, pressures } = this.$data;
      pressures.push(e.pointerType === "mouse" ? 1 : e.pressure);
      if (pressures.length > this.$data.POINTS_MAX) pressures.shift();
      context.lineWidth =
        (this.$data.STROKE_WIDTH * pressures.reduce((t, v) => t + v)) /
        pressures.length;
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
    },
    endDraw() {
      this.$data.pressures = [];
    },
    deletePicture() {
      const context = this.$data.context;
      context.clearRect(
        0,
        0,
        this.$refs.writer.clientWidth,
        this.$refs.writer.clientHeight
      );
    },
  },
  mounted() {
    const context = (this.$data.context = this.$refs.writer.getContext("2d"));
    this.$refs.writer.width = this.$refs.container.clientWidth;
    this.$refs.writer.height = this.$refs.container.clientHeight;
  },
};
</script>

<template>
  <div
    style="position: absolute; width: 100%; height: 100%; margin: 0; padding: 0"
    ref="container">
    <button
      class="btn btn-lg btn-danger position-absolute"
      style="top: 5px; right: 5px"
      @click="deletePicture">
      <i class="fa fa-trash-o" aria-hidden="true"></i>
    </button>
    <canvas
      style="background-color: white; margin: 0; padding: 0"
      ref="writer"
      @pointerdown="startDraw"
      @pointermove="draw"
      @pointerup="endDraw"></canvas>
  </div>
</template>
