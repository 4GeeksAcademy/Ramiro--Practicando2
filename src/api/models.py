
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(1024), unique=False, nullable=False)
    is_user = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    username = db.Column(db.String(250), unique=True, nullable=False)
    number_document = db.Column(db.String(250), unique=True, nullable=False)
    phone = db.Column(db.String(250), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(250), nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "isUser": self.is_user,
            "name": self.name,
            "lastame": self.last_name,
            "username": self.username,
            "numberDocument": self.number_document,
            "phone": self.phone,
            "age": self.age,
            "gender": self.gender
            # do not serialize the password, it's a security breach
        }

class Manager(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(1024), unique=False, nullable=False)
    is_manager = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    phone = db.Column(db.String(250), nullable=False)
    number_document = db.Column(db.String(250), unique=True, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=True)

    #Relations
    user = db.relationship('User', backref=db.backref('managers', lazy=True))
    teacher = db.relationship('Teacher', backref=db.backref('managers', lazy=True))

    def __repr__(self):
        return f'<Manager {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "isManager": self.is_manager,
            "userId": self.user_id,
            "name": self.name,
            "lastName": self.last_name,
            "phone": self.phone,
            "numberDocument": self.number_document,
            "teacherId": self.teacher_id
            # do not serialize the password, it's a security breach
        }

class Teacher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(1024), nullable=False)
    is_teacher = db.Column(db.Boolean(), nullable=False)
    name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    username = db.Column(db.String(250), unique=True, nullable=False)
    number_document = db.Column(db.String(250), unique=True, nullable=False)
    phone = db.Column(db.String(250), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(250), nullable=False)
    certificate_teacher = db.Column(db.String(250), nullable=True)

    #relations
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    user = db.relationship('User', backref=db.backref('teacher', lazy=True))

    def __repr__(self):
        return f'<Teacher {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "isTeacher": self.is_teacher,
            "name": self.name,
            "lastName": self.last_name,
            "username": self.username,
            "numberDocument": self.number_document,
            "phone": self.phone,
            "age": self.age,
            "gender": self.gender,
            "userId": self.user_id,
            "certificateTeacher": self.certificate_teacher
            # do not serialize the password, it's a security breach
        }

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    category_title = db.Column(db.String(250), nullable=False)
    modules_length = db.Column(db.Integer, nullable=False)
    title_certificate_to_get = db.Column(db.String(250), nullable=False)
    price = db.Column(db.Integer, nullable=False)  
    description = db.Column(db.String(1000000), nullable=False)
    assessment = db.Column(db.Integer, nullable=True) 
    create_date = db.Column(db.String(300), unique=False, nullable=True)
    title_Teacher = db.Column(db.String(250), nullable=False)
    date_expiration = db.Column(db.String(300), unique=False, nullable=True)
    title_url_media = db.Column(db.String(1024), nullable=False) 


    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'), nullable=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=True)
   
    # Relations
    user = db.relationship('User', backref=db.backref('courses', lazy=True))
    manager = db.relationship('Manager', backref=db.backref('courses', lazy=True))
    teacher = db.relationship('Teacher', backref=db.backref('courses', lazy=True))
    
    def __repr__(self):
        return f'<Course {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "userId": self.user_id,
            "managerId": self.manager_id,
            "teacherId": self.teacher_id,
            "categoryTitle": self.category_title,
            "modulesLength": self.modules_length,
            "titleCertificateToGet": self.title_certificate_to_get,
            "price": self.price,
            "description": self.description,
            "assessment": self.assessment,
            "createDate": self.create_date,
            "titleTeacher": self.title_Teacher,
            "dateExpiration": self.date_expiration,
            "titleUrlMedia": self.title_url_media

        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title_category = db.Column(db.String(250), nullable=False)
    sub_category = db.Column(db.String(250), nullable=False)
    category_length = db.Column(db.String(300), nullable=False)
    create_date = db.Column(db.String(300), unique=False, nullable=True)
    course_more_current = db.Column(db.String(250), nullable=False)
    course_more_sold = db.Column(db.String(250), nullable=False)  

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'), nullable=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=True)
   
    # Relations
    user = db.relationship('User', backref=db.backref('categories', lazy=True))
    manager = db.relationship('Manager', backref=db.backref('categories', lazy=True))
    teacher = db.relationship('Teacher', backref=db.backref('categories', lazy=True))
    
    def __repr__(self):
        return f'<Category {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "titleCategory": self.title_category,
            "subCategory": self.sub_category,
            "userId": self.user_id,
            "managerId": self.manager_id,
            "teacherId": self.teacher_id,
            "categoryLength": self.category_length,
            "course_more_current": self.course_more_current,
            "course_more_sold": self.course_more_sold
        }

