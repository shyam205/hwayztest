import ContentLoader from "react-content-loader";

const TEXT_HEIGHT = 13
const TEXT_RADIUS = 3

// const PILL_HEIGHT = TEXT_HEIGHT+8
// const PILL_RADIUS = TEXT_RADIUS+8

export default function ProductLoader() {
    return (
        <ContentLoader width="100%" height={130} style={{ marginBottom: 12 }} preserveAspectRatio = "none">
            <rect x="75%" y="0" width="25%" height="100%" rx={8} ry={8} />
            <rect x="0" y="0" width="12%" height={TEXT_HEIGHT} rx={TEXT_RADIUS} ry={TEXT_RADIUS} />
            <rect x="0" y={TEXT_HEIGHT*2.4} width="18%" height={TEXT_HEIGHT} rx={TEXT_RADIUS} ry={TEXT_RADIUS} />
            <rect x="0" y={TEXT_HEIGHT*4.4} width="20%" height={TEXT_HEIGHT} rx={TEXT_RADIUS} ry={TEXT_RADIUS} />
            <rect x="0" y={TEXT_HEIGHT*6.4} width="40%" height={TEXT_HEIGHT} rx={TEXT_RADIUS} ry={TEXT_RADIUS} />
        </ContentLoader>
    )
}