/* @flow */
import * as React from 'react'

/**
 * Worker which is going to run at consumer's call
 */
export type Worker = {
  run: Function,
  stop: Function,
}

/**
 * Current representation of the Worker run state
 */
export type AsyncState = {|
  isRunning: boolean,
  result: ?any,
  error: ?any,
|}

/**
 * Async Effect renderer props
 */
export type AsyncEffectRendererProps = {
  ...AsyncState,
  run: Function,
  stop: Function,
  reset: Function,
}

/**
 * A function to return a Worker bound to resolve and reject callbacks
 */
export type workerFactory = (resolve: Function, reject: Function) => Worker

type Props = {
  /**
   * Whether current worker should stop when new Worker is going to be created
   */
  concurrentWorkers: boolean,

  /**
   * Whether worker should stop before a new run
   */
  concurrentRuns: boolean,

  /**
   * Whether worker should stop after the unmount
   */
  stopOnUnmount: boolean,

  /**
   * A function to return a Worker bound to resolve and reject callbacks
   */
  createWorker: workerFactory,

  /**
   * Called whenever state is changed
   */
  onChange?: (state: AsyncState) => void,

  /**
   * The UI to be rendered on each state change
   */
  render?: AsyncEffectRendererProps => React.Node,

  /**
   * Alias for render, for convenience
   */
  children?: AsyncEffectRendererProps => React.Node,
}

const InitialState = {
  isRunning: false,
  result: undefined,
  error: undefined,
}

export default class AsyncEffect extends React.Component<Props, AsyncState> {
  static defaultProps = {
    // Most of time shouldn't be there two workers at the same time
    concurrentWorkers: false,

    // Most of time shouldn't be there two tasks at the same time
    concurrentRuns: false,

    // Most of time, none is interested in a side-effect if none is listening
    stopOnUnmount: true,
  }

  // A function to dispose worker's bind
  unbindWorker: Function

  // the current worker
  worker: Worker

  state = InitialState

  componentWillMount() {
    this.bindWorker(this.props.createWorker)
  }

  componentWillReceiveProps(props: Props) {
    if (props.createWorker !== this.props.createWorker) {
      if (!props.concurrentWorkers) {
        if (!props.concurrentRuns) {
          this.stop()
        }

        this.unbindWorker()
      }

      this.bindWorker(props.createWorker)
    }
  }

  componentWillUnmount() {
    if (this.props.stopOnUnmount) {
      this.worker.stop()
    }

    this.unbindWorker()
  }

  didChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state)
    }
  }

  /**
   * handle async method's success callback
   *
   * @param {any} result the result of the async effect
   */
  resolve = (result: any = true) => {
    this.setState(
      {
        isRunning: false,
        result,
        error: undefined,
      },
      this.didChange,
    )
  }

  /**
   * handle worker run's failure
   *
   * @param {any} error a error that occured during the effect
   */
  reject = (error: any = true) => {
    this.setState(
      {
        isRunning: false,
        error,
      },
      this.didChange,
    )
  }

  /**
   * Runs worker's run with `...args`, stopping any concurrent runs
   * they are not allowed
   *
   * @param {any} args arguments to call `run` with
   */
  run = (...args: Array<any>) => {
    this.setState(({isRunning, ...state}, {concurrentRuns}) => {
      if (isRunning && !concurrentRuns && this.worker.stop) {
        this.worker.stop()
      }

      const disposalReturned = this.worker.run(...args)
      if (!this.worker.stop) {
        this.worker.stop = disposalReturned
      }

      return {...state, isRunning: true}
    }, this.didChange)
  }

  /**
   * Stops worker's run
   */
  stop = () => {
    this.setState(({isRunning, ...state}) => {
      if (isRunning) {
        this.worker.stop()
      }

      return {
        ...state,
        isRunning: false,
      }
    }, this.didChange)
  }

  /**
   * Stops any run of the current worker.
   */
  reset = () => {
    this.setState(({isRunning}) => {
      if (isRunning) {
        this.worker.stop()
      }

      return InitialState
    }, this.didChange)
  }

  /**
   * Creates and bind worker to this listener
   *
   * @param {workerFactory} createWorker {@see @prop createWorker}
   */
  bindWorker = (createWorker: workerFactory) => {
    let resolve = this.resolve
    let reject = this.reject

    this.unbindWorker = () => {
      resolve = () => {}
      reject = () => {}
    }

    this.worker = createWorker(
      (...args) => resolve(...args),
      (...args) => reject(...args),
    )

    if (typeof this.worker === 'function') {
      this.worker = {
        run: this.worker,
      }
    }
  }

  render() {
    const props = {
      ...this.state,
      run: this.run,
      stop: this.stop,
      reset: this.reset,
    }

    if (typeof this.props.render === 'function') return this.props.render(props)

    return this.props.children(props)
  }
}
