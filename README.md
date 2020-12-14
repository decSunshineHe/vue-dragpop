# Vue Drag Popover
drag popover for vue mixins

### Install

```
npm install vue-dragpop
```
**Or**
```
yarn add vue-dragpop
```

### Usage

**main.js**

```javascript
import Vue from 'vue';
import VueDragPop from 'vue-dragpop';

Vue.use(VueDragPop);
```

**component**

```html
<template>
  <div>
    <div class="pop-model">
      <div class="my-popover-header" @mousedown="popMousedown">
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    popMousedown(e) {
      this.dragPopover(e, ".pop-model", ".my-popover-header");
    },
  },
}
</script>
```
