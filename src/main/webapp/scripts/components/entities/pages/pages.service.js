'use strict';

angular.module('jCMSApp')
    .factory('Pages', function ($resource, DateUtils) {
        return $resource('api/pages/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.created = DateUtils.convertLocaleDateFromServer(data.created);
                    data.updated = DateUtils.convertLocaleDateFromServer(data.updated);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.created = DateUtils.convertLocaleDateToServer(data.created);
                    data.updated = DateUtils.convertLocaleDateToServer(data.updated);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.created = DateUtils.convertLocaleDateToServer(data.created);
                    data.updated = DateUtils.convertLocaleDateToServer(data.updated);
                    return angular.toJson(data);
                }
            }
        });
    });
