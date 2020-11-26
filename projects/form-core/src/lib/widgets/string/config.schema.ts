import { SFSchema } from '../../schema/index';
import { SFBaseWidgetConfigSchema } from '../default-config.schema';

export const SFStringWidgetConfigSchema: SFSchema = {
    type: 'object',
    properties: {
        ...SFBaseWidgetConfigSchema.properties,
        cc: {
            type: 'string',
            title: 'cc',
            minLength: 5
        },
    }
};
