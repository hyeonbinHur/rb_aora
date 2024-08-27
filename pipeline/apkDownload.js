const fs = require("fs");
const axios = require("axios");

async function extractAndDownloadAPK() {
  try {
    // 파일에서 JSON 데이터 읽기
    const data = fs.readFileSync("build_result.txt", "utf8");
    const builds = JSON.parse(data); // JSON 배열 파싱
    const apkUrl = builds[0].artifacts.buildUrl; // 첫 번째 빌드 객체의 APK URL

    // APK 다운로드
    console.log("APK 다운로드를 시작합니다.");
    const response = await axios({
      url: apkUrl,
      method: "GET",
      responseType: "stream",
    });

    // 스트림을 파일로 저장
    const writer = response.data.pipe(
      fs.createWriteStream("downloaded_apk.apk")
    );
    writer.on("finish", () => console.log("APK 다운로드 완료."));
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

// 바로 APK 추출 및 다운로드 함수 호출
extractAndDownloadAPK();
