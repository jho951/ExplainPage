# ADR-001: Adopt AI Agent Collaboration Template

## Status

Accepted

## Date

2026-02-16

## Context

기존 프로젝트에서 AI 협업 과정의 흔적(프롬프트 로그), 결정 기록(ADR), 요구사항/가정 관리가 일관되게 남지 않았다.

## Decision

다음 협업 아티팩트를 도입한다.

- `AGENTS.md`
- `docs/REQUIREMENTS.md`
- `docs/decisions/` (ADR)
- `prompts/`
- `docs/runbook/DEBUG.md`

기존 애플리케이션 코드, 패키지 구성, CI 워크플로우는 유지한다.

## Consequences

- 이후 PR은 `prompts/` 로그 링크를 포함해야 한다.
- 큰 결정(트레이드오프/정책 변경)은 ADR로 남긴다.
- 요구사항/가정 변경 시 `docs/REQUIREMENTS.md`를 동반 갱신한다.
