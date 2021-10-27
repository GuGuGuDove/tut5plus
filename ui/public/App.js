"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
// function jsonDateReviver(key, value) {
//   if (dateRegex.test(value)) return new Date(value);
//   return value;
// }
var DisplayFreeSlots = /*#__PURE__*/function (_React$Component) {
  _inherits(DisplayFreeSlots, _React$Component);

  var _super = _createSuper(DisplayFreeSlots);

  function DisplayFreeSlots() {
    _classCallCheck(this, DisplayFreeSlots);

    return _super.apply(this, arguments);
  }

  _createClass(DisplayFreeSlots, [{
    key: "render",
    value: function render() {
      var free = 25 - this.props.cusNum;
      return /*#__PURE__*/React.createElement("div", {
        className: "freeslot"
      }, "Free Slots: ", free);
    }
  }]);

  return DisplayFreeSlots;
}(React.Component);

function CustomerRow(props) {
  var customer = props.customer;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, customer.id), /*#__PURE__*/React.createElement("td", null, customer.name), /*#__PURE__*/React.createElement("td", null, customer.phone), /*#__PURE__*/React.createElement("td", null, customer.created));
}

function CustomerTable(props) {
  var customerRows = props.customers.map(function (customer) {
    return /*#__PURE__*/React.createElement(CustomerRow, {
      key: customer.id,
      customer: customer
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Phone"), /*#__PURE__*/React.createElement("th", null, "Time Stamp"))), /*#__PURE__*/React.createElement("tbody", null, customerRows));
}

var CustomerAdd = /*#__PURE__*/function (_React$Component2) {
  _inherits(CustomerAdd, _React$Component2);

  var _super2 = _createSuper(CustomerAdd);

  function CustomerAdd() {
    var _this;

    _classCallCheck(this, CustomerAdd);

    _this = _super2.call(this);
    _this.handleAdd = _this.handleAdd.bind(_assertThisInitialized(_this));
    _this.handleDelete = _this.handleDelete.bind(_assertThisInitialized(_this));
    _this.handleFind = _this.handleFind.bind(_assertThisInitialized(_this));
    _this.handleBack = _this.handleBack.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CustomerAdd, [{
    key: "handleAdd",
    value: function handleAdd(e) {
      e.preventDefault();
      var form = document.forms.customerEdit;
      var customer = {
        name: form.name.value,
        phone: form.phone.value
      };
      console.log(customer);
      this.props.createCustomer(customer);
      form.name.value = "";
      form.phone.value = "";
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(e) {
      e.preventDefault();
      var form = document.forms.customerEdit;
      var customer = {
        name: form.name.value,
        phone: form.phone.value
      };
      this.props.deleteCustomer(customer);
      form.name.value = "";
      form.phone.value = "";
    }
  }, {
    key: "handleFind",
    value: function handleFind(e) {
      e.preventDefault();
      var form = document.forms.customerEdit;
      var customer = {
        name: form.name.value,
        phone: form.phone.value
      };
      this.props.findCustomer(customer);
      form.name.value = "";
      form.phone.value = "";
    }
  }, {
    key: "handleBack",
    value: function handleBack(e) {
      e.preventDefault();
      this.props.back();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
        className: "infoForm",
        name: "customerEdit"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "name"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "phone",
        placeholder: "phone"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
        className: "button",
        onClick: this.handleAdd
      }, "Add"), /*#__PURE__*/React.createElement("button", {
        className: "button",
        onClick: this.handleDelete
      }, "Delete"), /*#__PURE__*/React.createElement("button", {
        className: "button",
        onClick: this.handleFind
      }, "Find"), /*#__PURE__*/React.createElement("button", {
        className: "button",
        onClick: this.handleBack
      }, "Back")));
    }
  }]);

  return CustomerAdd;
}(React.Component);

function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}

