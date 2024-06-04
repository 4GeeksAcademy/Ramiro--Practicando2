import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext.js";

export const GetModuleUser = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    // Verificar si store.course y store.course.access_to_course existen
    const accessToModules = store.modules?.Modules

    console.log(store.modules)

    return (
        <div className='container-fluid'>
            {
                accessToModules && accessToModules.length === 0
                    ? "Sin Course Comprado"
                    : accessToModules?.map((item, index) => {
                        return (
                            <div className="accordion " id="accordionExample" key={index}>
                                {/**Accordion  */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                            <span  className='my-2 fw-light fs-2'>Access to <strong>{item.title}</strong>/ {item.categoyTitle}</span>
                                        </button>
                                    </h2>
                                    <div id={`collapse${index}`} className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body d-flex flex-column justify-content-center">
                                            <div className='row'>
                                                <div className='rounded-4 shadow col-9' /* style={{ height: '30%' }} */>
                                                    <video controls className="img-fluid rounded-4 w-100 h-100 py-1" >
                                                        <source src={item.urlVideo} type="video/mp4" />
                                                    </video>
                                                </div>

                                                <div class="list-group col ms-4">
                                                    <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                                                        {item.title}
                                                    </a>
                                                    <a href="#" class="list-group-item list-group-item-action">{item.totalVideo}</a>
                                                    <a href="#" class="list-group-item list-group-item-action">{item.dateCreate}</a>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <span className='my-3 mt-5 fw-light fs-3'>
                                                    {item.descriptionContent}
                                                </span>
                                            </div>
                                            
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        )
                    })
            }
        </div >
    )
}
