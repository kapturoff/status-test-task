export function CacheDecorator() {
    const hash = new Map()

    return <T>(target: T, property: string, descriptor: PropertyDescriptor) => {
        const originalFunction = descriptor.value

        descriptor.value = function (...args: (string | number)[]) {
            const key = property + args.join(''),
                cachedResult = hash.get(key)

            if (!cachedResult) {
                const methodResult = originalFunction.apply(this, args)
                hash.set(key, methodResult)
                return methodResult
            }

            return cachedResult
        }
    }
}

export function cache<T extends (...unknown) => any>(
    func: T,
    keyIndex: number = 0
) {
    const cache = new Map<Parameters<T>[typeof keyIndex], ReturnType<T>>()

    return (...args: Parameters<T>) => {
        let cached = cache.get(args[keyIndex])

        if (!cached) {
            cache.set(args[keyIndex], func(...args))
            cached = cache.get(args[keyIndex])
        }

        return cached
    }
}
