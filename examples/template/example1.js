export const example1 = `
<template>
  <el-select-tree
    v-if="show"
    :default-expand-all="defaultExpandAll"
    :multiple="multiple"
    :placeholder="placeholder"
    :disabled="disabled"
    :data="treeData"
    :props="treeProps"
    :check-strictly="checkStrictly"
    :clearable="clearable"
    :popover-width="popoverWidth"
    v-model="value1"
  ></el-select-tree>
</template>

<script>
import ElSelectTree from 'el-select-tree';

export default {
  components: {
    ElSelectTree
  },
  data() {
    return {
    clearable: true,
      defaultExpandAll: false,
      multiple: false,
      placeholder: 'please choose',
      disabled: false,
      checkStrictly: false,
      treeData: [
        {
          label: '新疆维吾尔自治区',
          id: '1',
          childrens: [
            {
              label: '乌鲁木齐市',
              id: '2',
              childrens: [
                { label: '达坂城区', id: '7', childrens: [] },
                { label: '头屯河区', id: '8', childrens: [] },
                { label: '乌鲁木齐县', id: '9', childrens: [] }
              ]
            },
            {
              label: '克拉玛依市',
              id: '3',
              disabled: true,
              childrens: [
                {
                  label: '克拉玛依区',
                  id: '10',
                  disabled: true,
                  childrens: []
                },
                { label: '白碱滩区', id: '11', disabled: true, childrens: [] },
                { label: '独山子区', id: '12', disabled: true, childrens: [] }
              ]
            },
            { label: '吐鲁番地区', id: '4', childrens: [] },
            { label: '哈密地区', id: '5', childrens: [] },
            { label: '昌吉回族自治州', id: '6', childrens: [] }
          ]
        }
      ],
      treeProps: {
        value: 'id',
        children: 'childrens',
        label: 'label'
      },
      popoverWidth: 0,
      value: '2',
    };
  }
};
</script>`;
