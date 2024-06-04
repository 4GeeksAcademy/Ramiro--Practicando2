import React from 'react'


export const TeacherSettings = ({ username, email, bio }) => {
    return (
        <div className="user-profile-container">
        <div className="user-profile">
          <h2 className="profile-title">Perfil de Usuario</h2>
          <div className="profile-details">
            <p><strong>Nombre de usuario:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Bio:</strong> {bio}</p>
          </div>
        </div>
      </div>
    )
}