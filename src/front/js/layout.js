import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Footer } from "./component/Footer.jsx";
import { FormUser } from "./pages/User/FormUser.jsx";
import { LogIn } from "./component/LogIn.jsx";
import { UserView } from "./pages/User/UserView.jsx";
import { TeacherView } from "./pages/Teacher/TeacherView.jsx";
import { ManagerView } from "./pages/Manager/ManagerView.jsx";
import { SignOut } from "./pages/SignOut.jsx";

import ProtectedRoute from "./component/ProtectedRoute.jsx";
import { ResetPassword } from "./component/ResetPassword.jsx";
import { ResetPasswordNewChange } from "./component/ResetPasswordNewChange.jsx";
import { Course } from "./pages/Courses/Course.jsx";
import { PaypalPayment } from "./component/PaypalPayment.jsx";
import { UpdateUser } from "./component/Manager/UpdateUser.jsx";
import { UpdateCourse } from "./component/Manager/UpdateCourse.jsx";
import { Trolley } from "./component/User/Trolley.jsx";
import { UpdateQuizzes } from "./component/Manager/UpdateQuizzes.jsx";
import { UpdatePayment } from "./component/Manager/UpdatePaymet.jsx";
import { CourseCategorySelected } from "./pages/CourseCategorySelected.jsx";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<FormUser />} path="/FormUser" />
                        <Route element={<LogIn />} path="/LogIn" />
                        <Route element={<SignOut />} path="/SignOut" />
                        <Route element={<ResetPassword />} path="/ResetPassword" />
                        <Route element={<ResetPasswordNewChange />} path="/ResetPassword/token" />
                        <Route element={<PaypalPayment />} path="/Paypal" />

                        {/* Protected Routes */}
                        <Route
                            element={
                                <ProtectedRoute>
                                    <TeacherView />
                                </ProtectedRoute>
                            }
                            path="/teacherView"
                        />
                        <Route
                            element={
                                <ProtectedRoute>
                                    <UserView />
                                </ProtectedRoute>
                            }
                            path="/userView"
                        />
                        <Route
                            element={
                                <ProtectedRoute>
                                    <ManagerView />
                                </ProtectedRoute>
                            }
                            path="/managerView"
                        />
                        <Route
                            element={
                                <ProtectedRoute>
                                    <UpdateUser />
                                </ProtectedRoute>
                            }
                            path="/userUpdate/:userId"
                        />
                        <Route
                            element={
                                <ProtectedRoute>
                                    <UpdateCourse />
                                </ProtectedRoute>
                            }
                            path="/UpdateCourse/:courseId"
                        />
                        <Route
                            element={
                                <ProtectedRoute>
                                    <UpdatePayment />
                                </ProtectedRoute>
                            }
                            path="/paymentUpdate/:payId"
                        />

                        <Route
                            element={
                                <ProtectedRoute>
                                    <UpdateQuizzes />
                                </ProtectedRoute>
                            }
                            path="/UpdateQuizzes/:quizId"
                        />
                        <Route
                            element={                                
                                    <Course />                               
                            }
                            path="/course/:id"
                        />
                        <Route
                            element={
                                <CourseCategorySelected />
                            }
                            path="/category/:titleCategory"
                        />
                        {/* Ruta para el componente Trolley */}
                        <Route element={<Trolley />} path="/trolley" />

                        {/* Fallback Route */}
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
