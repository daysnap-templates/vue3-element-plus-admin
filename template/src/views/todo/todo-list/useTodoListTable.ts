import { reqTodoList } from '@/api'
import { useProTable } from '@/components'

export function useTodoListTable() {
  return useProTable(
    {
      input: {
        is: 'form-input',
        value: '',
        label: '输入框',
      },
      select: {
        is: 'form-select',
        value: '',
        label: '选择框',
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
        ],
      },
      radio: {
        is: 'form-radio',
        value: '',
        label: '单选按钮',
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
        ],
      },
      checkbox: {
        is: 'form-checkbox',
        value: [],
        label: '复选框',
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
        ],
      },
      datePicker: {
        is: 'form-date-picker',
        value: '',
        label: '单个日期选择',
      },
      dateRangePicker: {
        is: 'form-date-picker',
        value: '',
        label: '日期区间选择',
        props: {
          type: 'daterange',
        },
      },
      dateTimeRangePicker: {
        is: 'form-date-picker',
        value: '',
        label: '日期时间区间选择',
        props: {
          type: 'datetimerange',
        },
      },
      treeSelect: {
        is: 'form-tree-select',
        value: '',
        label: '树形选择组件',
        options: [
          {
            value: '1',
            label: 'Level one 1',
            children: [
              {
                value: '1-1',
                label: 'Level two 1-1',
                children: [
                  {
                    value: '1-1-1',
                    label: 'Level three 1-1-1',
                  },
                ],
              },
            ],
          },
        ],
      },
      cascader: {
        is: 'form-cascader',
        value: '',
        label: '级联选择器',
        props: {
          options: [
            {
              value: 'guide',
              label: 'Guide',
              children: [
                {
                  value: 'disciplines',
                  label: 'Disciplines',
                  children: [
                    {
                      value: 'consistency',
                      label: 'Consistency',
                    },
                    {
                      value: 'feedback',
                      label: 'Feedback',
                    },
                    {
                      value: 'efficiency',
                      label: 'Efficiency',
                    },
                    {
                      value: 'controllability',
                      label: 'Controllability',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    async ([current, length], query) => {
      const { dataList, count } = await reqTodoList({ current, length, ...query })
      return [dataList, count]
    },
  )
}
