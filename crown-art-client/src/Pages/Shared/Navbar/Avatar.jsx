import useUserInfo from "../../../Hooks/useUserInfo/useUserInfo";
import avatarImg from "../../../assets/avatar/placeholder.jpg";

const Avatar = () => {
  const [userInfo] = useUserInfo();

  return (
    <>
      <img
        src={userInfo && userInfo.image ? userInfo.image : avatarImg}
        alt="avatar"
        width="30"
        height="30"
        className="rounded-full"
      />
    </>
  );
};

export default Avatar;
