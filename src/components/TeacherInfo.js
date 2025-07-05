import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function TeacherInfo() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <span className="input-group-text student-form-header">Teacher Reference</span>

            <div className="form-floating input-group-sm ">
                <input
                    {...register("teacherName")}
                    type="text"
                    className="form-control"
                    id="teacherName"
                    placeholder=""
                />
                <label htmlFor="teacherName">Name</label>
                {errors.teacherName && <p className="error">{errors.teacherName.message}</p>}
            </div>

            <div className="form-floating input-group-sm ">
                <input
                    {...register("teacherEmail")}
                    type="email"
                    className="form-control"
                    id="teacherEmail"
                    placeholder="name@example.com"
                />
                <label htmlFor="teacherEmail">Email address</label>
                {errors.teacherEmail && <p className="error">{errors.teacherEmail.message}</p>}
            </div>
        </>
    );
}
