<script lang="tsx">
import ElSelectTree from '../src';
import { CMDoc, CMTable } from '@yujinpan/common-modules';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Highlight from 'highlight-vue';

const version = require('../package').version;

@Component
export default class Example extends Vue {
  value = '2-1';
  values = [];
  data = [
    {
      label: '乌鲁木齐市',
      value: '1',
      children: [
        { label: '达坂城区', value: '1-1' },
        { label: '头屯河区', value: '1-2' },
        {
          label: '乌鲁木齐县',
          value: '1-3',
          children: [
            { label: '1-3-1', value: '1-3-1' },
            { label: '1-3-2', value: '1-3-2' },
            { label: '1-3-3', value: '1-3-3' },
          ],
        },
      ],
    },
    {
      label: '武汉市',
      value: '2',
      children: [
        { label: '汉口', value: '2-1' },
        { label: '武昌', value: '2-2' },
        { label: '汉阳', value: '2-3' },
      ],
    },
  ];

  renderWithCheckStrictly() {
    return [
      <h4>
        选择任意级别 <code>check-strictly</code>
      </h4>,
      <p>可以选择任意节点，普通模式仅能选择叶子节点。</p>,
      <section>
        <ElSelectTree
          vModel={this.value}
          data={this.data}
          check-strictly
        ></ElSelectTree>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label>使用勾选框： </label>
        <ElSelectTree
          vModel={this.value}
          data={this.data}
          check-strictly
          show-checkbox
        ></ElSelectTree>
        <hr />
        <Highlight
          code={`
<template>
  <ElSelectTree
    v-model="value"
    :data="[
      {
        label: '乌鲁木齐市',
        value: '2',
        children: [
          { label: '达坂城区', value: '7' },
          { label: '头屯河区', value: '8' },
          { label: '乌鲁木齐县', value: '9' }
        ]
      }
    ]"
    check-strictly
    show-checkbox
  ></ElSelectTree>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
};
</${'script'}>
`}
        ></Highlight>
      </section>,
    ];
  }

  renderWithFilterable() {
    return [
      <h4>
        支持过滤 <code>filterable</code>
      </h4>,
      <section>
        <ElSelectTree
          vModel={this.value}
          data={this.data}
          filterable
        ></ElSelectTree>
        <hr />
        <Highlight
          code={`
<template>
  <ElSelectTree
    v-model="value"
    :data="[
      {
        label: '乌鲁木齐市',
        value: '2',
        children: [
          { label: '达坂城区', value: '7' },
          { label: '头屯河区', value: '8' },
          { label: '乌鲁木齐县', value: '9' }
        ]
      }
    ]"
    filterable
  ></ElSelectTree>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
};
</${'script'}>
`}
        ></Highlight>
      </section>,
    ];
  }

  renderWithMultiple() {
    return [
      <h4>
        多选模式 <code>multiple</code>
      </h4>,
      <section>
        <ElSelectTree
          vModel={this.values}
          data={this.data}
          multiple
        ></ElSelectTree>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label>过滤 + 多选 + 勾选框：</label>
        <ElSelectTree
          vModel={this.values}
          data={this.data}
          filterable
          multiple
          show-checkbox
        ></ElSelectTree>
        <hr />
        <Highlight
          code={`
<template>
  <ElSelectTree
    v-model="values"
    :data="[
      {
        label: '乌鲁木齐市',
        value: '2',
        children: [
          { label: '达坂城区', value: '7' },
          { label: '头屯河区', value: '8' },
          { label: '乌鲁木齐县', value: '9' }
        ]
      }
    ]"
    filterable
    multiple
    show-checkbox
  ></ElSelectTree>
</template>

<script>
export default {
  data() {
    return {
      values: []
    }
  }
};
</${'script'}>
`}
        ></Highlight>
      </section>,
    ];
  }

  renderCustomProps() {
    return [
      <h4>
        自定义别名 <code>props</code>
      </h4>,
      <section>
        <ElSelectTree
          vModel={this.value}
          data={[
            {
              id: 1,
              name: 1,
              child: [{ id: 2, name: 2 }],
            },
          ]}
          {...{
            props: {
              props: {
                value: 'id',
                label: (data) => data.name,
                children: 'child',
              },
            },
          }}
        ></ElSelectTree>
        <hr />
        <Highlight
          code={`
<template>
  <ElSelectTree
    v-model="value"
    :data="[
      {
        id: 1,
        name: 1,
        child: [{ id: 2, name: 2 }]
      }
    ]"
    :props="{
      value: 'id',
      label: (data) => data.name,
      children: 'child'
    }"
  ></ElSelectTree>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
};
</${'script'}>
`}
        ></Highlight>
      </section>,
    ];
  }

