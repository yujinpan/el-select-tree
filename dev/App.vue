<template>
  <div>
    <BigData />
    <BigDataMultipleSelect />
    <ShowUnrenderLabel />
    <BigDataTable />
  </div>
</template>

<script>
import BigDataMultipleSelect from './tests/big-data-multiple-select.vue';
import BigDataTable from './tests/big-data-table.vue';
import BigData from './tests/big-data.vue';
import ShowUnrenderLabel from './tests/show-unrender-label.vue';

export default {
  components: {
    BigDataTable,
    BigData,
    ShowUnrenderLabel,
    BigDataMultipleSelect,
  },
};
</script>
