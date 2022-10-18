<!-- <script>
    import { Points, PointsMaterial, BufferGeometry, MeshStandardMaterial, BufferAttribute, AdditiveBlending } from 'three'
    import { Object3DInstance } from '@threlte/core'
    import {Hsluv} from "hsluv";

    /**
     * 1. record number of intervals
     * 2. the number of points grows with the number of intervals
     *     therefore, count is numintervals * 20, positions & colors are count * 3
     * 3. for each interval, we fill 20 points
     *     of those, their positions will be different Math.random() calls and their colors will be the same rgb values
     *     so for each interval we define an r g b
     * 4. to complete total number, each needs to start at a number and go for a certain number of others
     */
    const particlesGeometry = new BufferGeometry()

    const intervals = $intervals
    const numIntervals = intervals.length()

    let count = numIntervals * 20
    const positions = new Float32Array(count * 3) // represents x y z
    const colors = new Float32Array(count * 3) // represents rgb

    for interval, index in intervals:
        let start = index * 20

        const r = interval[0]
        const g = interval[1]
        const b = interval[2]

        for (let i = 0; i < 60; i++) {
            // 1
            positions[i + start] = (Math.random() - 0.5) * 12
            colors[i + start] = r
            // 2
            positions[i + 1 + start] = Math.random() - 0.5 * 6
            colors[i + 1 + start] = g
            // 3
            positions[i + 2 + start] = Math.random() - 0.5 * 4
            colors[i + 2 + start] = b
        }

    particlesGeometry.setAttribute(
        'position',
        new BufferAttribute(positions, 3)
    )

    particlesGeometry.setAttribute(
        'color',
        new BufferAttribute(colors, 3)
    )

    // Points Material
    const particlesMaterial = new PointsMaterial()
    particlesMaterial.size = 0.1
    particlesMaterial.sizeAttenuation = true
    particlesMaterial.depthWrite = false
    particlesMaterial.blending = AdditiveBlending
    particlesMaterial.vertexColors = true

    const points = new Points(particlesGeometry, particlesMaterial)
</script>

<Object3DInstance object={points} />
   -->