class Orders(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title_order = db.Column(db.String(250), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    date = db.Column(db.String(250), nullable=False)
    total = db.Column(db.String(250), nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=True)

    course_name = db.Column(db.String(300), nullable=True)
    teacher_name = db.Column(db.String(300), nullable=True)
    teacher_last_name = db.Column(db.String(300), nullable=True)
    user_name = db.Column(db.String(300), nullable=True)
    user_last_name = db.Column(db.String(300), nullable=True)

    # Relations
    user = db.relationship('User', backref=db.backref('orders', lazy=True))
    course = db.relationship('Course', backref=db.backref('orders', lazy=True))
    teacher = db.relationship('Teacher', backref=db.backref('orders', lazy=True))

    def __repr__(self):
        return f'<Orders {self.id}>'
    def serialize(self):
        return {
            "id": self.id,
            "titleOrder": self.title_order,
            "price": self.price,
            "date": self.date,
            "total": self.total,
            "userId": self.user_id,
            "courseId": self.course_id,
            "teacherId": self.teacher_id,
            "courseName": self.course_name,
            "teacherName": self.teacher_name,
            "teacherLastName": self.teacher_last_name,
            "userName": self.user_name,
            "userLastName": self.user_last_name
        }

class Trolley(db.Model):
    id = db.Column (db.Integer, primary_key=True)
    title_course = db.Column(db.String(250), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    date = db.Column(db.String(250), unique=False, nullable=False)

    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    

    #Relations
    course = db.relationship('Course', backref=db.backref('Trolley', lazy=True))
    user = db.relationship('User', backref=db.backref('Trolley', lazy=True))
    

    def __repr__(self):
        return f'<Trolley {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "titleCourse": self.title_course,
            "price": self.price,
            "date": self.date,
            "course_id": self.course_id,
            "user_id": self.user_id,
        }

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_paypal = db.Column(db.String(250), nullable=True)
    date = db.Column(db.String(250), unique=False, nullable=False)
    status = db.Column(db.String(250), nullable=False)
    currency_code = db.Column(db.String(250), nullable=False)
    value = db.Column(db.String(250), nullable=False)
    type_payment = db.Column(db.String(250), nullable=False) 

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=True)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'), nullable=True)
    
    #Relations
    user = db.relationship('User', backref=db.backref('payment', lazy=True))
    course = db.relationship('Course', backref=db.backref('payment', lazy=True))
    manager = db.relationship('Manager', backref=db.backref('payment', lazy=True))

    def __repr__(self):
        return f'<Payment {self.id}>'

    def serialize(self):
        return{
            "id": self.id,
            "date": self.date,
            "status": self.status,
            "value": self.value,
            "typePayment": self.type_payment,
            "idPaypal": self.id_paypal,
            "currencyCode": self.currency_code,
            "userId": self.user_id,
            "courseId": self.course_id,
            "managerId": self.manager_id
        }

class Modules(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description_content = db.Column(db.String(500), nullable=False)
    title = db.Column(db.String(250), nullable=False)
    url_video = db.Column(db.String(1024), nullable=False)  
    video_id = db.Column(db.String(250), nullable=True)
    image_id = db.Column(db.String(250), nullable=True)
    total_video = db.Column(db.String(250), nullable=True)
    date_create = db.Column(db.String(250), nullable=False)
    token_module = db.Column(db.String(1024), nullable=True)

    #String(250)ns
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    course = db.relationship('Course', backref=db.backref('modules', lazy=True))

    def __repr__(self):
        return f'<Modules {self.id}>'

    def serialize(self):
        return{
            "id": self.id,
            "courseId": self.course_id,
            "descriptionContent": self.description_content,
            "title": self.title,
            "urlVideo": self.url_video,
            "videoId": self.video_id,
            "imageId": self.image_id,
            "totalVideo": self.total_video,
            "dateCreate": self. date_create,
            "tokenModule": self.token_module
        }
    
class Quizzes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_title = db.Column(db.String(250), nullable=False)
    answer_teacher = db.Column(db.String(800), nullable=False)
    answer_user = db.Column(db.Boolean(), unique=False, nullable=False)
    approved = db.Column(db.Boolean(), unique=False, nullable=False)
    approval_percentage_user = db.Column(db.String(800), nullable=False)
    approval_percentage_number = db.Column(db.String(800), nullable=False)
    approval_percentage = db.Column(db.Boolean(), unique=False, nullable=False)

    module_id = db.Column(db.Integer, db.ForeignKey('modules.id'), nullable=True)

    #Relations
    module = db.relationship('Modules', backref=db.backref('quizzes', lazy=True))

    def __repr__(self):
        return f'<Quizzes {self.id}>'
        
    def serialize(self):
        return {
            "id": self.id,
            "questionTitle": self.question_title,
            "answerTeacher": self.answer_teacher,
            "answerUser": self.answer_user,
            "approved": self.approved,
            "approvalPercentageUser": self.approval_percentage_user,
            "approvalPercentageNumber": self.approval_percentage_number,
            "approvalPercentage": self.approval_percentage,
            "moduleId": self.module_id
        }

class AccessCourse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(250), nullable=False)
    details = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<AccessCourse {self.id}>'
        
    def serialize(self):
        return {
            "id": self.id,
            "user": self.user,
            "details": self.details
        }

