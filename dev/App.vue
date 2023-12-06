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
  </div>
</template>

<script>
import BigDataMultipleSelect from './tests/big-data-multiple-select.vue';
import BigDataTable from './tests/big-data-table.vue';
import BigData from './tests/big-data.vue';
import SetValueInMounted from './tests/set-value-in-mounted.vue';
import ShowUnrenderLabel from './tests/show-unrender-label.vue';
import CheckStrictly from '../docs/.vuepress/components/check-strictly.vue';
import CustomProps from '../docs/.vuepress/components/custom-props.vue';
import CustomRender from '../docs/.vuepress/components/custom-render.vue';
import Filterable from '../docs/.vuepress/components/filterable.vue';
import LazyLoadCacheData from '../docs/.vuepress/components/lazy-load-cache-data.vue';
import LazyLoad from '../docs/.vuepress/components/lazy-load.vue';
import Multiple from '../docs/.vuepress/components/multiple.vue';
import Virtual from '../docs/.vuepress/components/virtual.vue';
import WithForm from '../docs/.vuepress/components/with-form.vue';

export default {
  components: {
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
  },
};
</script>
