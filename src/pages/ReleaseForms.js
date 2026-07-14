import React, { useEffect, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SignatureCanvas from 'react-signature-canvas';

const schema = yup.object({
    // Required items
    studentName: yup.string().required('Required'),
    parentPrintedName: yup.string().required('Required'),
    parentSignedDate: yup.string().required('Required'),
    // Signature presence tracked separately; image saved on submit
    parentSignature: yup.string().nullable(),
});

export default function ReleaseForms() {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            // ----- Minor -----
            studentName: '', studentPhone: '', school: '', grade: '',
            partnershipProgram: '', homeAddress: '', email: '', dob: '', gender: '',
            ethnicity: [],
            roboticsYN: '', roboticsExperience: '',
            codingYN: '', codingExperience: '',
            // ----- Contacts -----
            motherName: '', motherPhone: '', motherEmail: '',
            fatherName: '', fatherPhone: '', fatherEmail: '',
            emergencyContact: '', emergencyPhone: '', emergencyRelation: '',
            // ----- Medical -----
            physicianName: '', physicianAddress: '', physicianPhone: '',
            insurer: '', policyNumbers: '', policyUnder: '',
            allergiesPlan: '', maintenanceMeds: '', otherMedical: '',
            // ----- Consent / Signature -----
            parentPrintedName: '', parentSignature: '', parentSignedDate: '',
            signatureTimestamp: '',
        }
    });

    const { register, setValue, getValues, handleSubmit, formState: { errors } } = methods;

    // Prefill from StudentApplication
    useEffect(() => {
        try {
            const raw = localStorage.getItem('applicationData');
            if (!raw) return;
            const d = JSON.parse(raw);
            setValue('studentName', d.studentName || '');
            setValue('studentPhone', d.studentPhone || '');
            setValue('school', d.studentSchoolName || '');
            setValue('grade', d.studentGrade || '');
            setValue('homeAddress', [d.studentStreetAddress1, d.studentStreetAddress2].filter(Boolean).join(' ') || '');
            setValue('email', d.studentEmail || '');
            // add more mappings here if you collect them on page 1
        } catch { /* no-op */ }
    }, [setValue]);

    const sigPad = useRef(null);
    //const [signed, setSigned] = useState(false);

    const Err = ({ name }) => errors[name] ? <div className="error">{errors[name]?.message}</div> : null;

    const clearSignature = () => {
        if (!sigPad.current) return;
        sigPad.current.clear();
        //setSigned(false);
        setValue('parentSignature', '');
        setValue('signatureTimestamp', '');
    };

    // Draw typed name + timestamp onto the canvas
    const autoSign = () => {
        const name = (getValues('parentPrintedName') || '').trim();
        if (!name) {
            alert('Please type the Parent/Guardian Printed Name first.');
            return;
        }
        const canvas = sigPad.current.getCanvas();
        const ctx = canvas.getContext('2d');

        // Clear any previous strokes so auto-sign is clean
        sigPad.current.clear();

        // Name
        ctx.font = '28px cursive';
        ctx.fillStyle = '#000';
        ctx.fillText(name, 20, 90);

        // Timestamp
        const timestamp = new Date().toLocaleString();
        ctx.font = '16px monospace';
        ctx.fillText(timestamp, 20, 130);

        //setSigned(true);
        setValue('parentSignature', name);
        setValue('signatureTimestamp', timestamp);
    };

    const onSubmit = (data) => {
        // Attach signature image if present
        if (sigPad.current && !sigPad.current.isEmpty()) {
            data.signatureImage = sigPad.current.toDataURL('image/png');
        }
        // Persist locally (or POST to backend)
        localStorage.setItem('releaseFormsData', JSON.stringify(data));
        alert('Release forms saved with signature and timestamp!');
    };

    return (
        <main>
            <div className="hero student-form">
                <h2>Authorization / Release Forms</h2>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4">

                        {/* ===================== Minor / Student ===================== */}
                        <div className="form-section">
                            <div className="form-section-title">Minor</div>
                            <div className="form-grid">
                                <label>Full Legal Name</label>
                                <input className="strong-border" {...register('studentName')} />
                                <div className="full"><Err name="studentName" /></div>

                                <label>Student Phone</label>
                                <input className="strong-border" {...register('studentPhone')} />

                                <label>School</label>
                                <input className="strong-border" {...register('school')} />

                                <label>Grade</label>
                                <input className="strong-border" {...register('grade')} />

                                <label>Partnership Program</label>
                                <input className="strong-border" {...register('partnershipProgram')} />

                                <label>Home Address</label>
                                <input className="strong-border" {...register('homeAddress')} />

                                <label>Email</label>
                                <input className="strong-border" type="email" {...register('email')} />

                                <label>Date of Birth</label>
                                <input className="strong-border" type="date" {...register('dob')} />

                                <label>Gender</label>
                                <select className="strong-border" {...register('gender')}>
                                    <option value="">—</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="NB">Non-Binary</option>
                                </select>

                                <label className="full">Student Race / Ethnicity (check all that apply)</label>
                                <div className="full">
                                    {[
                                        'American Indian / Alaska Native', 'Asian', 'Black / African American',
                                        'Hispanic / Latino / Spanish', 'Native Hawaiian / Pacific Islander',
                                        'White', 'Other Race / Ethnicity'
                                    ].map(opt => (
                                        <label key={opt} style={{ marginRight: 12 }}>
                                            <input type="checkbox" value={opt} {...register('ethnicity')} /> {opt}
                                        </label>
                                    ))}
                                </div>

                                <label>Robotics Experience</label>
                                <div>
                                    <label><input type="radio" value="Y" {...register('roboticsYN')} /> Yes</label>{' '}
                                    <label><input type="radio" value="N" {...register('roboticsYN')} /> No</label>
                                    <input className="strong-border" placeholder="If yes, what type/programs" style={{ display: 'block', marginTop: 6 }} {...register('roboticsExperience')} />
                                </div>

                                <label>Coding/Programming</label>
                                <div>
                                    <label><input type="radio" value="Y" {...register('codingYN')} /> Yes</label>{' '}
                                    <label><input type="radio" value="N" {...register('codingYN')} /> No</label>
                                    <input className="strong-border" placeholder="If yes, what type/programs" style={{ display: 'block', marginTop: 6 }} {...register('codingExperience')} />
                                </div>
                            </div>
                        </div>

                        {/* ===================== Contacts ===================== */}
                        <div className="form-section">
                            <div className="form-section-title">Contacts</div>
                            <div className="form-grid">
                                <label>Mother/Guardian Name</label>
                                <input className="strong-border" {...register('motherName')} />
                                <label>Phone</label>
                                <input className="strong-border" {...register('motherPhone')} />
                                <label>Email</label>
                                <input className="strong-border" type="email" {...register('motherEmail')} />

                                <label>Father/Guardian Name</label>
                                <input className="strong-border" {...register('fatherName')} />
                                <label>Phone</label>
                                <input className="strong-border" {...register('fatherPhone')} />
                                <label>Email</label>
                                <input className="strong-border" type="email" {...register('fatherEmail')} />

                                <label>Other Emergency Contact</label>
                                <input className="strong-border" {...register('emergencyContact')} />
                                <label>Phone</label>
                                <input className="strong-border" {...register('emergencyPhone')} />
                                <label>Relationship</label>
                                <input className="strong-border" {...register('emergencyRelation')} />
                            </div>
                        </div>

                        {/* ===================== Medical ===================== */}
                        <div className="form-section">
                            <div className="form-section-title">Medical Treatment Authorization</div>
                            <div className="form-grid">
                                <label>Physician’s Name</label>
                                <input className="strong-border" {...register('physicianName')} />
                                <label>Address</label>
                                <input className="strong-border" {...register('physicianAddress')} />
                                <label>Phone</label>
                                <input className="strong-border" {...register('physicianPhone')} />

                                <label>Medical Insurer/Health Plan</label>
                                <input className="strong-border" {...register('insurer')} />
                                <label>Policy Numbers</label>
                                <input className="strong-border" {...register('policyNumbers')} />
                                <label>Name Policy is Under</label>
                                <input className="strong-border" {...register('policyUnder')} />

                                <label className="full">Allergies to Medications & Treatment Plan</label>
                                <textarea className="strong-border full" rows="3" {...register('allergiesPlan')} />

                                <label className="full">Maintenance Medications (chronic)</label>
                                <textarea className="strong-border full" rows="3" {...register('maintenanceMeds')} />

                                <label className="full">Other significant medical info (incl. food allergies)</label>
                                <textarea className="strong-border full" rows="4" {...register('otherMedical')} />
                            </div>
                            <p className="form-note">
                                *Any prescription medication brought to RoboTZ lab or events MUST be in pharmacy labeled containers.
                            </p>
                        </div>

                        {/* ===================== Consent & eSignature ===================== */}
                        <div className="form-section">
                            <div className="form-section-title">Authorization & Release of Liability</div>
                            <p className="form-note" style={{ marginBottom: 6 }}>
                                I hereby state that I have legal custody of the aforementioned minor. I grant my authorization and consent
                                for Robo-Tech Zone of Michiana’s authorized adult (“Designated Adult”) to administer general first aid and,
                                when necessary, to summon professional emergency personnel to attend, transport, and treat the minor. I agree
                                to assume financial responsibility for such care. This authorization is given in advance and exercised in good
                                faith by the Designated Adult in their best judgment.
                            </p>

                            <div className="form-grid" style={{ marginTop: 8 }}>
                                <label>Parent/Guardian Printed Name</label>
                                <input className="strong-border" {...register('parentPrintedName')} />
                                <div className="full"><Err name="parentPrintedName" /></div>
                            </div>

                            {/* Signature Pad */}
                            <div style={{ marginTop: 12 }}>
                                <label className="student-form-header">Signature</label>
                                <div style={{ border: '2px solid #333', borderRadius: 4, width: '100%', height: 160, marginTop: 6 }}>
                                    <SignatureCanvas
                                        ref={sigPad}
                                        penColor="black"
                                        canvasProps={{ width: 700, height: 160, className: 'sigCanvas' }}
                                        onEnd={() => {
                                            // If they draw by hand, capture timestamp automatically
          //                                  setSigned(true);
                                            setValue('parentSignature', 'drawn');
                                            setValue('signatureTimestamp', new Date().toLocaleString());
                                        }}
                                    />
                                </div>
                                <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                                    <button type="button" className="form-button" onClick={clearSignature}>Clear</button>
                                    <button type="button" className="form-button submit-button" onClick={autoSign}>eSign with Name</button>
                                </div>
                                <input type="hidden" {...register('parentSignature')} />
                                <input type="hidden" {...register('signatureTimestamp')} />
                            </div>
                        </div>

                        <div className="mt-6" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button className="form-button" type="button" onClick={() => window.history.back()}>Back</button>
                            <button className="form-button submit-button" type="submit">Save Release Forms</button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </main>
    );
}
