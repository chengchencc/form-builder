import { SFSchema } from '../../schema/index';
import { SFBaseWidgetConfigSchema } from '../default-config.schema';

export const SFSliderWidgetConfigSchema: SFSchema = {
    type: 'object',
    properties: {
        ...SFBaseWidgetConfigSchema.properties,
        minimum: {
            type: 'number',
            title: '最小值',
        },
        maximum: {
            type: 'number',
            title: '最大值',
        }
    }
};
