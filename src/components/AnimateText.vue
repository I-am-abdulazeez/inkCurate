<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const props = defineProps<{
  text: string[];
  effect: "fade" | "blur" | "slide";
}>();

const currentText = ref(props.text[0]);
const index = ref(0);
const isVisible = ref(true);

const changeText = () => {
  isVisible.value = false;
  setTimeout(() => {
    index.value = (index.value + 1) % props.text.length;
    currentText.value = props.text[index.value];
    isVisible.value = true;
  }, 500);
};

// Auto-change text every 3 seconds
onMounted(() => {
  setInterval(changeText, 3000);
});

const animationClass = computed(() => {
  return props.effect === "fade"
    ? "fade"
    : props.effect === "blur"
    ? "blur"
    : "slide";
});
</script>

<template>
  <div class="text-center text-4xl md:text-5xl text-white mt-3">
    <h1 class="headline">
      Let's
      <span class="text-violet-300 font-semibold pencil-highlighter">
        Discover
      </span>
      Your Next Great
      <span
        :class="[
          animationClass,
          { visible: isVisible },
          'text-violet-300 font-semibold pencil-highlighter',
        ]"
      >
        {{ currentText }}
      </span>
    </h1>
  </div>
</template>

<style scoped>
.headline span {
  transition: opacity 0.5s, filter 0.5s, transform 0.5s;
}

.fade {
  opacity: 0;
}
.fade.visible {
  opacity: 1;
}

.blur {
  filter: blur(10px);
  opacity: 0;
}
.blur.visible {
  filter: blur(0);
  opacity: 1;
}

.slide {
  transform: translateY(20px);
  opacity: 0;
}
.slide.visible {
  transform: translateY(0);
  opacity: 1;
}
</style>
