import { useEffect } from "react";

let options = {
  rootMargin: "40px",
  threshold: 0.2
}

let observer: IntersectionObserver | null = null

const observerCb = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  entries.forEach(entry => {
    const { inCb, outCb } = observervables.get(entry.target) || { inCb: () => { }, outCb: () => { } }
    entry.isIntersecting ? inCb(entry) : outCb(entry)
  })
}

const observervables = new Map();

type returnType = [(element: HTMLElement, inCb?: (entry: IntersectionObserverEntry) => void, outCb?: (entry: IntersectionObserverEntry) => void) => void, (element: HTMLElement) => void,]

const useIntersectionObserver = (): returnType => {

  useEffect(() => {
    observer = new IntersectionObserver(observerCb, options);
  })
  const observe = (element: HTMLElement, inCb?: (entry: IntersectionObserverEntry) => void, outCb?: (entry: IntersectionObserverEntry) => void) => {
    observervables.set(element, { inCb, outCb })
    observer!.observe(element)
  }
  const unObserve = (element: HTMLElement) => {
    observervables.delete(element)
  }
  return [observe, unObserve]
}

export default useIntersectionObserver