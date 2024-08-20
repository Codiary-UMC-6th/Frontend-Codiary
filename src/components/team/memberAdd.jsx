import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { get, post, del2 } from "../../common/api";
import { useParams } from "react-router-dom";

const MemberAdd = ({ isPop, onClose }) => {
  const [memberData, setMemberData] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState(new Set());
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [currentMemberId, setCurrentMemberId] = useState(null);
  const [memberRole, setRole] = useState("");
  const { teamId } = useParams();

  const addMember = async (memberId, teamId, memberRole) => {
    const addData = {
      teamId: teamId,
      memberId: memberId,
      memberRole: memberRole,
    };
    console.log(addData);
    try {
      await post("/teams/add", addData);
    } catch (error) {
      console.log("Error adding member:", error);
    }
  };

  const getTeamInfo = async (teamId) => {
    try {
      const result = await get(`/teams/${teamId}`);
      return result?.result;
    } catch (error) {
      console.log("Error fetching team info:", error);
    }
  };

  const deleteMember = async (memberId, teamId) => {
    const deleteData = {
      memberId: memberId,
      teamId: teamId,
    };
    console.log(deleteData);
    try {
      await del2("/teams/delete", deleteData);
    } catch (error) {
      console.log("Error deleting member:", error);
    }
  };

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const result = await get("/members/following");
        setMemberData(result.result);
      } catch (error) {
        console.log("follower", error);
      }
    };
    const fetchTeamInfo = async () => {
      try {
        const teamInfo = await getTeamInfo(teamId);
        const teamMembers = new Set(
          teamInfo.members.map((member) => member.memberId)
        );
        setSelectedMembers(teamMembers);
      } catch (error) {
        console.log("Error fetching team members:", error);
      }
    };

    getFollowing();
    fetchTeamInfo();
  }, []);

  const handleToggleMember = (memberId) => {
    const isSelected = selectedMembers.has(memberId);

    if (isSelected) {
      handleRemoveMember(memberId);
    } else {
      setCurrentMemberId(memberId);
      setShowRolePopup(true);
    }
  };

  const handleRemoveMember = async (memberId) => {
    await deleteMember(memberId, teamId);
    setSelectedMembers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(memberId);
      return newSet;
    });
  };

  const handleAddMember = async () => {
    if (memberRole.trim() === "") {
      alert("Please enter a role.");
      return;
    }

    await addMember(currentMemberId, teamId, memberRole);
    setSelectedMembers((prev) => new Set(prev).add(currentMemberId));
    setShowRolePopup(false);
    setRole("");
    setCurrentMemberId(null);
  };
  if (!isPop) return null;

  return (
    <Container>
      <CloseBtn
        onClick={onClose}
        src={`${process.env.PUBLIC_URL}/team_images/close.png`}
      />
      <MemberContainer>
        <p>구성원 관리</p>
        <SearchContainer>
          <img src={`${process.env.PUBLIC_URL}/team_images/search.png`} />
          <MemberInput placeholder="추가하려는 사용자를 검색하세요" />
        </SearchContainer>
        <FollowerContainer>
          {memberData.length > 0 ? (
            memberData.map((el, index) => (
              <FollowerBtn
                key={index}
                onClick={() => handleToggleMember(el.memberId)}
                style={{
                  backgroundColor: selectedMembers.has(el.memberId)
                    ? "gray"
                    : "#222222",
                  color: "white",
                }}
              >
                {el.nickname}
              </FollowerBtn>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </FollowerContainer>

        {showRolePopup && (
          <div className="popup">
            <div className="popup-inner">
              <h3>Enter Role for Member</h3>
              <input
                type="text"
                value={memberRole}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Enter role"
              />
              <button onClick={handleAddMember}>Add Member</button>
              <button onClick={() => setShowRolePopup(false)}>Cancel</button>
            </div>
          </div>
        )}
      </MemberContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  padding: 20px;
  background-color: #434343;
  z-index: 1000;
`;

const CloseBtn = styled.img`
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
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px 10px 7.5px;
  width: 70%;
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
  gap: 10px 20px;
  padding-top: 30px;
`;

const FollowerBtn = styled.button`
  background-color: #222222;
  border: none;
  padding: 12px 20px;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
    transition: all.5s;
  }
`;
export default MemberAdd;
