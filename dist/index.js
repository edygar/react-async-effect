"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Worker which is going to run at consumer's call
 */


/**
 * Current representation of the Worker run state
 */


/**
 * A function to return a Worker bound to resolve and reject callbacks
 */
var InitialState = {
  isRunning: false,
  result: undefined,
  error: undefined
};

var AsyncEffect = function (_React$Component) {
  _inherits(AsyncEffect, _React$Component);

  function AsyncEffect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AsyncEffect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AsyncEffect.__proto__ || Object.getPrototypeOf(AsyncEffect)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  // A function to dispose worker's bind


  // the current worker


  _createClass(AsyncEffect, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.bindWorker(this.props.createWorker);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (props.createWorker !== this.props.createWorker) {
        if (!props.concurrentWorkers) {
          if (!props.concurrentRuns) {
            this.stop();
          }

          this.unbindWorker();
        }

        this.bindWorker(props.createWorker);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.stopOnUnmount) {
        this.worker.stop();
      }

      this.unbindWorker();
    }

    /**
     * handle async method's success callback
     *
     * @param {any} result the result of the async effect
     */


    /**
     * handle worker run's failure
     *
     * @param {any} error a error that occured during the effect
     */


    /**
     * Runs worker's run with `...args`, stopping any concurrent runs
     * they are not allowed
     *
     * @param {any} args arguments to call `run` with
     */


    /**
     * Stops worker's run
     */


    /**
     * Stops any run of the current worker.
     */


    /**
     * Creates and bind worker to this listener
     *
     * @param {workerFactory} createWorker {@see @prop createWorker}
     */

  }, {
    key: "render",
    value: function render() {
      return this.props.render(_extends({}, this.state, {
        run: this.run,
        stop: this.stop,
        reset: this.reset
      }));
    }
  }]);

  return AsyncEffect;
}(React.Component);

AsyncEffect.defaultProps = {
  // Most of time shouldn't be there two workers at the same time
  concurrentWorkers: false,

  // Most of time shouldn't be there two tasks at the same time
  concurrentRuns: false,

  // Most of time, none is interested in a side-effect if none is listening
  stopOnUnmount: true
};

var _initialiseProps = function () {
  var _this2 = this;

  this.state = InitialState;

  this.didChange = function () {
    if (_this2.props.onChange) {
      _this2.props.onChange(_this2.state);
    }
  };

  this.resolve = function () {
    var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    _this2.setState({
      isRunning: false,
      result,
      error: undefined
    }, _this2.didChange);
  };

  this.reject = function () {
    var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    _this2.setState({
      isRunning: false,
      error
    }, _this2.didChange);
  };

  this.run = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2.setState(function (_ref2, _ref3) {
      var _worker;

      var concurrentRuns = _ref3.concurrentRuns;

      var isRunning = _ref2.isRunning,
          state = _objectWithoutProperties(_ref2, ["isRunning"]);

      if (isRunning && !concurrentRuns) {
        _this2.worker.stop();
      }

      (_worker = _this2.worker).run.apply(_worker, args);

      return _extends({}, state, { isRunning: true });
    }, _this2.didChange);
  };

  this.stop = function () {
    _this2.setState(function (_ref4) {
      var isRunning = _ref4.isRunning,
          state = _objectWithoutProperties(_ref4, ["isRunning"]);

      if (isRunning) {
        _this2.worker.stop();
      }

      return _extends({}, state, {
        isRunning: false
      });
    }, _this2.didChange);
  };

  this.reset = function () {
    _this2.setState(function (_ref5) {
      var isRunning = _ref5.isRunning;

      if (isRunning) {
        _this2.worker.stop();
      }

      return InitialState;
    }, _this2.didChange);
  };

  this.bindWorker = function (createWorker) {
    var resolve = _this2.resolve;
    var reject = _this2.reject;

    _this2.unbindWorker = function () {
      resolve = function () {};
      reject = function () {};
    };

    _this2.worker = createWorker(function () {
      return resolve.apply(undefined, arguments);
    }, function () {
      return reject.apply(undefined, arguments);
    });
  };
};

exports.default = AsyncEffect;