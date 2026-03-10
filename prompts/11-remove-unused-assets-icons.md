# 11) Remove Unused assets/icons Directory

## Prompt

삭제 해줘 그럼 이제 안쓰니까

## Work Summary

- Verified no runtime/source imports from `assets/icons` remained.
- Removed `assets/icons` directory.
- Removed stale TypeScript include entry `assets/icons/svg.d.ts` from `tsconfig.json`.

## Validation

- Ran `npm run _typecheck`.
