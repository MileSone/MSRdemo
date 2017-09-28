/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * forgetPass module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController',
    'ojs/ojbutton', 'ojs/ojinputtext'],
        function (oj, ko, $, app) {
            /**
             * The view model for the main content view template
             */
            function forgetPassContentViewModel() {
                var self = this;
                self.emailInput = ko.observable('');
                self.oldPassword = ko.observable('');
                self.NewPassword_one = ko.observable('');
                self.NewPassword_two = ko.observable('');

                var baseUrl = "http://129.150.84.190:8080/v1/";


                self.passwordPattern = ko.observable(self.NewPassword_one());

                self.backAction = function () {
                    oj.Router.rootInstance.go('login');
                };


                self.comfirmValidator = {
                    'validate': function (value)
                    {
                        value = value + "";

                        if (value === self.NewPassword_two())
                        {
                            console.log('1');
                        } else {
                            console.log('2');
                            throw new oj.ValidatorError("Password incorrect!", "Please enter the same password");
                        }

                        return true;
                    }
                };

                self.ChangePassAction = function () {

                    var sendData = {
                        email: self.emailInput() + '',
                        oldPassword: self.oldPassword() + '',
                        newPassword: self.NewPassword_one() + ''
                    };

                    $.ajax({
                        type: "PUT",
                        url: baseUrl + "/users/changePassword",
                        data: sendData,
                        async: false,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        success: function (data) {
                            alert(data);
                            oj.Router.rootInstance.go('login');
                        },
                        error: function (error) {
                            alert(JSON.stringify(error.responseJSON.message));
                            console.log(error);
                        },
                        complete: function (data) {
                            console.log("Login complete");
                        }
                    });
                    return true;

                };
            }

            return forgetPassContentViewModel;
        });
