import React, { useContext } from "react";
import { StateContext } from "../../context/Context";
import Loader from "../loader/Loader";

const UpdateProfile = ({
  loading,
  newName,
  setNewName,
  newEmail,
  setNewEmail,
  image,
  preview,
  submitHandler,
  handleInputFile,
  setUpdateProfileView,
}) => {
  const appState = useContext(StateContext);

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
      <form className="form form-user-data" onSubmit={submitHandler}>
        <div className="form__group">
          <label className="form__label" htmlFor="name">
            Name
          </label>
          <input
            onChange={(e) => setNewName(e.target.value)}
            className="form__input"
            id="name"
            type="text"
            defaultValue={newName}
            required="required"
          />
        </div>
        <div className="form__group ma-bt-md">
          <label className="form__label" htmlFor="email">
            Email address
          </label>
          <input
            onChange={(e) => setNewEmail(e.target.value)}
            className="form__input"
            id="email"
            type="email"
            defaultValue={newEmail}
            required="required"
          />
        </div>
        <div className="form__group form__photo-upload">
          <img
            className="form__user-photo"
            src={
              preview
                ? URL.createObjectURL(image.photo)
                : appState.user.photo
                ? appState.user.photo
                : "/images/misc/default.png"
            }
            alt="User"
          />
          <input
            onChange={(e) => handleInputFile(e)}
            className="form__upload"
            type="file"
            accept="image/*"
            id="photo"
            name="photo"
          />
          <label className="form__label" htmlFor="photo">
            Choose new photo
          </label>
        </div>
        <div className="form__group right">
          <button className="btn btn--small btn--green">
            {!loading ? "Update Photo" : <Loader width={35} height={35} />}
          </button>
        </div>
      </form>
      <div className="mt-5 text-center updateProfile">
        <span onClick={() => setUpdateProfileView(false)}>
          Go back to Profile?
        </span>
      </div>
    </div>
  );
};

export default UpdateProfile;
