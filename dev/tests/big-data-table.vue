<template>
  <div style="height: 100vh; overflow-y: auto">
    <el-button @click="setData">setData</el-button>
    <table>
      <tr v-for="(item, index) in tableData" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>
          <el-select-tree
            v-model="item.person"
            multiple
            :data="data"
            node-key="dictCode"
            :props="{
              label: 'dictName',
            }"
            check-strictly
          ></el-select-tree>
        </td>
        <td>
          <el-select-tree
            v-model="item.person2"
            multiple
            :data="data"
            node-key="dictCode"
            :props="{
              label: 'dictName',
            }"
            check-strictly
          ></el-select-tree>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          dictCode: '10000',
          dictName: '测试10000',
          children: [
            {
              dictCode: '10001',
              dictName: '测试人员1',
              children: [],
            },
            {
              dictCode: '10002',
              dictName: '测试人员2',
              children: [],
            },
            {
              dictCode: '10003',
              dictName: '测试人员3',
              children: [],
            },
            {
              dictCode: '10004',
              dictName: '测试人员4',
              children: [],
            },
            {
              dictCode: '10005',
              dictName: '测试人员5',
              children: [],
            },
            {
              dictCode: '10006',
              dictName: '测试人员6',
              children: [],
            },
            {
              dictCode: '10007',
              dictName: '测试人员7',
              children: [],
            },
            {
              dictCode: '10008',
              dictName: '测试人员8',
              children: [],
            },
            {
              dictCode: '10009',
              dictName: '测试人员9',
              children: [],
            },
            {
              dictCode: '10010',
              dictName: '测试人员10',
              children: [],
            },
            {
              dictCode: '10011',
              dictName: '测试人员11',
              children: [],
            },
            {
              dictCode: '10012',
              dictName: '测试人员12',
              children: [],
            },
            {
              dictCode: '10013',
              dictName: '测试人员13',
              children: [],
            },
            {
              dictCode: '10014',
              dictName: '测试人员14',
              children: [],
            },
            {
              dictCode: '10015',
              dictName: '测试人员15',
              children: [],
            },
            {
              dictCode: '10016',
              dictName: '测试人员16',
              children: [],
            },
            {
              dictCode: '10017',
              dictName: '测试人员17',
              children: [],
            },
            {
              dictCode: '10018',
              dictName: '测试人员18',
              children: [],
            },
            {
              dictCode: '10019',
              dictName: '测试人员19',
              children: [],
            },
            {
              dictCode: '10020',
              dictName: '测试人员20',
              children: [],
            },
            {
              dictCode: '10021',
              dictName: '测试人员21',
              children: [],
            },
            {
              dictCode: '10022',
              dictName: '测试人员22',
              children: [],
            },
            {
              dictCode: '10023',
              dictName: '测试人员23',
              children: [],
            },
          ],
        },
        {
          dictCode: '20000',
          dictName: '测试人员24',
          children: [
            {
              dictCode: '20001',
              dictName: '测试人员25',
              children: [],
            },
            {
              dictCode: '20002',
              dictName: '测试人员26',
              children: [],
            },
          ],
        },
        {
          dictCode: '30000',
          dictName: '测试人员27',
          children: [
            {
              dictCode: '30001',
              dictName: '测试人员28',
              children: [],
            },
          ],
        },
        {
          dictCode: '40000',
          dictName: '测试人员29',
          children: [
            {
              dictCode: '40001',
              dictName: '测试人员30',
              children: [],
            },
            {
              dictCode: '40002',
              dictName: '测试人员31',
              children: [],
            },
          ],
        },
        {
          dictCode: '50000',
          dictName: '测试人员32',
          children: [
            {
              dictCode: '50001',
              dictName: '测试人员33',
              children: [],
            },
          ],
        },
        {
          dictCode: '60000',
          dictName: '测试人员34',
          children: [
            {
              dictCode: '60001',
              dictName: '测试人员35',
              children: [],
            },
          ],
        },
        {
          dictCode: '70000',
          dictName: '测试人员36',
          children: [],
        },
        {
          dictCode: '80000',
          dictName: '测试人员37',
          children: [
            {
              dictCode: '80001',
              dictName: '测试人员38',
              children: [],
            },
          ],
        },
      ],

      tableData: new Array(40).fill(1).map((val, index) => ({
        id: index + 1,
        name: 'Test1',
        person: [],
        person2: [],
      })),
    };
  },
  methods: {
    setData() {
      this.tableData.forEach((item) => {
        item.person = ['10000'];
      });
    },
  },
};
</script>

<style lang="scss">
table {
  table-layout: fixed;
  border-collapse: collapse;

  td {
    padding: 5px;
    border: 1px solid #000;
  }
}
</style>
