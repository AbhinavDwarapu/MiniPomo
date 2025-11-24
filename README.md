<div align="center">
<img width="72" height="72" alt="Icon-iOS-Default-1024x1024@1x" src="https://github.com/user-attachments/assets/fb38493c-1bd7-49ea-b4e4-9c0b752ed98a" />
</div>
<h1 align="center"> MiniPomo</h1>
<div align="center">
<img width="200" height="200" alt="Screenshot 2025-11-24 at 19 22 03" src="https://github.com/user-attachments/assets/367b141d-5ffb-4d91-810b-1f8da29c45f5" />
<img width="200" height="200" alt="Screenshot 2025-11-24 at 19 23 06" src="https://github.com/user-attachments/assets/f99c4337-09a1-45ce-9ad8-e097da490033" />
</div>

This is a native MacOS application (compiled with Tauri) designed to help you stay focused using the Pomodoro technique. It features a clean, minimalist interface following Google's [Material Design](https://m3.material.io/) guidelines with customizable timer settings and themes.

## Tech Stack

This project is built using the following technologies:

-   **[Tauri](https://tauri.app/)**: For building the native MacOS application bundle.
-   **[Next.js](https://nextjs.org/)**: React framework for the user interface.
-   **[Tailwind CSS](https://tailwindcss.com/)**: For styling and theming.
-   **TypeScript**: For type safety and better developer experience.

## Getting Started

### Prerequisites

-   Node.js and pnpm installed.
-   Rust and Cargo installed (for Tauri).

### Installation

1.  Clone the repository.
2.  Install dependencies:

```bash
pnpm install
```

### Development

To run the application in development mode:

```bash
pnpm tauri dev
```

### Build

To build the application for production:

```bash
pnpm tauri build
```

The build artifacts will be located in `src-tauri/target/release/bundle/`.

## Todo

- Settings page UI revamp
- Add more themes
- Notification sounds
- Add a distributable file
- Distribute on app store
- Add MacOS menubar support
