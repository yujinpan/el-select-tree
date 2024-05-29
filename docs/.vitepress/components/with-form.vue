<template>
  <div>
    <el-form ref="elForm" :model="model">
      <el-form-item prop="value" label="select" required>
        <ElSelectTree
          v-model="model.value"
          :data="data"
          clearable
        ></ElSelectTree>
      </el-form-item>
    </el-form>
    <el-button @click="$refs.elForm.validate()">Validate</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        value: '',
      },
      data: [
        {
          label: '乌鲁木齐市',
          value: '2',
          children: [
            { label: '达坂城区', value: '7' },
            { label: '头屯河区', value: '8' },
            { label: '乌鲁木齐县', value: '9' },
          ],
        },
      ],
    };
  },
};
</script>
