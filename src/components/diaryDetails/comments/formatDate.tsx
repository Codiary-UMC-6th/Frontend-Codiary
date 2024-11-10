export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}.${month}.${day}`;
  };

  export function formatDateTime(dateTimeString: string) {
    // 주어진 문자열을 Date 객체로 변환
    const date = new Date(dateTimeString);
  
    // 년, 월, 일, 시, 분, 초 추출
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // 형식에 맞춰 문자열 반환
    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  }