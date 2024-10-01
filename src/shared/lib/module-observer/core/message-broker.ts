import { Observable } from "./observer";

export abstract class MessageBroker extends Observable {
  protected constructor() {
    super();
    window.addEventListener("message", this.onMessageReceive.bind(this));
  }

  protected getListenerKey(data: IData): string {
    const { channelName, methodName, moduleId } = data;
    const postfix = channelName + "_" + methodName;

    if (moduleId) {
      return moduleId + "_" + postfix;
    }

    return postfix;
  }

  protected onMessageReceive(event: MessageEvent): void {
    console.log(event);
  }
}

interface IData {
  channelName: string;
  methodName: string;
  moduleId?: string;
}
