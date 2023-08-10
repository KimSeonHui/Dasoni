import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import RecentMatchAvartar from '../../components/Avarta/RecentMatchAvartar/RecentMatchAvartar';
import RankAvartar from '../Avarta/RankAvartar/RackAvartar';
import ExpPointBar from '../Element/ExpPointBar';
import user, { deleteUserAsync } from '../../app/slices/user';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router';

function MyProfile({ setType }: { setType: (type: string) => void }) {
  const { loginId, nickname, job, birth, siDo, guGun, profileImageSrc } = useAppSelector(
    (state) => state.user,
  );

  const user = useAppSelector((state) => state.user);
  // TODO : 최근 매칭된 다소니 리스트 조회 recentUserList로 state 변경
  const [recentUserList, setRecentUserList] = useState([]);
  const faketUserList = [
    { profileImg: 'rank_profile.png', userId: 1 },
    { profileImg: 'rank_profile.png', userId: 2 },
    { profileImg: 'rank_profile.png', userId: 3 },
    { profileImg: 'rank_profile.png', userId: 4 },
    { profileImg: 'rank_profile.png', userId: 5 },
    { profileImg: 'rank_profile.png', userId: 6 },
  ];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const deleteUser = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.confirm(`탈퇴하면 복구할 수 없습니다.\n정말 탈퇴하시겠습니까?`)) {
      try {
        // TODO : 회원 탈퇴 API 개발
        await dispatch(deleteUserAsync(user));
        alert(`탈퇴 되었습니다.`);
        // location : 로그인 화면으로 이동
        navigate('/');
      } catch (error) {
        console.error(error);
        alert(`탈퇴 중에 오류가 발생했습니다.`);
      }
    }
  };

  const modifyUser = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setType('modify');
  };

  const changePw = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setType('changePw');
  };

  useEffect(() => {
    // TODO : 최근 매칭된 다소니 리스트 조회 API 개발
    // 예시 사용법:
    // fetchRecentUserList().then((data) => {
    //   setRecentUserList(data);
    // });
  }, []);

  return (
    <div className="content">
      <p id="user">
        <span id="name">
          {nickname}({loginId})
        </span>
        님의 개인정보
      </p>
      <table>
        <tbody>
          <tr>
            <td className="name">생년월일</td>
            <td className="info">{birth}</td>
          </tr>
          <tr>
            <td className="name">주소</td>
            <td className="info">
              {siDo} {guGun}
            </td>
          </tr>
          <tr>
            <td className="name">직업</td>
            <td className="info">{job}</td>
          </tr>
        </tbody>
      </table>
      <div id="recent-matched-user-box">
        <div className="recent-matched-title">
          <p>최근 매칭된 다소니</p>
        </div>
        <div id="matched-user-list">
          {recentUserList.length > 0 ? (
            faketUserList.map((user) => (
              <RecentMatchAvartar key={user.userId} src={user.profileImg} />
            ))
          ) : (
            <p>최근 매칭된 다소니가 없습니다</p>
          )}
        </div>
      </div>
      <footer>
        <a className="btn mobile" href="/" onClick={changePw}>
          비밀번호 변경
        </a>
        <a className="btn modify" href="/" onClick={modifyUser}>
          회원 정보 수정
        </a>
        <a className="btn remove" href="/" onClick={deleteUser}>
          회원 탈퇴
        </a>
      </footer>
    </div>
  );
}

export default MyProfile;
