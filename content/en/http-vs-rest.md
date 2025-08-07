---
title: HTTP와 REST의 차이점
date: 2025-07-08
description: 신입 백엔드 개발자가 이해해야 할 HTTP와 REST의 기본 개념과 차이점
---

## ✅ HTTP란?

HTTP(HyperText Transfer Protocol)는 웹에서 **클라이언트와 서버 간 통신을 위한 프로토콜**입니다.  
브라우저에서 웹사이트를 요청할 때 사용하는 가장 기본적인 통신 규칙입니다.

- **Stateless**: 요청 간 상태를 저장하지 않음
- **Method**: GET, POST, PUT, DELETE 등 다양한 메서드 제공
- **Text 기반** 프로토콜

---

## ✅ REST란?

REST(Representational State Transfer)는 **HTTP를 기반으로 한 아키텍처 스타일**입니다.  
리소스를 중심으로 설계되며, 웹 API 설계의 표준으로 자주 사용됩니다.

REST API는 다음 원칙을 따릅니다:

1. **클라이언트-서버 구조**
2. **Stateless**
3. **캐시 가능**
4. **일관된 인터페이스**
5. **계층화된 시스템**
6. **Code on demand (옵션)**

---

## 📌 HTTP와 REST의 관계

| 구분 | HTTP          | REST                                         |
| ---- | ------------- | -------------------------------------------- |
| 개념 | 통신 프로토콜 | 아키텍처 스타일                              |
| 사용 | 웹 전송 규칙  | HTTP 위에서 설계되는 방식                    |
| 예시 | GET /users    | RESTful: `/users` (GET), `/users/1` (DELETE) |

---

## 🔚 결론

HTTP는 **어떻게 통신할 것인가**에 대한 프로토콜이고,  
REST는 **HTTP를 활용해 API를 어떻게 설계할 것인가**에 대한 아키텍처입니다.

신입 개발자라면 **RESTful 설계 원칙**을 이해하고,  
HTTP 메서드의 의미와 역할을 명확히 구분하는 것이 중요합니다.
