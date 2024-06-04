  
import os
from flask_admin import Admin
from .models import db, User, Manager, Teacher, Course, Category, Orders, Trolley, Payment, Modules, Quizzes, AccessCourse


from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Manager, db.session))
    admin.add_view(ModelView(Teacher, db.session))
    admin.add_view(ModelView(Course, db.session))
    admin.add_view(ModelView(Category, db.session))
    admin.add_view(ModelView(Orders, db.session))
    admin.add_view(ModelView(Trolley, db.session))
    admin.add_view(ModelView(Payment, db.session))
    admin.add_view(ModelView(Modules, db.session))
    admin.add_view(ModelView(Quizzes, db.session))
    admin.add_view(ModelView(AccessCourse, db.session))


    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))