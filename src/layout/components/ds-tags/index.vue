
<template>
  <div class="ds-tags" ref="refTags">
    <el-tabs
      type="card"
      closable
      class="ds-tags-tabs"
    >
      <el-tab-pane
        v-for="(item, index) in 3"
        :key="index"
        label="哈哈"
        :name="item.path"
      >
        <template #label >
          <span @contextmenu.prevent="handleContextmenu(item, $event)">123123313</span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <ul
      class="ds-tags-contextmenu"
      :style="{ left: `${position.left}px`, top: `${position.top}px` }"
      v-show="visible">
      <li>关闭</li>
      <li>关闭其他</li>
      <li>关闭所有</li>
    </ul>
  </div>
</template>

<script setup lang="ts">

  const visible = ref<boolean>(false)

  const refTags = ref<HTMLElement | null>(null)

  const position = reactive({ left: 0, top: 0 })
  const handleContextmenu = (tag: any, event: MouseEvent) => {
    if (refTags.value) {
      const menuMinWidth = 105
      const offsetLeft = refTags.value.getBoundingClientRect().left
      const { offsetWidth, offsetHeight } = refTags.value
      const maxLeft = offsetWidth - menuMinWidth
      const left = event.clientX - offsetLeft + 15
      position.left = left > maxLeft ? maxLeft : left
      position.top = event.clientY - offsetHeight
      visible.value = true
    }
  }

  const handleContextmenuClose = () => visible.value = false
  watch(visible, (v) => {
    v ? document.body.addEventListener('click', handleContextmenuClose)
      : document.body.removeEventListener('click', handleContextmenuClose)
  })

</script>

<style lang="scss">
  @import "src/layout/styles/index";

  @include b(tags) {
    @extend %pr;
    background-color: #fff;
    .el-tabs__header{
      margin-bottom: 0;
    }

    @include e(contextmenu) {
      @extend %pa;
      @extend %c3;
      padding: 5px 0;
      font-size: 12px;
      border-radius: 4px;
      background-color: #fff;
      z-index: 3000;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li{
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }

</style>