function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args5 = arguments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            variables = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
            _context5.prev = 1;
            _context5.next = 4;
            return fetch('/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 4:
            response = _context5.sent;
            _context5.next = 7;
            return response.text();

          case 7:
            body = _context5.sent;
            result = JSON.parse(body);

            if (result.errors) {
              error = result.errors[0];

              if (error.extensions.code == 'BAD_USER_INPUT') {
                details = error.extensions.exception.errors.join('\n ');
                alert("".concat(error.message, ":\n ").concat(details));
              } else {
                alert("".concat(error.extensions.code, ": ").concat(error.message));
              }
            }

            return _context5.abrupt("return", result.data);

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](1);
            alert("Error in sending data to server: ".concat(_context5.t0.message, ". The field phone must be a number."));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 13]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

var CustomerList = /*#__PURE__*/function (_React$Component3) {
  _inherits(CustomerList, _React$Component3);

  var _super3 = _createSuper(CustomerList);

  function CustomerList() {
    var _this2;

    _classCallCheck(this, CustomerList);

    _this2 = _super3.call(this);
    _this2.state = {
      customers: [],
      customerNumber: 0
    };
    _this2.createCustomer = _this2.createCustomer.bind(_assertThisInitialized(_this2));
    _this2.deleteCustomer = _this2.deleteCustomer.bind(_assertThisInitialized(_this2));
    _this2.findCustomer = _this2.findCustomer.bind(_assertThisInitialized(_this2));
    _this2.back = _this2.back.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(CustomerList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query {\n      customerList {\n        id name phone created\n      }\n    }";
                _context.next = 3;
                return graphQLFetch(query);

              case 3:
                data = _context.sent;

                if (data) {
                  this.setState({
                    customers: data.customerList,
                    customerNumber: data.customerList.length
                  });
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "createCustomer",
    value: function () {
      var _createCustomer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(customer) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "mutation customerAdd($customer: CustomerInputs!) {\n      customerAdd(customer: $customer) {\n        id\n      }\n    }";
                _context2.next = 3;
                return graphQLFetch(query, {
                  customer: customer
                });

              case 3:
                data = _context2.sent;
                console.log(data);

                if (data) {
                  this.loadData();
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createCustomer(_x2) {
        return _createCustomer.apply(this, arguments);
      }

      return createCustomer;
    }()
  }, {
    key: "deleteCustomer",
    value: function () {
      var _deleteCustomer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(customer) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "mutation customerDelete($customer: CustomerInputs!) {\n      customerDelete(customer: $customer)\n    }";
                _context3.next = 3;
                return graphQLFetch(query, {
                  customer: customer
                });

              case 3:
                data = _context3.sent;
                console.log(data);
                this.loadData();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteCustomer(_x3) {
        return _deleteCustomer.apply(this, arguments);
      }

      return deleteCustomer;
    }()
  }, {
    key: "findCustomer",
    value: function () {
      var _findCustomer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(customer) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = "query customerFind($customer: CustomerInputs!) {\n      customerFind(customer: $customer){\n        id\n        name\n        phone\n        created\n      }\n      \n    }";
                _context4.next = 3;
                return graphQLFetch(query, {
                  customer: customer
                });

              case 3:
                data = _context4.sent;
                console.log(data);

                if (data) {
                  this.setState({
                    customers: data.customerFind
                  });
                }

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function findCustomer(_x4) {
        return _findCustomer.apply(this, arguments);
      }

      return findCustomer;
    }()
  }, {
    key: "back",
    value: function back() {
      this.loadData();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "head"
      }, "Hotel California International"), /*#__PURE__*/React.createElement(DisplayFreeSlots, {
        className: "free",
        cusNum: this.state.customerNumber
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(CustomerTable, {
        customers: this.state.customers
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(CustomerAdd, {
        createCustomer: this.createCustomer,
        deleteCustomer: this.deleteCustomer,
        findCustomer: this.findCustomer,
        back: this.back
      }));
    }
  }]);

  return CustomerList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(CustomerList, null);
ReactDOM.render(element, document.getElementById('contents'));