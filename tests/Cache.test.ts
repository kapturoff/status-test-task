import { cache } from '../src/helpers/cache'

describe('Cache function (Memo)', () => {
    it('Returns a decorated function', () => {
        const fnc = (a) => a

        expect(cache(fnc)).toBeInstanceOf(Function)
    })

    it('Returns the same result as a base function', () => {
        const square = (a) => a ** 2

        expect(cache(square)(2)).toBe(square(2))
    })

    it('Returns different values based on argument type', () => {
        /**
         * @returns A cube of the value if the value is a number, square of the value if the value is a string
         */
        const squareOrCube = (value: number | string) =>
            Number.isInteger(value)
                ? Math.pow(Number(value), 3)
                : Math.pow(value as number, 2)

        const memoizedSquareOrCube = cache(squareOrCube)

        expect(memoizedSquareOrCube(2)).toBe(squareOrCube(2))
        expect(memoizedSquareOrCube('2')).toBe(squareOrCube('2'))

        // Running again, but now previous answers are cached

        expect(memoizedSquareOrCube(2)).toBe(8)
        expect(memoizedSquareOrCube('2')).toBe(4)
    })

    it('Caches results based on one argument (collision)', () => {
        const fnc = (...args) => args,
            cachedFnc = cache(fnc)

        /**
         * The following returned values of the decorated function
         * will be same, because it caches results based on the first
         * argument of the function
         */

        expect(cachedFnc(2, 3)).toStrictEqual(cachedFnc(2, 2))
        expect(cachedFnc(2, 3)).toStrictEqual(cachedFnc(2, 2, 2, 2, 3, 4))
    })

    it('Allows to choose which one of arguments will be a key of cache', () => {
        const fnc = (...args) => args,
            cachedFnc = cache(fnc, 1) // An index of the cache key argument is provided

        /**
         * The following returned values of the decorated function
         * will be same, because it caches results based on the **second**
         * argument of the function
         */

        expect(cachedFnc(1, 3)).toStrictEqual(cachedFnc(Infinity, 3))
        expect(cachedFnc(undefined, 3)).toStrictEqual(cachedFnc(2, 3, 2, 2, 4))
    })
})
