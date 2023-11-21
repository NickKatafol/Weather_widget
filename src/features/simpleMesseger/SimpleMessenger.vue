<script setup lang="ts">
import {useCommonStore} from '@/store/commonStore'
import {watch} from "vue";

const commonStore = useCommonStore()

watch(
  () => commonStore.GET_API_ERROR.message,
  (newVal) => {
    if (newVal)
      setTimeout(() => commonStore.SET_API_ERROR({code: '', message: ''}), 4000)
  },
  {deep: true}
)

</script>


<template>
  <Teleport to="body">
    <div v-if="commonStore.GET_API_ERROR.message"
         class="messenger-wrapper"
    >
      <div class="messenger__text">
        = {{ commonStore.GET_API_ERROR.message }} =
        <br> Try another request please.
      </div>
    </div>
  </Teleport>
</template>


<style scoped lang="scss">
@import "@/assets/CSS/utils.scss";

.messenger-wrapper {
  position: fixed;
  z-index: 10005;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: var(--vt-c-grey_light);
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  
  .messenger__text {
    width: fit-content;
    padding: rem(40);
    border: var(--vt-c-red) 1px solid;
    background: var(--vt-c-yellow);
    text-align: center;
    color: var(--vt-c-black);
  }
  
}
</style>