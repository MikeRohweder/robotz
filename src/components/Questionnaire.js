import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const interests = [
    'Programming',
    'Building',
    'Leadership',
    'Media/Photography',
    'Journaling',
    'Researching',
];

export default function QuestionnaireInfo() {
    const {
        setValue,
        watch,
        register,
        formState: { errors },
    } = useFormContext();

    const defaultOrder = interests;
    const currentOrder = watch('interestRankings') || defaultOrder;

    useEffect(() => {
        if (!currentOrder) {
            setValue('interestRankings', defaultOrder, { shouldValidate: false });
        }
    }, [currentOrder, setValue, defaultOrder]);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = currentOrder.indexOf(active.id);
            const newIndex = currentOrder.indexOf(over.id);
            const newOrder = arrayMove(currentOrder, oldIndex, newIndex);
            setValue('interestRankings', newOrder, { shouldValidate: true });
        }
    };

    return (
        <>
            <span className="input-group-text student-form-header mb-2">Rank your interests in the following (1 = Most Interested, 6 = Least Interested)</span>

            <DndContext
                collisionDetection={closestCenter}
                sensors={sensors}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={currentOrder}
                    strategy={verticalListSortingStrategy}
                >
                    <ul className="space-y-2">
                        {currentOrder.map((interest, idx) => (
                            <SortableItem key={interest} id={interest} index={idx} />
                        ))}
                    </ul>
                </SortableContext>
            </DndContext>

            <span className="input-group-text student-form-header mb-2">Open-Ended Questions</span>

            <span className="input-group-text student-form-header ms-3">You had many ideas, and none of them were chosen by your teammates. How do you respond?</span>
            <div className="form-floating input-group-sm ">
                <textarea
                    {...register("manyIdeas")}
                    type="text"
                    className="form-control ms-3"
                    id="manyIdeas"
                    placeholder=""
                />
                {errors.manyIdeas && <p className="error">{errors.manyIdeas.message}</p>}
            </div>

            <span className="input-group-text student-form-header ms-3 mt-2">You completed your daily tasks in robotics, yet there is lab time remaining. What do you do next?</span>
            <div className="form-floating input-group-sm ">
                <textarea
                    {...register("completedTasks")}
                    type="text"
                    className="form-control ms-3"
                    id="completedTasks"
                    placeholder=""
                />
                {errors.completedTasks && <p className="error">{errors.completedTasks.message}</p>}
            </div>

            <span className="input-group-text student-form-header ms-3 mt-2">At a competition, a team member is upset/not showing support for the team, how do you respond?</span>
            <div className="form-floating input-group-sm ">
                <textarea
                    {...register("upsetTeammate")}
                    type="text"
                    className="form-control ms-3"
                    id="upsetTeammate"
                    placeholder=""
                />
                {errors.upsetTeammate && <p className="error">{errors.upsetTeammate.message}</p>}
            </div>

            <span className="input-group-text student-form-header ms-3 mt-2">Things become heated at a tournament while discussing robot design or team roles, how do you respond?</span>
            <div className="form-floating input-group-sm ">
                <textarea
                    {...register("thingsHeated")}
                    type="text"
                    className="form-control ms-3"
                    id="thingsHeated"
                    placeholder=""
                />
                {errors.thingsHeated && <p className="error">{errors.thingsHeated.message}</p>}
            </div>

            <span className="input-group-text student-form-header ms-3 mt-2">VEX VRC is a student-led program.  <br />How motivated are you to research/work on robotics outside of lab time?</span>
            <div className="form-floating input-group-sm ">
                <select
                    name="workOutsideLab"
                    className="form-control ms-3 strong-border"
                    type="button"
                    aria-expanded="false"
                    defaultValue = ""
                    {...register("workOutsideLab") }
                >
                    <option disabled value="">Select</option>
                    <option value="Not Likely">Not Likely</option>
                    <option value="Maybe A Little">Maybe a Little</option>
                    <option value="Likely">Likely</option>
                    <option value="Very Likely">Very Likely</option>
                    <option value="Whatever is Necessary">I will do whatever is necessary</option>
                </select>                
                {errors.workOutsideLab && <p className="error">{errors.workOutsideLab.message}</p>}
            </div>

            <span className="input-group-text student-form-header ms-3 mt-2">Competitive robotics teams require a significant amount of time. <br />Do you have any activities that may impact your involvement on the team?</span>
            <div className="form-floating input-group-sm ">

                <select
                    name="timeCommitment"
                    className="form-control ms-3 strong-border"
                    type="button"
                    aria-expanded="false"
                    defaultValue = ""
                    {...register("timeCommitment")}
                >
                    <option disabled value="">Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                    <option value="Unsure">Unsure</option>
                </select>
                {errors.timeCommitment && <p className="error">{errors.timeCommitment.message}</p>}
            </div>

            <span className="input-group-text student-form-header ms-3 mt-2">Do you have a preference to be placed with a specific RoboTZ team/teammates?</span>
            <div className="form-floating input-group-sm ">
                <input
                    {...register("requestedTeam")}
                    type="text"
                    className="form-control ms-3"
                    id="requestedTeam"
                    placeholder=""
                />
                {errors.requestedTeam && <p className="error">{errors.requestedTeam.message}</p>}
            </div>

            <span className="input-group-text student-form-header ms-3 mt-2">Please write the engineering process.  Place a * next to the part where you excel.  Place a - next to the part you need to improve on.</span>
            <div className="form-floating input-group-sm ">
                <textarea
                    {...register("engProcess")}
                    type="text"
                    className="form-control ms-3"
                    id="engProcess"
                    placeholder=""
                />
                {errors.engProcess && <p className="error">{errors.engProcess.message}</p>}
            </div>

            <span className="input-group-text student-form-header mt-2">RoboTZ students are committed to academic studies, achieving goals/expectations, participating in fundraising, securing sponsorships, and adhering to a proper student code of conduct at all times.  Submitting this application is an agreement to these requirements.</span>
            <div className="form-floating input-group-sm d-flex align-items-center ms-3">
                <input
                    type="checkbox"
                    {...register("agree", { valueAsBoolean: true })}
                    id="agree"
                    className="form-check-input"
                    style={{ marginRight: '8px' }}  // space between checkbox and label

                />
                <span style={{ color: 'black', marginTop:'5px' }}>&nbsp;&nbsp;I Agree</span>
                {errors.agree && <p className="error">{errors.agree.message}</p>}
            </div>
        </>
    );
}
