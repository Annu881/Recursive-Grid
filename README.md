# 🎮 Recursive Grid

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**An interactive 3×3 grid game with cascading ripple effects and dynamic locking mechanics**

[Live Demo](#) • [Features](#-features) • [Installation](#-installation) • [Documentation](#-how-it-works)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [How It Works](#-how-it-works)
- [Game Rules](#-game-rules)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🎯 Overview

**Recursive Grid** is an interactive web application that demonstrates complex state management and cascading effects through a simple 3×3 grid interface. Each box interaction triggers a series of ripple effects based on mathematical rules, creating an engaging puzzle-like experience.

### Key Highlights

- ✨ **Smooth Animations**: 200ms transitions with spring-like feedback
- 🎨 **Dynamic Styling**: Color-coded boxes based on even/odd values
- 🔒 **Locking Mechanism**: Boxes lock at value ≥15 with visual feedback
- 🌊 **Ripple Effects**: Neighbor interactions based on divisibility rules
- 📱 **Responsive Design**: Works seamlessly across all devices
- ♿ **Accessible**: Keyboard navigation and screen reader support

---

## ✨ Features

### Core Functionality

| Feature | Description |
|---------|-------------|
| **Click Interaction** | Increment box value by 1 on each click |
| **Rule A (÷3)** | When divisible by 3 → right neighbor -1 |
| **Rule B (÷5)** | When divisible by 5 → bottom neighbor +2 |
| **Locking System** | Boxes lock when value ≥15 (red, unclickable) |
| **Edge Protection** | No crashes at grid boundaries |
| **Negative Values** | Full support for negative numbers |

### UI/UX Enhancements

- 🎭 **Hover Effects**: Lift animation with scale to 105%
- 👆 **Click Feedback**: Scale-down animation on interaction
- 🌈 **Gradient Background**: Subtle slate-to-indigo gradient
- 🔄 **Reset Button**: One-click grid reset with gradient styling
- 📊 **Rules Panel**: Interactive guide with emoji indicators

---

## 🛠️ Tech Stack

```mermaid
graph LR
    A[Next.js 14] --> B[React 18]
    A --> C[TypeScript 5]
    A --> D[Tailwind CSS 3]
    B --> E[Client Components]
    C --> F[Type Safety]
    D --> G[Responsive Design]
    
    style A fill:#000,stroke:#fff,color:#fff
    style B fill:#61dafb,stroke:#000,color:#000
    style C fill:#3178c6,stroke:#fff,color:#fff
    style D fill:#38bdf8,stroke:#000,color:#000
```

### Dependencies

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 3.0+
- **Runtime**: Node.js 18+

---

## 🚀 Installation

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/recursive-grid.git
cd recursive-grid

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 🎮 How It Works

### Game Flow Diagram

```mermaid
flowchart TD
    Start([User Clicks Box]) --> Check{Is Box Locked?}
    Check -->|Yes ≥15| End([No Action])
    Check -->|No <15| Increment[Increment Value +1]
    
    Increment --> RuleA{Divisible by 3?}
    RuleA -->|Yes| CheckRight{Is Rightmost Column?}
    CheckRight -->|No| CheckRightLock{Right Neighbor Locked?}
    CheckRightLock -->|No| DecrRight[Right Neighbor -1]
    CheckRightLock -->|Yes| RuleB
    CheckRight -->|Yes| RuleB
    RuleA -->|No| RuleB
    
    RuleB{Divisible by 5?} -->|Yes| CheckBottom{Is Bottom Row?}
    CheckBottom -->|No| CheckBottomLock{Bottom Neighbor Locked?}
    CheckBottomLock -->|No| IncrBottom[Bottom Neighbor +2]
    CheckBottomLock -->|Yes| CheckLock
    CheckBottom -->|Yes| CheckLock
    RuleB -->|No| CheckLock
    
    DecrRight --> CheckLock
    IncrBottom --> CheckLock
    
    CheckLock{New Value ≥15?} -->|Yes| Lock[Lock Box - Red]
    CheckLock -->|No| Update[Update Display]
    Lock --> Update
    Update --> End
    
    style Start fill:#4ade80,stroke:#000,color:#000
    style End fill:#f87171,stroke:#000,color:#000
    style Lock fill:#dc2626,stroke:#fff,color:#fff
    style Increment fill:#60a5fa,stroke:#000,color:#000
```

### State Management

```mermaid
stateDiagram-v2
    [*] --> Initial: Grid Created
    Initial --> Active: User Interaction
    Active --> Calculating: Apply Rules
    Calculating --> Updating: Modify Neighbors
    Updating --> Active: Render Changes
    Active --> Locked: Value ≥ 15
    Locked --> [*]: Cannot Interact
    Active --> Reset: Reset Button
    Reset --> Initial: All Values → 0
```

---

## 📖 Game Rules

### Rule A: Divisibility by 3

When a box reaches a value divisible by 3:

```
┌───┬───┬───┐
│ 3 │ 0 │   │  →  Click Box[0] to 3
└───┴───┴───┘
│   │   │   │
└───┴───┴───┘
│   │   │   │
└───┴───┴───┘

┌───┬───┬───┐
│ 3 │-1 │   │  →  Box[1] decrements by 1
└───┴───┴───┘
│   │   │   │
└───┴───┴───┘
│   │   │   │
└───┴───┴───┘
```

### Rule B: Divisibility by 5

When a box reaches a value divisible by 5:

```
┌───┬───┬───┐
│ 5 │   │   │  →  Click Box[0] to 5
└───┴───┴───┘
│ 0 │   │   │
└───┴───┴───┘
│   │   │   │
└───┴───┴───┘

┌───┬───┬───┐
│ 5 │   │   │  →  Box[3] increments by 2
└───┴───┴───┘
│ 2 │   │   │
└───┴───┴───┘
│   │   │   │
└───┴───┴───┘
```

### Locking Mechanism

```
Value < 15  →  Clickable (Gray/Navy)
Value ≥ 15  →  Locked (Red, cursor-not-allowed)
```

---

## 🏗️ Architecture

### Component Hierarchy

```mermaid
graph TD
    A[app/page.tsx] --> B[RecursiveGrid Component]
    B --> C[Grid State - useState]
    B --> D[Click Handler Logic]
    B --> E[9 × Button Elements]
    B --> F[Reset Button]
    B --> G[Rules Panel]
    
    C --> H[Array of 9 Numbers]
    D --> I[Rule A: ÷3 Logic]
    D --> J[Rule B: ÷5 Logic]
    D --> K[Lock Check]
    
    E --> L[Dynamic Styling]
    L --> M[Even: Gray]
    L --> N[Odd: Navy]
    L --> O[Locked: Red]
    
    style A fill:#000,stroke:#fff,color:#fff
    style B fill:#3b82f6,stroke:#fff,color:#fff
    style C fill:#10b981,stroke:#000,color:#000
    style D fill:#f59e0b,stroke:#000,color:#000
```

### Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Button
    participant Handler
    participant State
    participant Neighbors
    participant UI
    
    User->>Button: Click Box[i]
    Button->>Handler: handleBoxClick(i)
    Handler->>State: Check if locked
    
    alt Box is locked
        State-->>Handler: Return (no action)
    else Box is unlocked
        Handler->>State: Increment value +1
        Handler->>Handler: Check Rule A (÷3)
        
        alt Divisible by 3
            Handler->>Neighbors: Decrement right neighbor
        end
        
        Handler->>Handler: Check Rule B (÷5)
        
        alt Divisible by 5
            Handler->>Neighbors: Increment bottom neighbor +2
        end
        
        Handler->>State: Update grid state
        State->>UI: Re-render with new values
        UI-->>User: Display updated grid
    end
```

---

## 📁 Project Structure

```
recursive-grid/
├── app/
│   ├── page.tsx              # Main page component
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles + Tailwind
│   └── favicon.ico           # App icon
├── components/
│   └── RecursiveGrid.tsx     # Core grid logic & UI
├── public/                   # Static assets
├── .gitignore
├── package.json
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind config
├── next.config.ts            # Next.js config
└── README.md                 # This file
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/recursive-grid)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

No environment variables required for this project.

---

## 🎨 Customization

### Modify Grid Size

Edit `components/RecursiveGrid.tsx`:

```typescript
// Change from 3x3 to 4x4
const [grid, setGrid] = useState<number[]>(Array(16).fill(0));

// Update grid layout
<div className="grid grid-cols-4 gap-4 ...">
```

### Adjust Rules

Modify the ripple logic in `handleBoxClick`:

```typescript
// Change Rule A: divisible by 4 instead of 3
if (newValue % 4 === 0) {
  // Custom logic
}
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)

---

<div align="center">

**Made with ❤️ by [Your Name]**

⭐ Star this repo if you find it helpful!

</div>
