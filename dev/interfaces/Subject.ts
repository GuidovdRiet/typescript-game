interface Subject {
  observers: Observer[];
  subscribe(observer: Observer): void;
} 