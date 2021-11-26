import React, { useState, useContext } from "react";
import axios from "axios";
import userImg from "../../assets/default.png";
import StateContext from "../../context/StateContext";
import DispatchContext from "../../context/DispatchContext";

export default function Profile() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [updateprofileView, setUpdateProfileView] = useState(false);

  const [newName, setNewName] = useState(appState.user.username);
  const [newEmail, setNewEmail] = useState(appState.user.email);
  const [image, setImage] = useState({photo: ''});

  const handleInputFile = (e) => {
    console.log(e.target.files[0])
    setImage({photo: e.target.files[0]});
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", newEmail);
    data.append("name", newName);
    data.append("photo", image.photo);
    console.log(data);
    try {
      const res = await axios.patch("/api/user/updateMe", data, {
        headers: {
          Authorization: `Bearer ${appState.user.token}`,
        },
      });
      if (res.data && res.data.photo !== "") {
        console.log(res.data);
        appDispatch({type: 'flashMessage', value: 'You profile was updated successfully!', status: true})
        appDispatch({type: 'login', data: res.data})
        appDispatch({type: 'photoChange', value: res.data.photo})

      } else {
        appDispatch({type: 'flashMessage', value: 'There was an error!', status: false})
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <main className="main">
        <div className="user-view">
          <div className="user-view__content">
            {!updateprofileView && (
              <>
                <div className="userdetails text-center mb-5">
                  <img
                    className="form__user-photo mb-3"
                    src={userImg}
                    alt="User"
                  />
                  <h2 className="heading-secondary">{newName}</h2>
                </div>
                <div className="usersFriends text-center">
                  <div className="row">
                    <div className="col-6">
                      <h2 className="heading-secondary">10</h2>
                      <h5 className="heading-secondary">Friends</h5>
                    </div>
                    <div className="col-6">
                      <h2 className="heading-secondary">Email</h2>
                      <h5 className="heading-secondary">{newEmail}</h5>
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center updateProfile">
                  <span onClick={() => setUpdateProfileView(true)}>
                    Wanna Update Profile?
                  </span>
                </div>
              </>
            )}

            {updateprofileView && (
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">
                  Your account settings
                </h2>
                <form
                  className="form form-user-data"
                  onSubmit={handleProfileSubmit}
                >
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
                      src={appState.photoUrl}
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
                      Update Photo
                    </button>
                  </div>
                </form>
                <div className="mt-5 text-center updateProfile">
                  <span onClick={() => setUpdateProfileView(false)}>
                    Go back to Profile?
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
