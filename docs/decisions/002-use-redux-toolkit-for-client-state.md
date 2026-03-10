# ADR-002: Use Redux Toolkit for Client Global State

## Status

Accepted

## Date

2026-02-16

## Context

애플리케이션에 전역 클라이언트 상태 관리가 필요하며, 상태 로직을 컴포넌트/컨텍스트에 분산하면 규모가 커질수록 추적과 유지보수가 어려워진다.

## Decision

클라이언트 전역 상태 관리를 `@reduxjs/toolkit` + `react-redux` 조합으로 통일한다.

- `store/` 디렉터리에 slice, store, typed hooks를 배치한다.
- App Router 레이아웃에 `ReduxProvider`를 연결해 전역에서 접근 가능하게 한다.

## Consequences

- 상태 변경 로직은 slice reducer/action으로 표준화된다.
- 컴포넌트는 `useAppDispatch`, `useAppSelector`를 사용해 타입 안정성을 유지한다.
- 신규 전역 상태는 Context 우선이 아니라 Redux slice 우선으로 추가한다.
