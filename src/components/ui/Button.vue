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
    @mousedown="createRipple"
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
        v-for="(circle, index) in rippleCircles"
        :key="index"
        class="absolute bg-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ripple"
        :style="circle.style"
      ></span>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Component, PropType } from "vue";
import { colorMap } from "@/utils";

type Color = "gray" | "red" | "violet"; // Add more colors as needed
type Variant =
  | "solid"
  | "faded"
  | "bordered"
  | "light"
  | "flat"
  | "ghost"
  | "shadow";

defineOptions({
  name: "BaseButton",
});

// Types
type RippleCircle = {
  style: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
};

const props = defineProps({
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "md",
  },
  radius: {
    type: String as PropType<
      "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "none" | "full"
    >,
    default: "md",
  },
  color: {
    type: String as PropType<Color>,
    default: "gray",
  },
  variant: {
    type: String as PropType<Variant>,
    default: "solid",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  startIcon: {
    type: Object as PropType<Component>,
    default: null,
  },
  endIcon: {
    type: Object as PropType<Component>,
    default: null,
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
  ripple: {
    type: Boolean,
    default: true,
  },
  to: {
    type: [String, Object],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["click"]);
const rippleElement = ref<HTMLElement | null>(null);
const rippleCircles = ref<RippleCircle[]>([]);

const tag = computed(() => {
  if (props.to) return "RouterLink";
  if (props.href) return "a";
  return "button";
});

// Improved variant styles with proper default handling
const getVariantClasses = computed(() => {
  const defaultColor = "gray";
  const defaultVariant = "solid";

  const color = props.color in colorMap ? props.color : defaultColor;
  const variant =
    props.variant in colorMap[color] ? props.variant : defaultVariant;

  return colorMap[color][variant];
});

// Improved button classes
const buttonClasses = computed(() => {
  const baseClasses = [
    "relative inline-flex items-center justify-center font-medium transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    props.disabled || props.loading ? "opacity-50 cursor-not-allowed" : "",
    props.to || props.href ? "cursor-pointer" : "",
    getVariantClasses.value,
  ];

  // Size classes
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-3 text-lg",
  };
  baseClasses.push(sizeClasses[props.size]);

  // Radius classes
  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  };
  baseClasses.push(radiusClasses[props.radius]);

  return baseClasses.join(" ");
});

// Improved ripple effect
const createRipple = (event: MouseEvent) => {
  if (!props.ripple || !rippleElement.value || props.disabled) return;

  const rect = rippleElement.value.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;

  const circle: RippleCircle = {
    style: {
      left: `${event.clientX - rect.left}px`,
      top: `${event.clientY - rect.top}px`,
      width: `${size}px`,
      height: `${size}px`,
    },
  };

  rippleCircles.value.push(circle);
  setTimeout(() => {
    rippleCircles.value.shift();
  }, 600);
};

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit("click", event);
  }
};
</script>

<style>
.animate-ripple {
  animation: ripple 0.6s linear;
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
