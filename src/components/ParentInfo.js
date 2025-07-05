import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ParentInfo() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <span className="input-group-text student-form-header">Parent Information</span>

            <div className="form-floating input-group-sm ">
                <input
                    {...register("parentName")}
                    type="text"
                    className="form-control"
                    id="parentName"
                    placeholder=""
                />
                <label htmlFor="parentName">Name</label>
                {errors.parentName && <p className="error">{errors.parentName.message}</p>}
            </div>

            <div className="form-floating input-group-sm ">
                <input
                    {...register("parentEmail")}
                    type="email"
                    className="form-control"
                    id="parentEmail"
                    placeholder="name@example.com"
                />
                <label htmlFor="parentEmail">Email address</label>
                {errors.parentEmail && <p className="error">{errors.parentEmail.message}</p>}
            </div>

            <div className="input-group">
                <div className="form-floating input-group-sm ">
                    <input
                        {...register("parentPhone")}
                        type="text"
                        className="form-control"
                        id="parentPhone"
                        placeholder="(123) 456-7890"
                    />
                    <label htmlFor="parentPhone">Phone Number</label>
                    {errors.parentPhone && <p className="error">{errors.parentPhone.message}</p>}
                </div>
                {errors.studentGrade && <p className="error">{errors.studentGrade.message}</p>}
            </div>
        </>
    );
}
