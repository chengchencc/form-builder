import { SFSchema } from '../../../projects/form-core/src/lib/schema/index';
/**
 * 布局组件
 */
export const layoutComponents = [
    {
        title: '栅格布局',
        type: 'col',
        icon: 'border-horizontal',
        schema: { row: 12, col: 11 }
    },
    {
        title: '标签页',
        type: 'tab',
        icon: 'border-horizontal',
        schema: { row: 12, col: 11 }
    },
    {
        title: '标签页',
        type: 'tab',
        icon: 'border-horizontal',
        schema: { row: 12, col: 11 }
    }, {
        title: '标签页',
        type: 'tab',
        icon: 'border-horizontal',
        schema: { row: 12, col: 11 }
    }, {
        title: '标签页',
        type: 'tab',
        icon: 'border-horizontal',
        schema: { row: 12, col: 11 }
    },
];

/**
 * 页面组件
 */
export const pageComponents = [
    {
        title: '页头',
        type: 'pageHeader',
        icon: 'form',
        schema: {}
    },
    {
        title: '分割线',
        type: 'divider',
        icon: 'form',
        schema: {}
    }
];

export interface FormComponent {
    title: string;
    type: string;
    icon: string;
    schema: SFSchema;
}

/**
 * 表单组件
 */
export const formComponents: FormComponent[] = [
    {
        title: '单行文本',
        type: 'input',
        icon: 'form',
        schema: {
            type: 'string',
            title: '单行文本',
            ui: {
                widget: 'string',
                grid: {
                    span: 24
                }
            }
        }
    },
    {
        title: '多行文本',
        type: 'input',
        icon: 'form',
        schema: {
            type: 'string',
            title: '多行文本',
            ui: {
                widget: 'textarea',
                grid: {
                    span: 24
                }
            }
        }
    },
    {
        title: '数值',
        type: 'input',
        icon: 'form',
        schema: {
            type: 'number',
            title: '数值',
            minLength: 5,
            minimum: 18,
            maximum: 50,
            default: 25,
            ui: {
                widget: 'number',
                grid: {
                    span: 24
                }
            }
        }
    },
    {
        title: '范围',
        type: 'input',
        icon: 'form',
        schema: {
            type: 'number',
            title: '范围',
            minLength: 5,
            minimum: 18,
            maximum: 50,
            default: 25,
            ui: {
                widget: 'slider',
                grid: {
                    span: 24
                }
            }
        }
    },
    {
        title: '开关',
        type: 'input',
        icon: 'form',
        schema: {
            type: 'boolean',
            title: '开关',
            default: true,
            ui: {
                widget: 'boolean',
                grid: {
                    span: 24
                }
            }
        }
    },
    {
        title: '多选',
        type: 'input',
        icon: 'form',
        schema: {
            type: 'boolean',
            title: '多选',
            ui: {
                widget: 'checkbox',
                grid: {
                    span: 24
                }
            }
        }
    },

];