  private lazyValue = 2;
  private lazyId = 0;
  renderLazyLoad() {
    return [
      <h4>
        懒加载 <code>lazy</code>
      </h4>,
      <section>
        <ElSelectTree
          vModel={this.value}
          lazy
          load={(node, resolve) => {
            if (node.data && node.data.isLeaf) return resolve([]);
            setTimeout(() => {
              resolve([
                {
                  value: Date.now(),
                  label: '懒加载节点',
                  isLeaf: node.level === 3,
                },
              ]);
            }, 600);
          }}
        ></ElSelectTree>
        <hr />
        <Highlight
          code={`
<template>
  <ElSelectTree
    v-model="value"
    lazy
    :load="(node, resolve) => {
      if (node.data && node.data.isLeaf) return resolve([]);
      setTimeout(() => {
        resolve([
          {
            value: Date.now(),
            label: '懒加载节点',
            isLeaf: node.level === 3
          }
        ]);
      }, 600);
    }"
  ></ElSelectTree>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
};
</${'script'}>
`}
        ></Highlight>
      </section>,
      <h5>
        使用 <code>cacheData</code> 显示未加载节点的名称
      </h5>,
      <section>
        <ElSelectTree
          vModel={this.lazyValue}
          lazy
          cache-data={[{ value: 2, label: '2-label' }]}
          load={(node, resolve) => {
            setTimeout(() => {
              resolve([
                {
                  value: ++this.lazyId,
                  label: this.lazyId + '-label',
                },
              ]);
            }, 600);
          }}
        ></ElSelectTree>
        <hr />
        <Highlight
          code={`
<template>
  <ElSelectTree
    v-model="value"
    lazy
    :cache-data="[{value: 2, label: '2-label'}]"
    :load="(node, resolve) => {
      setTimeout(() => {
        resolve([
          {
            value: this.lazyId++,
            label: this.lazyId + '-label',
          }
        ]);
      }, 600);
    }"
  ></ElSelectTree>
</template>

<script>
export default {
  data() {
    return {
      value: 2,
      lazyId: 0,
    }
  }
};
</${'script'}>
`}
        ></Highlight>
      </section>,
    ];
  }

  renderCustomSlot() {
    return [
      <h4>自定义选项内容</h4>,
      <section>
        <ElSelectTree
          vModel={this.value}
          data={this.data}
          {...{
            scopedSlots: {
              default: ({ data }) => [
                <i class="el-icon-document"></i>,
                data.label,
              ],
            },
          }}
        ></ElSelectTree>
        <hr />
        <Highlight
          code={`
<template>
  <ElSelectTree
    v-model="value"
    :data="[
      {
        label: '乌鲁木齐市',
        value: '2',
        children: [
          { label: '达坂城区', value: '7' },
          { label: '头屯河区', value: '8' },
          { label: '乌鲁木齐县', value: '9' }
        ]
      }
    ]"
  >
    <span slot-scope="{ data, node }">
      <i class="el-icon-document"></i>
      {{data.label}}
    </span>
  </ElSelectTree>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
};
</${'script'}>
`}
        ></Highlight>
      </section>,
    ];
  }

  renderCustomRender() {
    return [
      <h4>自定义节点的渲染方法</h4>,
      <section>
        <ElSelectTree
          vModel={this.value}
          data={this.data}
          render-content={(h, { data, node }) => [
            h('i', { class: 'el-icon-document' }),
            data.label,
          ]}
        ></ElSelectTree>
        <hr />
        <Highlight
          code={`
<template>
  <ElSelectTree
    v-model="value"
    :data="[
      {
        label: '乌鲁木齐市',
        value: '2',
        children: [
          { label: '达坂城区', value: '7' },
          { label: '头屯河区', value: '8' },
          { label: '乌鲁木齐县', value: '9' }
        ]
      }
    ]"
  >
    <span slot="option" slot-scope="{ data, node }">
      <i class="el-icon-document"></i>
      {{data.label}}
    </span>
  </ElSelectTree>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
};
</${'script'}>
`}
        ></Highlight>
      </section>,
    ];
  }

