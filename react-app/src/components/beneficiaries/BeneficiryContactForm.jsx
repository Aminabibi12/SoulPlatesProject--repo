import InputFiled from "../donation/General-Components/InputFiled";
import Button from "../donation/General-Components/Button";
import "../donation/volunteers/ContactForm";
import { useFormik } from "formik";
import * as Yup from "yup";

function BeneficiryContactForm() {
    const formik = useFormik({
        initialValues: {
            userFirstName: "",
            userLastName: "",
            Age: "",
            Gender: "",
            userEmail: "",
            PhoneNumber: "",
            Address: "",
            userMessage: "",
        },

        validationSchema: Yup.object({
            userFirstName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required(" * Required"),
            userLastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required(" * Required"),
            Age: Yup.number()
                .required(" * Required")
                .max(100),
            Gender: Yup.string()
                .min(3, "Must be 3 characters or more")
                .max(6, "Must be 6 characters or less")
                .required(" * Required"),
            userEmail: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required(" * Required"),
            PhoneNumber: Yup.string()
                .required(" * Required")
                .matches(/^[0-9]+$/, "Must be a valid phone number")
                .min(9, "Must be at least 9 characters")
                .max(12, "Must be 12 characters or less"),
            Address: Yup.string()
                .min(10, "Must be at least 10 characters")
                .max(120, "Must be 120 characters or less")
                .required(" * Required"),
            userMessage: Yup.string()
                .max(600, "Must be 600 characters or less")
                .required(" * Message is required"),
        }),

        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await fetch("http://localhost:5550/contact/beneficiaries", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Form created successfully");
                    resetForm(); // Reset the form after successful submission
                } else {
                    alert(data.error || "There was an error processing your request.");
                }
            } catch (error) {
                console.error(error);
                alert("Request could not be created due to a network or server error.");
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

                        <label htmlFor="Gender">
                            Gender:
                            <InputFiled
                                className="form-control"
                                id="Gender"
                                name="Gender"
                                type="text"
                                placeholder="Gender"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.Gender}
                            />
                            {formik.touched.Gender && formik.errors.Gender ? (
                                <p className="error">{formik.errors.Gender}</p>
                            ) : null}
                        </label>
                    </div>

                    <div className="contact-form-input-group">
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

                        <label htmlFor="PhoneNumber">
                            Phone Number:
                            <InputFiled
                                className="form-control"
                                id="PhoneNumber"
                                name="PhoneNumber"
                                type="number"
                                placeholder="Phone Number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.PhoneNumber}
                            />
                            {formik.touched.PhoneNumber && formik.errors.PhoneNumber ? (
                                <p className="error">{formik.errors.PhoneNumber}</p>
                            ) : null}
                        </label>
                    </div>

                    <div className="contact-form-input-group">
                        <label htmlFor="Address">
                            Address:
                            <InputFiled
                                className="form-control"
                                id="Address"
                                name="Address"
                                type="message"
                                placeholder="Type your address"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.Address}
                            />
                            {formik.touched.Address && formik.errors.Address ? (
                                <p className="error">{formik.errors.Address}</p>
                            ) : null}
                        </label>
                        <label htmlFor="userMessage">
                            Message:
                            <InputFiled
                                className="form-control"
                                id="userMessage"
                                name="userMessage"
                                type="message"
                                placeholder="Type your Message"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userMessage}
                            />
                            {formik.touched.userMessage && formik.errors.userMessage ? (
                                <p className="error">{formik.errors.userMessage}</p>
                            ) : null}
                        </label>
                    </div>

                    <Button type="submit" text="Submit" className="form-control donationsBtn" />
                </div>
            </form>
        </div>
    );
}

export default BeneficiryContactForm;
