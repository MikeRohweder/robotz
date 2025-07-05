import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function StudentInfo() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <span className="input-group-text student-form-header">Student Information</span>

            <div className="form-floating input-group-sm ">
                <input
                    {...register("studentName")}
                    type="text"
                    className="form-control"
                    id="studentName"
                    placeholder=""
                />
                <label htmlFor="studentName">Name</label>
                {errors.studentName && <p className="error">{errors.studentName.message}</p>}
            </div>

            <div className="form-floating input-group-sm">
                <input
                    {...register("studentStreetAddress1")}
                    type="text"
                    className="form-control"
                    id="studentStreetAddress1"
                    placeholder="123 Main Street"
                />
                <label htmlFor="studentStreetAddress1">Street Address</label>
                {errors.studentStreetAddress1 && <p className="error">{errors.studentStreetAddress1.message}</p>}
            </div>
            <div className="form-floating input-group-sm ">
                <input
                    {...register("studentStreetAddress2")}
                    type="text"
                    className="form-control"
                    id="studentStreetAddress2"
                    placeholder="APT 1"
                />
                <label htmlFor="studentStreetAddress2">Apartment Number</label>
                {errors.studentStreetAddress2 && <p className="error">{errors.studentStreetAddress2.message}</p>}
            </div>
            <div className="form-floating input-group-sm">
                <input
                    {...register("studentCity")}
                    type="text"
                    className="form-control"
                    id="studentCity"
                    placeholder="Niles"
                />
                <label htmlFor="studentCity">City</label>
                {errors.studentCity && <p className="error">{errors.studentCity.message}</p>}
            </div>
            <div className="form-floating input-group-sm ">
                <input
                    {...register("studentState")}
                    type="text"
                    className="form-control"
                    id="studentState"
                    placeholder="MI"
                />
                <label htmlFor="studentState">State</label>
                {errors.studentState && <p className="error">{errors.studentState.message}</p>}
            </div>
            <div className="form-floating input-group-sm ">
                <input
                    {...register("studentZip")}
                    type="text"
                    className="form-control"
                    id="studentZip"
                    placeholder="49120"
                />
                <label htmlFor="studentZip">Zip Code</label>
                {errors.studentZip && <p className="error">{errors.studentZip.message}</p>}
            </div>
            <span className="input-group-text student-form-header mt-3">Contact Information</span>

            <div className="form-floating input-group-sm">
                <input
                    {...register("studentEmail")}
                    type="email"
                    className="form-control"
                    id="studentEmail"
                    placeholder="name@example.com"
                />
                <label htmlFor="studentEmail">Email address</label>
                {errors.studentEmail && <p className="error">{errors.studentEmail.message}</p>}
            </div>

            <div className="input-group">
                <div className="form-floating input-group-sm ">
                    <input
                        {...register("studentPhone")}
                        type="text"
                        className="form-control"
                        id="studentPhone"
                        placeholder="(123) 456-7890"
                    />
                    <label htmlFor="studentPhone">Phone Number</label>
                    {errors.studentPhone && <p className="error">{errors.studentPhone.message}</p>}
                </div>

                <div className="form-floating input-group-sm ms-3 ">
                    <input
                        {...register("studentShirtSize")}
                        type="text"
                        className="form-control"
                        id="studentShirtSize"
                        placeholder="Small"
                    />
                    <label htmlFor="studentShirtSize">T-Shirt Size</label>
                    {errors.studentShirtSize && <p className="error">{errors.studentShirtSize.message}</p>}
                </div>
            </div>

            <span className="input-group-text student-form-header mt-3">School Information</span>


            <div className="input-group">
                <div className="form-floating input-group-sm mb-5 ">
                    <input
                        {...register("studentSchoolName")}
                        type="text"
                        className="form-control"
                        id="studentSchoolName"
                        placeholder="School Name"
                    />
                    <label htmlFor="studentSchoolName">School Name</label>
                    {errors.studentSchoolName && <p className="error">{errors.studentSchoolName.message}</p>}
                </div>

                <div className="form-floating input-group-sm mb-5 ms-3">
                    <input
                        {...register("studentGrade")}
                        type="text"
                        className="form-control"
                        id="studentGrade"
                        placeholder="Grade (In Fall)"
                    />
                    <label htmlFor="studentGrade">Grade (In Fall)</label>
                    {errors.studentGrade && <p className="error">{'Student Grade Is Required'}</p>}
                </div>
            </div>
        </>
    );
}
