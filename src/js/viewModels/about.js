/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery','appController', 'ojs/ojknockout', 'ojs/ojinputtext',  'ojs/ojbutton'],
 function(oj, ko, $, app) {

    function AboutViewModel() {
      var self = this;
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.
      self.app = app;
      self.currentValue = ko.observable(self.app.userLogin());
      self.buttonDisabled = ko.observable(true);

      self.submitInput = function()
      {
      //  console.log("asdf", this.currentRawValue);
        if (self.currentValue() == "sung.hye.jeon@oracle.com"){
          alert("본인의 오라클 계정으로 등록 해 주세요.");
        }
        else{
          alert("성공적으로 등록되었습니다.");
          self.app.userLogin (self.currentValue());
          console.log("user name", self.app.userLogin());
          console.log("user name", self.currentValue());

        }
      }

      // callback when an option changes. Check is that the option changed is 'rawValue' and
      // if 'rawValue' is not empty, enable the 'Submit' button, else disable it.
      self.optionChangeCallback = function(event, data)
      {
        var rawValue, elem;
        if (data['option'] === "rawValue")
        {
          elem = $("#text-input");
          rawValue = elem.ojInputText("option", "rawValue");
          if (rawValue)
          {
            self.buttonDisabled(false);
          }
          else
          {
            self.buttonDisabled(true);
          }
        }
      }
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
      self.handleActivated = function(info) {
        // Implement if needed
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
      self.handleAttached = function(info) {
        this.value = ko.observable("Green");
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View.
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
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
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new AboutViewModel();
  }
);
