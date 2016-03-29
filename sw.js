'use strict';

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('SW Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('SW Activated', event);
});

self.addEventListener('push', function(event) {
  console.log('You received a push message', event);
  var title = 'Wohoo! You got your Push';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'Click me to take you to the my site',
      icon: 'images/icon.png',
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = 'http://www.alvimurtaza.com';
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
