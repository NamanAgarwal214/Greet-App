import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StateContext } from "../../context/Context";
import { DispatchContext } from "../../context/Context";
import UpdateProfile from "./UpdateProfile";

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
              <UpdateProfile
                newName={newName}
                setNewName={setNewName}
                newEmail={newEmail}
                setNewEmail={setNewEmail}
                image={image}
                preview={preview}
                setUpdateProfileView={setUpdateProfileView}
                submitHandler={submitHandler}
                handleInputFile={handleInputFile}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
