# 엔트리

GameFrameX의 컴포넌트 엔트리 컴포넌트로, 다른 컴포넌트를 빠르게 가져오는 방법을 제공합니다.

---

[[toc]]

## 엔트리 목록

현재 기본 엔트리 목록만 작성되어 있습니다.

### 리소스

### 설정

### 코루틴

### 다운로드

### 유한 상태 머신

### 프로시저

### 저장

### 사운드

### 이벤트

### Mono

### 글로벌 설정

### 씬

### 장기 연결 Socket

### 단기 연결 HTTP

### FUI

### 타이머

### 엔티티 오브젝트

## 사용 방법 (하나 선택)

1. `manifest.json` 파일의 `dependencies` 노드에 다음 내용을 추가합니다.
   ```json
      {"com.gameframex.unity.entry": "https://github.com/GameFrameX/com.gameframex.unity.entry.git"}
    ```
2. Unity의 `Packages Manager`에서 `Git URL` 방식으로 라이브러리를 추가합니다.
   주소: https://github.com/GameFrameX/com.gameframex.unity.entry.git

3. 저장소를 직접 다운로드하여 Unity 프로젝트의 `Packages` 디렉토리에 배치하면 자동으로 로드 및 인식됩니다.
