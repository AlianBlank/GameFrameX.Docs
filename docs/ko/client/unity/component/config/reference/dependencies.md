# 의존성 및 환경 요구 사항 구성

이 페이지는 `com.gameframex.unity.config` 패키지 실행에 필요한 Unity 버전, 런타임 의존성 패키지 및 개발 의존성을 요약하여 설치 및 문제 해결을 위한 빠른 참조 체크리스트로 제공합니다.

## 환경 요구 사항

| 항목 | 버전/요구 사항 | 출처 |
|----|-----------|------|
| Unity 편집기 | 2019.4 이상 | `package.json`의 `unity` 필드 |
| 패키지 이름 | `com.gameframex.unity.config` | `package.json` |
| 현재 버전 | 1.2.1 | `package.json`의 `version` 필드 |
| 네임스페이스 | GameFrameX.Config | 소스 코드 디렉터리 참조 |

Source: [package.json](/package.json#L2-L7)

## 런타임 의존성

아래 세 패키지는 프로젝트에 반드시 존재해야 하며, 그렇지 않으면 `IDataTable<T>`와 설정 관리자를 초기화할 수 없습니다.

| 의존성 패키지 | 버전 | 용도 |
|--------|------|------|
| `com.gameframex.unity` | 2.5.1 | GameFrameX 프레임워크 핵심 (Procedure, 모듈 기본 클래스, 이벤트 버스 호스트) |
| `com.gameframex.unity.asset` | 3.1.1 | 리소스 로딩 파이프라인, 데이터 테이블 비동기 로딩이 이에 의존 |
| `com.gameframex.unity.event` | 1.3.0 | 이벤트 시스템, 설정 변경 알림이 이에 의존 |

Source: [package.json](/package.json#L22-L26)

## 개발 의존성

릴리스/빌드 단계에서만 사용되며, 프로젝트 실행 시에는 설치를 강제하지 않습니다.

| 패키지 | 버전 | 용도 |
|----|------|------|
| `semantic-release` | ^24.2.0 | 자동화된 시맨틱 버전 릴리스 |
| `@semantic-release/changelog` | ^6.0.3 | CHANGELOG 생성 |
| `@semantic-release/git` | ^10.0.1 | 릴리스 후 자동으로 git tag 생성 |

Source: [package.json](/package.json#L27-L31)

## Unity Package Manager 설치 방법

OpenUPM / 내부 npm 소스를 통해 본 패키지를 추가하면, 의존성은 패키지 선언에 따라 자동으로 가져옵니다.

1. `Packages/manifest.json`을 엽니다.
2. `dependencies`에 다음을 추가합니다.

```json
{
  "dependencies": {
    "com.gameframex.unity.config": "1.2.1"
  }
}
```

3. 저장 후 Unity가 자동으로 위 "런타임 의존성"에 나열된 세 패키지를 해석하여 다운로드합니다.

## 버전 제약 설명

| 필드 | 값 | 의미 |
|------|----|------|
| `unity` | `2019.4` | UPM 프로토콜이 요구하는 최소 Unity 편집기 버전 |
| 의존성 버전 번호 | 정확한 버전 (예: `2.5.1`) | UPM은 기본적으로 정확한 버전으로 해석하며, 부 버전으로 자동 업그레이드되지 않습니다. |

## 일반적인 오류

| 증상 | 원인 | 해결 방법 |
|------|------|------|
| 설치 후 `Cannot find assembly GameFrameX` 오류 발생 | `com.gameframex.unity` 핵심 패키지 누락 | manifest에 `"com.gameframex.unity": "2.5.1"` 추가 |
| 데이터 테이블 로드 시 리소스 관리자가 초기화되지 않았다는 오류 발생 | `com.gameframex.unity.asset` 누락 | manifest에 `"com.gameframex.unity.asset": "3.1.1"` 추가 |
| 설정 변경 리스닝 콜백이 없음 | `com.gameframex.unity.event` 누락 | manifest에 `"com.gameframex.unity.event": "1.3.0"` 추가 |
| Unity 실행 시 `package requires Unity 2019.4` 오류 발생 | 편집기 버전이 2019.4 미만 | Unity Hub를 2019.4 LTS 이상으로 업그레이드 |

## 관련 링크

- 문서 사이트: https://gameframex.doc.alianblank.com
- 저장소: https://github.com/gameframex/com.gameframex.unity.config
- 변경 로그: https://github.com/gameframex/com.gameframex.unity.config/blob/main/CHANGELOG.md

Source: [package.json](/package.json#L36-L38)