export const BASE_URL = "http://43.202.229.89:8080"; // 기본 API URL

// 기본 설정을 사용하여 요청을 보내는 함수
async function request(endpoint, method = "GET", data = null) {
  //const url = `${BASE_URL}${endpoint}`;
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6eGM1MzRAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsIm1lbWJlcklkIjoxLCJleHAiOjE3MjMyOTYzMTl9.uYN3kL521eiM26kRJF2NlQHLuIzHMgfoGaaOi8XhEuE";
  const url = `${endpoint}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      //토큰 관련 추가 예정
      Authorization: `Bearer ${token}`,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
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

export async function patch(endpoint, data) {
  return await request(endpoint, "PATCH", data);
}
