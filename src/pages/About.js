import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

function About() {
    const { pageTheme } = useContext(ThemeContext);
    const nav = useNavigate();

    return (
        <div className={`container-fluid ${pageTheme}`}>
            <div className="row text-center">
                <h1 className="mt-5">Welcome to <i className=" fw-bold">Hired! </i></h1>
                <h2 className=" fw-lighter">Your Ultimate Job Application Platform!</h2>
            </div>
            <h3 className="row offset-1 my-2">About Us</h3>
            <div className="row justify-content-center">
                <p className=" col-10 m-0">
                    At Hired!, we believe that finding the right job or the perfect candidate for your company should be effortless and stress-free.<br />
                    Our platform is designed to bridge the gap between job seekers and employers by providing a seamless and intuitive experience for both parties.<br />
                    Whether you're a skilled professional seeking exciting opportunities or an employer looking for top-tier talent, Hired! is here to simplify your journey.<br /><br />
                </p>
            </div>
            <h3 className="row offset-1">What Sets Us Apart </h3>
            <div className="row justify-content-center">
                <p className=" col-10">
                    <strong>User-Centric Design:</strong> We understand that job searching and hiring can be overwhelming. That's why we've crafted a user-centric design that prioritizes ease of use and navigation. Our intuitive interface ensures that you can effortlessly explore job applications or manage your hiring needs with just a few clicks.<br />
                    <strong>Effortless Job Browsing:</strong> Job seekers can browse through a wide range of job applications tailored to their preferences. Our advanced filtering options allow you to refine your search based on location, industry, job type, and more. Say goodbye to sifting through irrelevant listings - find your dream job faster and easier.<br />
                    <strong>One-Click Applications:</strong> Applying for your dream job shouldn't feel like a chore. With Hired!, submitting your application is just a click away. Your profile is securely stored, allowing you to apply to multiple positions without the hassle of reentering your information every time.<br />
                    <strong>Favorites Feature:</strong> Found a job application that caught your eye? Simply mark it as a favorite and access it later with ease. Our "Favorites" feature lets you keep track of the opportunities that resonate with you, ensuring you never miss a chance to apply.<br />
                    <strong>Seamless Employer Experience:</strong> For employers, managing job applications is now effortless. Our platform empowers you to add, edit, or delete job listings with a simple push of a button. We understand that time is precious, and we're here to streamline your hiring process.<br />
                    <strong>Constant Innovation:</strong> Our commitment to continuous improvement drives us to regularly enhance and optimize our platform. We're always exploring new ways to make your experience better, whether through innovative features or enhanced security measures.
                </p>
            </div>
            <h3 className="row offset-1 my-2">Your Journey, Our Priority</h3>
            <div className="row justify-content-center">
                <p className=" col-10 m-0">
                    At Hired!, we're not just a job application platform - we're your partners in your career journey.
                    We're dedicated to providing a platform that fosters connections, simplifies processes, and helps you achieve your professional goals.
                    Whether you're a job seeker embarking on a new adventure or an employer shaping your team, Hired! is here to make your experience seamless, enjoyable, and successful.<br />
                    Thank you for choosing Hired!. Let's connect talent with opportunity, effortlessly.
                </p>
            </div>

            <div className="row justify-content-center pt-5">
                <button className="btn btn-primary col-2 " onClick={() => nav('/home')}>Home</button>
            </div>
        </div>
    );
}

export default About;