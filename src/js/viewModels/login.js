/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController',
    'ojs/ojbutton', 'ojs/ojinputtext'],
        function (oj, ko, $, app) {

            function LoginViewModel() {
                var self = this;
                self.isLoggedIn = ko.observable(false);
                self.username = ko.observable("sung.hye.jeon@oracle.com");
                self.password = ko.observable("welcome1");
                // Header Config
                self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};

                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additionaly available methods.

                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

                self.loginSuccess = function (response) {
                    console.log("self.username", self.username());
                    app.userLogin ( self.username() );
//                    var storage = window.localStorage;
//                    storage.setItem("ForEUsername", window.btoa(self.username()));
//                    storage.setItem("ForEPassword", window.btoa(self.password()));
//
//                    console.log(response);
//                    appVar.response = response;
//                    self.isLoggedIn(mbe.isLoggedIn);
//                    appVar.mcsLoginUser = self.username();
//                    appVar.mcsLoginPassword = self.password();
                    app.switchNavBar();
                    oj.Router.rootInstance.go('dashboard');

                };

                self.loginFailure = function (statusCode, data) {
                    alert("로그인의 비밀번호 아이디 조합이 맞지 않습니다." );
                };

                self.loginAction = function () {
                    self.login(self.username(), self.password());
                };

                self.fgetpAction = function () {
                    oj.Router.rootInstance.go('forgetPass');
                };


                self.login = function (authUsername, authPassword, flager) {
                    console.log("authUsername", authUsername);

                   $.ajax({
                       type: "GET",
                       url: "http://129.150.84.190:8080/v1/reservations/findByUser?email=" + authUsername,
                       async: false,
                       headers: {
                            'Content-Type' : 'application/json',
                            'Accept' : 'application/json',
//                            'Authorization' : 'Basic c3VuZy5oeWUuamVvbkBvcmFjbGUuY29tOndlbGNvbWUx'
                            'Authorization' : 'Basic ' + window.btoa(authUsername + ":" + authPassword)
                       },
                       
                       success: function (data) {
                           if (flager) {
                               console.log(data);
                               appVar.response = data;
                               app.isLoading(false);
                               oj.Router.rootInstance.go('home');
                           } else {
                               self.loginSuccess(data);
                           }
                       },
                       error: function (error) {
                           self.loginFailure(error);
                       },
                       complete: function (data) {
                           app.Authorization = 'Basic ' + window.btoa(authUsername + ":" + authPassword);
                           console.log("Login complete");
                       }
                   });
                   return true;
                 //   self.loginSuccess();

                };
                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    // Implement if needed
                    self.isLoggedIn(false);
                };
                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    // Implement if needed
                };
                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };
                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new LoginViewModel();
        }
);
