const UserInfo = ({ userData, editMode, setEditMode, handleSave, handleCancel, setUserData, setOriginalData }) => {
    return (
        
        <div className="user-info">
        <div className="avatar-section">
            <div className="avatar-placeholder">👤</div>
            <div className="credentials">
            <p><strong>Login :</strong> {userData.login}</p>
            <p><strong>Email :</strong> {userData.email}</p>
            </div>
        </div>

        {["prenom", "nom", "description"].map((field) => (
            <div key={field} className="field">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {editMode ? (
                field === "description" ? (
                <textarea value={userData[field]} onChange={(e) => setUserData({ ...userData, [field]: e.target.value })} />
                ) : (
                <input value={userData[field]} onChange={(e) => setUserData({ ...userData, [field]: e.target.value })} />
                )
            ) : (
                <p>{userData[field]}</p>
            )}
            </div>
        ))}

        <div className="field">
            <label>Rôle</label>
            <p>{userData.role}</p>
        </div>

        <div className="button-group">
            {!editMode && (
            <button onClick={() => {
                setOriginalData(userData);
                setEditMode(true);
            }}>Éditer</button>
            )}
            {editMode && (
            <>
                <button className="save-btn" onClick={handleSave}>Garder</button>
                <button className="cancel-btn" onClick={handleCancel}>Annuler</button>
            </>
            )}
        </div>
        </div>
    );
};

export default UserInfo;
