<template>
  <div class="layout-tags">
    <ElTabs
      type="card"
      class="layout-tags-tabs"
      closable
      :model-value="$route.path"
      @tab-remove="handleTabRemove"
      @tab-change="handleTabChange"
    >
      <ElTabPane v-for="item in visitedTags" :key="item.path" :name="item.path">
        <template #label>
          <span @contextmenu.prevent="handleContextmenu(item, $event)">{{
            item?.meta?.title
          }}</span>
        </template>
      </ElTabPane>
    </ElTabs>
    <ul
      class="layout-tags-contextmenu"
      :style="{ left: `${left}px`, top: `${top}px` }"
      v-show="visible"
    >
      <li @click="handleTagClose">关闭</li>
      <li @click="handleOtherTagsClose">关闭其他</li>
      <li @click="handleAllTagsClose">关闭所有</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useVisitedTags } from '@/layout/hooks'
  import type { RouteLocationNormalizedLoaded } from 'vue-router'

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
  const handleContextmenuClose = () => (position.visible = false)
  watch(
    () => position.visible,
    (v) => {
      v
        ? document.body.addEventListener('click', handleContextmenuClose)
        : document.body.removeEventListener('click', handleContextmenuClose)
    },
  )
  const { top, left, visible } = toRefs(position)

  const router = useRouter()

  // 点击关闭tab
  const handleTabRemove = (path: any) => {
    selectedTag.value = { path } as any
    handleTagClose()
  }

  // 关闭
  const handleTagClose = () => {
    visitedTags.value = visitedTags.value.filter((item) => item.path !== selectedTag.value?.path)
    const latestTag = visitedTags.value.slice(-1)[0]
    if (latestTag) {
      router.push(latestTag)
    } else {
      router.replace('/')
    }
  }

  // 关闭其它
  const handleOtherTagsClose = () => {
    visitedTags.value = visitedTags.value.filter((item) => item.path === selectedTag.value?.path)
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
  @import '@/layout/styles/define.scss';
  .layout-tags {
    @extend %pr;
    box-shadow: 0 -1px 1px 0 #f6f6f6;
    padding: 5px 10px 0;

    :deep {
      .el-tabs {
        --el-tabs-header-height: 35px;
      }
      .el-tabs__header {
        margin-bottom: 0;
      }
      .el-tabs__nav {
        border: none;
      }
      .el-tabs__item {
        @extend %usn;
        @extend %on;
        @extend %fwn;
        padding: 0 24px !important;
        margin-right: -15px;
        border: 0;
        font-size: 13px;
        font-weight: 400;

        &:hover {
          @extend %tabs-mask;
          color: #515a6e;
          background: #dee1e6;
        }

        &.is-active {
          @extend %tabs-mask;
          color: var(--el-color-primary);
          background: var(--el-color-primary-light-9);
        }
      }
      .el-tabs--card > .el-tabs__header {
        border-bottom: none;
      }
      .is-icon-close {
        width: 14px !important;
      }
    }
  }

  .layout-tags-contextmenu {
    @extend %pa;
    @extend %c3;
    padding: 5px 0;
    font-size: 12px;
    border-radius: 4px;
    background-color: #fff;
    z-index: 99;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      @extend %cp;
      margin: 0;
      padding: 7px 16px;
      &:hover {
        background-color: #eee;
      }
    }
  }
</style>
