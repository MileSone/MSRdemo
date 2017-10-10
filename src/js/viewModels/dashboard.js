/**
* Copyright (c) 2014, 2017, Oracle and/or its affiliates.
* The Universal Permissive License (UPL), Version 1.0
*/
/*
* Your dashboard ViewModel code goes here
*/
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojknockout', 'ojs/ojdatetimepicker', 'ojs/ojpictochart', 'ojs/ojlegend', 'ojs/ojgauge'],
function(oj, ko, $, app) {

  function DashboardViewModel() {
    //app related
    var self = this;
    self.app = app;
    self.username = self.app.userLogin;

    //date
    self.dateForCalender = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
    var currentDate  = self.dateForCalender().split('T')[0];
    self.minDate =  ko.observable(currentDate);
    var startingTime = currentDate + "T09:00:00";
    var endingTime = currentDate + "T18:01:45";

    //reservation
    self.clickedSeat = ko.observable('');
    self.availableSeatByUser;
    self.availableSeat = [];
    self.fullSeatMap = {};

    //picto chart
    self.selectionValue = 'single';
    self.selectedItemsValue = ko.observableArray([]);
    self.table1_1 = [
      {seatNo: "12395", name : "Security & Mgt",location: "12F South"},{seatNo: "12393", name : "Security & Mgt",location: "12F South"},{seatNo: "12405", name : "Security & Mgt",location: "12F South"},{seatNo: "12399",name : "Security & Mgt", location: "12F South"},
      {seatNo: "12403", location: "12F South"},{seatNo: "12401", location: "12F South"},{seatNo: "12397", location: "12F South"},{seatNo: "12391", location: "12F South"}];
    self.table1_2 = [
      {seatNo: "12475", location: "12F South"},{seatNo: "12473", location: "12F South"},{seatNo: "12471", location: "12F South"},{seatNo: "12469", location: "12F South"},
      {seatNo: "12467", location: "12F South"},{seatNo: "12465", location: "12F South"},{seatNo: "12463", location: "12F South"},{seatNo: "12461", location: "12F South"}];
    self.table2_1 = [
      {seatNo: "12389", location: "12F South"},{seatNo: "12387", location: "12F South"},{seatNo: "12385", location: "12F South"},{seatNo: "12383", location: "12F South"},
      {seatNo: "12381", location: "12F South"},{seatNo: "12379", location: "12F South"},{seatNo: "12377", location: "12F South"},{seatNo: "12375", location: "12F South"}];
    self.table2_2 = [
      {seatNo: "12459", name : "aPaas", location: "12F South"},{seatNo: "12457", name : "aPaas",location: "12F South"},{seatNo: "12455", name : "aPaas",location: "12F South"},{seatNo: "12453",name : "IaaS-2", location: "12F South"},
      {seatNo: "12451", name : "IaaS-1",location: "12F South"},{seatNo: "12449",name : "IaaS-1", location: "12F South"},{seatNo: "12447", name : "IaaS-1",location: "12F South"},{seatNo: "12445", name : "IaaS-1",location: "12F South"}];
    self.table3_1 = [
      {seatNo: "12373", location: "12F South"},{seatNo: "12369", location: "12F South"},{seatNo: "12371", location: "12F South"},{seatNo: "12367", location: "12F South"},
      {seatNo: "12365", location: "12F South"},{seatNo: "12361", location: "12F South"},{seatNo: "12363", location: "12F South"},{seatNo: "12359", location: "12F South"}];
    self.table3_2 = [
      {seatNo: "A", location: "12F South"},{seatNo: "12441", location: "12F South"},{seatNo: "12439", location: "12F South"},{seatNo: "12437", location: "12F South"},
      {seatNo: "B", location: "12F South"},{seatNo: "12431", location: "12F South"},{seatNo: "12429", location: "12F South"},{seatNo: "12427", location: "12F South"}];
    self.table3_3 = [
      {seatNo: "12474", name : "IaaS-2",location: "12F South"},{seatNo: "C", location: "12F South"},{seatNo: "D", location: "12F South"},{seatNo: "E", location: "12F South"}
    ];
    self.table4_1 = [
      {seatNo: "12357", location: "12F South"},{seatNo: "12355", location: "12F South"},{seatNo: "12353", location: "12F South"},{seatNo: "12351", location: "12F South"},
      {seatNo: "12349", location: "12F South"},{seatNo: "12347", location: "12F South"}
    ];
    self.table4_2 = [
      {seatNo: "12415", location: "12F South"},{seatNo: "12417", location: "12F South"},{seatNo: "12419", location: "12F South"},{seatNo: "12421", location: "12F South"},
      {seatNo: "12425", location: "12F South"},{seatNo: "12423", location: "12F South"}
    ];
    self.table4_3 = [
      {seatNo: "F", location: "12F South"},
      {seatNo: "G", location: "12F South"}
    ];
    self.table5_1 = [
      {seatNo: "12345", location: "12F South"},{seatNo: "12343", location: "12F South"},{seatNo: "H", location: "12F South"}];
    self.table5_2 = [
      {seatNo: "12413", location: "12F South"},{seatNo: "12411", location: "12F South"},{seatNo: "12409", location: "12F South"},{seatNo: "12407", location: "12F South"}
        ];

        self.pictoChartItems1_1 = ko.observableArray(self.table1_1);  self.pictoChartItems1_2 = ko.observableArray(self.table1_2);
        self.pictoChartItems2_1 = ko.observableArray(self.table2_1);  self.pictoChartItems2_2 = ko.observableArray(self.table2_2);
        self.pictoChartItems3_1 = ko.observableArray(self.table3_1);  self.pictoChartItems3_2 = ko.observableArray(self.table3_2);
        self.pictoChartItems3_3 = ko.observableArray(self.table3_3);  self.pictoChartItems4_1 = ko.observableArray(self.table4_1);
        self.pictoChartItems4_2 = ko.observableArray(self.table4_2);  self.pictoChartItems4_3 = ko.observableArray(self.table4_3);
        self.pictoChartItems5_1 = ko.observableArray(self.table5_1);  self.pictoChartItems5_2 = ko.observableArray(self.table5_2);
        self.fullTable= [self.table1_1 , self.table1_2, self.table2_1, self.table2_2, self.table3_1, self.table3_2, self.table3_3 ,self.table4_1, self.table4_2, self.table4_3,  self.table5_1, self.table5_2];

    //query
    var baseUrl = "http://129.150.84.190:8080/v1/";
    var headers = {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
      'Authorization' : app.Authorization
    }

    // variable declaration ends

    self.legendSections = ko.observableArray([{items: [
      {text: "예약됨", color: "#fad55c", markerShape: "circle"},
      {text: "가능", color: "#267db3", markerShape: "circle"},
      {text: "불가능", color: "#9ccccc", markerShape: "circle"}
    ]}]);

    self.picto1Listener = function(event, ui) {
        if (ui['option'] == 'selection') {
          $('#currentText').html("선택한 좌석: <br/>");
          var items = "";
          if(ui['value']){
            for(var i = 0; i < ui['value'].length; i++){
              if(ui['value'][i])
              items += "    " + ui['value'][i] + "<br/>";
            }
            $('#currentText2').html(items);
            if (ui['value'].length == 0){$('#currentText').html("");$('#currentText2').html("");};
          }
        }
        //  console.log("ui", ui)
        self.clickedSeat = ui.value;

    }

    self.buttonClick = function(data, event){
      var reservationUrl = baseUrl+ "reservations/";

      var reqBody = {
        "seatNo" : self.clickedSeat[0],
        "email" :self.username(),
        "reservationDate" : currentDate,
        "startingTime" : startingTime,
        "endingTime" : endingTime
      }

      if(self.clickedSeat.length != 1) {
        alert("좌석을 선택한 후에 예약을 눌러주세요.");
        return;
      }
      if (self.fullSeatMap[self.clickedSeat].color != '#267db3') {
          alert("예약 가능 상태인 좌석을 선택 해 주세요.");
          return;
      }

      if (self.availableSeatByUser.length >=  1) {
          // console.log("self.availableSeatByUser!!!!!", self.availableSeatByUser)
          alert("선택하신 날짜에는 이미 다른 좌석에 예약을 하셨네요. 바꿔드릴께요.")
          var deleteReservationUrl = baseUrl + "reservations/" + self.availableSeatByUser[0].id ;

          $.ajax({
            type:"DELETE",
            headers : headers,
            url: deleteReservationUrl,
            data: "",
            processData: false,
            success: function(msg) {
              //console.log("msg ", msg);
            }
          });

      }

      $.ajax({
        type:"POST",
        headers : headers,
        url: reservationUrl,
        data: JSON.stringify(reqBody),
        processData: false,
        success: function(msg) {
          self.myReservation = msg;
          console.log("self.myReservation!!!", self.myReservation);
          console.log("self.availableSeatByUser", self.availableSeatByUser)

          alert("예약 되었어요! 즐거운 하루되세요.")

          self.updateAfterDateChanged();
        }
      });

      return true;
    }


        var count = 0;
        for(var outerIndex = 0; outerIndex < self.fullTable.length; outerIndex++){
          for (var index = 0 ; index < self.fullTable[outerIndex].length ; index++){
            var seat = self.fullTable[outerIndex][index];
            seat.id = seat.seatNo;
            seat.color = '#e2e0da';
            self.fullSeatMap[seat.seatNo] = seat;
        }
      }



      self.handleActivated = function(info) {
        //
        if(app.router.getState('dashboard').value){
            var routeState = app.router.getState('dashboard');
            var value = routeState.value;
          //  console.log("value " + value.settingTime);

            self.dateForCalender (value.settingTime);
            currentDate  =value.settingTime;
            startingTime = currentDate + "T09:00:00";
            endingTime = currentDate + "T18:01:45";
        }
        // self.pictoChartItems1_1 = ko.observableArray(self.table1_1);
        // self.pictoChartItems1_2 = ko.observableArray(self.table1_2);
        // self.pictoChartItems2_1 = ko.observableArray(self.table2_1);
        // self.pictoChartItems2_2 = ko.observableArray(self.table2_2);
        // self.pictoChartItems3_1 = ko.observableArray(self.table3_1);
        // self.pictoChartItems3_2 = ko.observableArray(self.table3_2);
        // self.pictoChartItems3_3 = ko.observableArray(self.table3_3);
        // self.pictoChartItems4_1 = ko.observableArray(self.table4_1);
        // self.pictoChartItems4_2 = ko.observableArray(self.table4_2);
        // self.pictoChartItems4_3 = ko.observableArray(self.table4_3);
        // self.pictoChartItems5_1 = ko.observableArray(self.table5_1);
        // self.pictoChartItems5_2 = ko.observableArray(self.table5_2);

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
          //self.username = self.app.userLogin;
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


      self.updateAfterDateChanged = function(event, ui){
      //  if ( ui.optionMetadata.readOnly == true) return;

        for(var outerIndex = 0; outerIndex < self.fullTable.length; outerIndex++){
          for (var index = 0 ; index < self.fullTable[outerIndex].length ; index++){
            self.fullTable[outerIndex][index].color = '#e2e0da';
        }
      }
        console.log("updateAfterDateChanged", event, ui);
        currentDate  = self.dateForCalender().split('T')[0];
        startingTime = currentDate + "T09:00:00";
        endingTime = currentDate + "T18:01:45";


        var availableSeatURL = baseUrl+ "reservations/findAvailableSeats?email=" + self.username() + "&startingTime="+ startingTime +"&endingTime=" + endingTime;
            console.log("availableSeat", availableSeatURL);

        $.ajax({
          type:"GET",
          headers : headers,
          url: availableSeatURL,
          data: "",
          processData: false,
          success: function(msg) {
            console.log("availableSeat", msg);


            self.availableSeat = msg;

            for(var i = 0; i < self.availableSeat.length; i ++){
              self.fullSeatMap[self.availableSeat[i].seatNo].color  = '#267db3';
            }

            var availableSeatByUserURL = baseUrl+ "reservations/findByUser?email=" +  self.username()+ "&startingTime="+ startingTime +"&endingTime=" + endingTime;
            $.ajax({
              type:"GET",
              headers : headers,
              url: availableSeatByUserURL,
              data: "",
              processData: false,
              success: function(msg) {
            //    console.log("availableSeatByUser", msg);

                  self.availableSeatByUser = msg;
                 if(self.availableSeatByUser.length != 0) {
                   for (var i = 0; i < self.availableSeatByUser.length; i++){
                      self.fullSeatMap[msg[i].seat.seatNo].color =  '#FFB6C1';
                   }
                 }
                 self.pictoChartItems1_1(self.table1_1);
                 self.pictoChartItems1_2(self.table1_2);
                 self.pictoChartItems2_1(self.table2_1);
                 self.pictoChartItems2_2(self.table2_2);
                 self.pictoChartItems3_1(self.table3_1);
                 self.pictoChartItems3_2(self.table3_2);
                 self.pictoChartItems3_3(self.table3_3);
                 self.pictoChartItems4_1(self.table4_1);
                 self.pictoChartItems4_2(self.table4_2);
                 self.pictoChartItems4_3(self.table4_3);
                 self.pictoChartItems5_1(self.table5_1);
                 self.pictoChartItems5_2(self.table5_2);
            }
            });

          },
          error: function(error) {
            console.log("error", error);
          }
        });

      //  event.preventDefault();
      }

      // Tooltip elem for data items

      var tooltipElem = document.createElement('div');
      tooltipElem.style.width = '150px';
      tooltipElem.style.height = '30px';

      // Add name and unit text
      var textDiv = document.createElement('div');
      textDiv.style.cssFloat = 'left';
      textDiv.style.padding = '10px 8px 10px 3px';
      tooltipElem.appendChild(textDiv);

      var nameText = document.createElement('span');
      nameText.style.fontWeight = 'bold';
      nameText.style.color = '#606060';
      textDiv.appendChild(nameText);

      textDiv.appendChild(document.createElement('br'));

      var unitText = document.createElement('span');
           unitText.style.fontStyle = 'italic';
           textDiv.appendChild(unitText);

      this.tooltipFunction = function(dataContext) {
        // Set a thick border for the data item tooltip
        dataContext.parentElement.style.borderWidth = "3px";
        nameText.textContent =  '좌석번호 : ' + dataContext.id;
        unitText.textContent = "Top Priority : " + dataContext.name;

        return tooltipElem;
      }

    }

    /*
    * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
    * each time the view is displayed.  Return an instance of the ViewModel if
    * only one instance of the ViewModel is needed.
    */
    return new DashboardViewModel();
  }
);
