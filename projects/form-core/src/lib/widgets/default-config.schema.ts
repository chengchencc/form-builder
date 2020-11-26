import { SFSchema } from '../form';


export const SFBaseWidgetConfigSchema: SFSchema = {
    properties: {
        title: {
            type: 'string',
            title: '标题'
        },
        ui: {
            type: 'object',
            properties: {
                widget: {
                    type: 'string',
                    title: '组件类型',
                    enum: [
                        { label: '单行输入', value: 'string' },
                        { label: '多行输入', value: 'textarea' },
                        { label: '文本', value: 'text' },
                        { label: '日期', value: 'date' },
                        { label: '时间', value: 'time' },
                        { label: '单选', value: 'radio' },
                        { label: '多选', value: 'checkbox' },
                        { label: '下拉框', value: 'select' },
                        { label: '树状下拉', value: 'tree-select' },
                        { label: '标签', value: 'tag' },
                        { label: '上传', value: 'upload' }
                    ],
                    default: 'string'
                },
                grid: {
                    type: 'object',
                    properties: {
                        span: {
                            type: 'number',
                            title: '宽度',
                            default: 24,
                            minimum: 1,
                            maximum: 24,
                            ui: {
                              widget: 'slider',
                              grid: { span: 24 }
                            }
                        }
                    }
                }
            }
        },

        // remark: {
        //     type: 'string',
        //     title: '描述',
        //     ui: {
        //         widget: 'textarea',
        //         autosize: true,
        //         grid: {
        //             span: 24
        //         }
        //     }
        // }
    }
};
