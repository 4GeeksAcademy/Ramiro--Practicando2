
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: "",
      user: "",
      error: "",
      error2: "",
      msg: "",
      msg2: "",
      course: "",
      currentRole: "",
      spinner: false,
      media: "",
      loading: false,
      mediaType: "",
      courseFavorite: "",
      category: "",
      modules: "",
      quizzes: "",
      payment: "",
      medios: [],
      order: "",
      access: "",
      tokenToPay: ""
      
    },

    actions: {
      // Login System
      createUser: async (newUser, userRole) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const respCreateUser = await fetch(
            process.env.BACKEND_URL + `/api/signup/` + userRole,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            }
          );

          if (!respCreateUser.ok) {
            const errorData = await respCreateUser.json();
            setStore({ ...store, error: errorData.Error });
            throw new Error(errorData.Error || "Error creating user");
          }
          const dataCreateUser = await respCreateUser.json();
          setStore({ ...store, msg: dataCreateUser.message });
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      loginIn: async (userToLogin, userRole) => {
        const store = getStore();
        localStorage.setItem("userToLogin", JSON.stringify(userToLogin));
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const respLoginIn = await fetch(
            process.env.BACKEND_URL + `/api/login/` + userRole,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userToLogin),
            }
          );

          if (!respLoginIn.ok) {
            const errorData = await respLoginIn.json();
            setStore({ ...store, error: errorData.Error });
            throw new Error(errorData.Error || "Failed to login");
          }

          const dataLoginIn = await respLoginIn.json();
          localStorage.setItem("jwt-token", dataLoginIn.access_token)
          
          localStorage.setItem("currentRole", userRole);
          setStore({ ...store, currentRole: userRole });
          setStore({ ...store, msg: dataLoginIn.message });
      
        console.log(userToLogin,dataLoginIn)

          await getActions().getUser();

        } catch (err) {
          console.error(err);
        } finally {
          getActions().spinner(false);
        }
      },
      

      getUser: async (userRol) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        try {
          const token = localStorage.getItem("jwt-token");
          if (!token) throw new Error("No token found");

          const respGetUsers = await fetch(
            process.env.BACKEND_URL +
            `/api/view/` +
            (store.currentRole || userRol),
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          if (!respGetUsers.ok) {
            const errorData = await respGetUsers.json();
            setStore({ ...store, error: errorData.Error });
            throw new Error(
              errorData.Error || "Error getting user data"
            );
          }

          const dataGetUser = await respGetUsers.json();
          localStorage.setItem("userData", JSON.stringify(dataGetUser))
          setStore({ ...store, user: dataGetUser });
          setStore({ ...store, msg: dataGetUser.message });
        } catch (err) {
        } finally {
          getActions().spinner(false);
        }
      },

      checkUserSession: async () => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        try {
          const token = localStorage.getItem("jwt-token");
          const userRole = localStorage.getItem("currentRole");
          const userToLoginStr = localStorage.getItem("userToLogin");

          await getActions().getCourse();
          await getActions().getTrolleyToOrder();
          await getActions().getCategory();
          
      
          if (token && userRole && userToLoginStr) {
            const userToLogin = JSON.parse(userToLoginStr);
            if (!userToLogin) {
              throw new Error("Failed to parse userToLogin from localStorage");
            }
      
            setStore({ currentRole: userRole });
            
           
            await getActions().getUser(userRole);
            await getActions().getModules();
            await getActions().getQuizzes();
            await getActions().getPayments();
            await getActions().getOrders();
          }
        } catch (err) {
          setStore({ ...store, error: "Error checking user session" });
          console.error("Error checking user session: ", err);
        }
      },
      

      updateUser: async (dataUpdate, type, userId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const token = localStorage.getItem("jwt-token");
          if (!token) throw new Error("No token found");

          const url = process.env.BACKEND_URL + "/api/view/manager/" + type + "/" + userId;
          const respUpdateUser = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(dataUpdate),
          });

          if (!respUpdateUser.ok) {
            const errorData = await respUpdateUser.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Error in update"
            );
          }

          const dataUpdateUser = await respUpdateUser.json();
          setStore({ ...store, msg: dataUpdateUser.message });

          await getActions().getUser()

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      deleteUser: async (type, userId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const token = localStorage.getItem("jwt-token");
          if (!token) throw new Error("No token found");

          const url = process.env.BACKEND_URL + "/api/view/manager/" + type + "/" + userId;
          const respDelUser = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            }
          })


          if (!respDelUser.ok) {
            const errorData = await respDelUser.json()
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Error al Update"
            );
          }


          const dataDelUser = await respDelUser.json();
          setStore({ ...store, msg: dataDelUser.message });

          await getActions().getUser();

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

    
      // RESET PASSWORD
      resetPassword: async (email, userPassword) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        try {
          console.log(
            process.env.BACKEND_URL + `/api/forgot-password/` + userPassword
          );
          const respResetPassword = await fetch(
            process.env.BACKEND_URL + `/api/forgot-password/` + userPassword,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(email),
            }
          );

          if (!respResetPassword.ok) {
            const errorData = await respResetPassword.json();
            setStore({ ...store, error: errorData.Error });
            throw new Error(errorData.Error || "Error in Reset");
          }

          const dataResetPassword = await respResetPassword.json();
          localStorage.setItem(
            "jwt-token-reset",
            dataResetPassword.access_token
          );
          setStore({ ...store, msg: dataResetPassword.message });
        } catch (err) {
        } finally {
          getActions().spinner(false);
        }
      },

      resetPasswordNewChange: async (password, userRol) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        try {
          const tokenPassword = localStorage.getItem("jwt-token-reset");
          if (!tokenPassword) throw new Error("No token found");

          const url = process.env.BACKEND_URL + `/api/reset-password/` + userRol + "/" + tokenPassword
          const respResetPassword = await fetch(
            url,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(password),
            }
          );

          if (!respResetPassword.ok) {
            const errorData = await respResetPassword.json();
            setStore({ ...store, error: errorData.Error });
            throw new Error(errorData.Error || "Error in Reset");
          }

          const dataResetPassword = await respResetPassword.json();
          setStore({ ...store, msg: dataResetPassword.message });
        } catch (err) {
        } finally {
          getActions().spinner(false);
        }
      },

      // MESSAGE
      updateMsgError: async (changesMsg) => {
        const store = getStore();
        setStore({ ...store, error: changesMsg });
      },

      updateMsg: async (changesMsg) => {
        const store = getStore();
        setStore({ ...store, msg: changesMsg });
      },

      // SPINNER
      spinner: (changesSpinner) => {
        const store = getStore();
        setStore({ ...store, spinner: changesSpinner });
      },

      // COURSES SYSTEM
      createCourseNew: async (dataCourse) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        try {
          const url = process.env.BACKEND_URL + "/api/create/courses";
          const respCreateCourse = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataCourse),
          });
          if (!respCreateCourse.ok) {
            const errorData = await respCreateCourse.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Error when adding course to cart"
            );
          }
          const dataCreateCourse = await respCreateCourse.json();
          setStore({ ...store, msg: dataCreateCourse.message });
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      getCourse: async () => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const url = process.env.BACKEND_URL + "/api/view/courses";
          const respGetCourse = await fetch(url);

          if (!respGetCourse.ok) {
            const errorData = await respGetCourse.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(errorData.error || "Error Obtaining Course");
          }

          const dataGetCourse = await respGetCourse.json();
          setStore({
            ...store,
            msg: dataGetCourse.message,
            course: dataGetCourse,
          })
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      updateCourse: async (dataUpdate, courseId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {

          const token = localStorage.getItem("jwt-token");
          if (!token) throw new Error("No token found");

          const url = process.env.BACKEND_URL + "/api/view/courses/" + courseId;
          const respUpdateCourse = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(dataUpdate),
          })

          if (!respUpdateCourse.ok) {
            const errorData = await respUpdateCourse.json()
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Error in Update"
            )
          }

          const dataUpdateCourse = await respUpdateCourse.json()
          setStore({ ...store, msg: dataUpdateCourse.message })

          await getActions().getUser();

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      deleteCourse: async (courseId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const token = localStorage.getItem("jwt-token");
          if (!token) throw new Error("No token found");

          const url = process.env.BACKEND_URL + "/api/view/courses/" + courseId;
          const respDeleteModule = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            }
          })


          if (!respDelCourse.ok) {
            const errorData = await respDelCourse.json()
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Error al Delete"
            );
          }


          const dataDelCourse = await respDeleteModule.json();
          setStore({ ...store, msg: dataDelCourse.message });

          await getActions().getUser();

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      // TROLLEY
      addCourseToTrolley: async (titleCourse, courseId, price) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        console.log(titleCourse, courseId, price)
        try {
          const url = process.env.BACKEND_URL + "/api/trolley/courses";
          const respAddTrolley = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              titleCourse: titleCourse,
              courseId: courseId,
              price: price,
              userId: store.userId
            }),
          });

          if (!respAddTrolley.ok) {
            const errorData = await respAddTrolley.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });

            await getActions().getTrolleyToOrder()

            throw new Error(
              errorData.error || "Error when adding course to cart"
            );
          }

          const dataAddTrolley = await respAddTrolley.json();
          setStore({ ...store, msg: dataAddTrolley.message });
          console.log(dataAddTrolley);

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      getTrolleyToOrder: async () => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const url = process.env.BACKEND_URL + "/api/trolley/courses";
          const respGetOrder = await fetch(url);

          if (!respGetOrder.ok) {
            const errorData = await respGetOrder.json()
            setStore({ ...store, error: errorData.error });
            throw new Error(errorData.error || "Error Obtaining Course");
          }

          const dataGetOrder = await respGetOrder.json();
          setStore({
            ...store,
            msg: dataGetOrder.message,
            courseFavorite: dataGetOrder,
          });
          
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      deleteTrolley: async (trolleyId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {

          const url = process.env.BACKEND_URL + "/api/view/trolley/" + trolleyId;
          const respDelTrolley = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          })


          if (!respDelTrolley.ok) {
            const errorData = await respDelTrolley.json()
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Error when adding course to cart"
            );
          }


          const dataDelTrolley = await respDelTrolley.json();
          setStore({ ...store, msg: dataDelTrolley.message });

          await getActions().getTrolleyToOrder();

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      // QUIZZES
      newQuizz: async (dataQuizz) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const respNewQuizz = await fetch(
            process.env.BACKEND_URL + "/api/module/quizzes",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataQuizz),
            }
          );

          if (!respNewQuizz.ok) {
            const errorData = await respNewQuizz.json()
            setStore({ ...store, error: errorData.Error });
            throw new Error(errorData.Error || "Error creating quizz");
          }
          const dataNewQuizz = await respNewQuizz.json();
          setStore({ ...store, msg: dataNewQuizz.message });
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      postQuizzes: async (formData) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        try {
          const respAddQuizzes = await fetch(`${process.env.BACKEND_URL}/api/module/quizzes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
          });

          if (!respAddQuizzes.ok) {
            const errorData = await respAddQuizzes.json()
            setStore({ ...store, error: errorData.error });

            throw new Error(
              errorData.error || "Error creating quizzes"
            );
          }
          const dataAddQuizzes = await respAddQuizzes.json();
          setStore({ ...store, msg: dataAddQuizzes.message });
          

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      getQuizzes: async () => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const url = process.env.BACKEND_URL + "/api/module/quizzes";
          const respGetQuizzes = await fetch(url);

          if (!respGetQuizzes.ok) {
            const errorData = await respGetQuizzes.json()
            setStore({ ...store, error: errorData.error });
            throw new Error(errorData.error || "Error when obtaining the quizzes");
          }

          const dataGetQuizzes = await respGetQuizzes.json();
          setStore({
            ...store,
            msg: dataGetQuizzes.message,
            quizzes: dataGetQuizzes,
          });
          
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      updateQuizzes: async (dataUpdate, quizId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {

          const url = process.env.BACKEND_URL + "/api/module/quizzes/" + quizId;
          const respUpdateQuiz = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dataUpdate),
          })

          if (!respUpdateQuiz.ok) {
            const errorData = await respUpdateQuiz.json()
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Update error"
            )
          }

          const dataUpdateQuiz = await respUpdateQuiz.json()
          setStore({ ...store, msg2: dataUpdateQuiz.message })

          await getActions().getUser();

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      deleteQuizzes: async (quizId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {

          const url = process.env.BACKEND_URL + "/api/module/quizzes/" + quizId;
          const respDelQuizzes = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          })


          if (!respDelQuizzes.ok) {
            const errorData = await respDelQuizzes.json()
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Delete error"
            );
          }


          const dataDelQuizzes = await respDelQuizzes.json();
          setStore({ ...store, msg: dataDelQuizzes.message });

          await getActions().getUser();

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      // CERTIFICATE AND MEDIA
      uploadCertificate: async (file) => {
        try {
          const responseUploadData = await fetch(process.env.BACKEND_URL + `/api/upload`, {
            method: 'POST',
            body: JSON.stringify(file),
          });

          if (!responseUploadData.ok) {
            const errorUploadData = await responseUploadData();
            setStore({ ...store, error: errorUploadData.Error })
            throw new Error(errorUploadData.Error || "Error posting certificate")

          } 
          else 
          {
            const uploadData = await response.json();
            alert('File uploaded successfully: ' + JSON.stringify(uploadData));
          }
          const dataNewCertificate = await respNewCertificate.json()
          setStore({ ...store, msg: dataNewCertificate.message })

        } catch (error) {
          setError('An error occurred while uploading the file')

        } finally {
          getActions().spinner(false);
        }
      },

      /* STORE-object states & ACTIONS-arrow function OF CLOUDINARYCOMPONENT*/
      uploadCloudinaryMedia: async (fileList) => {
        const preset_name = "jptixrge";
        const cloud_name = "dfoegvmld";

        const file = fileList[0]; // Asegurarse de tomar solo el primer archivo

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', preset_name);

        setStore({ loading: true });

        const fileType = file.type.split('/')[0];
        setStore({ mediaType: fileType });

        try {
          const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`, {
            method: 'POST',
            body: data
          });

          if (!response.ok) {
            throw new Error('Error uploading media');
          }

          const uploadedMedia = await response.json();
          setStore({ media: uploadedMedia.secure_url, loading: false, medios: [uploadedMedia] });
          console.log(uploadedMedia);
        } catch (error) {
          console.error('Error uploading media:', error);
          setStore({ loading: false });
        }
      },

      // MODULES
      postModule: async (dataModule) => {
        const store = getStore();
        const actions = getActions();
        actions.updateMsgError("");
        actions.updateMsg("");
        actions.spinner(true);

        try {
          const url = process.env.BACKEND_URL + "/api/module/course";
          const respAddModule = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dataModule),
          });

          if (!respAddModule.ok) {
            const errorData = await respAddModule.json()
            setStore({ ...store, error: errorData.Error });

            throw new Error(errorData.Error || "Error creating module");
          }

          const dataAddModule = await respAddModule.json();
          setStore({ ...store, msg: dataAddModule.message });
     

        } catch (err) {
          console.error("Error in postModule:", err);
          setStore({ ...store, error: err.message });
        } finally {
          actions.spinner(false);
        }
      },

      getModules: async () => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const url = process.env.BACKEND_URL + "/api/module/course";
          const respGetModules = await fetch(url);

          if (!respGetModules.ok) {
            const errorData = await respGetModules.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(errorData.error || "Error al Obtener el Modules");
          }

          const dataGetModules = await respGetModules.json();
          setStore({
            ...store,
            msg: dataGetModules.message,
            modules: dataGetModules,
          })

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

       deleteModules: async (modulesId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const token = localStorage.getItem("jwt-token");
          if (!token) throw new Error("No token found");

          const url = process.env.BACKEND_URL + "/api/module/course/" + modulesId;
          const respDeleteModule = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              
            }
          })


          if (!respDeleteModule.ok) {
            const errorData = await respDeleteModule.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Error in  Delete"
            );
          }


          const dataDelModule = await respDeleteModule.json();
          setStore({ ...store, msg: dataDelModule.message });

          await getActions().getUser();

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      // CATEGORY
      createCategory: async (dataCategory) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        try {
          const url = process.env.BACKEND_URL + "/api/courses/categories";
          const respAddCategory = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dataCategory),
          });

          if (!respAddCategory.ok) {
            const errorData = await respAddCategory.json()
            setStore({ ...store, error: errorData.error });

            await getActions().getTrolleyToOrder()

            throw new Error(
              errorData.error || "Error when adding the Category"
            );
          }

          const dataAddCategory = await respAddCategory.json();
          setStore({ ...store, msg: dataAddCategory.message });

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      getCategory: async () => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        try {
          const url = process.env.BACKEND_URL + "/api/courses/categories";
          const respGetCategory = await fetch(url);

          if (!respGetCategory.ok) {
            const errorData = await respGetCategory.json()
            setStore({ ...store, error: errorData.error });
            throw new Error(errorData.error || "Error when adding the Category");
          }

          const dataGetCategory = await respGetCategory.json();
          setStore({
            ...store,
            msg: dataGetCategory.message,
            category: dataGetCategory.Category,
          });

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      // PAYMENT
      createPayments: async (dataPayment) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);
        
        try {
          const url = process.env.BACKEND_URL + "/api/payment/courses";
          const respAddPayment = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dataPayment),
          });

          if (!respAddPayment.ok) {
            const errorData = await respAddPayment.json();
            setStore({ ...store, error: errorData.error });

            await getActions().getPayments()

            throw new Error(
              errorData.error || "Error in Payment"
            );
          }

          const dataAddPayment = await respAddPayment.json();
          localStorage.setItem("token-accessCourse", dataAddPayment.token)
          setStore({ ...store, msg2: dataAddPayment.message,
            tokenToPay: dataAddPayment.token }
          
          )

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      getPayments: async () => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        try {
          const url = process.env.BACKEND_URL + "/api/payment/courses";
          const respGetPayment = await fetch(url);

          if (!respGetPayment.ok) {
            const errorData = await respGetPayment.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(errorData.error || "Error in payment");
          }

          const dataGetPayment = await respGetPayment.json();
          ;
          setStore({
            ...store,
            msg: dataGetPayment.message,
            payment: dataGetPayment,
          })

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      updatePayment: async (dataUpdate, payId) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        try {

          const url = process.env.BACKEND_URL + "/api/payment/courses/" + payId;
          const respUpdatePayment = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dataUpdate),
          })

          if (!respUpdatePayment.ok) {
            const errorData = await respUpdatePayment.json();
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Update error"
            )
          }

          const dataUpdatePayment = await respUpdatePayment.json()
          setStore({ ...store, msg: dataUpdatePayment.message })

          await getActions().getUser();
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      deletePayment: async (payId) => {
        try {

          const url = process.env.BACKEND_URL + "/api/payment/courses/" + payId;
          const respDelPayment = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          })


          if (!respDelPayment.ok) {
            const errorData = await respDelPayment.json();
            setStore({ ...store, error: errorData.error });
            throw new Error(
              errorData.error || "Delete error"
            );
          }


          const dataDelPayment = await respDelPayment.json();
          setStore({ ...store, msg: dataDelPayment.message });

          await getActions().getPayments();
        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      //ORDERS
      createOrders: async (dataOrders) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);


        try {
          const url = process.env.BACKEND_URL + "/api/order/courses";
          const respAddOrder = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dataOrders),
          });

          if (!respAddOrder.ok) {
            const errorData = await respAddOrder.json();
            setStore({ ...store, error: errorData.error });

            await getActions().getOrders()

            throw new Error(
              errorData.error || "Error in Payment"
            );
          }

          const dataAddOrder = await respAddOrder.json();
          setStore({ ...store, msg: dataAddOrder.message });

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      getOrders: async () => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        try {
          const url = process.env.BACKEND_URL + "/api/order/courses";
          const respGetOrder = await fetch(url);

          if (!respGetOrder.ok) {
            const errorData = await respGetOrder.json()
            setStore({ ...store, error: errorData.error });
            throw new Error(errorData.error || "Error in Order");
          }

          const dataGetOrder = await respGetOrder.json();
          setStore({
            ...store,
            msg: dataGetOrder.message,
            order: dataGetOrder,
          })

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      createOrders: async (dataOrders) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);


        try {
          const url = process.env.BACKEND_URL + "/api/order/courses";
          const respAddOrder = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dataOrders),
          });

          if (!respAddOrder.ok) {
            const errorData = await respAddOrder.json()
            setStore({ ...store, error: errorData.error });

            await getActions().getOrders()

            throw new Error(
              errorData.error || "Error in Payment"
            );
          }

          const dataAddOrder = await respAddOrder.json();
          setStore({ ...store, msg: dataAddOrder.message })

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },

      getAccessCourse: async () => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        const token = localStorage.getItem("token-accessCourse")
        if (!token) throw new Error("No token found");
        
        try {
          const url = process.env.BACKEND_URL + "/api/view/course/accessAll";
          const respGetAccess = await fetch(url, {
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            }
          });

          if (!respGetAccess.ok) {
            const errorData = await respGetAccess.json()
            setStore({ ...store, error: errorData.error });
            throw new Error(errorData.error || "Error in payment");
          }

          const dataGetAccess = await respGetAccess.json();
          setStore({
            ...store,
            msg: dataGetAccess.message,
            access: dataGetAccess
          });

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },
      
      /**PROXIMAS PUEBAS */
      getCoursePayment: async (course_id, user_id, module_id, quiz_id) => {
        const store = getStore();
        getActions().updateMsgError("");
        getActions().updateMsg("");
        getActions().spinner(true);

        const token = localStorage.getItem("token-accessCourse")
        if (!token) throw new Error("No token found");
        
        localStorage.setItem("userData")

        try {
          const url = process.env.BACKEND_URL + "/api/view/course/course_id/user/user_id/module/module_id/quiz/quiz_id";
          const respGetPayment = await fetch(url, {
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            }
          });

          if (!respGetPayment.ok) {
            const errorData = await respGetPayment.json();
            console.log(errorData);
            setStore({ ...store, error: errorData.error });
            throw new Error(errorData.error || "Error in payment");
          }

          const dataGetPayment = await respGetPayment.json();
          localStorage.setItem("token-accessCourse", dataGetPayment.token);
          setStore({
            ...store,
            msg: dataGetPayment.message,
            pt: dataGetPayment,
          });
          console.log(dataGetPayment);

        } catch (err) {
          console.log(err);
        } finally {
          getActions().spinner(false);
        }
      },
      
    }
  }
};

export default getState;
