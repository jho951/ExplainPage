# AGENTS Working Agreement

## Purpose

이 문서는 이 저장소에서 사람과 AI 에이전트가 협업할 때의 기본 규칙을 정의한다.

## Ground Rules

- 기존 제품 코드(`app/`, `components/`, `libs/` 등)의 동작을 바꾸는 변경은 목적, 근거, 영향 범위를 PR에 명시한다.
- 요구사항/가정이 바뀌면 `docs/REQUIREMENTS.md`를 함께 갱신한다.
- 중요한 기술적 결정(트레이드오프, 정책 변경, 되돌리기 어려운 선택)은 ADR로 남긴다.
- 모든 AI 작업은 `prompts/`에 최소 1개 이상 로그를 남긴다.

## Required Artifacts

- Requirements: `docs/REQUIREMENTS.md`
- Decisions (ADR): `docs/decisions/`
- Prompt logs: `prompts/`
- Debug runbook: `docs/runbook/DEBUG.md`

## PR Expectations

- PR 본문에 사용한 프롬프트 로그 경로를 포함한다.
- 결정 사항이 있으면 ADR 경로를 함께 링크한다.
- REQUIREMENTS 변경 여부(포함/미포함)와 사유를 명시한다.
