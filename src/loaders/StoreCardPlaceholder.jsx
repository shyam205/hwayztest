import ContentLoader from "react-content-loader";

const TEXT_HEIGHT = 13
const TEXT_RADIUS = 3

const PILL_HEIGHT = TEXT_HEIGHT+8
const PILL_RADIUS = TEXT_RADIUS+8

export default function StoreCardPlaceholder() {
    return (
        <ContentLoader width="100%" height={128} style={{ marginBottom: 12 }} preserveAspectRatio = "none">
            <rect x="0" y="0" width="20%" height="100%" rx={8} ry={8} />
            <rect x="22%" y="0" width="20%" height={TEXT_HEIGHT} rx={TEXT_RADIUS} ry={TEXT_RADIUS} />
            <rect x="22%" y={TEXT_HEIGHT*2} width="60%" height={TEXT_HEIGHT} rx={TEXT_RADIUS} ry={TEXT_RADIUS} />
            <rect x="22%" y={TEXT_HEIGHT*4} width="40%" height={TEXT_HEIGHT} rx={TEXT_RADIUS} ry={TEXT_RADIUS} />
            <rect x="22%" y={TEXT_HEIGHT*6} width="30%" height={TEXT_HEIGHT} rx={TEXT_RADIUS} ry={TEXT_RADIUS} />
            <rect x="22%" y={128-PILL_HEIGHT} width="15%" height={PILL_HEIGHT} rx={PILL_RADIUS} ry={PILL_RADIUS} />
        </ContentLoader>
    )
}