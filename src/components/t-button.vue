<template>
  <div class="root-page"
  :style="{width:props.width+'px'}"
  >
    <div class="button-content">
      <button :class="['custom-button', shape]" :style="buttonStyle" @mouseleave="onMouseLeave" @mouseover="onMouseOver"
        @mousedown="onMouseDown" @mouseup="onMouseUp">
        <slot></slot>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';

const props = defineProps({
  color: {
    type: [String, Number],
    default: "#000"
  },
  overColor: {
    type: [String, Number],
    default: "rgba(0, 0, 0, 0.15)"
  },
  pressColor: {
    type: [String, Number],
    default: "rgba(0, 0, 0, 0.3)"
  },
  width: {
    type: [String, Number],
    default: "auto"
  },
  height: {
    type: [String, Number],
    default: "auto"
  }
});

const buttonStyle = reactive({
  backgroundColor: props.color,
  width: props.width + (props.width == 'auto' ? '' : 'px'),
  height: props.height + (props.height == 'auto' ? '' : 'px'),
  borderRadius: '50px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(255, 255, 255, 0.05)',
  lineHeight: 1.575,
  minWidth: '16px',
  minHeight: '16px',
  padding: '5px',
  transition: 'background-color 0.3s',
});

const shape = ref('round'); // 默认形状为round
const isMouseDown = ref(false); // 鼠标按下状态，默认为未按下
const onMouseDown = () => {
  isMouseDown.value = true;

  buttonStyle.backgroundColor = props.pressColor;
};

const onMouseUp = () => {
  isMouseDown.value = false;
  buttonStyle.backgroundColor = props.color;
};

const onClick = () => {
  buttonStyle.backgroundColor = props.pressColor;
};

const onMouseLeave = () => {
  buttonStyle.backgroundColor = props.color;
};

const onMouseOver = () => {
  buttonStyle.backgroundColor = props.overColor;
};

const customButtonClasses = computed(() => {
  return ['custom-button', shape.value];
});
</script>

<style scoped>
.root-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.custom-button {
  border: none;
  outline: none;
  cursor: pointer;
}

.round {
  border-radius: 50%;
}

.rectangle {
  border-radius: 5px;
}

.square {
  border-radius: 0;
}

.circle {
  border-radius: 50%;
}

/* 根据需要自定义不同形状的样式 */
</style>
