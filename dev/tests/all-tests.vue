<template>
  <div>
    <el-divider>BUG</el-divider>
    <div>BigData</div>
    <BigData />
    <div>BigDataMultipleSelect</div>
    <BigDataMultipleSelect />
    <div>ShowUnrenderLabel</div>
    <ShowUnrenderLabel />
    <div>BigDataTable</div>
    <BigDataTable />
    <div>SetValueInMounted</div>
    <SetValueInMounted />
    <div>CheckOrExpand</div>
    <CheckOrExpand />

    <el-divider>Test Basic</el-divider>
    <div>CheckStrictly</div>
    <CheckStrictly />

    <div>CustomProps</div>
    <CustomProps />

    <div>CustomRender</div>
    <CustomRender />

    <div>Filterable</div>
    <Filterable />

    <div>LazyLoad</div>
    <LazyLoad />

    <div>LazyLoadCacheData</div>
    <LazyLoadCacheData />

    <div>Multiple</div>
    <Multiple />

    <div>Virtual</div>
    <Virtual />

    <div>WithForm</div>
    <WithForm />

    <div>Slots</div>
    <Slots />
  </div>
</template>

<script>
import BigDataMultipleSelect from './big-data-multiple-select.vue';
import BigDataTable from './big-data-table.vue';
import BigData from './big-data.vue';
import CheckOrExpand from './check-or-expand.vue';
import SetValueInMounted from './set-value-in-mounted.vue';
import ShowUnrenderLabel from './show-unrender-label.vue';
import Slots from './slots.vue';
import CheckStrictly from '../../docs/.vuepress/components/check-strictly.vue';
import CustomProps from '../../docs/.vuepress/components/custom-props.vue';
import CustomRender from '../../docs/.vuepress/components/custom-render.vue';
import Filterable from '../../docs/.vuepress/components/filterable.vue';
import LazyLoadCacheData from '../../docs/.vuepress/components/lazy-load-cache-data.vue';
import LazyLoad from '../../docs/.vuepress/components/lazy-load.vue';
import Multiple from '../../docs/.vuepress/components/multiple.vue';
import Virtual from '../../docs/.vuepress/components/virtual.vue';
import WithForm from '../../docs/.vuepress/components/with-form.vue';

export default {
  components: {
    CheckOrExpand,
    WithForm,
    Virtual,
    Multiple,
    LazyLoadCacheData,
    LazyLoad,
    Filterable,
    CustomRender,
    CustomProps,
    CheckStrictly,
    SetValueInMounted,
    BigDataTable,
    BigData,
    ShowUnrenderLabel,
    BigDataMultipleSelect,
    Slots,
  },
};
</script>
