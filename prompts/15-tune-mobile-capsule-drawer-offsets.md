# 15) Tune Mobile Capsule Drawer Offsets

## Prompt

응 해줘

## Work Summary

- Fine-tuned top capsule drawer positioning and sizing for device widths.
- Updated `.top` placement in `ui/Drawer.module.css` with responsive `clamp()` values for:
  - `top`
  - `width`
  - `max-height`
  - `border-radius`
- Added breakpoints for `max-width: 768px` and `max-width: 480px` to improve visual alignment below the mobile header.

## Validation

- Ran `npm run _typecheck`.
