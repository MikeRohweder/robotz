import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { applicationSchema } from '../components/schemas/applicationSchema';
import { studentInfoSchema } from '../components/schemas/studentInfoSchema';
import { parentInfoSchema } from '../components/schemas/parentInfoSchema';
import { teacherInfoSchema } from '../components/schemas/teacherInfoSchema';
import { questionnaireSchema } from '../components/schemas/questionnaireSchema';

import StudentInfo from '../components/StudentInfo';
import ParentInfo from '../components/ParentInfo';
import TeacherInfo from '../components/TeacherInfo';
import Questionnaire from '../components/Questionnaire';
import jsPDF from 'jspdf';

import logo from '../assets/logo-neon.png';
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function StudentApplication() {

    const navigate = useNavigate();


    const methods = useForm({
        resolver: yupResolver(applicationSchema),
        mode: 'onBlur'
    });
    const { trigger } = methods;


    const [tabIndex, setTabIndex] = useState(0);

    const loadImageAsDataURL = (url) =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = reject;
            img.src = url;
        });


    const onSubmit = async (data) => {
    const loadingToast = toast.loading("Submitting Application...");
    try {
        const doc = new jsPDF();
        let y = 10;

        const imageData = await loadImageAsDataURL(logo);
        doc.addImage(imageData, 'PNG', 42.5, y, 125, 25);
        y = y + 35;

        // Title
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Student Application", 105, y, null, null, "center");
        y = y + 5;

        // Line under title
        doc.setLineWidth(0.5);
        doc.line(15, y, 195, y);
        y = y + 10;

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");

        const printField = (label, value, header, bold = false, x = 65) => {
            const lineHeight = 7;
            const pageHeight = doc.internal.pageSize.height;
            const marginTop = 20;
            const marginBottom = 20;

            let displayValue = "";

            if (Array.isArray(value)) {
                displayValue = value.join(", ");
            } else if (typeof value === "boolean") {
                displayValue = value ? "Yes" : "No";
            } else {
                displayValue = value?.toString() || "";
            }

            const wrappedText = doc.splitTextToSize(displayValue, 150);

            if (header) {
                if (y + lineHeight > pageHeight - marginBottom) {
                    doc.addPage();
                    y = marginTop;
                }
                doc.setFont("helvetica", "bold");
                doc.setFontSize(18);
                doc.text(label, 18, y);
                y += lineHeight;
            } else {
                if (label) {
                    if (y + lineHeight > pageHeight - marginBottom) {
                        doc.addPage();
                        y = marginTop;
                    }
                    doc.setFont("helvetica", bold ? "bold" : "normal");
                    doc.setFontSize(12);
                    doc.text(label, 22, y);
                }
            }

            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);

            wrappedText.forEach(line => {
                if (y + lineHeight > pageHeight - marginBottom) {
                    doc.addPage();
                    y = marginTop;
                }
                doc.text(line, x, y);
                y += lineHeight;
            });
        };

        // --- PRINT FIELDS BELOW ---
        printField("Student Information", "", true);
        printField("Name", data.studentName, false);
        printField("Address", data.studentStreetAddress1, false);
        printField("Address 2", data.studentStreetAddress2, false);
        printField("City", data.studentCity, false);
        printField("State", data.studentState, false);
        printField("Zip Code", data.studentZip, false);
        printField("Phone", data.studentPhone, false);
        printField("Email", data.studentEmail, false);
        printField("T-Shirt Size", data.studentShirtSize);
        printField("School Name", data.studentSchoolName);
        printField("Grade In Fall", data.studentGrade);

        printField("", "", true);

        printField("Parent Information", "", true);
        printField("Name", data.parentName, false);
        printField("Email", data.parentEmail, false);
        printField("Phone", data.parentPhone, false);

        printField("", "", true);

        printField("Teacher Reference", "", true);
        printField("Name", data.teacherName, false);
        printField("Email", data.teacherEmail, false);

        printField("", "", true);

        printField("Questionnaire", "", true);
        printField("Interests", "", false, true);

        if (data.interestRankings === undefined) {
            data.interestRankings = [
                'Programming',
                'Building',
                'Leadership',
                'Media/Photography',
                'Journaling',
                'Researching'
            ];
        }
        for (let x = 0; x <= 5; x++) {
            printField(data.interestRankings[x], x + 1, false);
        }

        printField("", "", true);

        printField("Open-Ended Questions", "", false, true);

        printField("You had many ideas, and none of them were chosen by your teammates.", "", false, true)
        printField("", data.manyIdeas, false, false, 30)

        printField("You completed your daily tasks in robotics, yet there is lab time remaining.", "", false, true)
        printField("", data.completedTasks, false, false, 30)

        printField("At a competition, a team member is upset/not showing support for the team.", "", false, true)
        printField("", data.upsetTeammate, false, false, 30)

        printField("Things become heated at a tournament while discussing robot design or team roles.", "", false, true)
        printField("", data.thingsHeated, false, false, 30)

        printField("How motivated are you to research/work on robotics outside of lab time?", "", false, true)
        printField("", data.workOutsideLab, false, false, 30)

        printField("Do you have any activities that may impact your involvement on the team?", "", false, true)
        printField("", data.timeCommitment, false, false, 30)

        printField("Do you have a preference to be placed with a specific RoboTZ team/teammates?", "", false, true)
        printField("", data.requestedTeam, false, false, 30)

        printField("Please write the engineering process.", "", false, true)
        printField("", data.engProcess, false, false, 30)

        printField("I Agree to the requirements/terms.", "", false, true)
        printField("", data.agree ? "I agree" : "No", false, false, 30)

        // Add footer page numbers
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(`Page ${i} of ${pageCount}`, 105, 290, null, null, "center");
        }

        const pdfBlob = doc.output('blob');

        const formData = new FormData();
        formData.append('pdf', pdfBlob, 'student-application.pdf');
        formData.append('name', data.studentName);

        const response = await fetch('https://robotz-backend.onrender.com/send-form', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error("Failed to Send PDF");
        }

        const blobUri = URL.createObjectURL(pdfBlob);
        localStorage.setItem('pdfPreviewUrl', blobUri);

        toast.update(loadingToast, {
            render: "Application Submitted!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
        });

        setTimeout(() => {
            window.open(blobUri, '_blank');
        }, 3000);

    } catch (error) {
        toast.update(loadingToast, {
            render: `Submission failed...\n${error}`,
            type: "error",
            isLoading: false,
            autoClose: 3000,
        });
        console.error(error);
    }
};




    //const onSubmit = (data) => {
    //    console.log("Full form data:", data);
    //    alert("Application Successfully Submitted! Thank You!");
    //    reset();
    //    setTabIndex(0);
    //};

    const onError = (errors) => {
        console.log("Validation errors:", errors);
        alert("Please correct errors before submitting.");
    };

    const handleNext = async (index = -1) => {
        let fieldsToValidate = [];

        if (tabIndex === 0) {
            fieldsToValidate = Object.keys(studentInfoSchema.fields);
        } 
        else if (tabIndex === 1) {
            fieldsToValidate = Object.keys(parentInfoSchema.fields);
        }
        else if (tabIndex === 2) {
            fieldsToValidate = Object.keys(teacherInfoSchema.fields);
        }
        else if (tabIndex === 3) {
            fieldsToValidate = Object.keys(questionnaireSchema.fields);
        }

        const isValid = await trigger(fieldsToValidate);
        if (isValid) {
            if (index > -1) {
                setTabIndex(index);
            } else {
                setTabIndex(tabIndex + 1);
            }
        } 
    };

    return (
        <>
            <ToastContainer />
            <FormProvider {...methods}>
                <div className="hero student-form">
                    <form onSubmit={methods.handleSubmit(onSubmit, onError)} className="max-w-4xl mx-auto p-4">
                        <div className="mb-4">
                            <button className="form-button" type="button" onClick={() => handleNext(0)}>Student Info</button>
                            <button className="form-button" type="button" onClick={() => handleNext(1)}>Parent Info</button>
                            <button className="form-button" type="button" onClick={() => handleNext(2)}>Teacher Info</button>
                            <button className="form-button" type="button" onClick={() => handleNext(3)}>Questionnaire</button>
                        </div>
                        {tabIndex === 0 && <StudentInfo />}
                        {tabIndex === 1 && <ParentInfo />}
                        {tabIndex === 2 && <TeacherInfo />}
                        {tabIndex === 3 && <Questionnaire />}

                        <div className="mt-6 flex justify-between">
                            {tabIndex > 0 && (
                                <button className="form-button bottom" type="button" onClick={() => setTabIndex(tabIndex - 1)}>Back</button>
                            )}
                            {tabIndex < 3 ? (
                                <button className="form-button bottom-button" type="button" onClick={() => handleNext()}>Next</button>
                            ) : ( <></>
                            )}
                            {tabIndex === 3 && (
                                <button className="form-button bottom-button submit-button" type="submit">Submit</button>
                            )}
                        </div>
                    </form>
                </div>
            </FormProvider>
        </>
    );
}
