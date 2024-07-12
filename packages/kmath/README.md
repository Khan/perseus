# @khanacademy/kmath

Javascript Numeric Math Utilities

## Overview

kmath is a collection of Javascript utility functions for performing
numeric (rather than algebraic) math that isn't built into Javascript,
especially geometric calculations.

For example, some computations are easy to express using vectors, but
difficult to express in terms of raw real number variables. kmath lets
you write vector-, point-, line-, or ray-based math naturally, and
also has some real number utility methods that might be useful if
you're writing a math-heavy Javascript application.

kmath emphasizes simplicity and interoperability in the interfaces
provided. All kmath interfaces use standard Javascript types, usually
numbers, arrays of numbers, or arrays of arrays of numbers. This means
interoping with other systems (other libraries, or sending kmath types
over json) is easy, but kmath doesn't have it's own object-oriented
types, which may be inconvenient (for example, in debugging, you'll
just see Arrays rather than, for example, Vectors).

kmath also focuses on being a high quality library of a few functions,
rather than a large library of many functions which are less unified.

kmath emphasizes simplicity in design over performance, when those two
are at odds. If you are writing code in an inner loop in an allocation-
sensitive environment, kmath might not be for you. Each method is
pure and allocates a new array for the return value.

## Getting started

After cloning or downloading kmath, you can install it by running
`npm install` or `make install`.

To play around with the available interfaces, you can load kmath
into a Node repl:

```js
import {vector} from "@khanacademy/kmath";
vector.add([1, 2], [3, 4]) // [4, 6]
```

## Usage overview

kmath has 5 basic types:

-   `number`
-   `vector`
-   `point`
-   `ray`
-   `line`

Each has its own representation:

-   `number`: a js number (i.e. `5`)
-   `vector`: a js array of numbers (i.e. `[5, 6]`)
-   `point`: a js array of numbers (i.e. `[5, 6]`)
-   `ray`: a js array of two points (i.e. `[[5, 6], [1, 2]]`)
-   `line`: a js array of two points (i.e. `[[5, 6], [1, 2]]`)

kmath functions usually take an argument of the corresponding type as
the first parameter, and other parameters afterwards. For example, to
rotate the point `[1, 1]` by 90 degrees around `[0, 0]`, one might use:

```js
point.rotateDeg([1, 1], 90, [0, 0])
```

Documentation for specific functions for each type is provided below.

## number

#### `number.DEFAULT_TOLERANCE === 1e-9`

The default tolerance to kmath functions.

#### `number.EPSILON === Math.pow(2, -42)`

A small number. Not machine epsilon, but a reasonable amount of error
more than generally accrued by doing repeated floating point math.

#### `number.is(maybeANumber)`

Returns true if the argument is a javascript number.

#### `number.equal(number1, number2, [tolerance])`

Compares whether number1 and number2 are equal to each other, within
a difference of tolerance, which defaults to `number.DEFAULT_TOLERANCE`.

#### `number.sign(aNumber, [tolerance])`

Returns 0 if the number is equal to 0 within `tolerance`, or -1 if the
number is less than 0, or 1 if the number is greater than 0.

#### `number.isInteger(aNumber, tolerance)`

Returns true if `aNumber` is within `tolerance` difference of an integer.
`tolerance` defaults to `number.DEFAULT_TOLERANCE`.

#### `number.round(aNumber, precision)`

Rounds `aNumber` to `precision` decimal places.

#### `number.roundTo(aNumber, increment)`

Rounds `aNumber` to the nearest `increment`.

For example, `number.roundTo(1.4, 0.5)` would return `1.5`

#### `number.floorTo(aNumber, increment)`

Returns the nearest multiple of `increment` that is no greater than
`aNumber`.

#### `number.ceilTo(aNumber, increment)`

Returns the nearest multiple of `increment` that is no smaller than
`aNumber`.

#### `number.toFraction(decimal, [tolerance], [maxDenominator])`

Returns an array containing two elements, `[n, d]`, a numerator and
denominator representing a fraction `n/d` that is within `tolerance`
of `decimal`.

If no fraction with a denominator less than or equal to `maxDenominator`
is found, `[decimal, 1]` is returned.

`tolerance` defaults to `number.EPSILON`. `maxDenominator` defaults to
`1000`.

## vector

#### `vector.is(maybeAVector, [dimension])`

Returns true if `maybeAVector` is an array of numbers. If `dimension` is specified,
only returns true if `maybeAVector` is a vector with dimension `dimension`.

#### `vector.equal(v1, v2, [tolerance])`

Returns true if `v1` and `v2` are equal within `tolerance`. If `tolerance`
is not specified, `number.DEFAULT_TOLERANCE` is used. Each dimension
is compared individually, rather than comparing length and direction.

If `v1` and `v2` have different lengths, this function returns `false`.

```js
vector.equal([1, 2], [1, 3])
=> false
vector.equal([1, 2], [1, 2, 3])
=> false
vector.equal([1, 2], [1, 2])
=> true
```

