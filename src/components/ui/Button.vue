<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <span v-if="loading" class="mr-2">
      <svg
        class="animate-spin h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>

    <!-- Start Icon -->
    <span v-if="startIcon" class="mr-2">
      <component :is="startIcon" class="h-5 w-5" />
    </span>

    <!-- Button Content -->
    <span v-if="!iconOnly">
      <slot />
    </span>

    <!-- End Icon -->
    <span v-if="endIcon" class="ml-2">
      <component :is="endIcon" class="h-5 w-5" />
    </span>

    <!-- Ripple Effect -->
    <span
      v-if="ripple"
      ref="rippleElement"
      class="absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      <span
        class="ripple-circle absolute bg-white/30 rounded-full scale-0 opacity-100 animate-ripple"
      ></span>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Component, PropType } from "vue";

// Rename the component to follow multi-word naming convention
defineOptions({
  name: "BaseButton",
});

const props = defineProps({
  // Size
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "md",
  },
  // Radius
  radius: {
    type: String as PropType<
      "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "none" | "full"
    >,
    default: "md",
  },
  // Color
  color: {
    type: String,
    default: "primary",
  },
  // Variant
  variant: {
    type: String as PropType<
      "solid" | "faded" | "bordered" | "light" | "flat" | "ghost" | "shadow"
    >,
    default: "solid",
  },
  // Disabled
  disabled: {
    type: Boolean,
    default: false,
  },
  // Loading
  loading: {
    type: Boolean,
    default: false,
  },
  // Icons
  startIcon: {
    type: Object as PropType<Component>,
    default: null,
  },
  endIcon: {
    type: Object as PropType<Component>,
    default: null,
  },
  // Icon Only
  iconOnly: {
    type: Boolean,
    default: false,
  },
  // Ripple Effect
  ripple: {
    type: Boolean,
    default: true,
  },
  // Router Link
  to: {
    type: [String, Object],
    default: null,
  },
  // External Link
  href: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["click"]);

const rippleElement = ref<HTMLElement | null>(null);

// Determine the tag (button, RouterLink, or anchor)
const tag = computed(() => {
  if (props.to) return "RouterLink";
  if (props.href) return "a";
  return "button";
});

// Handle Click with Ripple Effect
const handleClick = (event: MouseEvent) => {
  if (props.ripple && rippleElement.value) {
    const rippleCircle = rippleElement.value.querySelector(
      ".ripple-circle"
    ) as HTMLElement | null;
    if (rippleCircle) {
      const rect = rippleElement.value.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      // Use optional chaining and type assertion for style
      rippleCircle.style.width = `${size}px`;
      rippleCircle.style.height = `${size}px`;
      rippleCircle.style.left = `${event.clientX - rect.left - size / 2}px`;
      rippleCircle.style.top = `${event.clientY - rect.top - size / 2}px`;
      rippleCircle.classList.add("animate-ripple");
    }
  }
  emit("click", event);
};

// Dynamic Button Classes
const buttonClasses = computed(() => {
  const baseClasses = [
    "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    props.disabled || props.loading ? "opacity-50 cursor-not-allowed" : "",
    props.to || props.href ? "cursor-pointer" : "",
  ];

  // Size
  switch (props.size) {
    case "sm":
      baseClasses.push("px-3 py-1.5 text-sm");
      break;
    case "md":
      baseClasses.push("px-4 py-2 text-base");
      break;
    case "lg":
      baseClasses.push("px-6 py-3 text-lg");
      break;
  }

  // Radius
  switch (props.radius) {
    case "sm":
      baseClasses.push("rounded-sm");
      break;
    case "md":
      baseClasses.push("rounded-md");
      break;
    case "lg":
      baseClasses.push("rounded-lg");
      break;
    case "none":
      baseClasses.push("rounded-none");
      break;
    case "xl":
      baseClasses.push("rounded-xl");
      break;
    case "2xl":
      baseClasses.push("rounded-2xl");
      break;
    case "3xl":
      baseClasses.push("rounded-3xl");
      break;
    case "full":
      baseClasses.push("rounded-full");
      break;
  }

  // Variant & Color
  switch (props.variant) {
    case "solid":
      baseClasses.push(
        `bg-${props.color}-500 text-white hover:bg-${props.color}-600`
      );
      break;
    case "faded":
      baseClasses.push(
        `bg-${props.color}-100 text-${props.color}-800 hover:bg-${props.color}-200`
      );
      break;
    case "bordered":
      baseClasses.push(
        `border border-${props.color}-500 text-${props.color}-500 hover:bg-${props.color}-50`
      );
      break;
    case "light":
      baseClasses.push(
        `bg-${props.color}-50 text-${props.color}-500 hover:bg-${props.color}-100`
      );
      break;
    case "flat":
      baseClasses.push(
        `bg-transparent text-${props.color}-500 hover:bg-${props.color}-50`
      );
      break;
    case "ghost":
      baseClasses.push(
        `bg-transparent text-${props.color}-500 hover:bg-${props.color}-50`
      );
      break;
    case "shadow":
      baseClasses.push(
        `bg-${props.color}-500 text-white shadow-lg hover:bg-${props.color}-600 hover:shadow-xl`
      );
      break;
  }

  return baseClasses.join(" ");
});
</script>

<style>
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 0.6s linear;
}
</style>
