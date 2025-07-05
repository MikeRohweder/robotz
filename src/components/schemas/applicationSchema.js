import * as yup from 'yup';
import { studentInfoSchema } from './studentInfoSchema';
import { parentInfoSchema } from './parentInfoSchema';
import { teacherInfoSchema } from './teacherInfoSchema';
import { questionnaireSchema } from './questionnaireSchema';

export const applicationSchema = studentInfoSchema
    .concat(parentInfoSchema)
    .concat(teacherInfoSchema)
    .concat(questionnaireSchema);