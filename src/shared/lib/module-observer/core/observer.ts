export class Observable {
  private listeners: Map<string, ((args?: Record<string, unknown>) => void)[]>;

  constructor() {
    this.listeners = new Map();
  }

  _subscribe(key: string, listener: (args?: Record<string, unknown>) => void) {
    const listeners = this.listeners.get(key) || [];

    listeners.push(listener);
    this.listeners.set(key, listeners);
  }

  _unsubscribe(
    key: string,
    listener: (args?: Record<string, unknown>) => void
  ) {
    const listeners = this.listeners.get(key);

    if (listeners) {
      this.listeners.set(
        key,
        listeners.filter((item) => item != listener)
      );
    }
  }

  _notify(key: string, obj: Record<string, unknown>) {
    const listeners = this.listeners.get(key);

    if (listeners) {
      listeners.forEach((listener) => listener(obj));
    }
  }

  checkSubscribeExists(
    key: string,
    listener: (args?: Record<string, unknown>) => void
  ): boolean {
    const listeners = this.listeners.get(key) || [];

    return listeners.indexOf(listener) !== -1;
  }
}
