## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd documents
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Linting

```bash
npm run lint
```

## API Integration

The app integrates with the testing server from the [sample repository](https://github.com/holdedlab/frontend-challenge):

- **HTTP API**: `https://frontend-challenge.vercel.app/api/documents`
- **WebSocket**: `wss://frontend-challenge.vercel.app/ws`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## NOTES

- The documents endpoint does not have pagination.
- Added modalize library to make drawer modals
