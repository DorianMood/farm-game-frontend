import { MessageBroker } from "./core/message-broker";
import { uuidv4 } from "./utils/uuidv4";

type subscriptionKey = {
  key: string;
  callback: (args?: Record<string, unknown>) => void;
};

type targetOriginType = "*" | "/";

export class ModuleObserver extends MessageBroker {
  private static _instance: ModuleObserver;

  private broadcastChannelName: string = "broadcast";

  private requestIdSet: Set<string>;

  private broadcastRequestIdSet: Set<string>;

  private eventSubscriptions: Map<subscriptionKey, string>;

  private targetOrigin: targetOriginType;

  protected constructor(framework?: string) {
    super();
    this.requestIdSet = new Set();
    this.broadcastRequestIdSet = new Set();
    this.eventSubscriptions = new Map();
    this.targetOrigin = framework === "flutter" ? "/" : "*";
  }

  static getInstance(framework?: string): ModuleObserver {
    if (!this._instance) {
      this._instance = new ModuleObserver(framework);
    }

    return this._instance;
  }

  subscribe(
    channelName: string,
    methodName: string,
    callback: unknown
  ): ModuleObserver {
    const key: string = this.getListenerKey({ channelName, methodName });

    this._subscribe(key, callback as (args?: Record<string, unknown>) => void);

    return this;
  }

  unsubscribe(
    channelName: string,
    methodName: string,
    callback: unknown
  ): ModuleObserver {
    const key: string = this.getListenerKey({ channelName, methodName });

    this._unsubscribe(
      key,
      callback as (args?: Record<string, unknown>) => void
    );

    return this;
  }

  subscribeEvent(
    moduleId: string,
    methodName: string,
    callback: unknown
  ): void {
    const channelName: string = this.broadcastChannelName;
    const key: string = this.getListenerKey({ channelName, methodName });
    const callbackAsFn = callback as (args?: Record<string, unknown>) => void;

    if (this.checkSubscribeExists(key, callbackAsFn)) {
      return;
    }

    this.subscribe(channelName, methodName, callback);

    const requestId: string = uuidv4();
    const data: {
      moduleId: string;
      channelName: string;
      methodName: string;
      requestId: string;
    } = {
      moduleId,
      channelName,
      methodName,
      requestId,
    };

    this.broadcastRequestIdSet.add(requestId);
    this.eventSubscriptions.set(
      {
        key,
        callback: callbackAsFn,
      },
      requestId
    );
    window.parent.postMessage(JSON.stringify(data), this.targetOrigin);
  }

  unsubscribeEvent(
    moduleId: string,
    methodName: string,
    callback: unknown
  ): void {
    const channelName: string = this.broadcastChannelName;
    const key: string = this.getListenerKey({ channelName, methodName });
    const callbackAsFn = callback as (args?: Record<string, unknown>) => void;
    const subscriptionKey: subscriptionKey = { key, callback: callbackAsFn };

    this._unsubscribe(key, callbackAsFn);
    const requestId = this.eventSubscriptions.get(subscriptionKey);

    this.eventSubscriptions.delete(subscriptionKey);
    if (!requestId) {
      return;
    }

    const data: {
      moduleId: string;
      channelName: string;
      methodName: string;
      requestId: string;
    } = {
      moduleId,
      channelName,
      methodName,
      requestId,
    };

    window.parent.postMessage(JSON.stringify(data), this.targetOrigin);
  }

  sendRequestToParent(
    moduleId: string,
    channelName: string,
    methodName: string,
    args?: unknown
  ): void {
    const requestId: string = uuidv4();
    const data: {
      moduleId: string;
      channelName: string;
      methodName: string;
      args?: unknown;
      requestId: string;
    } = {
      moduleId,
      channelName,
      methodName,
      args,
      requestId,
    };

    this.requestIdSet.add(requestId);
    window.parent.postMessage(JSON.stringify(data), this.targetOrigin);
  }

  onMessageReceive(event: MessageEvent): void {
    const data: string = event.data;

    if (typeof data !== "string") {
      return;
    }

    let dataObj: Record<string, string>;

    try {
      dataObj = JSON.parse(data);
    } catch {
      return;
    }

    const { channelName, methodName, result, error, requestId } = dataObj;

    if (this.requestIdSet.has(requestId)) {
      this.requestIdSet.delete(requestId);
    } else if (!this.broadcastRequestIdSet.has(requestId)) {
      return;
    }

    this.requestIdSet.delete(requestId);
    const key: string = this.getListenerKey({ channelName, methodName });

    this._notify(key, { result, error });
  }
}
