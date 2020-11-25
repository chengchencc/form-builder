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
        }
    }
];
