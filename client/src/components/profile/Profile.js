import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StateContext } from "../../context/Context";
import { DispatchContext } from "../../context/Context";

const Profile = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [updateprofileView, setUpdateProfileView] = useState(false);
  const [newName, setNewName] = useState(appState.user.username);
  const [newEmail, setNewEmail] = useState(appState.user.email);
  const [image, setImage] = useState({ photo: appState.user.photo });
  const [friends, setFriends] = useState(0);
  const [preview, setPreview] = useState(false);

  const handleInputFile = (e) => {
    setPreview(true);
    // console.log(e.target.files[0]);
    // const file = e.target.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = function () {
    //   setImage({ photo: reader.result });
    // };
    // console.log(image);
    setImage({ photo: e.target.files[0] });
  };

  // const getUser = async () => {
  //   try {
  //     const res = await axios.get("/api/user/getUser", {
  //       headers: {
  //         Authorization: `Bearer ${appState.token}`,
  //       },
  //     });
  //     if (res.data.status === "success") {
  //       appState.user = res.data.user;
  //     } else {
  //       appDispatch({
  //         type: "flashMessage",
  //         value: res.data.message,
  //         status: false,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     console.log("error while fetching user");
  //   }
  // };

  const getFriends = async () => {
    try {
      const res = await axios.get("/api/user/getFriends", {
        headers: {
          Authorization: `Bearer ${appState.token}`,
        },
      });
      if (res.data.status === "success") {
        setFriends(res.data.friends);
      } else {
        appDispatch({
          type: "flashMessage",
          value: res.data.message,
          status: false,
        });
      }
    } catch (error) {
      console.log(error.message, "friends");
      console.log("error ... Please refresh the page");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", newEmail);
    data.append("name", newName);
    data.append("photo", image.photo);
    console.log(data);
    try {
      const res = await axios.patch("/api/user/updateProfile", data, {
        headers: {
          Authorization: `Bearer ${appState.token}`,
        },
      });
      if (res.data.status === "success") {
        appDispatch({
          type: "flashMessage",
          value: "Profile updated successfully!",
          status: true,
        });
        appDispatch({ type: "updateProfile", value: res.data.user });
      } else {
        appDispatch({
          type: "flashMessage",
          value: res.data.message,
          status: false,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    src={
                      appState.user.photo
                        ? appState.user.photo
                        : "/images/misc/default.png"
                    }
                    alt="User"
                  />
                  <h2 className="heading-secondary">
                    {appState.user.username}
                  </h2>
                </div>
                <div className="usersFriends text-center">
                  <div className="row">
                    <div className="col-6">
                      <h2 className="heading-secondary">{friends}</h2>
                      <h5 className="heading-secondary">Friends</h5>
                    </div>
                    <div className="col-6">
                      <h2 className="heading-secondary">Email</h2>
                      <h5 className="heading-secondary">
                        {appState.user.email}
                      </h5>
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
};

export default Profile;