#### `vector.codirectional(v1, v2, [tolerance])`

Returns true if `v1` and `v2` have the same direction within `tolerance`.
If `tolerance` is unspecified, `number.DEFAULT_TOLERANCE` is used.
Note that tolerance is checked after normalization.

If `v1` and `v2` are different lengths, this function returns `false`,
regardless of whether they are codirectional in the existing dimensions.

This function defines the zero-vector as trivially codirectional with
every vector.

```js
vector.codirectional([1, 2], [2, 4])
=> true
vector.codirectinoal([1, 2], [0, 0])
=> true
vector.codirectional([1, 2], [1, 2, 0])
=> false
vector.codirectional([1, 2], [-2, -4])
=> false
```

#### `vector.colinear(v1, v2, [tolerance])`

Returns true if `v1` and `v2` lie along the same line, regardless of
direction. This is equivalent to either `v1` and `v2` being codirectional,
or `v1` and `-v2` being codirectional, or whether there is some
`scaleFactor` such that `vector.equal(vector.scale(v1, scaleFactor), v2)`
is true.

```js
kmath.vector.colinear([1, 2], [-2, -4])
=> true
```

#### `vector.normalize(v)`

Scales the cartesian vector `v` to be `1` unit long.

#### `vector.length(v)`

Returns the length of the cartesian vector `v`.

#### `vector.dot(v1, v2)`

Returns the dot product of cartesian vectors `v1` and `v2`.

#### `vector.add(*vectors)`

Adds multiple cartesian vectors together.

```js
kmath.vector.add([1, 2], [3, 4])
=> [4, 6]
```

#### `vector.subtract(v1, v2)`

Subtracts the cartesian vector `v2` from the cartesian vector `v1`.

```js
kmath.vector.subtract([4, 6], [1, 2])
=> [3, 4]
```

#### `vector.negate(v)`

Negates the cartesian vector `v`. This has the same effect as scaling
`v` by `-1` or reversing the direction of `v`.

#### `vector.scale(v, scalar)`

Scales the cartesian vector `v` by `scalar`.

```js
kmath.vector.scale([1, 2], 2)
=> [2, 4]
```

#### `vector.polarRadFromCart(v)`

Returns a polar vector `[length, angle]` from the two-dimensional cartesian
vector `v`, where `angle` is measured in radians.

```js
kmath.vector.polarRadFromCart([1, 1])
=> [1.4142135623730951, 0.7853981633974483]
```

#### `vector.polarDegFromCart(v)`

Returns a polar vector `[length, angle]` from the two-dimensional cartesian
vector `v`, where `angle` is measured in degrees.

```js
kmath.vector.polarDegFromCart([0, 2])
=> [2, 90]
```

#### `vector.cartFromPolarRad(polar)` or `vector.cartFromPolarRad(length, angle)`

Returns a two-dimensional cartesian vector from the polar vector input,
where the input angle is measured in radians.

```js
kmath.vector.cartFromPolarRad([2, Math.PI])
=> [-2, 0]  // Note: a very small nonzero number is actually returned here,
            // due to numerical inaccuracy.
kmath.vector.cartFromPolarRad(Math.pow(2, 0.5), Math.PI/4)
=> [1, 1]
```

#### `vector.cartFromPolarDeg(polar)` or `vector.cartFromPolarDeg(length, angle)`

Returns a two-dimensional cartesian vector from the polar vector input,
where the input angle is measured in degrees.

```js
kmath.vector.cartFromPolarRad([2, 90])
=> [-2, 0]  // Note: a very small nonzero number is actually returned here,
            // due to numerical inaccuracy.
kmath.vector.cartFromPolarRad(Math.pow(2, 0.5), 45)
=> [1, 1]
```

#### `vector.rotateRad(v, angle)`

Returns the rotation of the cartesian vector `v` by `angle` radians.

#### `vector.rotateDeg(v, angle)`

Returns the rotation of the cartesian vector `v` by `angle` degrees.

#### `vector.angleRad(v1, v2)`

Returns the angle between the directions of cartesian vectors
`v1` and `v2` in radians.

#### `vector.angleDeg(v1, v2)`

Returns the angle between the directions of cartesian vectors
`v1` and `v2` in radians.

#### `vector.projection(v1, v2)`

Returns the projection of `v1` along the direction of `v2`

#### `vector.round(v, precision)`

Rounds each dimension of `v` to `precision` decimal places.

#### `vector.roundTo(v, increment)`

Rounds each dimension of `v` to the nearest `increment`.

#### `vector.floorTo(v, increment)`

Floors each dimension of `v` to the nearest `increment`.

#### `vector.ceilTo(v, increment)`

Ceils each dimension of `v` to the nearest `increment`.

## kmath.point

#### `point.is(maybeAPoint, [length])`

Returns true if `maybeAPoint` is an array of numbers. If length is specified,
only returns true if `maybeAPoint` is a point of dimension `length`.

#### `point.equal(p1, p2, [tolerance])`

