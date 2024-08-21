export const BASE_URL = "http://43.202.229.89:8080"; // 기본 API URL

// 기본 설정을 사용하여 요청을 보내는 함수
async function request(endpoint, method = "GET", data = null) {
  const token = sessionStorage.getItem("accessToken");
  const url = `${BASE_URL}${endpoint}`; // BASE_URL을 활용하여 API 호출
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : null,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }
  //console.log("options", options);
  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(`HTTP error! Status: ${response.status}`);
      error.response = responseData;
      throw error;
    }

    return responseData;
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error;
  }
}

// GET 요청
export async function get(endpoint) {
  return await request(endpoint, "GET");
}

// POST 요청
export async function post(endpoint, data) {
  return await request(endpoint, "POST", data);
}

// PUT 요청
export async function put(endpoint, data) {
  return await request(endpoint, "PUT", data);
}

// DELETE 요청
export async function del(endpoint) {
  return await request(endpoint, "DELETE");
}

// PATCH 요청

export async function del2(endpoint, data) {
  return await request(endpoint, "DELETE", data);
}

export async function patch(endpoint, data) {
  return await request(endpoint, "PATCH", data);
}

// 캘린더 데이터를 가져오는 API 함수 추가
export async function fetchCalendarData(year, month) {
  const endpoint = `/calendar?year=${year}&month=${month}`;
  return await get(endpoint);
}

// 프로젝트별 제목을 가져오는 API 함수 추가
export async function fetchProjectTitles(year, month) {
  const endpoint = `/calendar/project?year=${year}&month=${month}`;
  return await get(endpoint);
}
