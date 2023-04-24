<template>
  <div>
    <BigData />
    <BigDataMultipleSelect />
    <ShowUnrenderLabel />
  </div>
</template>

<script>
import BigDataMultipleSelect from './tests/big-data-multiple-select.vue';
import BigData from './tests/big-data.vue';
import ShowUnrenderLabel from './tests/show-unrender-label.vue';

export default {
  components: { BigData, ShowUnrenderLabel, BigDataMultipleSelect },
};
</script>
