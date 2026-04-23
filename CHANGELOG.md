# Changelog

All notable changes to this project will be documented in this file.

This project follows a structured changelog format with versioned releases and release dates.

---

## [0.8.0] - 2026-04-23

### Added
- Added manual minimum and maximum price input fields to the price filter in `FilterSideBar`.
- Added an **Apply Price** button so users can update the selected price range manually.

### Changed
- Updated the price filtering UI to support both slider-based selection and manual min/max input.
- Kept the slider and manual input values synchronized.
- Added validation to ensure the minimum and maximum values stay within valid price limits.
- Prevented invalid price ranges such as negative values, values above the available maximum, and minimum values greater than maximum values.


## [0.7.0] - 2026-04-22

### Added
- Added pagination to `ProductGrid`.
- Products now show 10 items initially.
- Added page size options to show 10, 20, 30, or 50 products per page.

### Changed
- Updated product listing UI to display current visible range and total product count.
- Reset pagination to the first page whenever search, filters, sort, or page size changes.



## [0.6.0] - 2026-04-20

### Changed
- Refactored styles across the application for a cleaner and more consistent UI.
- Enhanced layout and visual presentation for the following components:
  - `HomeView`
  - `ProductGrid`
  - `AppHeader`
  - `LoginModal`
  - `ProductCard`
  - `FavoritesModal`

### Modified
- Improved overall user experience through better spacing, layout balance, and component styling consistency.

---

## [0.5.0] - 2026-04-13

### Added
- Added authentication service to support user login and logout functionality.

### Changed
- Updated `AppHeader` to handle authenticated user actions such as login and logout.

---

## [0.4.0] - 2026-04-09

### Added
- Added favorite functionality to products.
- Added cart functionality for selected products.
- Added `FavoritesModal` component to display favourite items.

### Changed
- Updated `AppHeader` to support favourites interaction.
- Updated `ProductGrid` to support favorite and cart actions.

---

## [0.3.0] - 2026-04-08

### Added
- Added price range filtering functionality to `FilterSidebar` and `ProductGrid`.

---

## [0.2.0] - 2026-04-07

### Added
- Added product search functionality in `ProductGrid`.
- Added category filtering in `ProductGrid` and `FilterSidebar`.

### Changed
- Improved empty-state handling in `ProductGrid` when no matching products are found.

---

## [0.1.0] - 2026-04-06

### Added
- Initialized the SHOPSY e-commerce website project using Vue 3 and Vite.
- Added the basic project structure for the application.
- Added core Home page UI components:
  - `AppHeader`
  - `FilterSidebar`
  - `ProductGrid`
- Implemented product fetching and sorting in `ProductGrid`.

---

## [0.0.1] - 2026-04-06

### Added
- Initial project setup and base configuration for the SHOPSY website.