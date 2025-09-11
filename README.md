# Password Learning Adventure

A gamified password learning application designed to help children (ages 6-7) learn strong passwords while practicing keyboard skills. The app educates both parents and children about password security in an engaging, child-friendly way.

🌐 **Live Demo**: [https://hasla.orpi.pl](https://hasla.orpi.pl)

## Overview

When children start school, they need passwords for logging into computers and educational platforms during IT classes. Teachers often request "very easy" passwords, but many parents don't realize the security risks this creates. This application addresses that challenge by:

- **For Parents**: Providing education about creating strong, memorable passwords suitable for young learners
- **For Children**: Offering a fun, gamified way to practice typing passwords and learn keyboard layout
- **For Everyone**: Establishing good digital security habits from the beginning

## Features

### 🎮 Child Mode
- Gamified password practice with star rewards
- Visual feedback and encouragement messages
- Auto-focus on password input for immediate engagement
- Support for showing/hiding passwords to help with keyboard learning
- Age-appropriate motivational messages

### 👨‍👩‍👧‍👦 Parent Mode
- Password strength meter with real-time feedback
- Educational content about password security
- Comprehensive password creation guide
- Links to additional security resources and source code

### 🌍 Multilingual Support
- Full Polish and English translations
- Easy language switching
- Culturally appropriate examples for each language

### 🔒 Privacy & Security
- All passwords stay in the browser - nothing sent to servers
- No data collection or storage
- Open source for transparency

## Requirements

### System Requirements
- **Node.js**: 18.0 or higher
- **Package Manager**: pnpm (recommended) or npm
- **Browser**: Modern browser with JavaScript enabled

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/plusz/learnpasswords.git
   cd learnpasswords
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
pnpm build
pnpm start
```

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Analytics**: Google Analytics, Vercel Analytics

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with analytics
│   └── page.tsx           # Main application entry
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── admin-screen.tsx  # Parent dashboard
│   ├── child-screen.tsx  # Child practice interface
│   └── password-guide.tsx # Password creation guide
├── lib/                  # Utility functions
└── public/              # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

```
Copyright 2025 Ola i Tata

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

## Contact

- **Website**: [https://hasla.orpi.pl](https://hasla.orpi.pl)
- **Email**: naukahasel@orpi.pl

---

*Built with ❤️ to help children learn digital security from an early age.*
