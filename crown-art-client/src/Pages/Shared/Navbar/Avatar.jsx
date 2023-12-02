import useAuth from "../../../Hooks/useAuth/useAuth";
import avatarImg from "../../../assets/avatar/placeholder.jpg";

const Avatar = () => {
  const { user } = useAuth();

  return (
    <>
      <img
        src={user && user.photoURL ? user.photoURL : avatarImg}
        alt="avatar"
        width="30"
        height="30"
        className="rounded-full"
      />
    </>
  );
};

export default Avatar;
