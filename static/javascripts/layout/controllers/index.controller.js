(function() {
    angular
        .module('thinkster.layout.controllers')
        .controller('IndexController', IndexController);
    
    IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar'];
    
    function IndexController($scope, Authentication, Posts, Snackbar) {
        var vm = this;
        
        vm.isAuthenticated = Authentication.isAuthenticated();
        vm.posts = [];
        
        activate();
        
        function activate() {
            Posts.all().then(postSuccessFn, postsErrorFn);
            
            // event listener - catching post event, moving to front of array without extra api call
            $scope.$on('post.created', function (event, post) {
                vm.posts.unshift(post)
            });
            
            //event listener - remove post at front of vm.posts if error
            $scope.$on('post.created.error', function () {
               vm.posts.shift(); 
            });
            
            function postSuccessFn(data, status, heades, config) {
                vm.posts = data.data;
            }
            
            function postsErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }

})();