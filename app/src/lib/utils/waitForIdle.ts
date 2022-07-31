const ric =
  window.requestIdleCallback ||
  function (cb) {
    var start = Date.now();
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1);
  };

export const waitForIdle = <T>(
  callback: (deadline: IdleDeadline) => T | Promise<T>,
  timeout?: number
) =>
  new Promise<T>((resolve) => {
    ric((dl) => resolve(callback(dl)), { timeout });
  });
