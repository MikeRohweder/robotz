import * as yup from 'yup';

export const questionnaireSchema = yup.object({
        interestRankings: yup
            .array()
            .of(yup.string())
            .length(6, 'You must rank all 6 interests.'),
            //.required('Please rank your interests.'),

        manyIdeas: yup
            .string()
            .required('This response is required.'),

        completedTasks: yup
            .string()
            .required('This response is required.'),

        upsetTeammate: yup
        .string()
        .required('This response is required.'),

        thingsHeated: yup
        .string()
        .required('This response is required.'),

        workOutsideLab: yup
            .string()
            .oneOf(
                [
                    'Not Likely',
                    'Maybe A Little',
                    'Likely',
                    'Very Likely',
                    'Whatever is Necessary',
                ],
                'Please select a valid option.'
            )
            .required('This field is required.'),

        timeCommitment: yup
            .string()
            .oneOf(['No', 'Yes', 'Unsure'], 'Please select a valid option.')
            .required('This field is required.'),

        requestedTeam: yup
            .string()
            .notRequired(),

        engProcess: yup
            .string()
            .required('Please describe your understanding of the engineering process.'),

        agree: yup
            .boolean()
            .oneOf([true], 'You must agree to the commitment to continue.')
    });