  model = {
    value: '',
  };
  renderWithForm() {
    return [
      <h4>与表单一起使用</h4>,
      <section>
        <el-form ref="elForm" {...{ props: { model: this.model } }}>
          <el-form-item prop="value" label="选择地区" required>
            <ElSelectTree
              vModel={this.model.value}
              data={[
                {
                  label: '乌鲁木齐市',
                  value: '2',
                  children: [
                    { label: '达坂城区', value: '7' },
                    { label: '头屯河区', value: '8' },
                    { label: '乌鲁木齐县', value: '9' },
                  ],
                },
              ]}
              clearable
            ></ElSelectTree>
          </el-form-item>
        </el-form>
        <el-button onclick={() => this.$refs.elForm.validate()}>
          表单验证
        </el-button>
        <hr />
        <Highlight
          code={`
<template>
  <el-form ref="elForm" model="model">
    <el-form-item prop="value" label="选择地区" required>
      <ElSelectTree
        v-model="model.value"
        :data="[
          {
            label: '乌鲁木齐市',
            value: '2',
            children: [
              { label: '达坂城区', value: '7' },
              { label: '头屯河区', value: '8' },
              { label: '乌鲁木齐县', value: '9' }
            ]
          }
        ]"
        clearable
      ></ElSelectTree>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      model: {
        value: ''
      }
    }
  }
};
</${'script'}>
`}
        ></Highlight>
      </section>,
    ];
  }

  renderProps() {
    return [
      <h4>Props/Methods/Events/Slots</h4>,
      <p>
        继承了 el-select 与 el-tree 所有的
        Props/Methods/Events/Slots，这里不再重复，请至官方文档查看。
      </p>,
      <CMTable
        order={false}
        columns={['props', 'methods', 'events', 'slots'].map((item) => ({
          prop: item,
          label: item,
          type: 'handle',
          width: 'auto',
          handleButtons: (row) => [
            { label: row[item], href: row[`${item}Link`], target: '_blandk' },
          ],
        }))}
        data={[
          {
            props: 'el-select',
            propsLink:
              'https://element.eleme.io/#/zh-CN/component/select#select-attributes',
            methods: 'el-select',
            methodsLink:
              'https://element.eleme.io/#/zh-CN/component/select#methods',
            events: 'el-select',
            eventsLink:
              'https://element.eleme.io/#/zh-CN/component/select#select-events',
            slots: 'el-select',
            slotsLink:
              'https://element.eleme.io/#/zh-CN/component/select#select-slots',
          },
          {
            props: 'el-tree',
            propsLink:
              'https://element.eleme.io/#/zh-CN/component/tree#attributes',
            methods: 'el-tree',
            methodsLink:
              'https://element.eleme.io/#/zh-CN/component/tree#fang-fa',
            events: 'el-tree',
            eventsLink:
              'https://element.eleme.io/#/zh-CN/component/tree#events',
            slots: 'el-tree',
            slotsLink:
              'https://element.eleme.io/#/zh-CN/component/tree#scoped-slot',
          },
        ]}
      ></CMTable>,
      <h5>Own Props</h5>,
      <CMTable
        order={false}
        columns={[
          { prop: 'name', label: '属性名' },
          { prop: 'type', label: '类型' },
          { prop: 'desc', label: '描述' },
        ]}
        data={[
          {
            name: 'cacheData',
            type: 'Array',
            desc: '缓存数据，结构与 data 相同，做为未加载节点的预览',
          },
        ]}
      ></CMTable>,
    ];
  }

  render() {
    return (
      <CMDoc class="cm-padding-medium">
        <h2>el-select-tree</h2>
        <p>
          author:&nbsp;&nbsp;<code>yujinpan</code>
          &nbsp;&nbsp;version:&nbsp;&nbsp;
          <code>v{require('../package').version}</code>&nbsp;&nbsp;source
          code:&nbsp;&nbsp;
          <code>
            <a href="https://github.com/yujinpan/el-select-tree">github</a>
          </code>
        </p>

        <h3>Installation</h3>
        <Highlight
          code={`
$ npm install --save el-select-tree
        `}
          lang="sh"
        ></Highlight>
        <Highlight
          code={`
import Vue from 'vue';
import ElSelectTree from 'el-select-tree';

Vue.use(ElSelectTree);
        `}
          lang="js"
        ></Highlight>
        <blockquote>
          <p>如果你的项目不依赖 element-ui，则需要引入额外的组件包。</p>
          <Highlight
            code={`
import 'el-select-tree/lib/element-ui';
// 如果项目上是按需加载，则根据官方配置自行修改 babel.config.js
// 这里引入了完整的样式文件
// https://element.eleme.io/#/zh-CN/component/quickstart#an-xu-yin-ru
import 'element-ui/lib/theme-chalk/index.css';
        `}
            lang="js"
          ></Highlight>
        </blockquote>

        <h3>Usage</h3>
        {[
          this.renderWithCheckStrictly(),
          this.renderWithFilterable(),
          this.renderWithMultiple(),
          this.renderCustomProps(),
          this.renderLazyLoad(),
          this.renderCustomSlot(),
          this.renderCustomRender(),
          this.renderWithForm(),
          this.renderProps(),
        ]}
      </CMDoc>
    );
  }
}
</script>
