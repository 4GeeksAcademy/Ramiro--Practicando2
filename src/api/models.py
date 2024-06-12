from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Lista (db.Model):
    __tablename__ = 'lista'
    id = db.Column(db.Integer, primary_key=True)
    list_name = db.Column(db.String(60), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)


    def __repr__(self):
        return f'<List {self.list_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "list_name": self.list_name,
            # do not serialize the password, its a security breach
        }
    

class Gastos (db.Model):
    __tablename__ = 'gastos'
    id = db.Column(db.Integer, primary_key=True)
    cantidad = db.Column(db.Integer, nullable=False)
    categoria = db.Column(db.String(60), nullable=False)
    list_name = db.Column(db.String, db.ForeignKey('lista.list_name'), nullable=False)
    list= db.relationship('Lista', backref='gastos')
    

    def __repr__(self):
        return f'<Results {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "cantidad": self.cantidad,
            "categoria": self.categoria,
            "list_name": self.list_name,
        }
    