var app = angular.module('tedrssapp.services', []);

app.constant("FEED_URL", "http://feeds.feedburner.com/TEDTalks_video");

app.factory('FeedService', function ($http, $q, $rootScope, FEED_URL) {

  var self = {
    'posts': []
  };

  self.loadFeed = function () {

    self.posts.length = 0;
    var defer = $q.defer();

    superfeedr.auth('josejunior', '1840eee2c4fca1485c1f74532a66b13c');
    superfeedr.setOnLoadCallback(function () {
      var feed = new superfeedr.Feed(FEED_URL);
      feed.load(function (result) {
        $rootScope.$apply(function () {
          angular.forEach(result.feed.entries, function (entry) {
            self.posts.push(entry);
          });
          defer.resolve(self.posts);
        });
      });
    });

    return defer.promise;
  };

  self.getEntry = function (link) {
    for (var i = 0; i < self.posts.length; i++) {
      var entry = self.posts[i];
      if (entry.link == link) {
        return entry;
      }
    }
    return null;
  };

  return self;
});
