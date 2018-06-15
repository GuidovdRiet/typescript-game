interface Subject {
  observers: Observer[];
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
} 