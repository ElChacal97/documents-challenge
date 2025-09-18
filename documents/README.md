# Documents Mobile App

A React Native mobile application built with Expo for document management with real-time notifications and offline support.

## Features

### Required Features ✅

- **Document List/Grid View**: Display recent documents in both list and grid layouts
- **Real-time Notifications**: WebSocket-based notifications for new documents created by other users
- **Document Creation**: Create new documents with title, content, and type selection
- **Pull-to-Refresh**: Refresh document list by pulling down
- **Native Share**: Share documents using native sharing functionality
- **Relative Dates**: Display creation dates in relative format (e.g., "2 hours ago")

### Optional Features ✅

- **Offline Support**: Local storage for offline document access
- **Local Notifications**: Push notifications for document updates
- **View Toggle**: Switch between list and grid view modes
- **Error Handling**: Comprehensive error handling and retry mechanisms
- **Loading States**: Proper loading indicators and empty states

## Architecture

### Project Structure

```
documents/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout with providers
│   └── index.tsx          # Main documents screen
├── components/            # Reusable UI components
│   ├── DocumentItem.tsx   # Individual document item
│   ├── DocumentsList.tsx  # Document list/grid container
│   ├── DocumentsHeader.tsx # Header with view toggle
│   ├── CreateDocumentForm.tsx # Document creation form
│   └── NotificationBanner.tsx # Real-time notification banner
├── constants/             # App constants and configuration
│   ├── api.ts            # API endpoints and configuration
│   └── theme.ts          # Colors, spacing, typography
├── hooks/                 # Custom React hooks
│   ├── useDocuments.ts   # Document data management
│   ├── useWebSocket.ts   # WebSocket connection management
│   ├── useOfflineSupport.ts # Offline functionality
│   └── useLocalNotifications.ts # Local notification management
├── logic/                 # Business logic and services
│   ├── api.ts            # HTTP API service
│   ├── websocket.ts      # WebSocket service
│   ├── storage.ts        # Local storage service
│   ├── notifications.ts  # Local notification service
│   └── utils.ts          # Utility functions
├── types/                 # TypeScript type definitions
│   ├── document.ts       # Document and API types
│   └── navigation.ts     # Navigation types
└── __tests__/            # Test files
    ├── utils.test.ts     # Utility function tests
    ├── DocumentItem.test.tsx # Component tests
    └── api.test.ts       # API service tests
```

### Key Design Decisions

1. **State Management**: Used React Query for server state management with caching, background updates, and optimistic updates
2. **Real-time Communication**: WebSocket service with automatic reconnection and error handling
3. **Offline Support**: AsyncStorage for local data persistence with network status monitoring
4. **Component Architecture**: Modular, reusable components with clear separation of concerns
5. **Type Safety**: Comprehensive TypeScript interfaces for all data structures
6. **Error Handling**: Graceful error handling with user-friendly messages and retry mechanisms

### Third-Party Libraries

| Library                                     | Purpose                 | Alternative Considered         | Reasoning                                                               |
| ------------------------------------------- | ----------------------- | ------------------------------ | ----------------------------------------------------------------------- |
| `@tanstack/react-query`                     | Server state management | Redux Toolkit, Zustand         | Better caching, background updates, and optimistic updates for API data |
| `@react-native-async-storage/async-storage` | Local storage           | SQLite, Realm                  | Simple key-value storage sufficient for offline document caching        |
| `@react-native-community/netinfo`           | Network status          | Custom implementation          | Reliable network status detection for offline functionality             |
| `expo-notifications`                        | Local notifications     | react-native-push-notification | Better Expo integration and TypeScript support                          |
| `expo-sharing`                              | Native sharing          | react-native-share             | Better Expo integration and cross-platform compatibility                |

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

### API Endpoints

- `GET /documents` - Fetch all documents
- `POST /documents` - Create new document
- `GET /documents/:id` - Fetch specific document
- `PUT /documents/:id` - Update document
- `DELETE /documents/:id` - Delete document

## Development Notes

### Testing Strategy

- **Unit Tests**: Test utility functions and API services
- **Component Tests**: Test React components with React Native Testing Library
- **Integration Tests**: Test complete user flows
- **Coverage Target**: 70% code coverage

### Performance Optimizations

- React Query caching reduces unnecessary API calls
- FlatList virtualization for large document lists
- Image optimization with Expo Image
- Lazy loading of non-critical components
- Debounced search and filtering

### Accessibility

- Proper ARIA roles and labels
- Screen reader support
- High contrast mode support
- Keyboard navigation support

## Future Enhancements

- **Document Search**: Full-text search functionality
- **Document Categories**: Organize documents by categories/tags
- **Collaborative Editing**: Real-time collaborative document editing
- **Document Versioning**: Track document changes and versions
- **Advanced Offline Sync**: Conflict resolution for offline changes
- **Document Preview**: In-app document preview for supported formats
- **User Authentication**: User accounts and document ownership
- **Document Permissions**: Share documents with specific users

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **iOS simulator not starting**: Reset simulator or restart Xcode
3. **Android build issues**: Clean gradle cache and rebuild
4. **WebSocket connection issues**: Check network connectivity and server status

### Debug Mode

Enable debug mode by setting `__DEV__ = true` in the app to see additional logging and error information.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
