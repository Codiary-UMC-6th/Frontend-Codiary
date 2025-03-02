import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { get, post, del2 } from "../../common/api";
import { useParams } from "react-router-dom";
import { deleteTeamMember, getTeamProfile, getUserInfoByNickname, postTeamMember } from "@/shared/api/team";
import { memberProfile } from "@/shared/api/profile/type";
import { teamMember, teamProfile } from "@/shared/api/team/type";

interface MemberAddProps {
  isPop: boolean;
  onClose: any;
}

interface Follower {
  current_member_id: Number;
  user_id: Number;
  user_name: string;
  photo_url: string;
  github_url: string;
  linkedin_url: string;
  discord_url: string;
  introduction: string;
}

type Followers = Follower[];

const MemberAdd = ({ isPop, onClose }: MemberAddProps) => {
  const [memberData, setMemberData] = useState<Followers>([]);
  const [selectedMembers, setSelectedMembers] = useState(new Set());
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [currentMemberId, setCurrentMemberId] = useState<Number | null>(null);
  const [memberRole, setRole] = useState("");
  const { teamId } = useParams();

  const positions = ["BACKEND", "FRONTEND", "DESIGNER", "PLANNER"];
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [foundUserName, setFoundUserName] = useState<string>("");

  const [teamMemberList, setTeamMemberList] = useState<teamMember[]>();

  const getTeamMemberList = async () => {
    const response = await getTeamProfile(teamId);
    setTeamMemberList(response.team_member_list);
  }

  useEffect(() => {
    getTeamMemberList();
  }, []);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPosition(event.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchValue(inputValue);
      setSelectedPosition("");
      setInputValue("");
    }
  }

  const findUserData = async (searchValue: string) => {
    const response = await getUserInfoByNickname(searchValue);
    //console.log(response);
    if (response && response.length > 0 && searchValue === response[0].user_name) {
      setFoundUserName(response[0].user_name);
    }
    setSearchValue("");
  }

  useEffect(() => {
    if (searchValue != "") {
      findUserData(searchValue);
    }
  }, [searchValue]);

  const addMember = async (teamId: string | undefined, member_nick_name: string, member_position: string) => {
    try {
      const response = await postTeamMember(teamId, member_nick_name, member_position);
      console.log("팀원 추가 성공", response);
      getTeamMemberList();
    } catch (error) {
      console.log("팀원 추가 실패: ", " member_nick_name: ", member_nick_name, " member_position: ", member_position, error);
      //alert(error);
    }
  };

  useEffect(() => {
    addMember(teamId, foundUserName, selectedPosition);
    setSearchValue("");
  }, [foundUserName])


  const handleDelete = async (teamId: string | undefined, user_id: number) => {
    try {
      const response = await deleteTeamMember(teamId, user_id);
      console.log("팀원 삭제 성공", user_id, response);
      getTeamMemberList();
    } catch (error) {
      console.log("팀원 삭제 실패", user_id, error);
    }
  }

  // const getTeamInfo = async (teamId: string | undefined) => {
  //   try {
  //     const result = await get(`/teams/${teamId}`);
  //     return result?.result;
  //   } catch (error) {
  //     console.log("Error fetching team info:", error);
  //   }
  // };

  // const deleteMember = async (memberId: Number, teamId: string | undefined) => {
  //   const deleteData = {
  //     memberId: memberId,
  //     teamId: teamId,
  //   };
  //   console.log(deleteData);
  //   try {
  //     await del2("/teams/delete", deleteData);
  //   } catch (error) {
  //     console.log("Error deleting member:", error);
  //   }
  // };

  // useEffect(() => {
  //   const getFollowing = async () => {
  //     try {
  //       const result = await get(`/api/v2/follow/teams/${teamId}/followers`);
  //       setMemberData(result?.result.followers);
  //     } catch (error) {
  //       console.log("follower", error);
  //     }
  //   };
  //   const fetchTeamInfo = async () => {
  //     try {
  //       const teamInfo = await getTeamInfo(teamId);
  //       const teamMembers = new Set(
  //         teamInfo.members.map((member: any) => member.memberId)
  //       );
  //       setSelectedMembers(teamMembers);
  //     } catch (error) {
  //       console.log("Error fetching team members:", error);
  //     }
  //   };

  //   getFollowing();
  //   fetchTeamInfo();
  // }, []);

  // const handleToggleMember = (memberId: Number) => {
  //   const isSelected = selectedMembers.has(memberId);

  //   if (isSelected) {
  //     handleRemoveMember(memberId);
  //   } else {
  //     setCurrentMemberId(memberId);
  //     setShowRolePopup(true);
  //   }
  // };

  // const handleRemoveMember = async (memberId: Number) => {
  //   await deleteMember(memberId, teamId);
  //   setSelectedMembers((prev) => {
  //     const newSet = new Set(prev);
  //     newSet.delete(memberId);
  //     return newSet;
  //   });
  // };

  // const handleAddMember = async () => {
  //   if (memberRole.trim() === "") {
  //     alert("Please enter a role.");
  //     return;
  //   }

  //   //await addMember(currentMemberId, teamId, memberRole);
  //   setSelectedMembers((prev) => new Set(prev).add(currentMemberId));
  //   setShowRolePopup(false);
  //   setRole("");
  //   setCurrentMemberId(null);
  // };
  // if (!isPop) return null;

  return (
    <ModalOverlay isOpen={isPop} onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <CloseBtn
          onClick={onClose}
          src={`${process.env.PUBLIC_URL}/team_images/close.png`}
        />
        <MemberContainer>
          <Title>구성원 관리</Title>
          <LabelContainer>
            {positions.map((position) => (
              <Label key={position} selected={selectedPosition === position}>
                <RadioBoxInput
                  type="radio"
                  name="position"
                  value={position}
                  checked={selectedPosition === position}
                  onChange={handleRadioChange}
                />
                {position}
            </Label>
            ))}
          </LabelContainer>

          <SearchContainer>
            <img src={`${process.env.PUBLIC_URL}/team_images/search.png`} />
            <MemberInput 
              placeholder="추가하려는 사용자를 검색하세요" 
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </SearchContainer>
          <FollowerContainer>
            {teamMemberList && teamMemberList.length > 0 ? (
              teamMemberList.map((el) => (
                <FollowerBtn
                  key={el.team_member_id}
                  onClick={() => handleDelete(teamId, el.member.user_id)}
                >
                  {el.member.user_name}
                  {
                    el.team_member_role == "ADMIN" ?
                    <></>
                    :
                    <DeleteBtn 
                      key={el.team_member_id}
                      src={`${process.env.PUBLIC_URL}/team_images/close.png`}
                    />
                  }
                  
                </FollowerBtn>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </FollowerContainer>

          {/* {showRolePopup && (
            <RoleContainer>
              <RoleInput
                type="text"
                value={memberRole}
                onChange={(e) => setRole(e.target.value)}
                placeholder="사용자의 역할을 추가해주세요."
              />
              <RoleBtn onClick={handleAddMember}>추가</RoleBtn>
              <RoleBtn onClick={() => setShowRolePopup(false)}>취소</RoleBtn>
            </RoleContainer>
          )} */}
        </MemberContainer>
      </Container>
    </ModalOverlay>
  );
};

const Title = styled.div`
  font-size: 24px;
  font-weight: 450;
  line-height: 48px;
`

const LabelContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  margin: 20px 0;
`

const Label = styled.label<{ selected: boolean }>`
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  color: #ffffff;
  background-color: ${({ selected }) => (selected ? "rgba(255, 255, 255, 0.2)" : "transparent")};

  &:hover {
    opacity: 0.8;
  }
`

const RadioBoxInput = styled.input`
  display: none;
`

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  padding: 36px;
  background-color: #222222;
  box-shadow: 8px 8px 10px 0px rgba(17, 17, 17, 0.25);
  z-index: 1000;

`;

interface CloseBtnProps {
  onClick: any;
  src: string;
}

const CloseBtn = styled.img<CloseBtnProps>`
  margin-left: 95%;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
    transition: 0.5s;
  }
`;

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: white;
  font-size: 20px;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #999999;
  border-radius: 10px;
  padding: 10px 10px 7.5px;
  width: 470px;
`;

const MemberInput = styled.input`
  background-color: transparent;
  width: 100%;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
`;

const FollowerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px 10px;
  padding-top: 30px;
  width: 80%;
`;

const DeleteBtn = styled.img`
  width: 20px;
  height: 20px;
`

const FollowerBtn = styled.button`
  display: flex;
  justify-content: space-between;
  background-color: #434343;
  border: none;
  padding: 12px 20px;
  color: white;
  font-size: 16px;
  border-radius: 5px;
`;

const RoleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin-top: 40px;
`;

const RoleInput = styled.input`
  border-radius: 5px;
  border: none;
  background-color: #222222;
  padding: 10px;
  width: 60%;
  color: white;
`;

const RoleBtn = styled.button`
  padding: 8px 10px;
  border: none;
  border-radius: 5px;
  background-color: #2d7295;
  color: white;
  &:hover {
    opacity: 0.5;
    transition: all.5s;
    cursor: pointer;
  }
`;
export default MemberAdd;
