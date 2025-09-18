// import { useEffect, useState } from "react";

// export function useLocalNotifications() {
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [badgeCount, setBadgeCount] = useState(0);

//   useEffect(() => {
//     // Check initial permission status
//     checkPermissions();

//     // Get initial badge count
//     updateBadgeCount();

//     // Set up notification listeners
//     const receivedSubscription =
//       NotificationService.addNotificationReceivedListener((notification) => {
//         console.log("Notification received:", notification);
//       });

//     const responseSubscription =
//       NotificationService.addNotificationResponseReceivedListener(
//         (response) => {
//           console.log("Notification response:", response);
//           // Handle notification tap
//           const data = response.notification.request.content.data;
//           if (data?.type === "document") {
//             // Navigate to document or show details
//             console.log("Document notification tapped:", data);
//           }
//         }
//       );

//     return () => {
//       receivedSubscription.remove();
//       responseSubscription.remove();
//     };
//   }, []);

//   const checkPermissions = async () => {
//     try {
//       const hasPermission = await NotificationService.requestPermissions();
//       setIsEnabled(hasPermission);
//     } catch (error) {
//       console.error("Failed to check notification permissions:", error);
//     }
//   };

//   const updateBadgeCount = async () => {
//     try {
//       const count = await NotificationService.getBadgeCount();
//       setBadgeCount(count);
//     } catch (error) {
//       console.error("Failed to get badge count:", error);
//     }
//   };

//   const showDocumentNotification = async (
//     documentTitle: string,
//     authorName: string,
//     type: "created" | "updated" | "deleted"
//   ) => {
//     try {
//       await NotificationService.scheduleDocumentNotification(
//         documentTitle,
//         authorName,
//         type
//       );
//       await updateBadgeCount();
//     } catch (error) {
//       console.error("Failed to show document notification:", error);
//     }
//   };

//   const clearBadge = async () => {
//     try {
//       await NotificationService.setBadgeCount(0);
//       setBadgeCount(0);
//     } catch (error) {
//       console.error("Failed to clear badge:", error);
//     }
//   };

//   const clearAllNotifications = async () => {
//     try {
//       await NotificationService.cancelAllNotifications();
//       await clearBadge();
//     } catch (error) {
//       console.error("Failed to clear all notifications:", error);
//     }
//   };

//   return {
//     isEnabled,
//     badgeCount,
//     showDocumentNotification,
//     clearBadge,
//     clearAllNotifications,
//     updateBadgeCount,
//   };
// }
