
<template>
  <div class="ds-tags" ref="refTags">
    <el-tabs
      type="card"
      closable
      class="ds-tags-tabs"
      :model-value="$route.path"
      @tab-change="handleTabChange">
        <el-tab-pane
          v-for="(item) in visitedTags"
          :key="item.path"
          :name="item.path">
          <template #label>
            <span @contextmenu.prevent="handleContextmenu(item, $event)">{{ item?.meta?.title }}</span>
          </template>
        </el-tab-pane>
    </el-tabs>
    <ul
      class="ds-tags-contextmenu"
      :style="{ left: `${left}px`, top: `${top}px` }"
      v-show="visible">
      <li @click="handleTagClose">关闭</li>
      <li @click="handleOtherTagsClose">关闭其他</li>
      <li @click="handleAllTagsClose">关闭所有</li>
    </ul>
  </div>
</template>

<script setup lang="ts">

  import { useVisitedTags } from 'src/layout/hooks'
  import { RouteLocationNormalizedLoaded } from 'vue-router'

  const [visitedTags, handleTabChange] = useVisitedTags()

  const position = reactive({ left: 0, top: 0, visible: false })
  const refTags = ref<HTMLElement>()
  const selectedTag = ref<RouteLocationNormalizedLoaded>()
  const handleContextmenu = (tag: RouteLocationNormalizedLoaded, event: MouseEvent) => {
    selectedTag.value = tag
    if (refTags.value) {
      const menuMinWidth = 105
      const offsetLeft = refTags.value.getBoundingClientRect().left
      const { offsetWidth, offsetHeight } = refTags.value
      const maxLeft = offsetWidth - menuMinWidth
      const left = event.clientX - offsetLeft + 15
      position.left = left > maxLeft ? maxLeft : left
      position.top = event.clientY - offsetHeight
      position.visible = true
    }
  }
  const handleContextmenuClose = () => position.visible = false
  watch(() => position.visible, (v) => {
    v ? document.body.addEventListener('click', handleContextmenuClose)
      : document.body.removeEventListener('click', handleContextmenuClose)
  })
  const { top, left, visible } = toRefs(position)

  const router = useRouter()

  // 关闭
  const handleTagClose = () => {
    visitedTags.value = visitedTags
      .value
      .filter(item => item.path !== selectedTag.value?.path)
    const latestTag = visitedTags.value.slice(-1)[0]
    if (latestTag) {
      router.push(latestTag)
    } else {
      router.replace('/')
    }
  }

  // 关闭其它
  const handleOtherTagsClose = () => {
    visitedTags.value = visitedTags
      .value
      .filter(item => item.path === selectedTag.value?.path)
    if (selectedTag.value) {
      router.push(selectedTag.value)
    }
  }

  // 关闭所有
  const handleAllTagsClose = () => {
    visitedTags.value = []
    router.replace('/')
  }

</script>

<style lang="scss" scoped>
  @import "src/layout/styles/index";

  @include b(tags) {
    @extend %pr;
    background-color: #fff;
    :deep .el-tabs__header{
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
