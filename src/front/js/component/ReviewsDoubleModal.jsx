import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ImagePreview from './ImagePreview.jsx';
import Draggable from 'react-draggable';


const ReviewsDoubleModal = () => {
    const [currentReviewModal, setCurrentReviewModal] = useState(1);

    const { store, actions } = useContext(Context);
    const [selectedFile, setSelectedFile] = useState(null);

    

    return (
        <Formik
            initialValues={{
                title: "",
                comment_text: "",
                review_image: "",
            }}
            validationSchema={Yup.object({
                title: Yup.string()
                    .min(10, 'Debe tener 10 caracteres o más')
                    .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s- ]*$/, 'Debe comenzar con una letra mayúscula')
                    .required('Campo obligatorio!'),
                comment_text: Yup.string()
                    .min(50, 'Debe tener 50 caracteres o más')
                    .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s- ]*$/, 'Debe comenzar con una letra mayúscula')
                    .required('Campo obligatorio!'),
                review_image: Yup.mixed()
                    .required('Debes seleccionar al menos una imagen!')
                    .test("FILE_SIZE", "El tamaño de la imagen es demasiado grande!", value => value && value.size < 400 * 400)
                    .test("FILE_TYPE", "Formato inválido", value => value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
            })}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
                setSubmitting(true);

                try {
                    const formData = new FormData();
                    formData.append("file", selectedFile);
                    formData.append("cloud_name", "albertge");
                    formData.append("upload_preset", "trip_nexus_upload_preset");

                    const response = await axios.post(
                        "https://api.cloudinary.com/v1_1/albertge/image/upload",
                        formData
                    );

                    const imgUrl = response.data.url;

                    await actions.create_review({ ...values, review_image: imgUrl });

                    console.log("Form submitted successfully!");
                    alert('Tu reseña se publicó correctamente');
                    setStatus({ success: true });
                    setSelectedFile(null);
                    window.location.reload();

                } catch (error) {
                    console.error("Error submitting form:", error);
                    alert("Alguna cosa salió mal");
                    setStatus({ error: true });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {formik => (


                <div>
                    
                    <Draggable>
                    <button className="btn btn-primary floating-button" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">
                        Publica tu reseña
                    </button>
                    </Draggable>
                    

                    <Form className="form-review-content" onSubmit={formik.handleSubmit}>


                        {/* Primer Modal */}

                        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content content-signup">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalToggleLabel">Rellena el formulario para publicar tu reseña:</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="custom-input-password">
                                            <label htmlFor="title" className={formik.values.title ? 'input-label has-value' : 'input-label'}>Título:</label>
                                            <Field type="text" name="title" value={formik.values.title} />
                                            <ErrorMessage name='title' />
                                        </div>
                                        <div className="custom-input-password">
                                            <label htmlFor="comment_text" className={formik.values.comment_text ? 'input-label has-value' : 'input-label'}>Comentario:</label>
                                            <Field type="text" name="comment_text" value={formik.values.comment_text} />
                                            <ErrorMessage name='comment_text' />
                                        </div>
                                        <div className='modal-footer'>
                                            <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onClick={() => setCurrentReviewModal(2)}>Siguiente</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Segundo Modal */}
                        <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content content-signup">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalToggleLabel2">Sube tus fotografias para publicar tu reseña:</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body ">
                                        <div>
                                            <label htmlFor="review_image">Publica tu foto aquí:</label>
                                            <input
                                                type="file"
                                                name="review_image"
                                                onChange={(event) => {
                                                    const selectedFile = event.target.files[0];
                                                    setSelectedFile(selectedFile);
                                                    formik.setFieldValue("review_image", selectedFile);
                                                }}
                                            />
                                            <ErrorMessage name="review_image" />
                                            {selectedFile && <ImagePreview file={selectedFile} />}
                                        </div>
                                        <div className='modal-footer'>
                                            <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={() => setCurrentReviewModal(1)}>Volver al formulario anterior</button>
                                            <button className='btn btn-primary btn-signup' type="submit">Publicar mi reseña</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form >
                </div >

            )
            }
        </Formik >
    );
}

export default ReviewsDoubleModal;