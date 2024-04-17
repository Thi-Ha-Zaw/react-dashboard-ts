import SkeletonTableRow from "./SkeletonTableRow";

const SkeletonTableBody = ({cell} : {cell : number}) => {
    const skeletons = Array.from({ length: 5 }, (v, i) => i);
    return (
        <>
            {skeletons.map((value, index) => (
                <SkeletonTableRow key={index} cell={cell} />
            ))}
        </>
    );
};

export default SkeletonTableBody;
