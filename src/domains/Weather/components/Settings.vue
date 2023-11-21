<script setup lang="ts">
import {computed, ref} from 'vue'
import SettingsBody from './SettingsBody.vue'

const isSettingsShow = ref(false)
const img = computed(() => isSettingsShow.value ?
  'url("/src/domains/Weather/assets/imgs/adminImgs/close.svg")' :
  'url("/src/domains/Weather/assets/imgs/adminImgs/gear.png")'
)
let weatherLineIsRefreshed = ref(5)


</script>

<template>
  <div class="settings-wrapper"
       :class="{'settings-wrapper_bg': isSettingsShow}"
  >
    <Teleport to="body">
      <div class="settings__outside"
           @click="isSettingsShow = false"
           v-show="isSettingsShow"
      >
      </div>
    </Teleport>
    
    <main class="settings__spot">
      <header class="spot__header">
        <div v-show="isSettingsShow" class="header__title">
          Settings
        </div>
        <div @click="isSettingsShow = !isSettingsShow" class="header__cross">
        </div>
      </header>
      
      <SettingsBody v-show="isSettingsShow"
                    class="spot__body"
                    @reloadHimSelf="weatherLineIsRefreshed += 1"
                    :key="weatherLineIsRefreshed"
      />
    </main>
  </div>
</template>


<style scoped lang="scss">
@import "@/assets/CSS/utils.scss";
$icon-size: rem(30);

.settings-wrapper {
  max-width: 80%;
  min-width: $icon-size;
  min-height: $icon-size;
  height: max-content;
  box-sizing: border-box;
  padding: var(--vt-c-common-padding);
  z-index: 101;
}

.settings__outside {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: var(--vt-c-white-mute);
}

.settings-wrapper_bg {
  background: var(--vt-c-blue_light);
}


.settings__spot {
  z-index: 101;
  width: fit-content;
  background: transparent;
  
  .spot__header {
    display: flex;
    
    .header__title {
      display: flex;
      place-items: center start;
      text-transform: uppercase;
    }
    
    .header__cross {
      width: $icon-size;
      height: $icon-size;
      margin-left: auto;
      cursor: pointer;
      background-image: v-bind(img);
      background-size: $icon-size $icon-size;
    }
  }
  
  .spot__body {
    margin-top: calc(var(--vt-c-common-padding) * 2);
  }
}

</style>