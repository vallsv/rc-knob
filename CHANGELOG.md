# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Fixed `Pointer`, which was rendering a string in some context, instead of a JSX element

### Changed

- Changed `Scale`, which was skipped when no value was set to the component. Now it is rendered.
- Changed `RenderCustomProps`type, which is now valid for `percentage=null`

## 1.3.0 - 2026-01-05

### Added

- A new `Power` component is available

### Changed

- The description of the knob is now shared to the children as a context
- The center is now internally stored as a tuple `x, y`

## 1.2.1 - 2025-12-18

### Fixed

- Setup properly the typescript description files

## 1.2.0 - 2023-02-26

### Added

- Provide typescript version
- Added `readOnly` property
- Added `useMouseWheel` property
- Added `tracking` property
- Added `Range` component
- Added `Spiral` component
- Added `Text` component
- Supports multiturn rotation
- Supports anticlock wise geometry

### Changed

- Right mouse button is now used during the interaction to cancel it

## 1.0.3 - 2021-07-13

### Fixed

- Various bug fixes

## 1.0.0 - 2019-01-03

### Added

- Initial version
