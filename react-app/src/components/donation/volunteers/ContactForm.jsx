import InputFiled from "../General-Components/InputFiled";
import Button from "../General-Components/Button";
import "./ContactForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";

function ContactForm() {
    const formik = useFormik({
        initialValues: {
            userFirstName: "",
            userLastName: "",
            PhoneNumber: "",
            Age: "",
            userEmail: "",
            userMessage: "",
        },

        validationSchema: Yup.object({
            userFirstName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required(" * Name is required"),
            userLastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required(" * Last Name is required"),
            Age: Yup.number().min(18, "Must be at least 18 years old")
                .positive()
                .max(70, "Must be 70 years old or less")
                .required(" * Age is required"),
            userEmail: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required(" * Email is required"),
            PhoneNumber: Yup.string()
                .required(" * Phone number is required")
                .matches(/^[0-9]+$/, "Must be a valid phone number")
                .min(9, "Must be at least 9 characters")
                .max(12, "Must be 12 characters or less"),
            userMessage: Yup.string()
                .max(600, "Must be 600 characters or less")
                .required(" * Message is required"),
        }),

        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await fetch("http://localhost:5550/volunteers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    alert("Form created successfully");
                    resetForm(); // Reset the form after successful submission
                } else {
                    alert("There was an error processing your request.");
                }
            } catch (error) {
                console.error(error);
                alert('Request could not be created due to a network or server error.');
            }
        },
    });

    return (
        <div className="form-box">
            <form className="contact-form-control" onSubmit={formik.handleSubmit}>
                <div className="form-body">
                    <div className="contact-form-input-group">
                        <label htmlFor="userFirstName">
                            First Name:
                            <InputFiled
                                className="form-control"
                                id="userFirstName"
                                name="userFirstName"
                                type="text"
                                placeholder="First Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userFirstName}
                            />
                            {formik.touched.userFirstName && formik.errors.userFirstName ? (
                                <p className="error">{formik.errors.userFirstName}</p>
                            ) : null}
                        </label>

                        <label htmlFor="userLastName">
                            Last Name:
                            <InputFiled
                                className="form-control"
                                id="userLastName"
                                name="userLastName"
                                type="text"
                                placeholder="Last Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userLastName}
                            />
                            {formik.touched.userLastName && formik.errors.userLastName ? (
                                <p className="error">{formik.errors.userLastName}</p>
                            ) : null}
                        </label>
                    </div>

                    <div className="contact-form-input-group">
                        <label htmlFor="Age">
                            Age:
                            <InputFiled
                                className="form-control"
                                id="Age"
                                name="Age"
                                type="number"
                                placeholder="Age"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.Age}
                            />
                            {formik.touched.Age && formik.errors.Age ? (
                                <p className="error">{formik.errors.Age}</p>
                            ) : null}
                        </label>

                        <label htmlFor="userEmail">
                            Email:
                            <InputFiled
                                className="form-control"
                                id="userEmail"
                                name="userEmail"
                                type="email"
                                placeholder="Email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userEmail}
                            />
                            {formik.touched.userEmail && formik.errors.userEmail ? (
                                <p className="error">{formik.errors.userEmail}</p>
                            ) : null}
                        </label>
                    </div>

                    <div className="contact-form-input-group">
                        <label htmlFor="PhoneNumber">
                            Phone Number:
                            <InputFiled
                                className="form-control"
                                id="PhoneNumber"
                                name="PhoneNumber"
                                type="tel"
                                placeholder="Phone Number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.PhoneNumber}
                            />
                            {formik.touched.PhoneNumber && formik.errors.PhoneNumber ? (
                                <p className="error">{formik.errors.PhoneNumber}</p>
                            ) : null}
                        </label>

                        <label htmlFor="userMessage">
                            Message:
                            <InputFiled
                                className="form-control"
                                id="userMessage"
                                name="userMessage"
                                type="message"
                                placeholder="Type your message"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userMessage}
                            />
                            {formik.touched.userMessage && formik.errors.userMessage ? (
                                <p className="error">{formik.errors.userMessage}</p>
                            ) : null}
                        </label>
                    </div>
                    <div>
                        <Button type="submit" text="Submit" className="form-control donationsBtn" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
