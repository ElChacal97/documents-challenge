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

- Used Expo managed project for simplicity and speed.
- The documents endpoint does not have pagination.
- Added modalize library to make drawer modals.
- For notifications I would use Server sent events instead of Websocket for simplicity and performance, no need to have a two way communication.
- Installed expo-document-picker to handle document picking.
- Installed react query for server state management and global state.
- Implemented tanstack/react-query-persist-client and tanstack/query-async-storage-persister to manage query local storage, it was mainly a personal decision since I just found it and seems a very simple, easy solution.
- I decided to show the dates when each document was last updated in the DocumentListItem.
- I decided to clear all the notifications when pressing the notification bell, ideally it would open a notifications list marking which ones are seen or not and update the list as the user scrolls and sees them, I think that would be stepping too far from the required and optional requirements.
- I'm aware some more code could be abstracted or separated to improve maintainability (Websocket handling), I chose not to do it for simplicity reasons and avoid over-engineering since it's just being used once.
