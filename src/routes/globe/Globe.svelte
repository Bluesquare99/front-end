<script>
    let globeMap
    let rotationX = 0
    let rotationY = 0

    let globeDisco

    const handleRotateButtonClick = () => 
    {
        const latitudes = [53, 37, 30]
        const longitudes = [6, 122, 97]

        const rand = Math.floor(Math.random() * 3);
        rotationX = (Math.PI * 2) * latitudes[rand] / 360
        rotationY = (Math.PI * 2) * longitudes[rand] / 360
        console.log(latitudes[rand], longitudes[rand])
        console.log(rotationX, rotationY);
    }

    onMount(async () => {
        const initialGlobe = (await import('three-globe')).default;

        // SUBSECTION: Map Globe
        const stationStats = [
            {
                name: 'DDR',
                lat: 53.34766040284911,
                lng: -6.270136955821768
            },
            {
                name: 'BFF',
                lat: 37.7639450483543, 
                lng: -122.41844434668297
            },
            {
                name: 'KOOP',
                lat: 30.28866549322267,
                lng: -97.70617147356026
            }
        ]
        const stationPointsArray = stationStats.map(station => {
            const container = {};

            container['lat'] = station['lat'],
            container['lng'] = station['lng'],
            container['color'] = 'red',
            container['altitude'] = 0.04,
            container['radius'] = .6

            return container;
        })

        globeMap = new initialGlobe()
            .globeImageUrl('src/lib/images/earf2.png')
            .pointsData(stationPointsArray)
            .pointAltitude('altitude')
            .pointRadius('radius')
            .pointColor('color')
                
        // SUBSECTION: Disco Globe
        const TILE_MARGIN = 0.35; // degrees
        const GRID_SIZE = [60, 20];
        const tileWidth = 360 / GRID_SIZE[0];
        const tileHeight = 180 / GRID_SIZE[1];
        const tilesData = [];
        [...Array(GRID_SIZE[0]).keys()].forEach(lngIdx =>
            [...Array(GRID_SIZE[1]).keys()].forEach(latIdx =>
                tilesData.push({
                lng: -180 + lngIdx * tileWidth,
                lat: -90 + (latIdx + 0.5) * tileHeight,
                material: new THREE.MeshStandardMaterial({color: "#C0C0C0", metalness: 0.2 })
                })
            )
        );

        globeDisco = new initialGlobe()
            .tilesData(tilesData)
            .tileWidth(tileWidth - TILE_MARGIN)
            .tileHeight(tileHeight - TILE_MARGIN)
            .tileMaterial('material');
    });

</script>

<Object3DInstance object={globeMap} scale={0.8}/>