Returns true if `p1` and `p2` are equal within `tolerance`. If `tolerance`
is not specified, `kmath.number.DEFAULT_TOLERANCE` is used. Each dimension
is compared individually.

If `p1` and `p2` have different lengths, this function returns `false`.

```js
kmath.point.equal([1, 2], [1, 3])
=> false
kmath.point.equal([1, 2], [1, 2, 3])
=> false
kmath.point.equal([1, 2], [1, 2])
=> true
```

#### `point.addVector(p, *vectors)` or `point.addVectors(p, *vectors)`

Returns the point created by adding the cartesian vectors `*vectors`
to the cartesian point `p`.

#### `point.subtractVector(p, v)`

Returns the point created by subtracting the cartesian vectors `v`
to the cartesian point `p`.

#### `point.distanceToPoint(p1, p2)`

Returns the distance between `p1` and `p2`.

#### `point.distanceToLine(p, theLine)`

Returns the distance between `p` and the line `theLine`.

For example, to find the distance from the origin to the
`y = 5` line, one could write:

```js
kmath.point.distanceToLine([0, 0], [[-1, 5], [1, 5]])
=> 5
```

#### `point.reflectOverLine(p, theLine)`

Returns the reflection of `p` over the line `theLine`.

For example, to reflect the origin over the line `y = 5`,
one could write:

```js
kmath.point.reflectOverLine([0, 0], [[-1, 5], [1, 5]])
=> [0, 10]
```

#### `point.compare(p1, p2, [equalityTolerance])`

Compares two points, returning -1, 0, or 1, for use with
Array.prototype.sort

Note: This technically doesn't satisfy the total-ordering
requirements of Array.prototype.sort unless equalityTolerance
is 0. In some cases very close points that compare within a
few equalityTolerances could appear in the wrong order.

#### `point.polarRadFromCart(p)`

Returns a polar point `[length, angle]` from the two-dimensional cartesian
point `v`, where `angle` is measured in radians.

```js
kmath.point.polarRadFromCart([1, 1])
=> [1.4142135623730951, 0.7853981633974483]
```

#### `point.polarDegFromCart(p)`

Returns a polar point `[length, angle]` from the two-dimensional cartesian
point `v`, where `angle` is measured in degrees.

```js
kmath.point.polarDegFromCart([0, 2])
=> [2, 90]
```

#### `point.cartFromPolarRad(polar)` or `point.cartFromPolarRad(length, angle)`

Returns a two-dimensional cartesian point from the polar point input,
where the input angle is measured in radians.

```js
kmath.point.cartFromPolarRad(2, Math.PI)
=> [-2, 0]  // Note: a very small nonzero number is actually returned here,
            // due to numerical inaccuracy.
kmath.point.cartFromPolarRad(Math.pow(2, 0.5), Math.PI/4)
=> [1, 1]
```

#### `point.cartFromPolarDeg(polar)` or `point.cartFromPolarDeg(length, angle)`

Returns a two-dimensional cartesian point from the polar point input,
where the input angle is measured in degrees.

```js
kmath.point.cartFromPolarRad([2, 90])
=> [-2, 0]  // Note: a very small nonzero number is actually returned here,
            // due to numerical inaccuracy.
kmath.point.cartFromPolarRad(Math.pow(2, 0.5), 45)
=> [1, 1]
```

#### `point.rotateRad(p, angle, center)`

Returns the rotation of the two-dimensional point `v` by `angle` radians
around the point `center`

#### `point.rotateDeg(p, angle, center)`

Returns the rotation of the two-dimensional point `v` by `angle` degrees
around the point `center`.

#### `point.round(p, precision)`

Rounds each dimension of `p` to `precision` decimal places.

#### `point.roundTo(p, increment)`

Rounds each dimension of `p` to the nearest `increment`.

#### `point.floorTo(p, increment)`

Floors each dimension of `p` to the nearest `increment`.

#### `point.ceilTo(p, increment)`

Ceils each dimension of `p` to the nearest `increment`.

## kmath.ray

#### `ray.equal(r1, r2, [tolerance])`

Returns true if rays `r1` and `r2` are equal within `tolerance`.

If unspecified, `tolerance` defaults to `kmath.number.DEFAULT_TOLERANCE`.

## kmath.line

#### `line.equal(line1, line2, [tolerance])`

Returns true if lines `line1` and `line2` are equal within `tolerance`.

If unspecified, `tolerance` defaults to `kmath.number.DEFAULT_TOLERANCE`.

#### `line.midpoint(theLine)`

Returns the midpoint of the line `theLine`.

```js
kmath.line.midpoint([[0, 5], [5, 0]])
=> [2.5, 2.5]
```

#### `line.distanceToPoint(theLine, p)`

Returns the distance between `theLine` and point `p`.

#### `line.reflectPoint(theLine, p)`

Returns the reflection of `p` over `theLine`.

## License

MIT. See the [LICENSE](../../LICENSE) file for more information.
