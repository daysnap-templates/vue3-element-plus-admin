import { doTodoCreate, doTodoUpdate } from '@/api'
import { createProDialogForm } from '@/components'

export const useTodoAddedOrUpdate = createProDialogForm(
  () => ({
    id: {
      label: 'ID',
      value: '',
      is: 'form-input',
      rules: [{ required: true, message: '请填写ID' }],
    },
    name: {
      label: '姓名',
      value: '',
      is: 'form-input',
      rules: [{ required: true, message: '请填写姓名' }],
    },
    content: {
      label: '内容',
      value: '',
      is: 'form-input',
      width: '100%',
      props: {
        type: 'textarea',
      },
      rules: [{ required: true, message: '请填写内容' }],
    },
  }),
  async (metadata, instance, item) => {
    console.log(item, 'item')
    await instance.value.show({
      title: item ? '编辑' : '新增',
      metadata,
      request: (params) => (item ? doTodoUpdate({ id: item.id, ...params }) : doTodoCreate(params)),
    })
    ElMessage.success('操作成功')
  },
)
